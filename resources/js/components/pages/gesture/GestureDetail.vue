<template>
    <div v-if="gesture">
        <button
            type="button"
            class="mb-5 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-gray-600 transition-colors hover:text-primary-700"
            @click="goBack"
        >
            ← BACK · 返回圖鑑
        </button>

        <!-- 標本卡 -->
        <header class="mb-8 overflow-hidden border border-paper-400 bg-[#FBF6E8] shadow-[0_2px_10px_rgba(64,49,33,0.08)]">
            <span class="block h-[3px] w-full" :style="{background: accent}" />
            <div class="flex items-center justify-between border-b border-dashed border-paper-300 px-4 py-1.5 font-mono text-[0.62rem] tracking-[0.16em] text-gray-500">
                <span>標本 {{ docNumber }}</span>
                <span class="italic">{{ familyInfo.latin }}</span>
            </div>

            <div class="grid gap-0 sm:grid-cols-[240px_1fr]">
                <!-- 標本展示 -->
                <div class="relative flex h-[240px] items-center justify-center border-b border-dashed border-paper-300 sm:border-b-0 sm:border-r">
                    <div class="pointer-events-none absolute inset-0 opacity-[0.3]" :style="gridStyle" />
                    <GestureHand :pose="gesture.pose"
                                 :anim="gesture.anim"
                                 :accent="accent"
                                 :size="186"
                                 :title="gesture.name" />
                    <span class="absolute bottom-2.5 right-3 font-mono text-[0.6rem] tracking-[0.12em] text-gray-400">No.{{ gesture.number }}</span>
                </div>

                <!-- 標題 + 後設 -->
                <div class="px-5 py-5 sm:px-7">
                    <div class="mb-1.5 flex items-center gap-2">
                        <span class="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gray-500">
                            {{ familyInfo.emoji }} {{ familyInfo.label }} · {{ familyInfo.abbrev }}
                        </span>
                    </div>
                    <h1 class="m-0 mb-1 font-serif text-2xl font-black leading-snug text-primary-800 sm:text-[1.8rem]">
                        {{ gesture.name }}
                    </h1>
                    <p class="m-0 mb-3 font-mono text-[0.74rem] italic tracking-wide text-gray-500">
                        {{ gesture.nameEn }}
                    </p>
                    <p class="m-0 mb-4 text-[0.95rem] italic leading-relaxed text-gray-700">
                        {{ gesture.hook }}
                    </p>

                    <dl class="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2.5 text-[0.78rem]">
                        <dt class="font-mono uppercase tracking-[0.12em] text-gray-500">通行地區</dt>
                        <dd class="flex flex-wrap gap-1.5">
                            <span
                                v-for="(r, i) in gesture.regions"
                                :key="i"
                                class="inline-flex items-center gap-1 rounded-sm border border-paper-300 bg-paper-100 px-1.5 py-0.5 text-[0.74rem] text-gray-700"
                            >
                                <span class="leading-none">{{ r.flag }}</span>
                                <span>{{ r.name }}</span>
                            </span>
                        </dd>

                        <dt class="font-mono uppercase tracking-[0.12em] text-gray-500">冒犯指數</dt>
                        <dd><SeverityMeter :value="gesture.severity" /></dd>
                    </dl>
                </div>
            </div>
        </header>

        <!-- 內文 -->
        <section class="flex flex-col gap-5">
            <div class="border border-paper-300 bg-[#FBF6E8] shadow-[0_2px_8px_rgba(64,49,33,0.05)]">
                <div class="flex items-center gap-2 border-b border-dashed border-paper-300 px-5 py-2">
                    <span class="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gray-500">§ 01</span>
                    <span class="font-serif text-sm font-bold text-gray-700">它在比什麼</span>
                </div>
                <div class="px-5 py-5 text-base leading-loose text-gray-800 sm:px-7">
                    {{ gesture.meaning }}
                </div>
            </div>

            <div class="border border-paper-300 bg-[#FBF6E8] shadow-[0_2px_8px_rgba(64,49,33,0.05)]">
                <div class="flex items-center gap-2 border-b border-dashed border-paper-300 px-5 py-2">
                    <span class="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gray-500">§ 02</span>
                    <span class="font-serif text-sm font-bold text-gray-700">由來考據</span>
                </div>
                <div class="px-5 py-5 sm:px-7">
                    <MarkdownView :source="gesture.origin" />
                </div>
            </div>

            <div class="border border-seal-500 bg-seal-100/50 shadow-[0_2px_10px_rgba(148,67,45,0.08)]">
                <div class="flex items-center gap-2 border-b border-dashed border-seal-300 bg-seal-500 px-5 py-2 text-paper-100">
                    <span class="font-mono text-[0.62rem] uppercase tracking-[0.2em] opacity-85">§ 03</span>
                    <span class="font-serif text-sm font-bold">慘案現場</span>
                    <span class="ml-auto font-mono text-[0.6rem] uppercase tracking-[0.16em] opacity-75">Case File</span>
                </div>
                <div class="px-5 py-5 sm:px-7">
                    <MarkdownView :source="gesture.scene" />
                </div>
            </div>

            <div class="border border-sage-500 bg-sage-100/40 shadow-[0_2px_8px_rgba(84,107,78,0.06)]">
                <div class="flex items-center gap-2 border-b border-dashed border-sage-300 bg-sage-500 px-5 py-2 text-paper-100">
                    <span class="font-mono text-[0.62rem] uppercase tracking-[0.2em] opacity-85">§ 04</span>
                    <span class="font-serif text-sm font-bold">安全替代 / 旅人提醒</span>
                </div>
                <div class="px-5 py-5 sm:px-7">
                    <MarkdownView :source="gesture.safe" />
                </div>
            </div>
        </section>

        <!-- 上一件 / 下一件 -->
        <nav class="mt-8 grid grid-cols-2 gap-3">
            <RouterLink
                v-if="prev"
                :to="{name: 'GESTURE_DETAIL', params: {gestureId: prev.id}}"
                class="group flex items-center gap-3 border border-paper-300 bg-[#FBF6E8] px-4 py-3 transition-colors hover:border-primary-600"
            >
                <span class="font-mono text-lg text-gray-400 group-hover:text-primary-600">←</span>
                <span class="min-w-0">
                    <span class="block font-mono text-[0.58rem] uppercase tracking-[0.16em] text-gray-400">Prev</span>
                    <span class="block truncate text-sm font-medium text-primary-800">{{ prev.name }}</span>
                </span>
            </RouterLink>
            <span v-else />
            <RouterLink
                v-if="next"
                :to="{name: 'GESTURE_DETAIL', params: {gestureId: next.id}}"
                class="group flex items-center justify-end gap-3 border border-paper-300 bg-[#FBF6E8] px-4 py-3 text-right transition-colors hover:border-primary-600"
            >
                <span class="min-w-0">
                    <span class="block font-mono text-[0.58rem] uppercase tracking-[0.16em] text-gray-400">Next</span>
                    <span class="block truncate text-sm font-medium text-primary-800">{{ next.name }}</span>
                </span>
                <span class="font-mono text-lg text-gray-400 group-hover:text-primary-600">→</span>
            </RouterLink>
            <span v-else />
        </nav>
    </div>

    <div v-else class="py-16 text-center text-gray-500">
        找不到這件標本……
    </div>
</template>

<script>
import {computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useHead} from '@unhead/vue';
import {useGestureStore} from 'stores/gesture/gesture';
import {familyMap} from 'maps/common/Family';
import GestureHand from 'components/common/GestureHand.vue';
import MarkdownView from 'components/common/MarkdownView.vue';
import SeverityMeter from 'components/common/SeverityMeter.vue';

export default {
    name: 'GestureDetail',
    components: {GestureHand, MarkdownView, SeverityMeter},
    setup() {
        const route = useRoute();
        const router = useRouter();
        const gestureStore = useGestureStore();

        const gesture = computed(() => gestureStore.getById(route.params.gestureId));
        const familyInfo = computed(() => (gesture.value ? familyMap.get(gesture.value.familyKey) || {} : {}));
        const accent = computed(() => familyInfo.value.accent || '#3F3026');
        const docNumber = computed(() => (gesture.value
            ? `GES-${familyInfo.value.abbrev}-${gesture.value.number}`
            : ''));

        const idx = computed(() => gestureStore.list.findIndex((g) => g.id === Number(route.params.gestureId)));
        const prev = computed(() => (idx.value > 0 ? gestureStore.list[idx.value - 1] : null));
        const next = computed(() => (idx.value >= 0 && idx.value < gestureStore.list.length - 1
            ? gestureStore.list[idx.value + 1]
            : null));

        const gridStyle = {
            backgroundImage:
                'linear-gradient(#C9B894 1px, transparent 1px), linear-gradient(90deg, #C9B894 1px, transparent 1px)',
            backgroundSize: '16px 16px',
        };

        useHead({
            title: computed(() => (gesture.value
                ? `${gesture.value.name} · 環球失禮手勢圖鑑`
                : '環球失禮手勢圖鑑')),
            meta: [{
                name: 'description',
                content: computed(() => (gesture.value ? gesture.value.hook : '')),
            }],
        });

        const goBack = () => {
            if (window.history.length > 1) router.back();
            else router.push({name: 'HOME_INDEX'});
        };

        return {
            gesture, familyInfo, accent, docNumber,
            prev, next, gridStyle, goBack,
        };
    },
};
</script>
