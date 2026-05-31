<template>
    <span
        class="inline-flex items-center justify-center select-none font-mono font-bold tracking-[0.18em] uppercase"
        :class="[sizeClasses, shapeClasses]"
        :style="styleObj"
    >
        <slot>{{ label }}</slot>
    </span>
</template>

<script>
export default {
    name: 'StampBadge',
    props: {
        label: {type: String, default: '標本'},
        color: {type: String, default: '#94432D'},
        rotate: {type: Number, default: -8},
        size: {
            type: String,
            default: 'md',
            validator: (v) => ['sm', 'md', 'lg'].includes(v),
        },
        shape: {
            type: String,
            default: 'oval',
            validator: (v) => ['oval', 'rect'].includes(v),
        },
        opacity: {type: Number, default: 0.8},
    },
    computed: {
        sizeClasses() {
            const map = {
                sm: 'text-[0.65rem] px-2 py-0.5 border-[1.5px]',
                md: 'text-[0.75rem] px-3 py-1 border-2',
                lg: 'text-base px-5 py-1.5 border-[3px]',
            };
            return map[this.size];
        },
        shapeClasses() {
            return this.shape === 'oval' ? 'rounded-full' : 'rounded-sm';
        },
        styleObj() {
            return {
                color: this.color,
                borderColor: this.color,
                opacity: this.opacity,
                transform: `rotate(${this.rotate}deg)`,
                backgroundColor: 'transparent',
            };
        },
    },
};
</script>
