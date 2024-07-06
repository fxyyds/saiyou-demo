/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_FriendApplyVo_ } from '../models/BaseResponse_Page_FriendApplyVo_';
import type { FriendApplyRequest } from '../models/FriendApplyRequest';
import type { PageRequest } from '../models/PageRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FriendsApplyControllerService {
    /**
     * agreedFriend
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static agreedFriendUsingPost(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/friendsApply/agreed',
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
     * applyFriend
     * @param friendApplyRequest friendApplyRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static applyFriendUsingPost(
        friendApplyRequest: FriendApplyRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/friendsApply/apply',
            body: friendApplyRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * myApplyRecord
     * @param pageRequest pageRequest
     * @returns BaseResponse_Page_FriendApplyVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static myApplyRecordUsingPost(
        pageRequest: PageRequest,
    ): CancelablePromise<BaseResponse_Page_FriendApplyVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/friendsApply/list/vo/my/apply',
            body: pageRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * myReceivingRecord
     * @param pageRequest pageRequest
     * @returns BaseResponse_Page_FriendApplyVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static myReceivingRecordUsingPost(
        pageRequest: PageRequest,
    ): CancelablePromise<BaseResponse_Page_FriendApplyVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/friendsApply/list/vo/my/receiving',
            body: pageRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * notReadCount
     * @returns BaseResponse_long_ OK
     * @throws ApiError
     */
    public static notReadCountUsingGet(): CancelablePromise<BaseResponse_long_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/friendsApply/notRead/count',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * read
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static readUsingPost(): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/friendsApply/read',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * refusedFriend
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static refusedFriendUsingPost(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/friendsApply/refused',
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
     * revokeFriend
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static revokeFriendUsingPost(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/friendsApply/revoke',
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
