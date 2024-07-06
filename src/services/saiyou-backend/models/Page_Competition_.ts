/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Competition } from './Competition';
import type { OrderItem } from './OrderItem';
export type Page_Competition_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<Competition>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

