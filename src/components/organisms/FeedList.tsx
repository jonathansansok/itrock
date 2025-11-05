import { Post } from "@/types";
import PostCard from "@/components/molecules/PostCard";

export default function FeedList({ posts }: { posts: Post[] }) {
  return <div className="space-y-4">{posts.map(p => <PostCard key={p.id} post={p} />)}</div>;
}