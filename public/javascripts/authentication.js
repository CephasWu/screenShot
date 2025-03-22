export function cookies(_sysusersession, sysusersession) {
    const cookiesData = [
        {
            name: '_sysusersession',  // 設定 cookie 的名稱
            value: _sysusersession,  // 設定 cookie 的值
            domain: '.udngroup.com',  // 確保 domain 與你要訪問的頁面一致
            path: '/eip/',
            expires: -1,
            size: '977',
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            priority: 'Medium',
        },
        {
            name: 'eip_token',  // 設定 cookie 的名稱
            value: '1',
            domain: 'eip.udngroup.com',  // 確保 domain 與你要訪問的頁面一致
            path: '/',
            expires: -1,
            size: '10',
            priority: 'Medium',
        },
        {
            name: 'sysusersession',  // 設定 cookie 的名稱
            value: sysusersession,
            domain: '.udngroup.com',  // 確保 domain 與你要訪問的頁面一致
            path: '/',
            expires: -1,
            size: '46',
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            priority: 'Medium',
        },
    ];
    return cookiesData;
}