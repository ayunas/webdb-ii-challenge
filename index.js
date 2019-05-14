const express = require('express');
const helmet = require('helmet');

const server = express();
const router = express.Router();

server.use(express.json());
server.use(helmet());
server.use('/zoos', router);

server.get('/', (req,res) => {
  res.send('the server is working');
} )

router.get('/', (req,res) => {
  res.json({message : 'the router is working'})
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
