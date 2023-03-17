//stores notes for each question

import { createSlice } from "@reduxjs/toolkit";
const noteSlice = createSlice({
  name: "note",
  initialState: [],
  reducers: {
    setInitialNote(state, action) {
      return (state = action.payload);
    },
    addNote(state, action) {
      const newState = Array.isArray(state) ? [...state, action.payload] : [action.payload];
      return newState;
    },
    
    deleteNote(state, action) {
      const newState = Array.isArray(state) ? state.filter((item) => item.id !== action.payload) : [];
      return newState;
    }
    
    
  },
});
export const { setInitialNote, addNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
