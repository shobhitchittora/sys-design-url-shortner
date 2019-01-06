'use strict'
const autocannon = require('autocannon');
const PORT = process.env.PORT || 8080;

const instance = autocannon({
  url: `http://localhost:${PORT}/api/shorten?url=https://example.com`,
  connections: 400,
  pipelining: 1,
  amount: 5000
}, console.log)


process.once('SIGINT', () => {
  instance.stop()
})
 
autocannon.track(instance, {renderProgressBar: false})