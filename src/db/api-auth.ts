import type { LoginType, RegisterType } from "@/lib/types/auth-types";
import { supabase } from "./config";
import { User } from "@/lib/types/user-types";

async function registerUser(registerData: RegisterType) {
	const avatar = "https://shorturl.at/vIjhF";
	const [firstName, ...rest] = registerData.fullName.split(" ");
	const lastName = rest.join(" ");
	const { data, error } = await supabase.auth.signUp({
		email: registerData.email,
		password: registerData.password,
		options: {
			data: {
				avatar,
				firstName: firstName,
				lastName: lastName,
				role: registerData.role || "customer",
			},
		},
	});

	if (error) throw new Error(error.message);

	return data.user;
}

async function loginUser(loginData: LoginType) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: loginData.email,
		password: loginData.password,
	});

	if (error) throw new Error(error.message);

	return data.user;
}

async function logoutUser() {
	const { error } = await supabase.auth.signOut();

	if (error) throw new Error(error.message);

	return { success: true, message: "Logout successful" };
}

async function getCurrentUser() {
	const { data: session, error } = await supabase.auth.getSession();

	if (!session.session) return null;

	if (error) throw new Error(error.message);

	return session.session?.user;
}

async function getAllUser() {
	const { data, error } = await supabase.auth.admin.listUsers();

	if (error) throw new Error(error.message);

	return data;
}

type UpdateUserType = Omit<User, "id" | "user_metadata"> & {
	password: string;
	user_metadata: Omit<User["user_metadata"], "role">;
};

// async function updateUser(id: string | undefined, data: UpdateUserType) {
//     if (!id) throw new Error("User ID is required.");

//     const {data, error} = await supabase.auth.updateUser()
// }

// }
export { registerUser, loginUser, logoutUser, getCurrentUser, getAllUser };
