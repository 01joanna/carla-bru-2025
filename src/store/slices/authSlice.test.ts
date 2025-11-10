import authReducer, { setAdmin, clearAdmin } from './authSlice';
import { Admin } from '@/types/Admin';

describe("authSlice", () => {
    const initialState: Admin = {
        uid: null,
        email: null,
        role: null,
        isAdmin: false,
    };

    beforeEach(() => {
        process.env.NEXT_PUBLIC_ADMIN_EMAIL = "admin@test.com";
    });

    it("should handle initial state", () => {
        expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should give isAdmin=false if the email does not match", () => {
        const action = setAdmin({
            uid: "123",
            email: "user@prueba.com",
            role: "admin",
            isAdmin: true,
        });
        const res = authReducer(initialState, action);
        expect(res.isAdmin).toBe(false);
        expect(res.uid).toBe("123");
        expect(res.email).toBe("user@prueba.com");
        expect(res.role).toBe("admin");
    });

    it("should give isAdmin=true if the email matches", () => {
        const action = setAdmin({
            uid: "123",
            email: "admin@test.com",
            role: "admin",
            isAdmin: false,
        });
        const res = authReducer(initialState, action);
        expect(res.isAdmin).toBe(true);
        expect(res.uid).toBe("123");
        expect(res.email).toBe("admin@test.com");
        expect(res.role).toBe("admin");
    });

    it("should clear admin state", () => {
        const state: Admin = {
            uid: "123",
            email: "admin@test.com",
            role: "admin",
            isAdmin: true,
        };
        const res = authReducer(state, clearAdmin());
        expect(res).toEqual(initialState);
    });
});
