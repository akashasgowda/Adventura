// Backend folder structure
// models -> for mongodb schemas
// controllers -> for handlers of routes
// routes -> to get data by visiting to that particular route

import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(bodyParser.json({limit:"30mb", extended:true}) );
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}) );

// routes
app.use('/posts',postRoutes);
app.use('/users',userRoutes);


const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

// db connection

// useNewUrlParser ->  used to parse the connection string using the MongoDB Node.js driver's new URL parser.
//                     It helps to avoid deprecation warnings.
// useUnifiedTopology ->  improved support for server selection, monitoring, and handling topology changes.

mongoose.connect(CONNECTION_URL , {useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> app.listen(PORT,()=> console.log(`Server running on PORT: http://localhost:${PORT}`)))
.catch((error)=> console.log(`${error} couldn't establish connection to database`));



