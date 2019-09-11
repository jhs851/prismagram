import { prisma } from '../../../../generated/prisma-client';
import { ROOM_FRAGEMENT } from '../../../fragments';

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
                    }).$fragment(ROOM_FRAGEMENT);
                }
            } else {
                room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGEMENT);
            }

            if (! room) {
                throw Error('Room not found');
            }

            const getTo = room.participants.find(participant => participant.id !== user.id);

            return prisma.createMessage({
                text,
                from: {
                    connect: { id: user.id }
                },
                to: {
                    connect: { id: roomId ? getTo.id : toId }
                },
                room: {
                    connect: { id: room.id }
                }
            });
        }
    }
}