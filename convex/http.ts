import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { WebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";

const http = httpRouter();

http.route({
	path: "/clerk-users-webhook",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
        console.log("=== Webhook received ===");
		const event = await validateRequest(request);
		if (!event) {
			console.log("❌ Webhook validation failed");
			return new Response("Error occured", { status: 400 });
		}

		console.log("✅ Webhook validated");
		console.log("Event type:", event.type);
		console.log("User ID:", event.data.id);

		switch (event.type) {
			case "user.created": // intentional fallthrough
				console.log("🆕 Handling user.created");
				await ctx.runMutation(internal.users.createUser, {
					data: event.data,
				});
				break;
			case "user.updated":
				console.log("🔄 Handling user.updated");
				await ctx.runMutation(internal.users.updateUser, {
					data: event.data,
				});
				break;
			case "user.deleted": {
				const clerkUserId = event.data.id!;
				await ctx.runMutation(internal.users.deleteFromClerk, {
					clerkUserId,
				});
				break;
			}
			default:
				console.log("Ignored Clerk webhook event", event.type);
		}

		return new Response(null, { status: 200 });
	}),
});

async function validateRequest(req: Request): Promise<WebhookEvent | null> {
	const payloadString = await req.text();
	const svixHeaders = {
		"svix-id": req.headers.get("svix-id")!,
		"svix-timestamp": req.headers.get("svix-timestamp")!,
		"svix-signature": req.headers.get("svix-signature")!,
	};
	const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
	try {
		return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
	} catch (error) {
		console.error("Error verifying webhook event", error);
		return null;
	}
}

export default http;
