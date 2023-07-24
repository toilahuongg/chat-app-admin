import { authSocket } from '@server/middlewares/auth.middleware';
import { Server } from 'socket.io';
import AccountService from './account.service';

export const initSocket = (io: Server) => {
  io.use(authSocket);
  io.on('connection', async (socket) => {
    if (socket.data.newAccessToken) socket.emit('NEW_ACCESS_TOKEN', socket.data.newAccessToken);
    console.log(
      'Client id connected ' +
        socket.id +
        ', accountId: ' +
        socket.data.accountId +
        ', deviceId: ' +
        socket.data.deviceId,
    );

    const userData = await AccountService.findById(socket.data.accountId);
    const chatIds = userData.chats?.map((id) => id.toString()) || [];
    socket.join(chatIds);

    socket.on('message', (data) => {
      const { chatId } = data;
      socket.to(chatId).emit('message', data);
    });

    socket.on('update-last-seen', (data) => {
      const { _id } = data;
      socket.to(_id).emit('update-last-seen', data);
    });

    socket.on('disconnect', () => {
      chatIds.map((id) => socket.leave(id));
      console.log('Client id disconnected ' + socket.id);
    });
  });
};
