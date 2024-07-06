/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_ExamPaperVO_ } from '../models/BaseResponse_ExamPaperVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_ExamPaper_ } from '../models/BaseResponse_Page_ExamPaper_';
import type { BaseResponse_UserPaperQuestionVo_ } from '../models/BaseResponse_UserPaperQuestionVo_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { ExamPaperAddRequest } from '../models/ExamPaperAddRequest';
import type { ExamPaperQueryRequest } from '../models/ExamPaperQueryRequest';
import type { ExamPaperUpdateRequest } from '../models/ExamPaperUpdateRequest';
import type { UserPaperQueryRequest } from '../models/UserPaperQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExamPaperControllerService {
    /**
     * addExamPaper
     * @param examPaperAddRequest examPaperAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addExamPaperUsingPost(
        examPaperAddRequest: ExamPaperAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examPaper/add',
            body: examPaperAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteExamPaper
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteExamPaperUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examPaper/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getUserPaperStatus
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static getUserPaperStatusUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/examPaper/get/user/paper/status',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listExamPaperByPage
     * @param examPaperQueryRequest examPaperQueryRequest
     * @returns BaseResponse_Page_ExamPaper_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listExamPaperByPageUsingPost(
        examPaperQueryRequest: ExamPaperQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ExamPaper_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examPaper/list/page',
            body: examPaperQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listExamPaperAndQuestionVOByPage
     * @param examPaperQueryRequest examPaperQueryRequest
     * @returns BaseResponse_ExamPaperVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listExamPaperAndQuestionVoByPageUsingPost(
        examPaperQueryRequest: ExamPaperQueryRequest,
    ): CancelablePromise<BaseResponse_ExamPaperVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examPaper/list/paperAndQuestion/page/vo',
            body: examPaperQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateExamPaper
     * @param examPaperUpdateRequest examPaperUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateExamPaperUsingPost(
        examPaperUpdateRequest: ExamPaperUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examPaper/update',
            body: examPaperUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listUserPaperVOByPage
     * @param userPaperQueryRequest userPaperQueryRequest
     * @returns BaseResponse_UserPaperQuestionVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUserPaperVoByPageUsingPost(
        userPaperQueryRequest: UserPaperQueryRequest,
    ): CancelablePromise<BaseResponse_UserPaperQuestionVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examPaper/user/paper/vo',
            body: userPaperQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listUserPaperVOById
     * @param id id
     * @returns BaseResponse_UserPaperQuestionVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUserPaperVoByIdUsingPost(
        id?: number,
    ): CancelablePromise<BaseResponse_UserPaperQuestionVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/examPaper/user/paper/vo/byId',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
