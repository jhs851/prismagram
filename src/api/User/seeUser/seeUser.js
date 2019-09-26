import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeUser: async (_, args) => prisma.user({ id: args.id })
    }
}