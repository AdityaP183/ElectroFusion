export type UserRoles = "customer" | "admin" | "vendor";

export interface User {
    id: string;
    email: string;
    user_metadata: {
        avatar: string;
        firstName: string;
        lastName: string;
        role: UserRoles;
    }
}
