const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const moment = require('moment');
const port = process.env.PORT || 3000;
const logger = require('./logger');
const members = require('./Members');

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));

// Member API Routes
app.use('/api/members', require('./routes/api/members'));

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
