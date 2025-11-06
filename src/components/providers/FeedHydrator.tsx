"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import type { Post } from "@/interfaces";
import { hydrateFeed } from "@/store/slices/feedSlice";

export default function FeedHydrator({ posts }: { posts: Post[] }) {
  const d = useDispatch();
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;
    once.current = true;
    if (posts?.length) d(hydrateFeed(posts));
  }, [d, posts]);

  return null;
}
