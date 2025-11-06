
import type { Preview } from "@storybook/react";
import React from "react";
import "../src/app/globals.css";

import { Provider } from "react-redux";
import { store } from "../src/store";
import { SessionProvider } from "next-auth/react";

const preview: Preview = {
  parameters: {
    nextjs: { appDirectory: true },
    controls: { expanded: true },
  },
  decorators: [
    (Story) => (
      <SessionProvider>
        <Provider store={store}>
          <div className="min-h-screen bg-black text-white p-8">
            <Story />
          </div>
        </Provider>
      </SessionProvider>
    ),
  ],
};

export default preview;
