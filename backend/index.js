import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import path from 'path';
 
const app = express();
app.use(cors());
app.use(express.json());

//process.env.NODE_ENV is set in package.json
if( process.env.NODE_ENV === 'production' ) {
    app.use('/', express.static('/home/ubuntu/webapp/frontend/build'));
    app.use("/", routes);
} else {
    app.use("/", routes);
}

app.listen(3000, () => {
    console.log(`Server Running at ${3000}`)
});