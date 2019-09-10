import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: (_, args) => {
            const { username, email, firstName = '', lastName = '', bio = '' } = args;

            return prisma.createUser({
                username,
                email,
                firstName,
                lastName,bio
            });
        }
    }
}