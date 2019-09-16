import { prisma } from '../../../../generated/prisma-client';
import { ROOM_FRAGEMENT } from '../../../fragments';

export default {
    Query: {
        seeRooms: (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);

            return prisma.rooms({
                where: {
                    participants_some: {
                        id: request.user.id
                    }
                }
            }).$fragment(ROOM_FRAGEMENT);
        }
    }
}