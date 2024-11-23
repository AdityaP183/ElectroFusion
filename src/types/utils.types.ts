import React from "react";

export type ThemeColors =
	| "Zinc"
	| "Slate"
	| "Stone"
	| "Red"
	| "Orange"
	| "Blue"
	| "Violet";

export type ThemeColorsStateParams = {
	themeColor: ThemeColors;
	setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
};
