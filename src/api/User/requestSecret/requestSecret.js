import { generateSecret } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        requestSecret: async (_, args) => {
            const { email } = args;
            const loginSecret = generateSecret();

            console.log(loginSecret);
            return await prisma.updateUser({
                    data: { loginSecret },
                    where: { email }
                })
                .then(() => true)
                .catch(() => false);
        }
    }
}