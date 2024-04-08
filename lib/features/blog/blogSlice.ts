import { generateThreads } from "@/app/utils/generate-dommy-data";
import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  photo: string;
  name: string;
  verified: boolean;
  bio: string;
  username: string;
  link: string;
}
export interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;
  author: User;
  tags: string[];
  room: string;
}
export interface BlogSliceState {
  blogs: Blog[];
  filteredBlogs: Blog[];
  status: "idle" | "loading" | "failed";
}

const initialState: BlogSliceState = {
  blogs: generateThreads(),
  filteredBlogs: [],
  status: "idle",
};

export const blogSlice = createAppSlice({
  name: "blog",
  initialState,
  reducers: (create) => ({
    increment: create.reducer((state, action: PayloadAction<Blog>) => {
      state.blogs.push(action.payload);
    }),
    decrement: create.reducer((state, action: PayloadAction<string>) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    }),

    filterByRoom: create.reducer(
      (
        state,
        action: PayloadAction<{
          room: string;
          search: string;
        }>
      ) => {
        const filteredSearch =
          action.payload.search !== ""
            ? state.blogs.filter((blog) =>
                blog.title
                  .toLowerCase()
                  .includes(action.payload.search.toLowerCase())
              )
            : state.blogs;

        const filteredRoom =
          action.payload.room !== "ทั้งหมด"
            ? state.blogs.filter((blog) => blog.room === action.payload.room)
            : state.blogs;

        state.filteredBlogs = filteredSearch.filter((blog) =>
          filteredRoom.includes(blog)
        );
      }
    ),
  }),

  selectors: {
    selectBlog: (blog) => blog.blogs,
    selectStatus: (blog) => blog.status,
  },
});

export const { decrement, increment, filterByRoom } = blogSlice.actions;

export const { selectBlog, selectStatus } = blogSlice.selectors;
