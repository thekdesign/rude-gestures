<template>
    <RouterLink
        :to="{name: 'GESTURE_DETAIL', params: {gestureId: gesture.id}}"
        class="group relative flex flex-col overflow-hidden border border-paper-400 bg-[#FBF6E8] transition-all duration-150 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(64,49,33,0.16)] shadow-[0_1px_4px_rgba(64,49,33,0.06)]"
        :style="{'--accent': accent}"
    >
        <!-- 科別色帶 -->
        <span class="h-[3px] w-full" :style="{background: 'var(--accent)'}" />

        <!-- 標本牌頭：編號 + 冒犯指數 -->
        <div class="flex items-center justify-between px-3.5 pt-2.5">
            <span class="font-mono text-[0.62rem] tracking-[0.16em] text-gray-500">
                No.{{ gesture.number }}
            </span>
            <SeverityMeter :value="gesture.severity" size="sm" :show-label="false" />
        </div>

        <!-- 手勢標本展示 -->
        <div class="relative flex h-[148px] items-center justify-center overflow-hidden">
            <div class="pointer-events-none absolute inset-0 opacity-[0.28]" :style="gridStyle" />
            <GestureHand :pose="gesture.pose"
                         :anim="gesture.anim"
                         :accent="accent"
                         :size="122"
                         :title="gesture.name" />
        </div>

        <!-- 標籤說明 -->
        <div class="flex flex-1 flex-col border-t border-dashed border-paper-300 px-4 pb-3.5 pt-3">
            <h3 class="m-0 font-serif text-[1.08rem] font-bold leading-snug text-primary-800">
                {{ gesture.name }}
            </h3>
            <p class="m-0 mt-0.5 font-mono text-[0.65rem] tracking-[0.03em] italic text-gray-500">
                {{ gesture.nameEn }}
            </p>

            <div class="mt-2.5 flex items-center gap-1.5 text-[0.72rem] text-gray-600">
                <span class="shrink-0 leading-none tracking-[0.08em]">{{ flagRow }}</span>
                <span class="truncate">{{ nameRow }}</span>
            </div>
        </div>
    </RouterLink>
</template>

<script>
import {familyMap} from 'maps/common/Family';
import GestureHand from 'components/common/GestureHand.vue';
import SeverityMeter from 'components/common/SeverityMeter.vue';

export default {
    name: 'GestureCard',
    components: {GestureHand, SeverityMeter},
    props: {
        gesture: {type: Object, required: true},
    },
    computed: {
        familyInfo() {
            return familyMap.get(this.gesture.familyKey) || {};
        },
        accent() {
            return this.familyInfo.accent || '#3F3026';
        },
        flagRow() {
            return (this.gesture.regions || []).map((r) => r.flag).join(' ');
        },
        nameRow() {
            return (this.gesture.regions || []).map((r) => r.name).join('、');
        },
        gridStyle() {
            return {
                backgroundImage:
                    'linear-gradient(#C9B894 1px, transparent 1px), linear-gradient(90deg, #C9B894 1px, transparent 1px)',
                backgroundSize: '15px 15px',
            };
        },
    },
};
</script>
