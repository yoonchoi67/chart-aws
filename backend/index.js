// import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
 
const app = express();
const PRODUCTION = process.env.NODE_ENV === 'production'

if( PRODUCTION ) {
    app.use('/', express.static('/home/ubuntu/webapp/client/build'))
} else {
    app.use("/", routes);
}


const port = process.env.PORT;
app.use(cors());

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});