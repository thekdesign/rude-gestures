<template>
    <div class="md font-sans text-base leading-loose text-gray-800" v-html="rendered" />
</template>

<script>
import {marked} from 'marked';

marked.setOptions({
    breaks: false,
    gfm: true,
});

export default {
    name: 'MarkdownView',
    props: {
        source: {type: String, required: true},
    },
    computed: {
        rendered() {
            return marked.parse(this.source || '');
        },
    },
};
</script>

<!--
    marked 產出純 HTML 標籤，無法在運行時加 Tailwind class。
    用 @apply 把工具類轉成 :deep 選擇器，等同在 markdown 標籤上加 class。
-->
<style lang="scss" scoped>
.md {
    :deep(p) { @apply my-3.5; }

    :deep(strong) { @apply font-bold text-primary-800; }

    :deep(em) { @apply italic text-seal-700; }

    :deep(code) {
        @apply rounded bg-paper-200 px-1.5 py-0.5 text-[0.92em] text-seal-700 font-mono;
    }

    :deep(blockquote) {
        @apply my-5 rounded-r-lg border-l-4 border-gold-500 bg-gold-100/70 px-4 py-3.5 text-[0.96rem] italic text-gray-800;
    }
    :deep(blockquote p) { @apply m-0; }

    :deep(ol) { @apply list-decimal pl-6 my-2 mb-4; }
    :deep(ul) { @apply list-disc pl-6 my-2 mb-4; }
    :deep(li) { @apply my-2 leading-loose; }
    :deep(li ol), :deep(li ul) { @apply my-1.5; }
    :deep(li > strong:first-child) { @apply text-primary-700; }
    :deep(li::marker) { @apply text-seal-500; }

    :deep(hr) { @apply my-6 border-0 border-t border-dashed border-paper-400; }

    :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
        @apply mt-6 mb-2.5 font-serif font-bold text-primary-800;
    }

    :deep(a) { @apply text-seal-600 underline underline-offset-2; }
}
</style>
