const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const seedDatabase = require('./seeds/seed');
const { User } = require('./models');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ 
    helpers,
    extname: '.hbs',
});

const sess = {
    secret: 'A secret is meant to be kept private',
    cookie: {
        maxAge: 100000,
        httponly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(async () => {
    const isEmpty = await User.count() === 0;
    if (isEmpty) {
        seedDatabase();
    }

    app.listen(PORT, () => console.log(`Listening @ http://localhost:${PORT}`));
});
