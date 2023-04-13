import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../util/AxiosInstance";
import { createProject } from "./projectReducer";

const initialState = {
  currentTeam: null,
  members: null,
  selectedList: [], // list containing member IDs that are selected
  filteredList: [], // list of members filtered to show those not selected
};

/**
 * returns user that has been added
 */
export const addMemberToTeam = createAsyncThunk(
  "teams/addMember",
  async (_, { getState }) => {
    const userId = getState().user.currentUser.id;
    const teamId = getState().team.currentTeam.id;
    const response = await axiosInstance.put(`/teams/${teamId}/${userId}/add`);
    return response.data;
  }
);

/**
 * returns updated list with the member removed
 */
export const removeMemberFromTeam = createAsyncThunk(
  "teams/removeMember",
  async (_, { getState }) => {
    const userId = getState().user.currentUser.id;
    const teamId = getState().team.currentTeam.id;
    const response = await axiosInstance.put(
      `/teams/${teamId}/${userId}/remove`
    );
    return response.data;
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.currentTeam = action.payload;
    },
    resetTeam: (state) => {
      state.currentTeam = null;
      state.members = null;
      state.selectedList = [];
      state.filteredList = [];
    },
    setMembers: (state, action) => {
      state.members = action.payload;
      state.filteredList = action.payload; // can remove this once set/clearFilteredList is hooked up with open/close modal
    },
    addMemberToSelectedList: (state, action) => {
      state.selectedList.push(action.payload);
      state.filteredList = state.filteredList.filter(
        (member) =>
          !state.selectedList.some(
            (selectedMember) => selectedMember.id == member.id
          )
      );
    },
    removeMemberFromSelectedList: (state, action) => {
      state.filteredList.push(action.payload);
      state.selectedList = state.selectedList.filter(
        (member) => member.id !== action.payload.id
      );
    },
    clearSelectedList: (state) => {
      state.selectedList = [];
    },
    setFilteredList: (state) => {
      state.filteredList = state.currentTeam.members;
    },
    clearFilteredList: (state) => {
      state.filteredList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMemberToTeam.fulfilled, (state, action) => {
      state.currentTeam.members.push(action.payload);
      state.members = state.currentTeam.members;
    });
    builder.addCase(removeMemberFromTeam.fulfilled, (state, action) => {
      state.currentTeam.members = action.payload;
      state.members = state.currentTeam.members;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.currentTeam.projects.push(action.payload);
    });
  },
});

export const {
  setTeam,
  resetTeam,
  setMembers,
  addMemberToSelectedList,
  removeMemberFromSelectedList,
  clearSelectedList,
  setFilteredList,
} = teamSlice.actions;

export default teamSlice.reducer;
