/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_Page_CompetitionVO_ } from '../models/BaseResponse_Page_CompetitionVO_';
import type { JoinCompeteRequest } from '../models/JoinCompeteRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class JoinCompeteControllerService {
    /**
     * joinCompete
     * @param joinCompeteRequest joinCompeteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static joinCompeteUsingPost(
        joinCompeteRequest: JoinCompeteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/join_compete/join',
            body: joinCompeteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyJoinCompeteByPage
     * @returns BaseResponse_Page_CompetitionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyJoinCompeteByPageUsingPost(): CancelablePromise<BaseResponse_Page_CompetitionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/join_compete/my/list/page',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * quitCompete
     * @param joinCompeteRequest joinCompeteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static quitCompeteUsingPost(
        joinCompeteRequest: JoinCompeteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/join_compete/quit',
            body: joinCompeteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
