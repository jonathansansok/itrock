import { Post, User } from "@/interfaces";
export const users: User[] = [
  { id: "u1", name: "Ada Lovelace", email: "tu@example.com", image: "/avatar1.png" },
  { id: "u2", name: "Jon", email: "jon@example.com", image: "/avatar2.png" },
];

export const posts: Post[] = [
  {
    id: "p1",
    userId: "u1",
    content: "Comentario bien Mock 🚀",
    likes: 2,
    createdAt: new Date().toISOString(),
    comments: [
      { id: "c1", postId: "p1", userId: "u2", text: "Bien!", createdAt: new Date().toISOString() },
    ],
  },
];
