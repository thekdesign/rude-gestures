import {defineStore} from 'pinia';
import * as gestureApi from 'apis/gesture/gesture';

export const useGestureStore = defineStore('gesture', {
    state: () => ({
        list: [],
    }),
    getters: {
        getById: (state) => (id) => state.list.find((g) => g.id === Number(id)),
        listByFamily: (state) => state.list.reduce((acc, g) => {
            (acc[g.familyKey] = acc[g.familyKey] || []).push(g);
            return acc;
        }, {}),
    },
    actions: {
        async requestGetGestureList() {
            this.list = await gestureApi.getGestureList();
        },
    },
});
