'use strict';
const port = 3000
const express = require('express');
const bodyParser = require('body-parser');
const base = require('./base');
const app = express();

async function exe() {
	let client = await base.connect();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use((req, res, next) => {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
		next();
	});
	app.route('/personas').get(async (req, res) => {
		let data = await base.getAll(client);
		res.send(data);
		res.end('Ok');
	}).post(async (req, res) => {
		await base.insertOne(client, req.body);
		res.end('HOLA TERMINO EL POST');
	}).put(async (req, res) => {
		await base.updateOne(client, req.body);
		res.end();
	});

	app.delete('/personas/:id', async (req, res) => {
		await base.delete(client, req.params.id);
		//let resultado = await base.getAll(client);
		res.end();
	});

	app.listen(port, () =>
		console.log('Server v1.0 instalado en el puerto '+ port)
	);
}
exe();