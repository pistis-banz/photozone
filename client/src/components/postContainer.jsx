import { lazy, Suspense } from "react";
import PostLoader from "./postLoader";
const Post = lazy(() => import("./post.jsx"));

export default function PostContainer() {
  return (
    <section className="grid grid-cols-1 gap-4 m-4 my-6 space-x-3 sm:grid-cols-2 lg:grid-cols-3 lg:w-[90%] postContainer">
      <Suspense fallback={<PostLoader />}>
        <Post />
      </Suspense>
      <Suspense fallback={<PostLoader />}>
        <Post />
      </Suspense>
      <Suspense fallback={<PostLoader />}>
        <Post />
      </Suspense>
      <Suspense fallback={<PostLoader />}>
        <Post />
      </Suspense>
      <Suspense fallback={<PostLoader />}>
        <Post />
      </Suspense>
      <Suspense fallback={<PostLoader />}>
        <Post />
      </Suspense>
      <Suspense fallback={<PostLoader />}>
        <Post />
      </Suspense>
    </section>
  );
}
