/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_Page_UserFriendDTO_ } from '../models/BaseResponse_Page_UserFriendDTO_';
import type { BaseResponse_UserFriendDTO_ } from '../models/BaseResponse_UserFriendDTO_';
import type { FriendsQueryRequest } from '../models/FriendsQueryRequest';
import type { UpdateFriendRemark } from '../models/UpdateFriendRemark';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FriendsControllerService {
    /**
     * deleteFriend
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteFriendUsingPost(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/friends/delete',
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
     * getUserFriendById
     * @param id id
     * @returns BaseResponse_UserFriendDTO_ OK
     * @throws ApiError
     */
    public static getUserFriendByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_UserFriendDTO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/friends/id',
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
     * listMyFriendsByPage
     * @param friendsQueryRequest friendsQueryRequest
     * @returns BaseResponse_Page_UserFriendDTO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyFriendsByPageUsingPost(
        friendsQueryRequest: FriendsQueryRequest,
    ): CancelablePromise<BaseResponse_Page_UserFriendDTO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/friends/list/vo',
            body: friendsQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateFriendRemark
     * @param updateFriendRemark updateFriendRemark
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateFriendRemarkUsingPost(
        updateFriendRemark: UpdateFriendRemark,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/friends/update/remark',
            body: updateFriendRemark,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
