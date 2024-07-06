/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserVO } from './UserVO';
export type TeamVO = {
    announce?: string;
    competeId?: number;
    createTime?: string;
    currentCompetitionId?: number;
    id?: number;
    maxNum?: number;
    tagList?: Array<string>;
    teamAvatarUrl?: string;
    teamCaptain?: UserVO;
    teamLeader?: UserVO;
    teamName?: string;
    teamStatus?: number;
    teamUserList?: Array<UserVO>;
    wantToTagList?: Array<string>;
};

