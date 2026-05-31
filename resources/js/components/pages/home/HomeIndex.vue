<template>
    <div>
        <!-- 刊頭 -->
        <header class="mb-8 text-center">
            <div class="mx-auto mb-4 max-w-[34rem] border-y-[3px] border-double border-primary-700 py-5">
                <div class="font-mono text-[0.6rem] tracking-[0.32em] text-seal-600 uppercase">
                    A Field Guide to Rude Gestures of the World
                </div>
                <h1 class="m-0 mt-2 font-serif text-[2.1rem] font-black leading-tight tracking-wide text-primary-800 sm:text-[2.7rem]">
                    環球失禮手勢圖鑑
                </h1>
                <div class="mt-1 font-serif text-sm italic text-gray-500">
                    失禮手勢的田野標本誌 · 第一版
                </div>
            </div>
            <p class="mx-auto max-w-xl text-sm leading-loose text-gray-700">
                同一隻手，在這國是「讚」、過個海關就變「問候全家」。
                本圖鑑用復古博物誌的方式，把全世界<strong class="text-seal-700">最容易踩雷的手勢</strong>標本化、編號、上架——
                手勢全程用 CSS 動起來給你看。
            </p>
        </header>

        <!-- 圖例條（取代統計列）-->
        <section class="mb-8 border border-paper-400 bg-[#FBF6E8]">
            <div class="border-b border-dashed border-paper-300 px-4 py-1.5 font-mono text-[0.6rem] tracking-[0.22em] text-gray-500 uppercase">
                § Legend · 圖例
            </div>
            <div class="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <!-- 冒犯指數尺標 -->
                <div class="flex items-center gap-3">
                    <span class="font-serif text-sm font-bold text-primary-800">冒犯指數</span>
                    <div class="flex items-end gap-2">
                        <div v-for="lv in 5" :key="lv" class="flex flex-col items-center gap-1">
                            <SeverityMeter :value="lv" size="sm" :show-label="false" />
                            <span class="font-mono text-[0.55rem] tracking-wide text-gray-500">{{ levelText[lv] }}</span>
                        </div>
                    </div>
                </div>
                <!-- 數字 -->
                <div class="flex items-center gap-4 font-serif text-gray-700">
                    <div class="flex items-baseline gap-1">
                        <span class="text-xl font-black text-primary-800">{{ gestureStore.list.length }}</span>
                        <span class="text-xs text-gray-500">手勢</span>
                    </div>
                    <span class="text-paper-400">·</span>
                    <div class="flex items-baseline gap-1">
                        <span class="text-xl font-black text-primary-800">{{ familyList.length }}</span>
                        <span class="text-xs text-gray-500">科</span>
                    </div>
                    <span class="text-paper-400">·</span>
                    <div class="flex items-baseline gap-1">
                        <span class="text-xl font-black text-primary-800">{{ countryCount }}</span>
                        <span class="text-xs text-gray-500">國</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 搜尋結果列 -->
        <Transition name="fade">
            <p v-if="filtersStore.searchQuery" class="mb-5 text-sm text-gray-600">
                搜尋「<strong class="text-primary-700">{{ filtersStore.searchQuery }}</strong>」：找到
                <strong class="text-primary-700">{{ matchCount }}</strong> 件標本
                <button type="button" class="ml-2 text-xs text-seal-600 underline-offset-2 hover:underline" @click="filtersStore.clearSearch()">
                    清除
                </button>
            </p>
        </Transition>

        <!-- 分類 chips -->
        <section class="mb-9">
            <div class="flex flex-wrap items-center gap-1.5">
                <button
                    class="border px-3 py-1.5 text-xs font-medium tracking-wide transition-colors sm:text-sm"
                    :class="filtersStore.activeFamilyKey === ''
                        ? 'border-primary-700 bg-primary-700 text-paper-100'
                        : 'border-paper-400 bg-transparent text-gray-600 hover:border-primary-600 hover:text-primary-700'"
                    @click="filtersStore.activeFamilyKey = ''"
                >
                    全部
                </button>
                <button
                    v-for="fam in familyList"
                    :key="fam.key"
                    class="inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium tracking-wide transition-colors sm:text-sm"
                    :class="filtersStore.activeFamilyKey === fam.key ? 'text-paper-100' : 'border-paper-400 bg-transparent text-gray-600 hover:border-primary-600'"
                    :style="filtersStore.activeFamilyKey === fam.key ? {background: fam.accent, borderColor: fam.accent} : {}"
                    @click="filtersStore.activeFamilyKey = fam.key"
                >
                    <span>{{ fam.emoji }}</span><span>{{ fam.label }}</span>
                </button>
            </div>
        </section>

        <p v-if="filtersStore.searchQuery && !displayFamilies.length" class="my-12 text-center text-sm text-gray-500">
            沒有符合「<strong class="text-primary-700">{{ filtersStore.searchQuery }}</strong>」的標本，換個關鍵字試試。
        </p>

        <!-- 各科標本牆 -->
        <section
            v-for="fam in displayFamilies"
            :id="`family-${fam.key.toLowerCase()}`"
            :key="fam.key"
            class="mb-11 scroll-mt-24"
        >
            <!-- 細分隔線標題 -->
            <header class="mb-5 flex items-end gap-3">
                <div class="flex items-baseline gap-2.5">
                    <span class="text-2xl leading-none">{{ fam.emoji }}</span>
                    <h2 class="m-0 font-serif text-xl font-black text-primary-800 sm:text-2xl">{{ fam.label }}</h2>
                    <span class="font-mono text-xs italic text-gray-400">{{ fam.latin }}</span>
                </div>
                <div class="flex flex-1 items-center gap-3">
                    <span class="h-px flex-1" :style="{background: fam.accent, opacity: 0.5}" />
                    <span class="font-mono text-[0.68rem] tracking-[0.12em] text-gray-500">{{ String(fam.gestures.length).padStart(2, '0') }} 件</span>
                </div>
            </header>
            <p class="-mt-3 mb-5 max-w-2xl text-sm leading-relaxed text-gray-600">{{ fam.blurb }}</p>
            <div class="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(238px,1fr))]">
                <GestureCard v-for="g in fam.gestures" :key="g.id" :gesture="g" />
            </div>
        </section>
    </div>
</template>

<script>
import {computed} from 'vue';
import {useGestureStore} from 'stores/gesture/gesture';
import {useFiltersStore} from 'stores/ui/filters';
import {familyList} from 'maps/common/Family';
import GestureCard from 'components/common/GestureCard.vue';
import SeverityMeter from 'components/common/SeverityMeter.vue';

const GLOBES = ['🌍', '🌎', '🌏', '🌐'];

export default {
    name: 'HomeIndex',
    components: {GestureCard, SeverityMeter},
    setup() {
        const gestureStore = useGestureStore();
        const filtersStore = useFiltersStore();

        const levelText = {1: '輕量', 2: '失禮', 3: '明顯', 4: '吃拳', 5: '國際'};

        // 收錄國家數：不重複的「真正國旗」（排除地球符號）
        const countryCount = computed(() => {
            const set = new Set();
            gestureStore.list.forEach((g) => (g.regions || []).forEach((r) => {
                if (!GLOBES.includes(r.flag)) set.add(r.flag);
            }));
            return set.size;
        });

        const matchesSearch = (g) => {
            const q = filtersStore.searchQuery.trim().toLowerCase();
            if (!q) return true;
            const regionText = (g.regions || []).map((r) => r.name).join(' ');
            const haystack = [g.name, g.nameEn, g.hook, g.meaning, g.origin, g.scene, regionText]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return haystack.includes(q);
        };

        const matchCount = computed(() => gestureStore.list.filter(matchesSearch).length);

        const displayFamilies = computed(() => {
            const filtered = gestureStore.list.filter(matchesSearch);
            const grouped = filtered.reduce((acc, g) => {
                (acc[g.familyKey] = acc[g.familyKey] || []).push(g);
                return acc;
            }, {});
            return familyList
                .filter((f) => filtersStore.activeFamilyKey === '' || filtersStore.activeFamilyKey === f.key)
                .map((f) => ({...f, gestures: grouped[f.key] || []}))
                .filter((f) => f.gestures.length > 0);
        });

        return {
            gestureStore,
            filtersStore,
            familyList,
            levelText,
            countryCount,
            matchCount,
            displayFamilies,
        };
    },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
