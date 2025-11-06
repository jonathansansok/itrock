import type { Meta, StoryObj } from "@storybook/react";
import PostCard from "./PostCard";
import type { Post } from "@/interfaces";

const samplePost: Post = {
  id: "p-demo",
  userId: "u1",
  authorName: "Jonathan Sansó",
  content: "Post de ejemplo para Storybook con imagen.",
  imageUrl: "https://picsum.photos/400/400?grayscale",
  likes: 12,
  likedByMe: false,
  createdAt: new Date().toISOString(),
  comments: [
    { id: "c1", postId: "p-demo", userId: "u2", text: "🔥 Me encantó", createdAt: new Date().toISOString() },
    { id: "c2", postId: "p-demo", userId: "u3", text: "👏 Muy bueno", createdAt: new Date().toISOString() },
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
