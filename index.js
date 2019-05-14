const express = require('express');
const helmet = require('helmet');
const server = express();
const knex = require('knex');
const router = express.Router();

const knexConfig = {
  client : 'sqlite3',
  connection : {
    filename : './data/zoos.sqlite3'
  },
  useNullAsDefault : true,
  debug : true
}

const db = knex(knexConfig);

server.use(express.json());
server.use(helmet());
server.use('/zoos', router);

server.get('/', (req,res) => {
  res.send('the server is working');

} )

router.get('/', (req,res) => {
  //res.json({message : 'the router is working'})
  db('zoos')
    .then( animals => {
      res.status(200).json(animals)
    })
    .catch( err => {
      res.status(500).json(err.message);
    })
});






const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
