// server/config/mongojs
const mongojs = require('mongojs');

let mongoUri;
if (process.env.NODE_ENV === 'test') {
  mongoUri = 'localhost:27017/cursonode-test'
} else {
  mongoUri = 'localhost:27017/cursonode'
}

const db = mongojs(mongoUri);

db.on('error', (err) =>{
console.log('Error!', err)
});

module.exports = db;
