const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Импортируем локальные модули
const db = require('./db');
const models = require('./models');
const resolvers = require('./resolvers');
const typeDefs = require('./schema'); // Строим схему с помощью языка схем GraphQL
const helmet = require('helmet');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity')

const app = express();
app.use(helmet());
app.use(cors());

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST; // Сохраняем значение DB_HOST в виде переменной
db.connect(DB_HOST); // Подключаемся к БД

// Получаем пользователя из jwt токена
const getUser = token => {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            new Error('Invalid session');
        }
    }
}

// Настраиваем Apollo Server
const server = new ApolloServer(
    {
        typeDefs,
        resolvers,
        validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
        context: ({ req }) => {
            console.log(req.headers);
            const token = req.headers.authorization;
            const user = getUser(token);
            console.log(user);
            // Добавление моделей БД в context
            return { models, user };
        }
    });

// Применяем промежуточное ПО Apollo GraphQL и указываем путь к api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);
