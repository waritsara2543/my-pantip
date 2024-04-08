"use client";
import React from "react";
import BlogCard from "./Card";
import { useAppSelector } from "@/lib/hooks";

const BlogList = () => {
  const blog = useAppSelector((state) => state.blog.filteredBlogs);

  return (
    <div className="pt-10">
      {blog.length === 0 ? (
        <div className="text-center text-2xl font-bold">No Blogs Found</div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-10 gap-5">
          {blog.map((item) => (
            <BlogCard
              key={item.id}
              title={item.title}
              img={item.image || "/logo.svg"}
              tag={item.tags}
              room={item.room}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
