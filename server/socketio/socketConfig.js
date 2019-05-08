const gameController = require('./gameController');

const ioConfig = io => {

  io.on('connect', socket => {
    console.log('connected: ', socket.id);
    socket.on('clientAction', message => {
      gameController[message.type](socket, message);
    })
  });
}
module.exports = ioConfig;