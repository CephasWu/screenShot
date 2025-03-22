FROM node:18-slim

# 設置環境變數
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    NODE_ENV=production \
    LANG=zh_TW.UTF-8 \
    LANGUAGE=zh_TW:zh \
    LC_ALL=zh_TW.UTF-8

# 更新並安裝 Chrome 依賴與字體
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxss1 \
    libxtst6 \
    wget \
    xdg-utils \
    gnupg \
    # 字體支援
    fonts-noto-cjk \
    fonts-wqy-microhei \
    fonts-wqy-zenhei \
    locales \
    # 安裝 Google Chrome
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends google-chrome-stable \
    # 設置語言環境
    && sed -i -e 's/# zh_TW.UTF-8 UTF-8/zh_TW.UTF-8 UTF-8/' /etc/locale.gen \
    && dpkg-reconfigure --frontend=noninteractive locales \
    && update-locale LANG=zh_TW.UTF-8 \
    # 清理
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb

# 設置工作目錄
WORKDIR /app

# 複製其餘代碼
COPY . .

RUN npm install

# 暴露端口
EXPOSE 3000

# 啟動應用
CMD ["npm", "start"]