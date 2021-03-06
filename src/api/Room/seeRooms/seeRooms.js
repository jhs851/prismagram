import { prisma } from '../../../../generated/prisma-client';

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
            });
        }
    }
}