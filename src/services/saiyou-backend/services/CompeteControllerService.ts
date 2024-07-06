/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_CompeteVo_ } from '../models/BaseResponse_CompeteVo_';
import type { BaseResponse_Page_CompeteVo_ } from '../models/BaseResponse_Page_CompeteVo_';
import type { CompeteQueryRequest } from '../models/CompeteQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompeteControllerService {
    /**
     * listMyCompeteVoPage
     * @returns BaseResponse_Page_CompeteVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyCompeteVoPageUsingPost(): CancelablePromise<BaseResponse_Page_CompeteVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/compete/list/my/page/vo',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listCompeteVoByCompetitionId
     * @param competeQueryRequest competeQueryRequest
     * @returns BaseResponse_Page_CompeteVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCompeteVoByCompetitionIdUsingPost(
        competeQueryRequest: CompeteQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CompeteVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/compete/list/page/vo/competitionId',
            body: competeQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listCompeteVoById
     * @param competeQueryRequest competeQueryRequest
     * @returns BaseResponse_CompeteVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCompeteVoByIdUsingPost(
        competeQueryRequest: CompeteQueryRequest,
    ): CancelablePromise<BaseResponse_CompeteVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/compete/list/page/vo/id',
            body: competeQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listCompeteVoByTeamId
     * @param competeQueryRequest competeQueryRequest
     * @returns BaseResponse_Page_CompeteVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCompeteVoByTeamIdUsingPost(
        competeQueryRequest: CompeteQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CompeteVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/compete/list/page/vo/teamId',
            body: competeQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
