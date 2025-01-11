import type { UserRoles } from "./user-types";

export interface RegisterType {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRoles;
}

export interface LoginType {
    email: string;
    password: string;
}