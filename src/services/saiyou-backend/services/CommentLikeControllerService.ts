/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_List_long_ } from '../models/BaseResponse_List_long_';
import type { CommentLikeAddRequest } from '../models/CommentLikeAddRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CommentLikeControllerService {
    /**
     * doCommentLike
     * @param commentLikeAddRequest commentLikeAddRequest
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doCommentLikeUsingPost(
        commentLikeAddRequest: CommentLikeAddRequest,
    ): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/comment_like/',
            body: commentLikeAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * commentLikeList
     * @param commentLikeAddRequest commentLikeAddRequest
     * @returns BaseResponse_List_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static commentLikeListUsingPost(
        commentLikeAddRequest: CommentLikeAddRequest,
    ): CancelablePromise<BaseResponse_List_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/comment_like/list',
            body: commentLikeAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
