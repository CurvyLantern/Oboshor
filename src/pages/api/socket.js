// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Server } from 'Socket.IO';

const SocketHandler = (req, res) => {
	let io = undefined;
	if (res.socket.server.io) {
		io = res.socket.server.io;
		console.log('Socket is already running');
	} else {
		console.log('Socket is initializing');
		res.socket.server.io = new Server(res.socket.server);
		io = res.socket.server.io;
	}
	io.on('connection', sock => {
		sock.on('test-input', msg => {
			sock.broadcast.emit('test-update', msg);
		});
	});

	res.end();
};

export default SocketHandler;
