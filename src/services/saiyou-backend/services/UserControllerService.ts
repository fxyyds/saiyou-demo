/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_LoginUserVO_ } from '../models/BaseResponse_LoginUserVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_User_ } from '../models/BaseResponse_Page_User_';
import type { BaseResponse_Page_UserVO_ } from '../models/BaseResponse_Page_UserVO_';
import type { BaseResponse_User_ } from '../models/BaseResponse_User_';
import type { BaseResponse_UserVO_ } from '../models/BaseResponse_UserVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { IdRequest } from '../models/IdRequest';
import type { UserAddRequest } from '../models/UserAddRequest';
import type { UserBindEmailRequest } from '../models/UserBindEmailRequest';
import type { UserEmailLoginRequest } from '../models/UserEmailLoginRequest';
import type { UserEmailRegisterRequest } from '../models/UserEmailRegisterRequest';
import type { UserLoginRequest } from '../models/UserLoginRequest';
import type { UserPasswordUpdateRequest } from '../models/UserPasswordUpdateRequest';
import type { UserQueryRequest } from '../models/UserQueryRequest';
import type { UserRegisterRequest } from '../models/UserRegisterRequest';
import type { UserUnBindEmailRequest } from '../models/UserUnBindEmailRequest';
import type { UserUpdateMyRequest } from '../models/UserUpdateMyRequest';
import type { UserUpdateRequest } from '../models/UserUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserControllerService {
    /**
     * addUser
     * @param userAddRequest userAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUserUsingPost(
        userAddRequest: UserAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/add',
            body: userAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * banUser
     * @param idRequest idRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static banUserUsingPost(
        idRequest: IdRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/ban',
            body: idRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * userBindEmail
     * @param userBindEmailRequest userBindEmailRequest
     * @returns BaseResponse_LoginUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userBindEmailUsingPost(
        userBindEmailRequest: UserBindEmailRequest,
    ): CancelablePromise<BaseResponse_LoginUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/bind/login',
            body: userBindEmailRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteUser
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteUserUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * userEmailLogin
     * @param userEmailLoginRequest userEmailLoginRequest
     * @returns BaseResponse_LoginUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userEmailLoginUsingPost(
        userEmailLoginRequest: UserEmailLoginRequest,
    ): CancelablePromise<BaseResponse_LoginUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/email/login',
            body: userEmailLoginRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * userEmailRegister
     * @param userEmailRegisterRequest userEmailRegisterRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userEmailRegisterUsingPost(
        userEmailRegisterRequest: UserEmailRegisterRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/email/register',
            body: userEmailRegisterRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getUserById
     * @param id id
     * @returns BaseResponse_User_ OK
     * @throws ApiError
     */
    public static getUserByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_User_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get',
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
     * getUserByInvitationCode
     * @param invitationCode invitationCode
     * @returns BaseResponse_UserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getUserByInvitationCodeUsingPost(
        invitationCode?: string,
    ): CancelablePromise<BaseResponse_UserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/get/invitationCode',
            query: {
                'invitationCode': invitationCode,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getLoginUser
     * @returns BaseResponse_UserVO_ OK
     * @throws ApiError
     */
    public static getLoginUserUsingGet(): CancelablePromise<BaseResponse_UserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get/login',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getUserVOById
     * @param id id
     * @returns BaseResponse_UserVO_ OK
     * @throws ApiError
     */
    public static getUserVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_UserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get/vo',
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
     * getCaptcha
     * @param emailAccount emailAccount
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static getCaptchaUsingGet(
        emailAccount?: string,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/getCaptcha',
            query: {
                'emailAccount': emailAccount,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listUserByPage
     * @param userQueryRequest userQueryRequest
     * @returns BaseResponse_Page_User_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUserByPageUsingPost(
        userQueryRequest: UserQueryRequest,
    ): CancelablePromise<BaseResponse_Page_User_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/list/page',
            body: userQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listUserVOByPage
     * @param userQueryRequest userQueryRequest
     * @returns BaseResponse_Page_UserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUserVoByPageUsingPost(
        userQueryRequest: UserQueryRequest,
    ): CancelablePromise<BaseResponse_Page_UserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/list/page/vo',
            body: userQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * userLogin
     * @param userLoginRequest userLoginRequest
     * @returns BaseResponse_LoginUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userLoginUsingPost(
        userLoginRequest: UserLoginRequest,
    ): CancelablePromise<BaseResponse_LoginUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login',
            body: userLoginRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * userLogout
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userLogoutUsingPost(): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/logout',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * normalUser
     * @param idRequest idRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static normalUserUsingPost(
        idRequest: IdRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/normal',
            body: idRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * userRegister
     * @param userRegisterRequest userRegisterRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userRegisterUsingPost(
        userRegisterRequest: UserRegisterRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/register',
            body: userRegisterRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * userUnBindEmail
     * @param userUnBindEmailRequest userUnBindEmailRequest
     * @returns BaseResponse_LoginUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userUnBindEmailUsingPost(
        userUnBindEmailRequest: UserUnBindEmailRequest,
    ): CancelablePromise<BaseResponse_LoginUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/unbindEmail',
            body: userUnBindEmailRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateUser
     * @param userUpdateRequest userUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserUsingPost(
        userUpdateRequest: UserUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/update',
            body: userUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateMyUser
     * @param userUpdateMyRequest userUpdateMyRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateMyUserUsingPost(
        userUpdateMyRequest: UserUpdateMyRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/update/my',
            body: userUpdateMyRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateUserPassword
     * @param userPasswordUpdateRequest userPasswordUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserPasswordUsingPost(
        userPasswordUpdateRequest: UserPasswordUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/update/password',
            body: userPasswordUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
