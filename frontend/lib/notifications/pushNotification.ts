/**
 * Pushes a notification to a user via the Express Socket.IO backend.
 * Called from Next.js API routes after creating a notification in the DB.
 */
export async function pushNotification(
  userId: string,
  notification: {
    id: string;
    type: string;
    message: string;
    link: string | null;
    actorId: string | null;
    createdAt: Date;
  }
) {
  const backendUrl = process.env.BACKEND_URL;
  const secret = process.env.INTERNAL_API_SECRET;

  if (!backendUrl || !secret) return;

  try {
    await fetch(`${backendUrl}/internal/notify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        userId,
        notification: {
          id: notification.id,
          type: notification.type,
          message: notification.message,
          link: notification.link,
          actorId: notification.actorId,
          createdAt: notification.createdAt.toISOString(),
        },
      }),
    });
  } catch (err) {
    console.error("Failed to push notification via Socket.IO:", err);
  }
}
