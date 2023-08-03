import "dotenv/config"
import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser"
import fileUpload from 'express-fileupload'
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

import { router as appRouter } from './src/routes/app.router.js'
import { router as userRouter } from './src/routes/user.router.js'
import { errorHandler } from "./src/middleware/error.handler.js"

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(fileUpload());


const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "React Loft Furniture Express API with Swagger",
      version: "0.1.0",
      description: "This is a CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use('/user', userRouter);
app.use('/api', appRouter);

app.use(errorHandler) 

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log('server has been started on 0.0.0.0:' + PORT);
    });

  } catch(error) {
    console.log(error);
  }
};
start();
