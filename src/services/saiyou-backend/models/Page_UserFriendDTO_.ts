/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from './OrderItem';
import type { UserFriendDTO } from './UserFriendDTO';
export type Page_UserFriendDTO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<UserFriendDTO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

