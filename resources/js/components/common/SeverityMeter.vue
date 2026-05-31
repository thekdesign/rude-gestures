<template>
    <div class="inline-flex items-center gap-2" :title="`冒犯指數 ${value} / 5`">
        <div class="flex items-center gap-1">
            <span
                v-for="n in 5"
                :key="n"
                class="inline-block rounded-full transition-colors"
                :class="size === 'sm' ? 'h-2 w-2' : 'h-2.5 w-2.5'"
                :style="{
                    backgroundColor: n <= value ? fillColor : 'transparent',
                    border: `1.5px solid ${n <= value ? fillColor : emptyColor}`,
                }"
            />
        </div>
        <span
            v-if="showLabel"
            class="font-mono text-[0.62rem] tracking-[0.15em] uppercase"
            :style="{color: fillColor}"
        >
            {{ levelLabel }}
        </span>
    </div>
</template>

<script>
// 冒犯指數：1（友善吐槽）→ 5（國際事件等級）
const LEVELS = {
    1: '輕量吐槽',
    2: '不太禮貌',
    3: '明顯失禮',
    4: '會吃拳頭',
    5: '國際事件',
};

export default {
    name: 'SeverityMeter',
    props: {
        value: {type: Number, required: true},
        size: {type: String, default: 'md'},
        showLabel: {type: Boolean, default: true},
    },
    data() {
        return {
            fillColor: '#B5563B',
            emptyColor: '#CBBFA6',
        };
    },
    computed: {
        levelLabel() {
            return LEVELS[this.value] || '';
        },
    },
};
</script>
