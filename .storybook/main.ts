import type { StorybookConfig } from "@storybook/react-webpack5";
import type { Configuration as WebpackConfig } from "webpack";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: { name: "@storybook/react-webpack5", options: {} },
  docs: { autodocs: "tag" },

  // 👉 sirve para poder referenciar archivos de /public en las stories (imágenes locales, etc.)
  staticDirs: ["../public"],

  webpackFinal: async (cfg) => {
    const wb = cfg as WebpackConfig;

    wb.resolve = wb.resolve ?? {};
    wb.resolve.extensions = [...(wb.resolve.extensions ?? []), ".ts", ".tsx"];
    wb.resolve.alias = {
      ...(wb.resolve.alias ?? {}),
      "@": path.resolve(__dirname, "../src"),
    };

    wb.module = wb.module ?? { rules: [] };
    wb.module.rules = [
      ...(wb.module.rules ?? []),
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader", options: { transpileOnly: true } }],
      },
    ];

    return wb;
  },

  typescript: { reactDocgen: "react-docgen-typescript" },
};

export default config;
