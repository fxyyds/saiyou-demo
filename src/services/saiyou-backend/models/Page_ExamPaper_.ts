/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExamPaper } from './ExamPaper';
import type { OrderItem } from './OrderItem';
export type Page_ExamPaper_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<ExamPaper>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

