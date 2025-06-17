"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Upload, User } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

// Form validation schema
const profileFormSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function DashboardSettings() {
    const { user, isLoaded } = useUser();
    const dbUser = useQuery(api.users.getUser, { userId: user?.id || "" });

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.emailAddresses[0].emailAddress || "",
        },
    });

    function onSubmit(data: ProfileFormValues) {
        console.log("Form submitted:", data);
        // Handle form submission here
        // You would typically update the user profile via API call
    }

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role.toLowerCase()) {
            case "admin":
                return "bg-blue-500/40 border-blue-500 text-white";
            case "vendor":
                return "bg-green-500/40 border-green-500 text-white";
            case "user":
                return "bg-gray-500/40 border-gray-500 text-white";
            default:
                return "bg-gray-500/40 border-gray-500 text-white";
        }
    };

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className="px-5 mb-5">
                <h1 className="text-2xl font-bold">Profile Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and profile information.
                </p>
            </div>

            <div className="p-5 space-y-6">
                {/* Profile Overview Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Overview</CardTitle>
                        <CardDescription>
                            Your current profile information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user.imageUrl} alt="Profile picture" />
                            </Avatar>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold">
                                        {user.firstName} {user.lastName}
                                    </h3>
                                    {dbUser?.role && <Badge className={getRoleBadgeColor(dbUser?.role)}>
                                        {dbUser?.role}
                                    </Badge>}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {user.emailAddresses[0].emailAddress}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    User ID: {user.id}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Edit Profile Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                        <CardDescription>
                            Update your personal information below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                {/* Profile Picture Section */}
                                <div className="space-y-2">
                                    <FormLabel>Profile Picture</FormLabel>
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage
                                                src={user.imageUrl}
                                                alt="Profile picture"
                                            />
                                        </Avatar>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-2"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Change Picture
                                        </Button>
                                    </div>
                                    <FormDescription>
                                        Upload a new profile picture. Recommended size: 400x400px.
                                    </FormDescription>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your first name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your last name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your email address"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This email will be used for account notifications and login.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <Button
                                        type="submit"
                                        className="w-full sm:w-auto"
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full sm:w-auto"
                                        onClick={() => form.reset()}
                                    >
                                        Reset Changes
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                {/* Account Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>
                            Read-only account details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Account Role
                                </label>
                                <div className="mt-1">
                                    {dbUser && <Badge className={getRoleBadgeColor(dbUser?.role)}>
                                        {dbUser?.role}
                                    </Badge>}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    User ID
                                </label>
                                <p className="mt-1 text-sm font-mono bg-muted px-2 py-1 rounded">
                                    {user.id}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
