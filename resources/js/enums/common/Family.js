import Enum from 'enum';

// 偽分類學「六科」——純粹按手型粗分，方便瀏覽用，不具任何學術效力（圖鑑會自己吐槽這點）
export const Family = new Enum([
    'FINGER', // 指頭科：靠一根指頭就能闖禍
    'DOUBLE', // 雙指科：兩根指頭的排列組合學
    'PALM',   // 手掌科：整隻手掌攤出來的暴力
    'THUMB',  // 拇指科：大拇指的善惡兩面
    'ARM',    // 拳臂科：動用到拳頭與前臂的重型武器
    'FACE',   // 顏面科：手要配上一張臉才完整的綜合技
], {ignoreCase: false});
