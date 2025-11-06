import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FeedState, Post } from "@/interfaces";
import type { ToggleLikePayload, AddCommentPayload, RemoveCommentPayload } from "@/interfaces";

const initial: FeedState = { posts: [], loading: false, error: null };

const slice = createSlice({
  name: "feed",
  initialState: initial,
  reducers: {
    hydrateFeed(state, action: PayloadAction<Post[]>) { state.posts = action.payload; },
    addPost(state, action: PayloadAction<Post>) { state.posts.unshift(action.payload); },
    toggleLike(state, action: PayloadAction<ToggleLikePayload>) {
      const p = state.posts.find(x => x.id === action.payload.postId);
      if (p) { p.likedByMe = !p.likedByMe; p.likes += p.likedByMe ? 1 : -1; }
    },
    addComment(state, action: PayloadAction<AddCommentPayload>) {
      const p = state.posts.find(x => x.id === action.payload.postId);
      if (p) {
        p.comments.unshift({
          id: crypto.randomUUID(),
          postId: p.id,
          userId: action.payload.userId,
          text: action.payload.comment,
          createdAt: new Date().toISOString(),
        });
      }
    },
    removeComment(state, action: PayloadAction<RemoveCommentPayload>) {
      const { postId, commentId, userId } = action.payload;
      const p = state.posts.find(x => x.id === postId);
      if (!p) return;
      const idx = p.comments.findIndex(c => c.id === commentId && c.userId === userId);
      if (idx !== -1) p.comments.splice(idx, 1);
    },
  },
});

export const { hydrateFeed, addPost, toggleLike, addComment, removeComment } = slice.actions;
export default slice.reducer;
