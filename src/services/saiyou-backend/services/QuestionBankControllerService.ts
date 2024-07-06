/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_QuestionBank_ } from '../models/BaseResponse_Page_QuestionBank_';
import type { BaseResponse_Page_QuestionBankVo_ } from '../models/BaseResponse_Page_QuestionBankVo_';
import type { BaseResponse_QuestionBankVo_ } from '../models/BaseResponse_QuestionBankVo_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { QuestionBankAddRequest } from '../models/QuestionBankAddRequest';
import type { QuestionBankQueryRequest } from '../models/QuestionBankQueryRequest';
import type { QuestionBankQuestionQueryRequest } from '../models/QuestionBankQuestionQueryRequest';
import type { QuestionBankUpdateRequest } from '../models/QuestionBankUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionBankControllerService {
    /**
     * addQuestionBank
     * @param questionBankAddRequest questionBankAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addQuestionBankUsingPost(
        questionBankAddRequest: QuestionBankAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_bank/add',
            body: questionBankAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteQuestionBank
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteQuestionBankUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_bank/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionBankAndQuestionById
     * @param questionBankQueryRequest questionBankQueryRequest
     * @returns BaseResponse_QuestionBankVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionBankAndQuestionByIdUsingPost(
        questionBankQueryRequest: QuestionBankQuestionQueryRequest,
    ): CancelablePromise<BaseResponse_QuestionBankVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_bank/get/list/page',
            body: questionBankQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionBankVOById
     * @param id id
     * @returns BaseResponse_QuestionBankVo_ OK
     * @throws ApiError
     */
    public static getQuestionBankVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_QuestionBankVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question_bank/get/vo',
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
     * listQuestionBank
     * @param questionBankQueryRequest questionBankQueryRequest
     * @returns BaseResponse_Page_QuestionBank_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionBankUsingPost(
        questionBankQueryRequest: QuestionBankQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionBank_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_bank/list/page/question_bank',
            body: questionBankQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionBankVOByPage
     * @param questionBankQueryRequest questionBankQueryRequest
     * @returns BaseResponse_Page_QuestionBankVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionBankVoByPageUsingPost(
        questionBankQueryRequest: QuestionBankQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionBankVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_bank/list/page/vo',
            body: questionBankQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateQuestionBank
     * @param questionBankUpdateRequest questionBankUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionBankUsingPost(
        questionBankUpdateRequest: QuestionBankUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question_bank/update',
            body: questionBankUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
