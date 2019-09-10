export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment {
        text
        user {
            username
        }
    }
`;