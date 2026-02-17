import type {
  ConversationListItem,
  Conversation,
  MessagePage,
  ReadReceipt,
  UserSearchResult,
} from "@/app/_types/messaging";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

async function authFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const tokenRes = await fetch("/api/auth/token");
  if (!tokenRes.ok) throw new Error("Not authenticated");
  const { token } = await tokenRes.json();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }

  return res.json();
}

export function fetchConversations(): Promise<ConversationListItem[]> {
  return authFetch("/api/conversations");
}

export function createConversation(
  recipientId: string,
): Promise<Conversation> {
  return authFetch("/api/conversations", {
    method: "POST",
    body: JSON.stringify({ recipientId }),
  });
}

export function fetchMessages(
  conversationId: string,
  cursor?: string,
): Promise<MessagePage> {
  const params = new URLSearchParams();
  if (cursor) params.set("cursor", cursor);
  const qs = params.toString();
  return authFetch(
    `/api/conversations/${conversationId}/messages${qs ? `?${qs}` : ""}`,
  );
}

export function fetchReceipts(
  conversationId: string,
): Promise<ReadReceipt[]> {
  return authFetch(`/api/conversations/${conversationId}/receipts`);
}

export function searchUsers(query: string): Promise<UserSearchResult[]> {
  return authFetch(`/api/users/search?q=${encodeURIComponent(query)}`);
}
