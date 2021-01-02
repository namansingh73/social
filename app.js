const express = require('express');
const viewRouter = require('./routers/viewroute');
const path = require('path');
const app = express();
const userRouter = require('./routers/userroute');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const postRouter = require('./routers/postroute');
const cors = require('cors');
const compression = require('compression');

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        scriptSrc: ["'self'", 'https://*.cloudflare.com'],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", 'https:', 'unsafe-inline'],
        upgradeInsecureRequests: [],
      },
    })
);
const limit = rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:'Too many requests! Please try again later'
});

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());
app.use(express.json({limit:'100kb'}));
app.use(cors());
app.use(compression());
//Data sanitization against XSS
app.use(xss());

app.use('/api',limit);

app.set('view engine','pug');
app.set('views',path.join(__dirname,'pugtemplates'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/v1/users',userRouter);
app.use('/',viewRouter);
app.use('/posts',postRouter);

module.exports = app;