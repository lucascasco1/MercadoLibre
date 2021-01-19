const server = require('express').Router();
const fetch = require('node-fetch')

server.get('/', (req, res, next) => {
	const q= req.query.q; 
	fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&offset=0&limit=30`).then (data=>data.json()).then (response=>res.send(response))
});

module.exports = server;
