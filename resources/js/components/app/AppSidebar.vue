<template>
    <nav class="flex flex-col gap-4">
        <!-- 搜尋 -->
        <div>
            <label class="block font-mono text-[0.6rem] tracking-[0.2em] text-gray-500 uppercase mb-1.5">§ Search</label>
            <div class="relative">
                <input
                    v-model="filtersStore.searchQuery"
                    type="text"
                    placeholder="搜手勢、國家、含義…"
                    class="h-10 w-full rounded-sm border border-paper-400 bg-white pl-9 pr-3 text-sm leading-none text-gray-800 outline-none transition-colors focus:border-primary-600"
                >
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
        </div>

        <!-- 全部 -->
        <RouterLink
            :to="{name: 'HOME_INDEX'}"
            class="flex items-center gap-2 rounded-sm border border-paper-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary-600 hover:text-primary-700"
            @click="onNavigate('')"
        >
            <span>🗂️</span>
            <span>全部標本</span>
            <span class="ml-auto font-mono text-[0.65rem] text-gray-400">{{ gestureStore.list.length }}</span>
        </RouterLink>

        <!-- 各科索引 -->
        <div>
            <div class="font-mono text-[0.6rem] tracking-[0.2em] text-gray-500 uppercase mb-1.5">§ Families · 六科</div>
            <ul class="flex flex-col gap-1">
                <li v-for="fam in familyList" :key="fam.key">
                    <RouterLink
                        :to="{name: 'HOME_INDEX', hash: `#family-${fam.key.toLowerCase()}`}"
                        class="flex items-center gap-2 rounded-sm border border-transparent px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-paper-200"
                        @click="onNavigate(fam.key)"
                    >
                        <span class="text-base leading-none">{{ fam.emoji }}</span>
                        <span class="font-medium">{{ fam.label }}</span>
                        <span class="font-mono text-[0.6rem] italic text-gray-400">{{ fam.latin }}</span>
                        <span
                            class="ml-auto h-2.5 w-2.5 rounded-full"
                            :style="{backgroundColor: fam.accent}"
                        />
                    </RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import {useGestureStore} from 'stores/gesture/gesture';
import {useFiltersStore} from 'stores/ui/filters';
import {familyList} from 'maps/common/Family';

export default {
    name: 'AppSidebar',
    emits: ['navigate'],
    setup(_props, {emit}) {
        const gestureStore = useGestureStore();
        const filtersStore = useFiltersStore();

        const onNavigate = (familyKey) => {
            filtersStore.activeFamilyKey = familyKey;
            emit('navigate');
        };

        return {gestureStore, filtersStore, familyList, onNavigate};
    },
};
</script>
