import {PageRoute} from 'enums/navigation/PageRoute';
import {EnumMap} from 'libs/EnumMap';

// 主要內容頁（包在 AppContainer 下）
export const pageRouteMap = new EnumMap(PageRoute, {
    GESTURE_DETAIL: {
        path: 'gesture/:gestureId',
        component: () => import('components/pages/gesture/GestureDetail.vue'),
        meta: {title: '手勢標本'},
    },
});

// 錯誤頁
export const errorPageRouteMap = new EnumMap(PageRoute, {
    NOT_FOUND: {
        path: '404',
        component: () => import('components/pages/error/NotFound.vue'),
        meta: {title: '404'},
    },
});
