import type { Meta, StoryObj } from "@storybook/react";
import PostCard from "./PostCard";
import type { Post } from "@/types";

const samplePost: Post = {
  id: "p-demo",
  userId: "u1",
  content: "Post de ejemplo para Storybook",
  likes: 10,
  likedByMe: false,
  createdAt: new Date().toISOString(),
  comments: [
    { id: "c-1", postId: "p-demo", userId: "u2", text: "¡Buenísimo!", createdAt: new Date().toISOString() },
  ],
};

const meta: Meta<typeof PostCard> = {
  title: "Molecules/PostCard",
  component: PostCard,
  args: { post: samplePost },
};
export default meta;

type Story = StoryObj<typeof PostCard>;
export const Default: Story = {};
