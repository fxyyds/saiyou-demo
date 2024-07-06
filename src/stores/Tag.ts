// @ts-check
import {acceptHMRUpdate, defineStore} from 'pinia'

export const useTagStore = defineStore({
    id: 'tag',
    state: (): { tag: { tagList: [] } } => ({
        tag: {tagList: []}
    }),
    actions: {}
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTagStore, import.meta.hot))
}
