const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const { ApolloServer } = require('apollo-server-express');
const PORT = process.env.PORT || 4000;
require("dotenv").config();

// Importar schema e resolvers do GraphQL
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Conexão com o MongoDB
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { console.log("Conectado ao MongoDB") })
.catch((err) => {
    console.log("Falha ao conectar com o MongoDB");
    console.log(err);
});

const app = express();

// Configuração de CORS para permitir requisições de diferentes origens
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do Apollo Server
async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({})
    });
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}${server.graphqlPath}`);
    });
}
startApolloServer();

// Rotas REST (opcional, pode remover se não usar)
try {
    app.use('/', require('./routes/index'));
    app.use('/users', require('./routes/users'));
    app.use('/ndvi-maps', require('./routes/ndviMaps'));
} catch (e) {
    // Se não existirem, apenas ignore
}

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Erro interno do servidor',
            status: err.status || 500
        }
    });
});

module.exports = app;