// import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
 
const app = express();
app.use(cors());
app.use(express.json());

//take a look again
const PRODUCTION = process.env.NODE_ENV === 'production'
console.log(PRODUCTION)

if( PRODUCTION ) {
    app.use('/', express.static('/home/ubuntu/webapp/frontend/build'))
} else {    
    // app.use('/', express.static('./../frontend/src'))
    app.use('/', express.static('./../frontend/build'))
    // app.use("/", routes);
}



//take a look again
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});