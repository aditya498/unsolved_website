const express=require('express');
const app=express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal=require('./config/passport_local_strategy');
const mongoStore=require('connect-mongo')(session);
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'unsolved',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10)
    },
    store:new mongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            if(err) {
                console.log(err);
                return;
            }
            console.log('connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server successfully started on port: ${port}`);
});

