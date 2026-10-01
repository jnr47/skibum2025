const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir:'tests/browser', timeout:30000, workers:2,
  use:{baseURL:'http://127.0.0.1:8000',headless:true,launchOptions:{args:['--enable-unsafe-swiftshader']},screenshot:'only-on-failure'},
  webServer:{command:'python3 -m http.server 8000 --bind 127.0.0.1',url:'http://127.0.0.1:8000',reuseExistingServer:!process.env.CI}
});
