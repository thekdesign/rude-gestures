export default {
    content: ['./resources/**/*.{vue,html}'],

    theme: {
        extend: {
            colors: {
                // 環球失禮手勢圖鑑：做舊米紙底 + 墨褐主色 + 褪色磚紅貼籤 + 芥末赭金 + 灰綠標本標籤
                // 墨褐（primary）：標題、結構線、書脊
                primary: {
                    100: '#EDE6DB', 200: '#D7C7B3', 300: '#B8A084', 400: '#937659',
                    500: '#6F5640', 600: '#544031', 700: '#3F3026', 800: '#2C221B', 900: '#1A130D',
                },
                // 做舊米紙（paper）：底色、卡片、標籤紙
                paper: {
                    100: '#F6EEDC', 200: '#EEE2C9', 300: '#E0CEAA', 400: '#CBB387',
                    500: '#AF9466', 600: '#88714C', 700: '#615138', 800: '#403626', 900: '#211C13',
                },
                // 褪色磚紅（seal）：印章、危險標記、冒犯指數
                seal: {
                    100: '#F7E2D6', 200: '#EBBBA4', 300: '#DB8E70', 400: '#C96A4A',
                    500: '#B5563B', 600: '#94432D', 700: '#6F3222', 800: '#491F15', 900: '#270F0A',
                },
                // 芥末赭金（gold）：重點、徽章、強調字
                gold: {
                    100: '#F8EDCB', 200: '#EFD891', 300: '#E2BE58', 400: '#CFA336',
                    500: '#B0862A', 600: '#896720', 700: '#634A18', 800: '#3F2F0F', 900: '#221908',
                },
                // 灰綠（sage）：次要分類、標本籤、安靜的對比
                sage: {
                    100: '#E5EAE1', 200: '#C6D2C1', 300: '#9DB096', 400: '#728A6B',
                    500: '#546B4E', 600: '#3F523B', 700: '#2F3D2C', 800: '#1F291D', 900: '#121710',
                },
                // 暖中性灰（gray）：內文、淡字
                gray: {
                    100: '#F4F0E7', 200: '#E4DCCC', 300: '#CBBFA6', 400: '#9C8E73',
                    500: '#6F6450', 600: '#4E4537', 700: '#332D23', 800: '#1F1B14', 900: '#0F0D09',
                },
            },
            fontFamily: {
                // 內文走 Noto Sans TC；標題用 Noto Serif TC（襯線＝復古書感）；mono 用復古打字機味的 monospace
                sans: ['"Noto Sans TC"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
                serif: ['"Noto Serif TC"', 'Georgia', '"Times New Roman"', 'serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', '"SF Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
            },
        },
    },

    corePlugins: {
        preflight: false,
    },
};
