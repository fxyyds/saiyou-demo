/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_Team_ } from '../models/BaseResponse_Page_Team_';
import type { BaseResponse_Page_TeamVO_ } from '../models/BaseResponse_Page_TeamVO_';
import type { BaseResponse_TeamVO_ } from '../models/BaseResponse_TeamVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { TeamAddRequest } from '../models/TeamAddRequest';
import type { TeamEditRequest } from '../models/TeamEditRequest';
import type { TeamJoinRequest } from '../models/TeamJoinRequest';
import type { TeamKickOutRequest } from '../models/TeamKickOutRequest';
import type { TeamQueryRequest } from '../models/TeamQueryRequest';
import type { TeamTransferOfIdentityRequest } from '../models/TeamTransferOfIdentityRequest';
import type { TeamUpdateRequest } from '../models/TeamUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TeamControllerService {
    /**
     * addTeam
     * @param teamAddRequest teamAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addTeamUsingPost(
        teamAddRequest: TeamAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/add',
            body: teamAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteTeam
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteTeamUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * editTeam
     * @param teamEditRequest teamEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editTeamUsingPost(
        teamEditRequest: TeamEditRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/edit',
            body: teamEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getTeamVOById
     * @param id id
     * @returns BaseResponse_TeamVO_ OK
     * @throws ApiError
     */
    public static getTeamVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_TeamVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team/get/vo',
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
     * joinTeam
     * @param joinTeam joinTeam
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static joinTeamUsingPost(
        joinTeam: TeamJoinRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/join',
            body: joinTeam,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * kickOutTeam
     * @param teamKickOutRequest teamKickOutRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static kickOutTeamUsingPost(
        teamKickOutRequest: TeamKickOutRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/kickOutTeam',
            body: teamKickOutRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listTeamByPage
     * @param teamQueryRequest teamQueryRequest
     * @returns BaseResponse_Page_Team_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listTeamByPageUsingPost(
        teamQueryRequest: TeamQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Team_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/list/page',
            body: teamQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listTeamVOByPage
     * @param teamQueryRequest teamQueryRequest
     * @returns BaseResponse_Page_TeamVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listTeamVoByPageUsingPost(
        teamQueryRequest: TeamQueryRequest,
    ): CancelablePromise<BaseResponse_Page_TeamVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/list/page/vo',
            body: teamQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyTeamVOByPage
     * @param teamQueryRequest teamQueryRequest
     * @returns BaseResponse_Page_TeamVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyTeamVoByPageUsingPost(
        teamQueryRequest: TeamQueryRequest,
    ): CancelablePromise<BaseResponse_Page_TeamVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/my/list/page/vo',
            body: teamQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * quitTeam
     * @param teamId teamId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static quitTeamUsingPost(
        teamId?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/quit',
            query: {
                'teamId': teamId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * teamCancelCaptain
     * @param teamTransferOfIdentityRequest teamTransferOfIdentityRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static teamCancelCaptainUsingPost(
        teamTransferOfIdentityRequest: TeamTransferOfIdentityRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/teamCancelCaptain',
            body: teamTransferOfIdentityRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * teamTransferOfIdentity
     * @param teamTransferOfIdentityRequest teamTransferOfIdentityRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static teamTransferOfIdentityUsingPost(
        teamTransferOfIdentityRequest: TeamTransferOfIdentityRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/teamTransferOfIdentity',
            body: teamTransferOfIdentityRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateTeam
     * @param teamUpdateRequest teamUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateTeamUsingPost(
        teamUpdateRequest: TeamUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/update',
            body: teamUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
