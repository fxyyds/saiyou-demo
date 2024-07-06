// @ts-check
import {acceptHMRUpdate, defineStore} from 'pinia'
import {UserControllerService, UserVO} from "../services/saiyou-backend";
import {generateRandomString} from "../utlis/textUtils";

export const useNotReadStore = defineStore({
    id: 'notRead',
    state: (): { notRead: { count:number } } => ({
        notRead: {count: 0}
    }),
    actions: {}
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useNotReadStore, import.meta.hot))
}
