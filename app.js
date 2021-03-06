// Your task is to create 1 rest api using the following APIs
// https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05&curren
// cy=eur
// https://api.coindesk.com/v1/bpi/currentprice/eur.json


import fetch from "node-fetch";
import express from 'express'
//import mongoose from 'mongoose'
//const express = require('express');
//const bitCoinInfo = require('./models/mongoDB_model');
const route = express();
//const fetch = require('node-fetch');
route.use(express.json())


global.currency_code ='';



//lowest and higest rate and current rate
//this route have one request id  'currency' 
route.get('/getBitcoinInfo/:currency', async (req, res) => {

	currency_code = req.params.currency

	const current_date_end = new Date().toISOString().substring(0, 10);
	//console.log(typeof(current_date_start))

	var date = new Date();
	date.setDate(date.getDate() - 30);
	var previous_date_start = date.toISOString().split('T')[0];


	// console.log(current_date_end)
	// console.log(previous_date_start)

	const url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start='+previous_date_start+'&end='+current_date_end+'&currency='+ currency_code

	const options = {
		'method': 'GET'
	}
	const response = await fetch(url, options).then(url, options)
		.then(res => res.json())
		.catch(e => {
			console.error({
				'massages': 'Data not Found',
				error: e,
			});
		});


	const obj=response['bpi']

	const keys = Object.keys(obj);
	//console.log(keys); // ['2022-03-02', '2022-03-03', '2022-03-04', '2022-03-04',etc]

	const values = keys.map(key => {
	return obj[key];});

	//console.log(values); // [39508.4807, 38383.8573, 35817.5657, 36066.8273,etc]

	const highest_Bitcoin_rate = Math.max.apply(null, values);
	//console.log(highest_Bitcoin_rate); // 43832.602

	const lowest_Bitcoin_rate = Math.min.apply(null, values);
	//console.log(lowest_Bitcoin_rate); // 34579.2098



	const current_price_url = 'https://api.coindesk.com/v1/bpi/currentprice/'+currency_code +'.json/'

	const current_price_response = await fetch(current_price_url, options).then(url, options)
		.then(res => res.json())
		.catch(e => {
			console.error({
				'massages': 'Data not found...data fetch hoy naaaaai!!!',
				error: e,
			});
		});

	
	
	//Validation 
	currency_code = currency_code.toUpperCase()
	let current_bitcoin_price = '';

	if (!currency_code || currency_code.length > 3) {
		res.status(400).send('Currency code required and should be minimum 3 characters')
		return;
	}


	const data_set = Object.values(current_price_response['bpi']);
	//console.log(data_set);	
	const disclaimer_String = response['disclaimer'] 

	for (let key in data_set) {
		//console.log(data_set[key])
		if (data_set[key].code === currency_code) {
			current_bitcoin_price=(data_set[key]);
		}
	}

	//console.log(current_bitcoin_price);


	const route_responsed = {
		current_rate: current_bitcoin_price,
		lowest_rate: lowest_Bitcoin_rate,
		highest_rate: highest_Bitcoin_rate,
		disclaimer: disclaimer_String
	};

	res.json(route_responsed)

	
});

// const port = process.env.PORT || 3000;
//     route.listen(port () => console.log(`Listening on port ${port}`))

	const host = '0.0.0.0';
	const port = 8080;
	route.listen(port,host);
	console.log(`Listening on http://${host}:${port}`);






	
// //Current_price route
// route.get('/getBitcoinInfo/currentPrice/:currency_type', async (req, res) => {

// 	const url = 'https://api.coindesk.com/v1/bpi/currentprice/eur.json/'

// 	const options = {
// 		'method': 'GET'
// 	}
// 	const response = await fetch(url, options).then(url, options)
// 		.then(res => res.json())
// 		.catch(e => {
// 			console.error({
// 				'massages': 'Data fetch hoy naaaaai!!!',
// 				error: e,
// 			});
// 		});

// 	//const currency_code
// 	//let c_code = req.params.currency_type
// 	currency_code = currency_code.toUpperCase()
// 	//result
// 	let results = '';

// 	if (!currency_code || currency_code.length > 3) {
// 		res.status(400).send('Currency code required and should be minimum 3 characters')
// 		return;
// 	}

// 	const data_set = Object.values(response['bpi']);


// 	for (let key in data_set) {
// 		//console.log(data_set[key])
// 		if (data_set[key].code === currency_code) {
// 			results=(data_set[key]);
// 		}
// 	}




// 	console.log(results);
// 	//const some =data.keys(String(req.params.currency_type))
// 	//object theke aaray bair korte hobe

// 	//console.log(data_set);
// 	res.json(results)

// });
// const port = process.env.PORT || 3000;
// route.listen(port, () => console.log(`Listening on port ${port}`))








//console.log(data);

//res.json(data);


//  const  bicoin_price = data.find(r => r.bpi===String(req.params.currency_type));

// if (!bicoin_price) res.status(404).send('Not Found')
// 	console.log("RESPONSE:", bicoin_price);
// 	res.json(bicoin_price);


// console.log("RESPONSE:", response.bpi.USD);
// res.json(response.bpi.USD);





	 //res.send("hello World");








// mongoose.connect('mongodb://localhost/BitCoin');
// mongoose.Promise =global.Promise;

// const mongoDB_schema = mongoose.Schema;

// // db_model_schema = new mongoDB_schema({});
// // 	db_model_schema.add(response);

// const db_model_schema = new mongoDB_schema({
// 	bpi: { type: Object, default: '' },
// 	disclaimer: { type: String, default: '' },
// 	time: { type: Object, default: '' }
// });

// //model , Collection,schema
// let bitCoinInfo = mongoose.model('bitCoinPriceCollctions', db_model_schema);

// //var bitCoinInfo =mongoose.model('bitCoinPriceCollctions',db_model_schema);


// fetch('http://example.com/movies.json')
//   .then(response => response.json())
//   .then(data => console.log(data));