import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { X } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    loading: false,
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "ghost", "outline", "danger"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    loading: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
export const Ghost: Story = { args: { variant: "ghost" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Danger: Story = { args: { variant: "danger" } };
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <X size={16} />,
    children: "Cerrar",
  },
};
export const Loading: Story = {
  args: { loading: true },
};
export const FullWidth: Story = {
  args: { className: "w-full" },
};
