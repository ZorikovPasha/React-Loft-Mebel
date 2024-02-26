import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableShutdownHooks()
  app.use(cookieParser())

  // if (process.env.NODE_ENV === "development") {
  app.enableCors({
    credentials: true,
    origin: process.env.FRONT
  })
  // }

  const config = new DocumentBuilder()
    .setTitle('Loft furniture backend API')
    .setVersion('1.0')
    .addTag('Loft furniture')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  await app.listen(3478)
}
bootstrap()
