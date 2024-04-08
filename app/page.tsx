import type { Metadata } from "next";
import dynamic from "next/dynamic";
const BlogList = dynamic(() => import("./components/BlogList"), {
  ssr: false,
});

export default function IndexPage() {
  return (
    <div className="lg:px-20 px-10 pt-10">
      <BlogList />
    </div>
  );
}

export const metadata: Metadata = {
  title: "My Pantip",
  description: "A clone of Pantip",
  icons: {
    icon: "/logo.png",
  },
};
