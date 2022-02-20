# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Это интернет-магазин мебели.

При написании использовались Redux, Redux-thunk, TypeScript.
Небольшое REST API написано на Express. База данных - mongoDB.

В корне папка server, src - там все клиентское и папка build также для deploy клиента. Изначально не предполагалось, что будет сервеная часть, но в процессе разработки было принято решение сделать.

## Структра проекта стандартна - В папке src:

### Components - компоненты
Здесь они поделены на типы: название страницы, на которой встречаются,
common - общие, для нескольких страниц.
layout - компоненты разметки.

### hooks - свои хуки
useBreadcrumbs - берет из URL страницы запрос, расзбивает его, и ставит в соответствие каждому элементы понятное слово, из которых составляются хлебные крошки.

### utils - утилиты, там сортировка
### types - там все типы и константы

Header для каждой страниц разный, поэтому он у каждой страницы свой, а не на одном уровне с Footer.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Runs server on port 5000, that supplies client with all data it needs by addressing to server through the REST API written.


### `npm serve`

Runs server on port 5000, that supplies client with all data it needs by addressing to server through the REST API written.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

