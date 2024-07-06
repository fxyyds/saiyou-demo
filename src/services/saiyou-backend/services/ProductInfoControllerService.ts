/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_ProductInfo_ } from '../models/BaseResponse_Page_ProductInfo_';
import type { BaseResponse_ProductInfo_ } from '../models/BaseResponse_ProductInfo_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { IdRequest } from '../models/IdRequest';
import type { ProductInfoAddRequest } from '../models/ProductInfoAddRequest';
import type { ProductInfoQueryRequest } from '../models/ProductInfoQueryRequest';
import type { ProductInfoUpdateRequest } from '../models/ProductInfoUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductInfoControllerService {
    /**
     * addProductInfo
     * @param productInfoAddRequest productInfoAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addProductInfoUsingPost(
        productInfoAddRequest: ProductInfoAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/add',
            body: productInfoAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteProductInfo
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteProductInfoUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getProductInfoById
     * @param id id
     * @returns BaseResponse_ProductInfo_ OK
     * @throws ApiError
     */
    public static getProductInfoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_ProductInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/productInfo/get',
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
     * listProductInfoBySearchTextPage
     * @param current
     * @param pageSize
     * @param searchText
     * @param sortField
     * @param sortOrder
     * @returns BaseResponse_Page_ProductInfo_ OK
     * @throws ApiError
     */
    public static listProductInfoBySearchTextPageUsingGet(
        current?: number,
        pageSize?: number,
        searchText?: string,
        sortField?: string,
        sortOrder?: string,
    ): CancelablePromise<BaseResponse_Page_ProductInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/productInfo/get/searchText',
            query: {
                'current': current,
                'pageSize': pageSize,
                'searchText': searchText,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listProductInfo
     * @param productInfoQueryRequest productInfoQueryRequest
     * @returns BaseResponse_Page_ProductInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listProductInfoUsingPost(
        productInfoQueryRequest: ProductInfoQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ProductInfo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/list',
            body: productInfoQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listProductInfoByPage
     * @param productInfoQueryRequest productInfoQueryRequest
     * @returns BaseResponse_Page_ProductInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listProductInfoByPageUsingPost(
        productInfoQueryRequest: ProductInfoQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ProductInfo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/list/page',
            body: productInfoQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * offlineProductInfo
     * @param idRequest idRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static offlineProductInfoUsingPost(
        idRequest: IdRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/offline',
            body: idRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * onlineProductInfo
     * @param idRequest idRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static onlineProductInfoUsingPost(
        idRequest: IdRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/online',
            body: idRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateProductInfo
     * @param productInfoUpdateRequest productInfoUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateProductInfoUsingPost(
        productInfoUpdateRequest: ProductInfoUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/productInfo/update',
            body: productInfoUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
