/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompetitionVO } from './CompetitionVO';
import type { OrderItem } from './OrderItem';
export type Page_CompetitionVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<CompetitionVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

