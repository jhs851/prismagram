import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);

            const { user } = request;
            const { roomId, text, toId } = args;
            let room;

            if (roomId === undefined) {
                if (user.id !== toId) {
                    room = await prisma.createRoom({
                        participants: {
                            connect: [
                                { id: toId },
                                { id: user.id }
                            ]
                        }
                    });
                }
            } else {
                room = await prisma.room({ id: roomId });
            }

            if (! room) {
                throw Error('Room not found');
            }

            const message = await prisma.createMessage({
                text
            });

            return null;
        }
    }
}