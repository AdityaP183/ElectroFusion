import { Doc } from "../../convex/_generated/dataModel";

export type AuthCardSliderText = {
	title: string;
	subtitle: string;
};

export type CategoryWithChildren = Doc<"categories"> & {
	children: CategoryWithChildren[];
};
