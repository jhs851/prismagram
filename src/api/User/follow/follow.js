import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        follow: async(_, args, { request }) => {
            isAuthenticated(request);

            const { id } = args;
            const { user } = request;

            return await prisma
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