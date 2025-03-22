// 讀取本地文件並轉換為 Base64
import fs from 'fs';

// 函式來進行截圖
export function saveBase64(data) {
    if (!data) {
        throw new Error('data is required');
    }
    // 保存 Base64 数据到文件中
    const screenshotBase64 = `data:image/png;base64,${data}`;
    fs.writeFileSync('screenshot-data.txt', screenshotBase64);
}