"use client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { Post } from "@/interfaces";
import {
  addComment,
  removeComment,
  toggleLike,
  toggleSave,
} from "@/store/slices/feedSlice";
import PostHeader from "@/components/molecules/postcard/PostHeader";
import PostMedia from "@/components/molecules/postcard/PostMedia";
import PostActions from "@/components/molecules/PostActions";
import CommentList from "@/components/molecules/postcard/CommentList";
import CommentForm from "@/components/molecules/postcard/CommentForm";

export default function PostCard({ post }: { post: Post }) {
  const d = useDispatch();
  const currentUser = useSelector((s: RootState) => s.auth.user);
  const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated);

  const author = post.authorName || "Desconocido";
  const canComment = isAuth && !!currentUser?.id;
  const saved = (post.savedBy ?? []).includes(currentUser?.id ?? "");

  const submitComment = (text: string) => {
    if (!currentUser?.id) return;
    d(addComment({ postId: post.id, comment: text, userId: currentUser.id }));
  };

  const removeCommentAction = (commentId: string, userId: string) => {
    d(removeComment({ postId: post.id, commentId, userId }));
  };

  const toggleSaveAction = () => {
    if (!currentUser?.id) return;
    d(toggleSave({ postId: post.id, userId: currentUser.id }));
  };

  return (
    <article
      id={`post-${post.id}`}
      className="rounded-2xl bg-black/50 backdrop-blur-sm p-3 sm:p-4 scroll-mt-20"
    >
      <PostHeader authorLabel={author} userId={post.userId} />

      {post.imageUrl && (
        <PostMedia
          imageUrl={post.imageUrl}
          alt={post.content ? post.content.slice(0, 120) : ""}
          imageW={post.imageW}
          imageH={post.imageH}
          showBookmark
          saved={saved}
          toggleSaveAction={toggleSaveAction}
        />
      )}
      {post.content && (
        <p className="mt-2 whitespace-pre-wrap text-[15px] leading-6 text-neutral-100">
          {post.content}
        </p>
      )}

      <div className="mt-1 text-xs text-neutral-400">
        {new Date(post.createdAt).toLocaleString()}
      </div>

      <PostActions
        liked={!!post.likedByMe}
        likesCount={post.likes}
        likeAction={() => d(toggleLike({ postId: post.id }))}
        shareCount={post.shareCount ?? 0}
        shareUrl={`${window.location.origin}/feed#post-${post.id}`}
        saved={saved}
        toggleSaveAction={toggleSaveAction}
        showBookmark={!post.imageUrl}
      />

      <CommentList
        comments={post.comments}
        currentUserId={currentUser?.id}
        removeAction={removeCommentAction}
      />

      <CommentForm canComment={canComment} submitAction={submitComment} />
    </article>
  );
}
