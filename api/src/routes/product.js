const server = require('express').Router();
const fetch = require('node-fetch')


server.post('/', (req, res) => {

	const {q,offset} = req.body;
	console.log(q, "esto es q")
	console.log (offset, "esto es offset")
	fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&offset=${offset}&limit=5`).then (data=>data.json()).then (response=>res.send(response))
});

module.exports = server;

