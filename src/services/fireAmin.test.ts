/**
 * @jest-environment node
 */

import { addProject, updateProject, deleteProject } from "./fireAdmin";
import { collection, addDoc, updateDoc, deleteDoc, doc, getFirestore } from "firebase/firestore";

jest.mock("firebase/app", () => ({
    initializeApp: jest.fn(() => ({})),
}));

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(() => ({})),
}));

jest.mock("firebase/firestore", () => ({
    collection: jest.fn(),
    getDocs: jest.fn(),
    addDoc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    getFirestore: jest.fn(() => ({})),
}));

jest.mock("firebase/storage", () => ({
    getStorage: jest.fn(() => ({})),
}));

describe("fireAdmin service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should add a project and filter empty images", async () => {
        const data = {
            titulo: "Test Project",
            descripcion: "This is a test project",
            imagenes: ["http://image1.jpg", " ", "http://image2.jpg", ""],
        };

        const expected = {
            titulo: "Test Project",
            descripcion: "This is a test project",
            imagenes: ["http://image1.jpg", "http://image2.jpg"],
        };


        const mockCollection = {} as any;
        (collection as jest.MockedFunction<typeof collection>).mockReturnValue(mockCollection);


        const mockDocRef = { id: "12345" } as any;
        (addDoc as jest.MockedFunction<typeof addDoc>).mockResolvedValue(mockDocRef);

        const projectId = await addProject(data);

        expect(collection).toHaveBeenCalledWith(expect.anything(), "projects");
        expect(addDoc).toHaveBeenCalledWith(mockCollection, expected);
        expect(projectId).toBe("12345");
    });

    it("should update a project", async () => {
        const projectId = "12345";
        const updateData = { titulo: "Updated Project Title" };
        const mockDocRef = {} as any;
        (doc as jest.MockedFunction<typeof doc>).mockReturnValue(mockDocRef);

        await updateProject(projectId, updateData);

        expect(doc).toHaveBeenCalledWith(expect.anything(), "projects", projectId);
        expect(updateDoc).toHaveBeenCalledWith(mockDocRef, updateData);
        expect(updateDoc).toHaveBeenCalledTimes(1);
    });

    it("should delete a project", async () => {
        const projectId = "12345";
        const mockDocRef = {} as any;
        (doc as jest.MockedFunction<typeof doc>).mockReturnValue(mockDocRef);

        await deleteProject(projectId);

        expect(doc).toHaveBeenCalledWith(expect.anything(), "projects", projectId);
        expect(deleteDoc).toHaveBeenCalledWith(mockDocRef);
    });
});