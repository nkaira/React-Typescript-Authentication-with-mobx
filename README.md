# Auth app 

Это приложение для аутентификации и авторизации с возможностями просмотра/редактирования/добавления списка контактов. Реализован поиск. Написан с использованием TypeScript.
В качестве моковых данных и эндпоинтов используется JSON Server Auth https://www.npmjs.com/package/json-server-auth
В качестве менеджера состояния используется mobx.

## Getting started

1. Установите все зависимости указанные в package.json.

2. Убедитесь что установился JSON Server и JSON Server Auth:

NPM:
npm install -D json-server json-server-auth

Yarn:
yarn add -D json-server json-server-auth

3. Запустите клиент часть:

NPM:
npm start

yarn start:
yarn add -D json-server json-server-auth

4. Запустите сервер часть:

json-server db.json -m ./node_modules/json-server-auth

## Used libraries

React.js, mobx, react-hook-form, react-router-dom, Axios, classnames, uuid

### To do list

1. добавить валидацию для полей во время редактирования.
2. добавить значок загрузки во время взаимодействия с БД.

==================================================

# Auth app

This is an authentication and authorization application with the ability to view / edit / add a contact list. Search implemented. Written using TypeScript.
As mock data and endpoints was used JSON Server Auth https://www.npmjs.com/package/json-server-auth.
As a state manager mobx was used.

## Getting started

1. Install all dependencies listed in package.json.

2. Make sure JSON Server и JSON Server Auth was installed:

NPM:
npm install -D json-server json-server-auth

Yarn:
yarn add -D json-server json-server-auth

3. Run client part:

NPM:
npm start

yarn start:
yarn add -D json-server json-server-auth

4. Run server part:

json-server db.json -m ./node_modules/json-server-auth