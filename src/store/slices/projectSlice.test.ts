import { Project } from "@/types/Project";
import projectReducer, { setProjects, addProject, updateProject, deleteProject } from "./projectsSlice";

describe("projectsSlice", () => {
    const initialState = { projects: [] as Project[], loading: false };
    const project1: Project = { id: "1", titulo: "Project 1" } as Project;
    const project2: Project = { id: "2", titulo: "Project 2" } as Project;

    it("should handle initial state", () => {
        expect(projectReducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should set projects", () => {
        const action = setProjects([project1, project2]);
        const state = projectReducer(initialState, action);
        expect(state.projects).toEqual([project1, project2]);
    });

    it("should add a project", () => {
        const action = addProject(project1);
        const state = projectReducer(initialState, action);
        expect(state.projects).toEqual([project1]);
    });

    it("should delete a project", () => {
        const action = deleteProject("1");
        const state = projectReducer({ projects: [project1, project2], loading: false }, action);
        expect(state.projects).toEqual([project2]);
        expect(state.projects).not.toContain(project1);
        expect(state.projects).toHaveLength(1);
    });

    it("should update a project", () => {
        const action = updateProject({ id: "1", titulo: "Updated Project 1" } as Project);
        const state = projectReducer({ projects: [project1, project2], loading: false }, action);
        expect(state.projects).toEqual([{ id: "1", titulo: "Updated Project 1" }, project2]);
        expect(state.projects[0].titulo).toBe("Updated Project 1");
    });


})

