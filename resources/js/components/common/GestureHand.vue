<template>
    <svg
        :width="size"
        :height="size * 1.18"
        viewBox="0 0 120 150"
        :aria-label="title"
        role="img"
        class="select-none gh-svg"
    >
        <defs>
            <!-- 手繪抖動濾鏡：把工整路徑擾動成速寫線條 -->
            <filter :id="filterId"
                    x="-25%"
                    y="-25%"
                    width="150%"
                    height="150%">
                <feTurbulence type="fractalNoise"
                              :baseFrequency="0.018"
                              numOctaves="2"
                              :seed="seed"
                              result="ghNoise" />
                <feDisplacementMap in="SourceGraphic"
                                   in2="ghNoise"
                                   :scale="roughness"
                                   xChannelSelector="R"
                                   yChannelSelector="G" />
            </filter>
        </defs>
        <g :class="['gh-anim', `gh-${anim}`]"
           :fill="skin"
           :stroke="line"
           stroke-width="2.6">
            <g :filter="`url(#${filterId})`">
                <!-- ============ 通用「手指型」手勢 ============ -->
                <template v-if="kind === 'fingers'">
                    <g :transform="rotateAll ? `rotate(${rotateAll} 60 100)` : ''">
                        <!-- 手掌 -->
                        <path :d="palmBody" />
                        <!-- 拇指 -->
                        <path :d="thumbShape.body" />
                        <!-- 四指 -->
                        <g v-for="f in fingerShapes" :key="f.key" :class="f.key === 'index' && beckon ? 'gh-beckon' : ''">
                            <path :d="f.body" :transform="f.transform" />
                            <path v-for="(c, ci) in f.creases"
                                  :key="ci"
                                  :d="c"
                                  :transform="f.transform"
                                  class="gh-crease" />
                            <path v-if="f.nail"
                                  :d="f.nail"
                                  :transform="f.transform"
                                  class="gh-crease" />
                        </g>
                        <!-- 指根弧線 + 拇指摺線 -->
                        <path :d="palmKnuckle" class="gh-crease" />
                        <path :d="thumbShape.crease" class="gh-crease" />
                    </g>
                </template>

                <!-- ============ OK 手勢 ============ -->
                <template v-else-if="pose === 'ok'">
                    <path :d="palmBody" />
                    <!-- 三根伸直的手指 -->
                    <path :d="F(60, 13, 22, 80)" />
                    <path :d="FC(60, 13, 22, 80)" class="gh-crease" />
                    <path :d="F(73, 13, 26, 80)" />
                    <path :d="FC(73, 13, 26, 80)" class="gh-crease" />
                    <path :d="F(85, 11, 36, 80)" />
                    <path :d="FC(85, 11, 36, 80)" class="gh-crease" />
                    <!-- 拇指食指圍成的圈 -->
                    <circle cx="43"
                            cy="58"
                            r="19"
                            :fill="skin"
                            :stroke="skin"
                            stroke-width="12.5" />
                    <circle cx="43"
                            cy="58"
                            r="25.2"
                            fill="none" />
                    <circle cx="43"
                            cy="58"
                            r="12.8"
                            fill="none" />
                </template>

                <!-- ============ 無花果手勢 ============ -->
                <template v-else-if="pose === 'fig'">
                    <path :d="fistBody" />
                    <path v-for="(d, i) in fistCreases"
                          :key="i"
                          :d="d"
                          class="gh-crease" />
                    <!-- 從食指中指間探頭的拇指 -->
                    <ellipse cx="48"
                             cy="55"
                             rx="9.5"
                             ry="11" />
                    <path d="M44 52 Q48 50 52 52" class="gh-crease" />
                </template>

                <!-- ============ 義式併指 / 你想怎樣 ============ -->
                <template v-else-if="pose === 'purse'">
                    <path :d="palmBody" />
                    <g v-for="(b, i) in purseFingers" :key="i" :transform="`rotate(${b.rot} ${b.px} 78)`">
                        <path :d="F(b.px, 10, 20, 82)" />
                        <path :d="FC(b.px, 10, 20, 82, 0.5)" class="gh-crease" />
                    </g>
                    <circle cx="60" cy="22" r="7" />
                </template>

                <!-- ============ 彈手指 / 拍手叫人 ============ -->
                <template v-else-if="pose === 'snap'">
                    <path :d="palmBody" />
                    <!-- 食指上揚 -->
                    <path :d="F(53, 13, 32, 82)" />
                    <path :d="FC(53, 13, 32, 82)" class="gh-crease" />
                    <!-- 拇指外伸 -->
                    <path d="M58 80 C44 78 30 80 24 86 C28 92 42 92 56 90 Z" />
                    <!-- 中指彎下與拇指相觸 -->
                    <path d="M66 80 Q72 96 52 95"
                          :fill="skin"
                          :stroke="skin"
                          stroke-width="12.5" />
                    <path d="M66 80 Q72 96 52 95" fill="none" stroke-width="2.4" />
                    <!-- 彈響火花 -->
                    <g class="gh-spark"
                       fill="none"
                       :stroke="accent"
                       stroke-width="2.4">
                        <line x1="34"
                              y1="82"
                              x2="25"
                              y2="78" />
                        <line x1="33"
                              y1="91"
                              x2="23"
                              y2="92" />
                        <line x1="37"
                              y1="99"
                              x2="32"
                              y2="108" />
                    </g>
                </template>

                <!-- ============ 豎拇指 / 拇指朝下 ============ -->
                <template v-else-if="pose === 'thumbup' || pose === 'thumbdown'">
                    <g :transform="pose === 'thumbdown' ? 'rotate(180 60 78)' : ''">
                        <!-- 拳頭本體（指節凹凸）-->
                        <path :d="fistBody" />
                        <path v-for="(d, i) in fistCreases"
                              :key="i"
                              :d="d"
                              class="gh-crease" />
                        <!-- 拇指上豎 -->
                        <path d="M39 72 C34 58 34 42 37 32 C40 25 51 25 54 32 C57 42 54 60 50 72 Z" />
                        <path d="M40 44 Q45 46 50 44" class="gh-crease" />
                    </g>
                </template>

                <!-- ============ 搓手指（要錢）============ -->
                <template v-else-if="pose === 'rub'">
                    <path :d="palmBody" />
                    <!-- 食指、中指 -->
                    <g transform="rotate(-8 54 86)">
                        <path :d="F(54, 12, 40, 88)" />
                        <path :d="FC(54, 12, 40, 88)" class="gh-crease" />
                    </g>
                    <g transform="rotate(5 68 86)">
                        <path :d="F(68, 12, 42, 88)" />
                        <path :d="FC(68, 12, 42, 88)" class="gh-crease" />
                    </g>
                    <!-- 來回摩擦的拇指 -->
                    <g class="gh-rubthumb">
                        <path d="M36 58 C46 50 64 46 72 48 C70 56 56 62 44 64 Z" transform="rotate(6 54 55)" />
                    </g>
                </template>

                <!-- ============ 手肘禮 Bras d'honneur ============ -->
                <template v-else-if="pose === 'armhonor'">
                    <!-- 拍向手肘的那隻手（從右側來）-->
                    <path d="M72 98 C92 95 110 96 118 98 L118 118 C108 120 86 120 72 117 C68 110 68 104 72 98 Z" />
                    <!-- 上揚的前臂（會擺動）-->
                    <g class="gh-swingarm">
                        <path d="M46 126 C44 100 44 72 47 56 C49 48 73 48 75 56 C78 72 78 100 76 126 Z" />
                        <!-- 上端的拳頭 -->
                        <path d="M40 58 L40 38 A6 6 0 0 1 52 38 A6 6 0 0 1 64 38 A6 6 0 0 1 76 38 L76 60 C64 64 50 64 40 58 Z" />
                        <path d="M46 46 Q60 43 72 46" class="gh-crease" />
                        <line x1="52"
                              y1="39"
                              x2="52"
                              y2="50"
                              class="gh-crease" />
                        <line x1="64"
                              y1="39"
                              x2="64"
                              y2="50"
                              class="gh-crease" />
                        <!-- 探頭的拇指 -->
                        <path d="M74 44 C84 42 90 46 90 52 C90 58 84 60 74 58 Z" />
                    </g>
                </template>

                <!-- ============ 顏面科：頭 + 動作 ============ -->
                <template v-else-if="kind === 'face'">
                    <!-- 頭（略帶下巴的蛋形）-->
                    <path d="M60 18 C84 18 101 36 101 60 C101 84 84 102 60 102 C36 102 19 84 19 60 C19 36 36 18 60 18 Z" />
                    <!-- 耳朵 -->
                    <ellipse cx="19"
                             cy="62"
                             rx="6.5"
                             ry="8" />
                    <ellipse cx="101"
                             cy="62"
                             rx="6.5"
                             ry="8" />

                    <!-- chin flick：下巴 + 彈出的手 -->
                    <template v-if="pose === 'chinflick'">
                        <path d="M40 50 Q46 47 52 50" class="gh-line" />
                        <path d="M68 50 Q74 47 80 50" class="gh-line" />
                        <circle cx="46"
                                cy="54"
                                r="3"
                                :fill="line"
                                stroke="none" />
                        <circle cx="74"
                                cy="54"
                                r="3"
                                :fill="line"
                                stroke="none" />
                        <path d="M62 62 Q60 65 58 62" class="gh-line" />
                        <path d="M50 76 Q60 81 70 76" class="gh-line" />
                        <g class="gh-flickhand">
                            <path d="M40 108 C38 100 40 94 46 92 L74 92 C80 94 81 100 79 108 C72 112 48 112 40 108 Z" />
                            <path d="M48 94 L48 104" class="gh-crease" />
                            <path d="M58 94 L58 104" class="gh-crease" />
                            <path d="M68 94 L68 104" class="gh-crease" />
                        </g>
                    </template>

                    <!-- akanbe：拉下眼皮 + 吐舌 -->
                    <template v-else-if="pose === 'akanbe'">
                        <path d="M68 49 Q74 46 80 49" class="gh-line" />
                        <circle cx="74"
                                cy="53"
                                r="3"
                                :fill="line"
                                stroke="none" />
                        <!-- 被往下拉的左眼 -->
                        <path d="M38 50 Q46 44 54 50" class="gh-line" />
                        <path d="M40 56 Q46 65 52 56 Q46 60 40 56 Z" :fill="blush" stroke-width="1.6" />
                        <!-- 拉眼皮的食指 -->
                        <path d="M45 60 C43 70 43 80 44 88 C46 90 51 90 52 88 C53 78 53 68 51 60 Z" />
                        <!-- 鼻 -->
                        <path d="M61 60 Q59 64 57 61" class="gh-line" />
                        <!-- 吐出的舌頭 -->
                        <g class="gh-tongue">
                            <path d="M55 73 L67 73 C68 86 66 94 61 95 C56 94 54 86 55 73 Z" :fill="blush" stroke-width="1.8" />
                            <path d="M61 75 L61 88" stroke-width="1.4" :stroke="tongueLine" />
                        </g>
                        <path d="M52 72 Q61 76 70 72" class="gh-line" />
                    </template>

                    <!-- 拉下眼皮（我才不信）-->
                    <template v-else-if="pose === 'eyepull'">
                        <path d="M68 49 Q74 46 80 49" class="gh-line" />
                        <circle cx="74"
                                cy="53"
                                r="3"
                                :fill="line"
                                stroke="none" />
                        <path d="M38 50 Q46 45 54 50" class="gh-line" />
                        <path d="M40 56 Q46 65 52 56 Q46 60 40 56 Z" :fill="blush" stroke-width="1.6" />
                        <g class="gh-eyefinger">
                            <path d="M45 60 C43 70 43 80 44 88 C46 90 51 90 52 88 C53 78 53 68 51 60 Z" />
                        </g>
                        <path d="M61 60 Q59 64 57 61" class="gh-line" />
                        <path d="M52 78 Q61 80 70 78" class="gh-line" />
                    </template>

                    <!-- 咬拇指 -->
                    <template v-else-if="pose === 'bitethumb'">
                        <path d="M40 49 Q46 46 52 49" class="gh-line" />
                        <path d="M68 49 Q74 46 80 49" class="gh-line" />
                        <circle cx="46"
                                cy="52"
                                r="3"
                                :fill="line"
                                stroke="none" />
                        <circle cx="74"
                                cy="52"
                                r="3"
                                :fill="line"
                                stroke="none" />
                        <path d="M62 60 Q60 64 58 61" class="gh-line" />
                        <!-- 牙齒 -->
                        <path d="M52 68 L70 68 L70 75 L52 75 Z" fill="#FFFFFF" stroke-width="1.6" />
                        <line x1="61"
                              y1="68"
                              x2="61"
                              y2="75"
                              stroke-width="1.2" />
                        <!-- 拳頭 + 抵在牙後的拇指 -->
                        <path d="M44 120 C42 108 44 98 50 94 L72 94 C78 98 80 108 78 120 C70 124 52 124 44 120 Z" />
                        <g class="gh-bitethumb">
                            <path d="M53 96 C51 84 52 72 55 64 C58 60 64 60 66 64 C68 74 67 86 65 96 Z" />
                        </g>
                    </template>
                </template>
            </g>
        </g>
    </svg>
</template>

<script>
import {computed, useId} from 'vue';

// 四指基本幾何（手心朝上、手指向上）
const FINGER_GEO = {
    index: {cx: 41, w: 13, tip: 22},
    middle: {cx: 56, w: 13, tip: 13},
    ring: {cx: 71, w: 13, tip: 22},
    pinky: {cx: 84, w: 11, tip: 34},
};
const BASE_Y = 80; // 手指根部沒入手掌的 y
const CURL_TIP = 55;
const CURL_BASE = 80;

const FINGER_POSES = {
    middle: {fingers: {index: 'down', middle: 'up', ring: 'down', pinky: 'down'}, thumb: 'across'},
    point: {fingers: {index: 'up', middle: 'down', ring: 'down', pinky: 'down'}, thumb: 'across'},
    crazy: {fingers: {index: 'up', middle: 'down', ring: 'down', pinky: 'down'}, thumb: 'across'},
    v: {fingers: {index: 'up', middle: 'up', ring: 'down', pinky: 'down'}, thumb: 'tuck', spread: 'v'},
    horns: {fingers: {index: 'up', middle: 'down', ring: 'down', pinky: 'up'}, thumb: 'across'},
    pinky: {fingers: {index: 'down', middle: 'down', ring: 'down', pinky: 'up'}, thumb: 'across'},
    open: {fingers: {index: 'up', middle: 'up', ring: 'up', pinky: 'up'}, thumb: 'out', spread: 'fan'},
    beckon: {fingers: {index: 'up', middle: 'down', ring: 'down', pinky: 'down'}, thumb: 'across', beckon: true},
    fist: {fingers: {index: 'down', middle: 'down', ring: 'down', pinky: 'down'}, thumb: 'across'},
    blade: {fingers: {index: 'up', middle: 'up', ring: 'up', pinky: 'up'}, thumb: 'tuck', rotateAll: -72},
    cross: {fingers: {index: 'up', middle: 'up', ring: 'down', pinky: 'down'}, thumb: 'across', spread: 'cross'},
};

const FACE_POSES = ['chinflick', 'akanbe', 'eyepull', 'bitethumb'];

// 拇指各型態（彎曲帶關節的 path + 摺線）
const THUMB_SHAPES = {
    across: {
        body: 'M58 88 C42 84 27 88 24 95 C27 104 42 108 58 104 Z',
        crease: 'M50 90 Q53 97 50 103',
    },
    tuck: {
        body: 'M55 96 C43 93 33 96 31 101 C33 108 44 110 55 107 Z',
        crease: 'M48 98 Q50 103 48 108',
    },
    out: {
        body: 'M46 102 C34 96 18 82 13 73 C11 68 18 64 24 68 C33 73 45 92 50 99 Z',
        crease: 'M27 84 Q34 88 41 95',
    },
};

const r1 = (n) => Math.round(n * 10) / 10;

// 帶錐度、圓頭的手指 path
const fingerPath = (cx, w, tipY, baseY) => {
    const wb = w / 2;
    const wt = Math.max(w / 2 - 1.3, 2.6);
    const cy = tipY + wt;
    return `M${r1(cx - wb)} ${baseY}`
        + `L${r1(cx - wt)} ${r1(cy)}`
        + `A${r1(wt)} ${r1(wt)} 0 0 1 ${r1(cx + wt)} ${r1(cy)}`
        + `L${r1(cx + wb)} ${baseY}Z`;
};

// 指節摺線
const creasePath = (cx, w, tipY, baseY, frac = 0.42) => {
    const y = tipY + (baseY - tipY) * frac;
    const hw = (w / 2) * 0.58;
    return `M${r1(cx - hw)} ${r1(y)}Q${cx} ${r1(y + 1.6)} ${r1(cx + hw)} ${r1(y)}`;
};

// 指甲：指尖一道淺弧
const nailPath = (cx, w, tipY) => {
    const nw = (w / 2) * 0.5;
    const y = tipY + w * 0.52;
    return `M${r1(cx - nw)} ${r1(y)}Q${cx} ${r1(y - 2.4)} ${r1(cx + nw)} ${r1(y)}`;
};

// 握拳本體：上緣四個指節凸起
const FIST_BODY = 'M40 118 L40 74 '
    + 'A6 6 0 0 1 52 74 A6 6 0 0 1 64 74 A6 6 0 0 1 76 74 A6 6 0 0 1 88 74 '
    + 'L88 116 Q64 123 40 116 Z';
const FIST_CREASES = [
    'M46 92 Q64 89 82 92',
    'M46 104 Q64 101 82 104',
    'M52 75 L52 86',
    'M64 75 L64 87',
    'M76 75 L76 86',
];

// 手掌輪廓（左下虎口/拇指根肌肉隆起 + 腕部收窄）+ 指根弧線
const PALM_BODY = 'M35 73 C31 85 29 96 31 104 C32 112 37 118 45 119 '
    + 'C58 121 70 120 78 113 C85 105 86 90 84 73 C70 69 50 69 35 73 Z';
const PALM_KNUCKLE = 'M41 76 Q60 72 81 76';

export default {
    name: 'GestureHand',
    props: {
        pose: {type: String, required: true},
        anim: {type: String, default: 'none'},
        size: {type: Number, default: 150},
        title: {type: String, default: '手勢示意'},
        accent: {type: String, default: '#B5563B'},
    },
    setup(props) {
        // Notion 風：暖白填充 + 柔黑墨描邊 + 圓潤線端
        const skin = '#FDFBF6';
        const line = '#37322B';
        const blush = '#E89A7E';
        const tongueLine = '#C56A4E';

        // 手繪抖動濾鏡：每個手勢用不同 seed，抖法略有差異
        const uid = useId();
        const filterId = `gh-rough-${uid}`;
        const roughness = 3.4;
        const seed = computed(() => {
            let s = 0;
            for (let i = 0; i < props.pose.length; i += 1) s = (s + props.pose.charCodeAt(i)) % 97;
            return s;
        });

        const config = computed(() => FINGER_POSES[props.pose] || null);

        const kind = computed(() => {
            if (FACE_POSES.includes(props.pose)) return 'face';
            if (config.value) return 'fingers';
            return 'special';
        });

        const beckon = computed(() => !!config.value?.beckon);
        const rotateAll = computed(() => config.value?.rotateAll || 0);

        const spreadAngle = (key) => {
            const mode = config.value?.spread;
            if (mode === 'fan') return {index: -16, middle: -5, ring: 7, pinky: 20}[key];
            if (mode === 'v') return {index: -17, middle: 15}[key] || 0;
            if (mode === 'cross') return {index: 20, middle: -20}[key] || 0;
            return 0;
        };

        const fingerShapes = computed(() => {
            if (!config.value) return [];
            return Object.entries(FINGER_GEO).map(([key, g]) => {
                const isUp = config.value.fingers[key] === 'up';
                const tip = isUp ? g.tip : CURL_TIP;
                const base = isUp ? BASE_Y : CURL_BASE;
                const angle = isUp ? spreadAngle(key) : 0;
                // 伸直的手指畫兩道指節摺線 + 指甲；收攏的指節只畫一道
                const creases = isUp
                    ? [creasePath(g.cx, g.w, tip, base, 0.34), creasePath(g.cx, g.w, tip, base, 0.62)]
                    : [creasePath(g.cx, g.w, tip, base, 0.5)];
                return {
                    key,
                    body: fingerPath(g.cx, g.w, tip, base),
                    creases,
                    nail: isUp ? nailPath(g.cx, g.w, tip) : null,
                    transform: angle ? `rotate(${angle} ${g.cx} 78)` : '',
                };
            });
        });

        const thumbShape = computed(() => THUMB_SHAPES[config.value?.thumb || 'across']);

        const purseFingers = computed(() => {
            const px = [46, 53, 60, 67, 74];
            const rots = [-20, -10, 0, 10, 20];
            return px.map((p, i) => ({px: p, rot: rots[i]}));
        });

        return {
            kind, config, beckon, rotateAll,
            fingerShapes, thumbShape, purseFingers,
            palmBody: PALM_BODY, palmKnuckle: PALM_KNUCKLE,
            fistBody: FIST_BODY, fistCreases: FIST_CREASES,
            F: fingerPath, FC: creasePath,
            skin, line, blush, tongueLine,
            filterId, seed, roughness,
        };
    },
};
</script>

<style scoped>
.gh-svg { overflow: visible; }

/* Notion 風：所有線端 / 轉角圓化 */
.gh-svg :is(rect, circle, ellipse, path, line, polyline) {
    stroke-linecap: round;
    stroke-linejoin: round;
}

/* 內部細節線（指節 / 指根 / 摺痕）：較細、半透明 */
.gh-crease {
    fill: none;
    stroke-width: 1.5;
    opacity: 0.45;
}
.gh-line {
    fill: none;
    stroke-width: 2.2;
}

.gh-anim {
    transform-box: fill-box;
    transform-origin: 50% 88%;
    will-change: transform;
}

/* ---- 全手動畫 ---- */
.gh-jab { animation: gh-jab 1.5s ease-in-out infinite; }
.gh-shake { animation: gh-shake 1.6s ease-in-out infinite; }
.gh-push { animation: gh-push 1.8s ease-in-out infinite; transform-origin: 50% 60%; }
.gh-pushslow { animation: gh-push 2.6s ease-in-out infinite; transform-origin: 50% 60%; }
.gh-throb { animation: gh-throb 1.7s ease-in-out infinite; transform-origin: 50% 55%; }
.gh-pump { animation: gh-pump 0.8s ease-in-out infinite; }
.gh-slide { animation: gh-slide 2.2s ease-in-out infinite; }
.gh-spin { animation: gh-spin 1.6s linear infinite; transform-origin: 50% 50%; }
.gh-wag { animation: gh-shake 1.3s ease-in-out infinite; transform-origin: 70% 30%; }
.gh-swing { animation: gh-jab 1.5s ease-in-out infinite; }
.gh-flick { animation: gh-flick 2.2s ease-in-out infinite; transform-origin: 50% 80%; }

@keyframes gh-jab {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-9px) scale(1.04); }
}
@keyframes gh-shake {
    0%, 100% { transform: rotate(-7deg); }
    50% { transform: rotate(7deg); }
}
@keyframes gh-push {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.14) translateY(-2px); }
}
@keyframes gh-throb {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.09); }
}
@keyframes gh-pump {
    0%, 100% { transform: translateY(-5px); }
    50% { transform: translateY(5px); }
}
@keyframes gh-slide {
    0%, 100% { transform: translateX(-10px); }
    50% { transform: translateX(10px); }
}
@keyframes gh-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
@keyframes gh-flick {
    0%, 60%, 100% { transform: rotate(0deg); }
    72% { transform: rotate(-26deg); }
}

/* ---- 局部動畫 ---- */
.gh-beckon { transform-box: fill-box; transform-origin: 50% 100%; animation: gh-beckonfinger 1.1s ease-in-out infinite; }
@keyframes gh-beckonfinger {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(28deg); }
}

.gh-rubthumb { transform-box: fill-box; transform-origin: 50% 50%; animation: gh-rub 0.5s ease-in-out infinite; }
@keyframes gh-rub {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-3px, 4px); }
}

.gh-spark { transform-box: fill-box; transform-origin: 30% 90%; animation: gh-sparkle 0.9s ease-in-out infinite; }
@keyframes gh-sparkle {
    0%, 100% { opacity: 0.2; transform: scale(0.7); }
    50% { opacity: 1; transform: scale(1.1); }
}

.gh-swingarm { transform-box: fill-box; transform-origin: 50% 100%; animation: gh-armswing 1.6s ease-in-out infinite; }
@keyframes gh-armswing {
    0%, 100% { transform: rotate(8deg); }
    50% { transform: rotate(-12deg); }
}

.gh-flickhand { transform-box: fill-box; transform-origin: 100% 100%; animation: gh-handflick 2.2s ease-in-out infinite; }
@keyframes gh-handflick {
    0%, 55%, 100% { transform: rotate(0deg) translateY(0); }
    70% { transform: rotate(-34deg) translateY(-8px); }
}

.gh-tongue { transform-box: fill-box; transform-origin: 50% 0%; animation: gh-tongueout 1.8s ease-in-out infinite; }
@keyframes gh-tongueout {
    0%, 100% { transform: scaleY(0.62); }
    50% { transform: scaleY(1); }
}

.gh-bitethumb { transform-box: fill-box; transform-origin: 50% 100%; animation: gh-bite 1.6s ease-in-out infinite; }
@keyframes gh-bite {
    0%, 60%, 100% { transform: translateX(0) rotate(0deg); }
    75% { transform: translateX(-7px) rotate(-12deg); }
}

@media (prefers-reduced-motion: reduce) {
    .gh-anim, .gh-beckon, .gh-rubthumb, .gh-spark, .gh-swingarm,
    .gh-flickhand, .gh-tongue, .gh-bitethumb { animation: none !important; }
}
</style>
