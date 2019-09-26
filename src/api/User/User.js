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
        isSelf: (parent, _, { request }) => request.user.id === parent.id,
        posts: ({ id }) => prisma.user({ id }).posts(),
        following: ({ id }) => prisma.user({ id }).following(),
        followers: ({ id }) => prisma.user({ id }).followers(),
        likes: ({ id }) => prisma.user({ id }).likes(),
        comments: ({ id }) => prisma.user({ id }).comments(),
        rooms: ({ id }) => prisma.user({ id }).rooms(),
        followingCount: ({ id }) => prisma
            .usersConnection({
                where: {
                    followers_some: { id }
                }
            })
            .aggregate()
            .count(),
        followersCount: ({ id }) => prisma
            .usersConnection({
                where: {
                    following_none: { id }
                }
            })
            .aggregate()
            .count()
    }
}