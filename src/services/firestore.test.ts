/**
 * @jest-environment node
 */

import { fetchProjects } from "./firestore";
import { collection, getDocs } from "firebase/firestore";

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
    getFirestore: jest.fn(() => ({})),
    getDoc: jest.fn(),
}));

jest.mock("firebase/storage", () => ({
    getStorage: jest.fn(() => ({})),
}));


describe("firestore service", () => {
    it("should fetch all projects correctly", async () => {
        const docs = [
            {
                id: "1",
                data: () => ({ titulo: "projecto 1" }),
            },
            {
                id: "2",
                data: () => ({ titulo: "projecto 2" }),
            },
        ];

        const mockQuery = { docs: docs } as unknown as ReturnType<typeof getDocs>;

        (getDocs as jest.MockedFunction<typeof getDocs>).mockResolvedValue(mockQuery);

        const res = await fetchProjects();

        expect(res).toEqual([
            { id: "1", titulo: "projecto 1" },
            { id: "2", titulo: "projecto 2" },
        ]);

        expect(collection).toHaveBeenCalledWith(expect.anything(), "projects");
    });
});
