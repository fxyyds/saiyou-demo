/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_Tag_ } from '../models/BaseResponse_List_Tag_';
import type { BaseResponse_Page_Tag_ } from '../models/BaseResponse_Page_Tag_';
import type { Tag } from '../models/Tag';
import type { TagAddRequest } from '../models/TagAddRequest';
import type { TagQueryRequest } from '../models/TagQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TagControllerService {
    /**
     * addTag
     * @param tagAddRequest tagAddRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addTagUsingPost(
        tagAddRequest: TagAddRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tag/add',
            body: tagAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteTag
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static deleteTagUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tag/delete',
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
     * listTag
     * @param tagQueryRequest tagQueryRequest
     * @returns BaseResponse_Page_Tag_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listTagUsingPost(
        tagQueryRequest: TagQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Tag_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tag/list',
            body: tagQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listVoTag
     * @returns BaseResponse_List_Tag_ OK
     * @throws ApiError
     */
    public static listVoTagUsingGet(): CancelablePromise<BaseResponse_List_Tag_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tag/list/vo',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * offlineTag
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static offlineTagUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tag/offline',
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
     * onlineTag
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static onlineTagUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tag/online',
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
     * updateTag
     * @param tag tag
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateTagUsingPost(
        tag: Tag,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tag/update',
            body: tag,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
