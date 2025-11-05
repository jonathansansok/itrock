import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FeedState, Post } from "@/interfaces";
import type { ToggleLikePayload, AddCommentPayload } from "@/interfaces";

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
  },
});
export const { hydrateFeed, addPost, toggleLike, addComment } = slice.actions;
export default slice.reducer;
