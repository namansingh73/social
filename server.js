const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const User = require('./models/userModel');

dotenv.config({path: `./config.env`});

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB connection successful');
});

app.listen(process.env.PORT || 3000,()=>{
    console.log(`App running on port ${port}`);
});