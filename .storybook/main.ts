// .storybook/main.ts
import type { StorybookConfig } from "@storybook/react-webpack5";
import type { Configuration as WebpackConfig } from "webpack";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: { name: "@storybook/react-webpack5", options: {} },
  docs: { autodocs: "tag" },

  // 👇 Tipamos cfg y agregamos alias + regla TS
  webpackFinal: async (cfg: WebpackConfig) => {
    cfg.resolve = cfg.resolve || {};
    cfg.resolve.extensions = [
      ...(cfg.resolve.extensions || []),
      ".ts",
      ".tsx",
    ];

    // Alias @ -> src
    cfg.resolve.alias = {
      ...(cfg.resolve.alias || {}),
      "@": path.resolve(__dirname, "../src"),
    };

    cfg.module = cfg.module || { rules: [] };
    cfg.module.rules = cfg.module.rules || [];

    cfg.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve("ts-loader"),
          options: { transpileOnly: true },
        },
      ],
    });

    return cfg;
  },

  // Docgen TS
  typescript: { reactDocgen: "react-docgen-typescript" },
};

export default config;
