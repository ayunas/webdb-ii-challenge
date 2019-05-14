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
  res.send('the zoos server is working');
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

router.get('/:id', (req,res) => {
  db('zoos')
  .where({id : req.params.id})
  //.first()
  .then( zoo => {
    if (zoo) {
      res.status(200).json(zoo[0]);
    } else {
      res.status(404).json({message : `the zoo with id ${req.params.id} was not found`});
    }
  })
  .catch( err => {
    res.status(500).json(err);
  })
});

router.post('/', (req,res) => {
  const newZoo = req.body;
  
  db('zoos')
    .insert(newZoo)
      .then( ids => {
        res.status(200).json(ids);
      })
      .catch( err => {
        res.status(500).json(err.message);
      })
});

router.put('/:zooID', (req,res) => {
  const zooID = req.params.zooID;

  db('zoos')
    .where({id : zooID})
    .update(req.body)
    .then( count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({error : `the zoo with id ${zooID} could not be updated`})
      }
    })
    .catch( err => {
      res.status(500).json(err.message);
    })
})







const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
