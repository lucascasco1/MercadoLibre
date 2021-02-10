const server = require('express').Router();
const fetch = require('node-fetch')


server.post('/', (req, res) => {

	const {q,offset,stateProduct} = req.body;
	console.log(q, "esto es q")
	console.log (offset, "esto es offset")
	console.log(stateProduct, "esto es stateProduct")
	fetch(`https://api.mercadolibre.com/sites/MLA/search?condition=${stateProduct}&q=${q}&offset=${offset}&limit=5`).then (data=>data.json()).then (response=>res.send(response))
});

module.exports = server;

