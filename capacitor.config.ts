import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sol.app',
  appName: 'sol-system',
  webDir: 'build',
  plugins: {
    StatusBar: {
      style: "DARK",
      backgroundColor: "transparent",
      overlaysWebView: true,
    }
  }
};

export default config;
