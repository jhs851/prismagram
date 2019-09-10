import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async (_, args, { request }) => {
            isAuthenticated(request);

            const { postId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                    {
                        user: { id: user.id }
                    },
                    {
                        post: { id: postId }
                    }
                ]
            };

            return await prisma.$exists
                .like(filterOptions)
                .then(async (existingLike) => {
                    if (existingLike) {
                        await prisma.deleteManyLikes(filterOptions);
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