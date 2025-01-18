import type { LoginType, RegisterType } from "@/lib/types/auth-types";
import { dbTable, supabase, supabaseUrl } from "./config";
import { generateRandomString } from "@/lib/utils";

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

interface UpdateUserType {
	firstName?: string;
	lastName?: string;
	avatar?: File | string;
}

interface UpdateUserProps {
	data: UpdateUserType;
	imgName?: string;
}

async function updateUser({ data, imgName = "" }: UpdateUserProps) {
	const dataToUpdate: UpdateUserType = {};

	if (data.firstName) dataToUpdate.firstName = data.firstName;
	if (data.lastName) dataToUpdate.lastName = data.lastName;

	if (data.avatar) {
		const fileName = `${generateRandomString() + "_" + imgName}`;
		const { data: updatedAvatar, error } = await supabase.storage
			.from(dbTable.userAvatar)
			.upload(fileName, data.avatar);

		if (error) throw new Error(error.message);

		dataToUpdate.avatar = `${supabaseUrl}/storage/v1/object/public/${updatedAvatar.fullPath}`;
	}

	const { data: updatedData, error } = await supabase.auth.updateUser({
		data: dataToUpdate,
	});

	if (error) throw new Error(error.message);

	return updatedData;
}
export {
	registerUser,
	loginUser,
	logoutUser,
	getCurrentUser,
	getAllUser,
	updateUser,
};
