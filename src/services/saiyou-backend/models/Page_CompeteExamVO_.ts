/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompeteExamVO } from './CompeteExamVO';
import type { OrderItem } from './OrderItem';
export type Page_CompeteExamVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<CompeteExamVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

