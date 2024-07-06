/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionAnswerVO } from './QuestionAnswerVO';
import type { UserVO } from './UserVO';
export type QuestionVO = {
    content?: string;
    createTime?: string;
    id?: number;
    questionAnswerList?: Array<QuestionAnswerVO>;
    score?: number;
    type?: number;
    user?: UserVO;
};

