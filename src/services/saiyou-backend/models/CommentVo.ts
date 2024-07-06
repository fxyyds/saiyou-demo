/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Reply } from './Reply';
import type { UserVO } from './UserVO';
export type CommentVo = {
    address?: string;
    content?: string;
    contentImg?: string;
    createTime?: string;
    id?: number;
    likes?: number;
    parentId?: number;
    postId?: number;
    reply?: Reply;
    status?: number;
    updateTime?: string;
    user?: UserVO;
};

