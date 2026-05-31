import {ViteSSG} from 'vite-ssg';
import {createPinia} from 'pinia';
import {useHead} from '@unhead/vue';
import App from 'components/App.vue';
import {routes} from 'router/routes';
import {useGestureStore} from 'stores/gesture/gesture';
import 'sass/base/_bootstrap.scss';

export const createApp = ViteSSG(
    App,
    {
        routes,
        scrollBehavior(to, _from, savedPosition) {
            if (savedPosition) return savedPosition;
            if (to.hash) return {el: to.hash, behavior: 'smooth', top: 80};
            return {top: 0};
        },
    },
    async ({app}) => {
        const pinia = createPinia();
        app.use(pinia);

        // gestures 是 static、import 自 data/gestures.js
        // SSR 跟 client 從同一份 source 載入，hydration 不會 mismatch
        const gestureStore = useGestureStore(pinia);
        await gestureStore.requestGetGestureList();

        // 全站 head：固定 lang，避免 @unhead 預設覆蓋成 en
        app.runWithContext(() => {
            useHead({htmlAttrs: {lang: 'zh-Hant'}});
        });
    },
);
