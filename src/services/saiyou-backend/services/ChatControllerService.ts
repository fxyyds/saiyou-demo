/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_List_MessageVo_ } from '../models/BaseResponse_List_MessageVo_';
import type { ChatRequest } from '../models/ChatRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatControllerService {
    /**
     * getHallChat
     * @returns BaseResponse_List_MessageVo_ OK
     * @throws ApiError
     */
    public static getHallChatUsingGet(): CancelablePromise<BaseResponse_List_MessageVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/hallChat',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getPrivateChat
     * @param chatRequest chatRequest
     * @returns BaseResponse_List_MessageVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getPrivateChatUsingPost(
        chatRequest: ChatRequest,
    ): CancelablePromise<BaseResponse_List_MessageVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/privateChat',
            body: chatRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getTeamChat
     * @param chatRequest chatRequest
     * @returns BaseResponse_List_MessageVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getTeamChatUsingPost(
        chatRequest: ChatRequest,
    ): CancelablePromise<BaseResponse_List_MessageVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/teamChat',
            body: chatRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
