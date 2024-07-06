/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentVo } from './CommentVo';
import type { OrderItem } from './OrderItem';
export type Page_CommentVo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<CommentVo>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

