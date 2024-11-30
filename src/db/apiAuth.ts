import { DB_PROJECT_URL } from "@/lib/configure";
import { supabase } from "./config";
import { UserRoles } from "@/types/component.type";

export async function login({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);
	return data;
}

export async function register({
	firstName,
	lastName,
	email,
	password,
	role = "customer",
}: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role?: UserRoles;
}) {
	const avatar = "https://shorturl.at/vIjhF";
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				firstName,
				lastName,
				avatar,
				role,
			},
		},
	});

	if (error) throw new Error(error.message);
	return data;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
	const { data: session, error } = await supabase.auth.getSession();

	if (!session.session) return null;

	if (error) throw new Error(error.message);

	return session.session?.user;
}
