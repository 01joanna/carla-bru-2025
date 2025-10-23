import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "@/types/Project";

interface ProjectsState {
    items: Project[];
    loading: boolean;
}

const initialState: ProjectsState = {
    items: [],
    loading: false,
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.items = action.payload;
        },
    },
});

export const { setProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
