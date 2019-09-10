import { generateSecret, sendSecretMail } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        requestSecret: async (_, args) => {
            const { email } = args;
            const loginSecret = generateSecret();

            throw Error();

            await sendSecretMail(email, loginSecret);

            return await prisma.updateUser({
                    data: { loginSecret },
                    where: { email }
                })
                .then(() => true)
                .catch(() => false);
        }
    }
}