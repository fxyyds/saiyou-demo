/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompeteVo } from './CompeteVo';
import type { OrderItem } from './OrderItem';
export type Page_CompeteVo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<CompeteVo>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

