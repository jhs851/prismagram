import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async (_, args, { request }) => {
            isAuthenticated(request);

            const { postId } = args;
            const { user } = request;

            return await prisma.$exists
                .like({
                    AND: [
                        {
                            user: { id: user.id }
                        },
                        {
                            post: { id: postId }
                        }
                    ]
                })
                .then(async (existingLike) => {
                    if (existingLike) {
                        // TODO
                    } else {
                        await prisma.createLike({
                            user: {
                                connect: { id: user.id }
                            },
                            post: {
                                connect: { id: postId }
                            }
                        })
                    }

                    return true;
                })
                .catch(() => false);
        }
    }
}