const server = require('express').Router();
const fetch = require('node-fetch')


server.get('/', (req, res, offset) => {
	const q= req.query.q; 
    let off = 0;
	fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&offset=${off}&limit=5`).then (data=>data.json()).then (response=>res.send(response))
});

module.exports = server;
