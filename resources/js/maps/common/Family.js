import {Family} from 'enums/common/Family';
import {EnumMap} from 'libs/EnumMap';

// 各「科」的顯示資訊：偽拉丁學名 + emoji + 主題色 + 一句吐槽導語
export const familyMap = new EnumMap(Family, {
    FINGER: {
        label: '指頭科',
        latin: 'Digitus',
        shortLabel: '指頭',
        abbrev: 'DGT',
        emoji: '🖕',
        accent: '#B5563B',
        blurb: '只要一根指頭就能在十幾個國家被揍——人體效率最高的失禮器官。',
    },
    DOUBLE: {
        label: '雙指科',
        latin: 'Bidigitus',
        shortLabel: '雙指',
        abbrev: 'DUO',
        emoji: '✌️',
        accent: '#896720',
        blurb: '同樣兩根手指，比錯方向、轉個角度，從「勝利」變「問候全家」。',
    },
    PALM: {
        label: '手掌科',
        latin: 'Palma',
        shortLabel: '手掌',
        abbrev: 'PLM',
        emoji: '🖐️',
        accent: '#546B4E',
        blurb: '攤開五指看似無害，在某些地方等於把一整桶髒話潑到對方臉上。',
    },
    THUMB: {
        label: '拇指科',
        latin: 'Pollex',
        shortLabel: '拇指',
        abbrev: 'PLX',
        emoji: '👍',
        accent: '#6F3222',
        blurb: '你以為的「讚」，在地中海到中東是叫人「坐到某個地方上去」。',
    },
    ARM: {
        label: '拳臂科',
        latin: 'Bracchium',
        shortLabel: '拳臂',
        abbrev: 'BRC',
        emoji: '✊',
        accent: '#2F3D2C',
        blurb: '當一根手指不夠看，就動用整條手臂——失禮界的重型火砲。',
    },
    FACE: {
        label: '顏面科',
        latin: 'Facies',
        shortLabel: '顏面',
        abbrev: 'FAC',
        emoji: '😝',
        accent: '#634A18',
        blurb: '手必須配上一張欠揍的臉才算完整，純手部演出在這科不予收錄。',
    },
});

// familyList：給 filter chips / section headers / sidebar 索引用
export const familyList = familyMap.entries()
    .map(([enumValue, value]) => ({
        key: enumValue.key,
        ...value,
    }));
