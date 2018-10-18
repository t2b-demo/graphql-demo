const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema') 

const app = express();

mongoose.connect('mongodb://localhost:27017/SeSamDB', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to the database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));

app.listen(4000, ()=> {
    console.log('Listening on port 4000');
})