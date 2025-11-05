/** @type { import('@storybook/react').StorybookConfig } */
const config = {
    stories: ["../src/**/*.stories.@(ts|tsx|js|jsx)"],
    addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
    framework: {
      name: "@storybook/react",
      options: {},
    },
    docs: { autodocs: "tag" },
  };
  
  export default config;