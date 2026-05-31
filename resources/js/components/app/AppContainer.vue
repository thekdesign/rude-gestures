<template>
    <div class="flex flex-col min-h-screen">
        <header
            class="sticky top-0 z-50 flex items-center gap-3 border-b-[3px] border-double border-primary-700 bg-[#F3EAD3]/95 px-4 py-2.5 text-primary-800 backdrop-blur-sm sm:px-6"
        >
            <button
                type="button"
                class="inline-flex items-center justify-center w-9 h-9 -ml-1 rounded-full text-primary-700 transition-colors hover:bg-paper-300 hover:text-seal-600"
                aria-label="開啟索引"
                @click="drawerOpen = true"
            >
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="20"
                     height="20"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     stroke-width="2.2"
                     stroke-linecap="round">
                    <line x1="4"
                          y1="7"
                          x2="20"
                          y2="7" />
                    <line x1="4"
                          y1="12"
                          x2="20"
                          y2="12" />
                    <line x1="4"
                          y1="17"
                          x2="20"
                          y2="17" />
                </svg>
            </button>

            <RouterLink :to="{name: 'HOME_INDEX'}" class="flex items-baseline gap-2.5 min-w-0">
                <span class="text-xl leading-none">🖐️</span>
                <span class="font-serif text-base font-black tracking-wide truncate sm:text-lg">
                    環球失禮手勢圖鑑
                </span>
                <span class="hidden sm:inline font-mono text-[0.6rem] tracking-[0.22em] text-gray-500 whitespace-nowrap uppercase">
                    Field Guide · {{ String(gestureStore.list.length).padStart(3, '0') }} Specimens
                </span>
            </RouterLink>
        </header>

        <div class="w-full max-w-[1080px] mx-auto px-4 sm:px-6 flex-1 min-w-0">
            <main class="min-w-0 pt-7 pb-16">
                <RouterView v-slot="{Component}">
                    <Transition name="route-fade" mode="out-in">
                        <component :is="Component" />
                    </Transition>
                </RouterView>
            </main>
        </div>

        <!-- Drawer 索引 -->
        <Teleport to="body">
            <Transition name="mask-fade">
                <div
                    v-if="drawerOpen"
                    class="fixed inset-0 z-[60] bg-primary-900/50 backdrop-blur-sm"
                    @click="drawerOpen = false"
                />
            </Transition>
            <Transition name="drawer-slide">
                <aside
                    v-if="drawerOpen"
                    class="fixed top-0 left-0 z-[70] h-full w-[300px] max-w-[85vw] bg-[#FBF5E6] shadow-[8px_0_28px_rgba(26,19,13,0.22)] overflow-y-auto"
                >
                    <div class="flex items-center justify-between px-5 py-3 border-b border-paper-300 bg-primary-800 text-paper-100">
                        <div class="flex flex-col">
                            <span class="font-mono text-[0.6rem] tracking-[0.2em] opacity-70 uppercase">§ Index</span>
                            <span class="font-serif font-bold text-base">
                                <span class="mr-1">📖</span>標本索引
                            </span>
                        </div>
                        <button
                            type="button"
                            class="flex h-8 w-8 items-center justify-center rounded-full text-paper-200 transition-colors hover:bg-primary-700 hover:text-paper-100"
                            aria-label="關閉索引 (Esc)"
                            @click="drawerOpen = false"
                        >
                            ✕
                        </button>
                    </div>
                    <div class="px-4 py-5">
                        <AppSidebar @navigate="drawerOpen = false" />
                    </div>
                </aside>
            </Transition>
        </Teleport>

        <footer class="text-center px-4 py-6 text-xs text-gray-500 space-y-2">
            <div class="max-w-xl mx-auto leading-relaxed">
                本圖鑑為文化科普與旅遊避雷之用。收錄不等於鼓勵——看懂是為了<strong class="text-primary-700">別誤觸、別被誤會</strong>，不是拿來實戰。
            </div>
            <div class="font-mono text-[0.62rem] tracking-[0.18em] text-gray-400 uppercase">
                A Field Guide to Rude Gestures of the World · est. 2026
            </div>
        </footer>
    </div>
</template>

<script>
import {ref, watch, onMounted, onBeforeUnmount} from 'vue';
import {useRoute} from 'vue-router';
import {useGestureStore} from 'stores/gesture/gesture';
import AppSidebar from 'components/app/AppSidebar.vue';

export default {
    name: 'AppContainer',
    components: {AppSidebar},
    setup() {
        const gestureStore = useGestureStore();
        const route = useRoute();
        const drawerOpen = ref(false);

        watch(() => route.fullPath, () => {
            drawerOpen.value = false;
        });

        watch(drawerOpen, (open) => {
            document.body.style.overflow = open ? 'hidden' : '';
        });

        const handleEsc = (e) => {
            if (e.key === 'Escape' && drawerOpen.value) drawerOpen.value = false;
        };
        onMounted(() => window.addEventListener('keydown', handleEsc));
        onBeforeUnmount(() => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        });

        return {gestureStore, drawerOpen};
    },
};
</script>

<style>
.route-fade-enter-active,
.route-fade-leave-active {
    transition: opacity 200ms ease, transform 200ms ease;
}
.route-fade-enter-from {
    opacity: 0;
    transform: translateY(6px);
}
.route-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

.mask-fade-enter-active,
.mask-fade-leave-active {
    transition: opacity 220ms ease;
}
.mask-fade-enter-from,
.mask-fade-leave-to {
    opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
    transition: transform 260ms cubic-bezier(0.32, 0.72, 0.24, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
    transform: translateX(-100%);
}
</style>
