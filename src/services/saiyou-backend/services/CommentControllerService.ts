/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_Page_Comment_ } from '../models/BaseResponse_Page_Comment_';
import type { BaseResponse_Page_CommentVo_ } from '../models/BaseResponse_Page_CommentVo_';
import type { CommentAddRequest } from '../models/CommentAddRequest';
import type { CommentQueryRequest } from '../models/CommentQueryRequest';
import type { CompeteQueryRequest } from '../models/CompeteQueryRequest';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { IdRequest } from '../models/IdRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CommentControllerService {
    /**
     * deleteComment
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteCommentUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/comment/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listCommentByPage
     * @param competeQueryRequest competeQueryRequest
     * @returns BaseResponse_Page_Comment_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCommentByPageUsingPost(
        competeQueryRequest: CompeteQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Comment_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/comment/list/page',
            body: competeQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getCommentListPageByPostId
     * @param commentQueryRequest commentQueryRequest
     * @returns BaseResponse_Page_CommentVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getCommentListPageByPostIdUsingPost(
        commentQueryRequest: CommentQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CommentVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/comment/list/page/vo',
            body: commentQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * offlineComment
     * @param idRequest idRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static offlineCommentUsingPost(
        idRequest: IdRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/comment/offline',
            body: idRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * onlineComment
     * @param idRequest idRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static onlineCommentUsingPost(
        idRequest: IdRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/comment/online',
            body: idRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * saveComment
     * @param commentAddRequest commentAddRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static saveCommentUsingPost(
        commentAddRequest: CommentAddRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/comment/sava',
            body: commentAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
