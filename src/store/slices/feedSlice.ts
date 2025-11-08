import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Post, Comment } from "@/interfaces";

interface FeedState {
  posts: Post[];
}

const initialState: FeedState = { posts: [] };

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    hydrateFeed: (state, action: PayloadAction<Post[]>) => {
      if (state.posts.length === 0) state.posts = action.payload;
    },

    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },

    toggleLike: (state, action: PayloadAction<{ postId: string }>) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        post.likedByMe = !post.likedByMe;
        post.likes += post.likedByMe ? 1 : -1;
      }
    },

    addComment: (
      state,
      action: PayloadAction<{ postId: string; userId: string; comment: string }>
    ) => {
      const { postId, userId, comment } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        const newComment: Comment = {
          id: crypto.randomUUID(),
          postId,
          userId,
          text: comment,
          createdAt: new Date().toISOString(),
        };
        post.comments.unshift(newComment);
      }
    },

    removeComment: (
      state,
      action: PayloadAction<{ postId: string; commentId: string; userId: string }>
    ) => {
      const { postId, commentId, userId } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.comments = post.comments.filter(
          (c) => !(c.id === commentId && c.userId === userId)
        );
      }
    },

    toggleSave: (
      state,
      action: PayloadAction<{ postId: string; userId: string }>
    ) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (!post) return;
      post.savedBy = post.savedBy ?? [];
      const i = post.savedBy.indexOf(userId);
      if (i >= 0) post.savedBy.splice(i, 1);
      else post.savedBy.push(userId);
    },

    registerShare: (state, action: PayloadAction<{ postId: string }>) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (!post) return;
      post.shareCount = (post.shareCount ?? 0) + 1;
    },
  },
});

export const {
  hydrateFeed,
  addPost,
  toggleLike,
  addComment,
  removeComment,
  toggleSave,
  registerShare,
} = feedSlice.actions;

export default feedSlice.reducer;
