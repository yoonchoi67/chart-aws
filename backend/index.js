// import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
// import helmet from 'helmet';
 
const app = express();
// app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://ec2-54-180-26-58.ap-northeast-2.compute.amazonaws.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  // app.use(helmet());

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