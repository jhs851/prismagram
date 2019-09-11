import { prisma } from '../../../generated/prisma-client';

export default {
    User: {
        fullName: parent =>
            `${parent.firstName} ${parent.lastName}`,
        isFollowing: (parent, _, { request }) =>
            prisma.$exists.user({
                AND: [
                    { id: request.user.id },
                    {
                        following_some: { id: parent.id }
                    }
                ]
            }),
        isSelf: (parent, _, { request }) =>
            request.user.id === parent.id
    }
}