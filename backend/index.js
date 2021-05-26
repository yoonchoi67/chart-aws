// import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
 

if(process.env.NODE_ENV === 'production') {
    console.log("prod")
} else {
    console.log('dev')
}

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use("/", routes);

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});