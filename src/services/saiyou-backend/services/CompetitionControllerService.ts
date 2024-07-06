/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_CompetitionVO_ } from '../models/BaseResponse_CompetitionVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_Competition_ } from '../models/BaseResponse_Page_Competition_';
import type { BaseResponse_Page_CompetitionVO_ } from '../models/BaseResponse_Page_CompetitionVO_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { CompetitionAddRequest } from '../models/CompetitionAddRequest';
import type { CompetitionEditRequest } from '../models/CompetitionEditRequest';
import type { CompetitionQueryRequest } from '../models/CompetitionQueryRequest';
import type { CompetitionUpdateRequest } from '../models/CompetitionUpdateRequest';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompetitionControllerService {
    /**
     * addCompetition
     * @param competitionAddRequest competitionAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addCompetitionUsingPost(
        competitionAddRequest: CompetitionAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/add',
            body: competitionAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * cancelCompetition
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static cancelCompetitionUsingPost(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/cancel',
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
     * deleteCompetition
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteCompetitionUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * editCompetition
     * @param competitionEditRequest competitionEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editCompetitionUsingPost(
        competitionEditRequest: CompetitionEditRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/edit',
            body: competitionEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * finishCompetition
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static finishCompetitionUsingPost(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/end',
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
     * getCompetitionVOById
     * @param id id
     * @returns BaseResponse_CompetitionVO_ OK
     * @throws ApiError
     */
    public static getCompetitionVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_CompetitionVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/competition/get/vo',
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
     * listCompetitionByPage
     * @param competitionQueryRequest competitionQueryRequest
     * @returns BaseResponse_Page_Competition_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCompetitionByPageUsingPost(
        competitionQueryRequest: CompetitionQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Competition_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/list/page',
            body: competitionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listCompetitionVOByPage
     * @param competitionQueryRequest competitionQueryRequest
     * @returns BaseResponse_Page_CompetitionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listCompetitionVoByPageUsingPost(
        competitionQueryRequest: CompetitionQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CompetitionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/list/page/vo',
            body: competitionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * message
     * @returns BaseResponse_string_ OK
     * @throws ApiError
     */
    public static messageUsingGet(): CancelablePromise<BaseResponse_string_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/competition/message',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyCompetitionVOByPage
     * @param competitionQueryRequest competitionQueryRequest
     * @returns BaseResponse_Page_CompetitionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyCompetitionVoByPageUsingPost(
        competitionQueryRequest: CompetitionQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CompetitionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/my/list/page/vo',
            body: competitionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * runningCompetition
     * @param id id
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static runningCompetitionUsingPost(
        id?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/running',
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
     * updateCompetition
     * @param competitionUpdateRequest competitionUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateCompetitionUsingPost(
        competitionUpdateRequest: CompetitionUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/competition/update',
            body: competitionUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
