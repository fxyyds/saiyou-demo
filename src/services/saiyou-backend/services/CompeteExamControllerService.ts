/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_CompeteExamVO_ } from '../models/BaseResponse_CompeteExamVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_CompeteExam_ } from '../models/BaseResponse_Page_CompeteExam_';
import type { BaseResponse_Page_CompeteExamVO_ } from '../models/BaseResponse_Page_CompeteExamVO_';
import type { BaseResponse_UserPaper_ } from '../models/BaseResponse_UserPaper_';
import type { BaseResponse_UserPaperVo_ } from '../models/BaseResponse_UserPaperVo_';
import type { CompeteExamAddRequest } from '../models/CompeteExamAddRequest';
import type { CompeteExamQueryRequest } from '../models/CompeteExamQueryRequest';
import type { CompeteExamUpdateRequest } from '../models/CompeteExamUpdateRequest';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { StartTheExamRequest } from '../models/StartTheExamRequest';
import type { UserPaperAnswerRequest } from '../models/UserPaperAnswerRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompeteExamControllerService {
    /**
     * addCompeteExam
     * @param competeExamAddRequest competeExamAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addCompeteExamUsingPost(
        competeExamAddRequest: CompeteExamAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competeExam/add',
            body: competeExamAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteCompeteExam
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteCompeteExamUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competeExam/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * finishExam
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static finishExamUsingPost(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competeExam/finish',
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
     * getCompeteExamVOById
     * @param id id
     * @returns BaseResponse_CompeteExamVO_ OK
     * @throws ApiError
     */
    public static getCompeteExamVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_CompeteExamVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/competeExam/get/vo',
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
     * listCompeteExamByPage
     * @param competeExamQueryRequest competeExamQueryRequest
     * @returns BaseResponse_Page_CompeteExam_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCompeteExamByPageUsingPost(
        competeExamQueryRequest: CompeteExamQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CompeteExam_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competeExam/list/page',
            body: competeExamQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listCompeteExamVOByPage
     * @param competeExamQueryRequest competeExamQueryRequest
     * @returns BaseResponse_Page_CompeteExamVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCompeteExamVoByPageUsingPost(
        competeExamQueryRequest: CompeteExamQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CompeteExamVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competeExam/list/page/vo',
            body: competeExamQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * openExam
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static openExamUsingPost(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competeExam/open',
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
     * saveAnswer
     * @param userPaperAnswerRequest userPaperAnswerRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static saveAnswerUsingPost(
        userPaperAnswerRequest: UserPaperAnswerRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competeExam/saveAnswer',
            body: userPaperAnswerRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * startTheExam
     * @param startTheExamRequest startTheExamRequest
     * @returns BaseResponse_UserPaper_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static startTheExamUsingPost(
        startTheExamRequest: StartTheExamRequest,
    ): CancelablePromise<BaseResponse_UserPaper_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competeExam/startTheExam',
            body: startTheExamRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * submitPaper
     * @param userPaperAnswerRequest userPaperAnswerRequest
     * @returns BaseResponse_UserPaperVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static submitPaperUsingPost(
        userPaperAnswerRequest: UserPaperAnswerRequest,
    ): CancelablePromise<BaseResponse_UserPaperVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competeExam/submitPaper',
            body: userPaperAnswerRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateCompeteExam
     * @param competeExamUpdateRequest competeExamUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateCompeteExamUsingPost(
        competeExamUpdateRequest: CompeteExamUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competeExam/update',
            body: competeExamUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
