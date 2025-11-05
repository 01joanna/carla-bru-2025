export interface Admin {
    uid: string | null;
    email: string | null;
    role: "admin" | "superadmin" | null;
    isAdmin: boolean;
}