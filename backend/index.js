// import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
 
const app = express();
app.use(cors());
app.use(express.json());

//process.env.NODE_ENV is set in package.json
if( process.env.NODE_ENV === 'production' ) {
    app.use('/', express.static('/home/ubuntu/webapp/frontend/build'))
} else {    
    app.use("/", routes);
}

//take a look again
const port = process.env.PORT;
const port1 = 3000
app.listen(port1, () => {
    console.log(`Server Running at ${port1}`)
});