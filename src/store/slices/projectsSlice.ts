import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "@/types/Project";

interface ProjectsState {
    projects: Project[];
    loading: boolean;
}

const initialState: ProjectsState = {
    projects: [],
    loading: false,
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.projects = action.payload;
        },
        addProject(state, action: PayloadAction<Project>) {
            state.projects.push(action.payload);
        },
        updateProject(state, action: PayloadAction<Project>) {
            const index = state.projects.findIndex(project => project.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
        },
        deleteProject(state, action: PayloadAction<string>) {
            state.projects = state.projects.filter(project => project.id !== action.payload);
        },
    },
});

export const { setProjects, addProject, updateProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;
