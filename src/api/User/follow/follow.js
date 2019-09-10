import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        follow: (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);

            const { id } = args;
            const { user } = request;

            return prisma
                .updateUser({
                    where: { id: user.id },
                    data: {
                        following: {
                            connect: {
                                id
                            }
                        }
                    }
                })
                .then(() => true)
                .catch(() => false);
        }
    }
}