/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompeteExam } from './CompeteExam';
import type { OrderItem } from './OrderItem';
export type Page_CompeteExam_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<CompeteExam>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

