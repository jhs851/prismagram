import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        unfollow: (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);

            const { id } = args;
            const { user } = request;

            return prisma
                .updateUser({
                    where: { id: user.id },
                    data: {
                        following: {
                            disconnect: { id }
                        }
                    }
                })
                .then(() => true)
                .catch(() => false);
        }
    }
}