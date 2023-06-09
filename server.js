const path = require('path');
const express = require('express');
const routes = require('./controllers');
const { create } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;
const handlebars = create({});

// Parsing middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.use(routes);

// Register Handlebars as the template engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

async function start() {
  // await sequelize.sync();  await sync database with models here
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

start();
