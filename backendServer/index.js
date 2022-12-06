#!/usr/bin/env node
import express, { Router, urlencoded, json } from "express";
import userRouter from './routes/user.js';
import interactionRouter from './routes/interaction.js';
import cookieRouter from './routes/cookie.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = process.env.PORT || 5555;

const app = express();
const router = Router();

app.use(urlencoded());
app.use(json());
app.use(cookieParser());
app.use(cors({
  origin : 'http://localhost:3000',
  credentials: true, // <= Accept credentials (cookies) sent by the client
}))


// GET endpoint: /
app.get('/app', (req, res) => {
    res.json({message: 'alive'});
  })

app.use('/app/user', userRouter);
app.use('/app/interaction', interactionRouter);
app.use('/app/cookie', cookieRouter);

app.use(function (req, res) {
    res.send('404 NOT FOUND');
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});