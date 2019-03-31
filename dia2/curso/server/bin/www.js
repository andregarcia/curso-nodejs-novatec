const app = require('../app')


const cluster = require('cluster')
const numCpus = require('os').cpus().length


if(cluster.isMaster){
  for (let i=0; i<numCpus; i++){
    let worker = cluster.fork()
  }
} else{
  app.listen(3000, () => {
    console.log('Server is up')
  })
}

cluster.on('exit', (worker, code, signal) => {
  console.log('exit', signal)
  cluster.fork()
})


