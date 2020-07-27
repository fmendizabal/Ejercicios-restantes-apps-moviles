'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';
const dbName = 'apps-moviles';
const collName = 'personas';


module.exports.getAll = async function (client) {

	try {
		let resultado = client.db(dbName).collection(collName).find().toArray();
		// let resultado = client.db(dbName).collection(collName).find().project(
		// 	{'_id':0}
		// ).toArray();
		return resultado;
	} catch (err) {
		console.log(err);
	}

}

module.exports.connect = async function () {
	return MongoClient.connect(url, { useUnifiedTopology: true });
}

module.exports.insertOne = async function (client, data) {
	await client.db(dbName).collection(collName).insertOne(data);
}

module.exports.updateOne = async function (client, data) {
	console.log(data);
	
	try {

		client.db(dbName).collection(collName).updateOne(
			{ _id: ObjectId(data._id) },
			{
				$set: {
					nombre: data.nombre,
					apellido: data.apellido,
					edad: data.edad
				}
			}
		);
	} catch (err) {
		console.log('hi');
	}
}

module.exports.delete = async function (client, id) {
	client.db(dbName).collection(collName).deleteOne(
		{
			_id: ObjectId(id)
		}
	);
}