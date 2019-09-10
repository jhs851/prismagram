import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        unfollow: async(_, args, { request }) => {
            isAuthenticated(request);

            const { id } = args;
            const { user } = request;

            return await prisma
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