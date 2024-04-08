import { catagoryItems } from "@/app/constants/mockup";
import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilterSliceState {
  room: string;
  search: string;
  status: "idle" | "loading" | "failed";
}

const initialState: FilterSliceState = {
  room: catagoryItems[0].label,
  search: "",
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const filterSlice = createAppSlice({
  name: "filter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    setRoom: create.reducer((state, action: PayloadAction<string>) => {
      state.room = action.payload;
    }),
    setSearch: create.reducer((state, action: PayloadAction<string>) => {
      state.search = action.payload;
    }),
  }),
  selectors: {
    selectRoom: (room) => room.room,
    selectSearch: (room) => room.search,
    selectStatus: (room) => room.status,
  },
});

export const { setRoom, setSearch } = filterSlice.actions;

export const { selectRoom, selectStatus, selectSearch } = filterSlice.selectors;
