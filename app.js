import express from 'express';
import app from './backend/servers/server';
import mongoose from 'mongoose';
import MongoURI from './backend/servers/database';

//database connection.
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => console.log('MongoDB is now connected'))
	.catch((err) => console.log(err));

//just to make sure that gets working properly for now... (edit later)
app.get('/Home', (req, res) => {
	res.status(200).send('You have everything installed !');
});

