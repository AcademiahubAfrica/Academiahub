export const backendSpec = {
  openapi: "3.0.3",
  info: {
    title: "AcademiaHub Africa Backend API",
    version: "1.0.0",
    description:
      "WebSocket companion REST API — conversations, messages, user search.",
  },
  servers: [
    {
      url: process.env.BACKEND_URL || "http://localhost:4000",
      description: "Express server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http" as const,
        scheme: "bearer",
        bearerFormat: "JWE",
        description:
          "Encrypted NextAuth session token obtained from GET /api/auth/token on the frontend.",
      },
    },
    schemas: {
      Error: {
        type: "object" as const,
        properties: {
          error: { type: "string" as const },
        },
      },
      UserRef: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          name: { type: "string" as const, nullable: true },
          image: { type: "string" as const, nullable: true },
        },
      },
      LastMessage: {
        type: "object" as const,
        nullable: true,
        properties: {
          id: { type: "string" as const },
          content: { type: "string" as const },
          senderId: { type: "string" as const },
          createdAt: { type: "string" as const, format: "date-time" },
        },
      },
      Conversation: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          participantAId: { type: "string" as const },
          participantBId: { type: "string" as const },
          participantA: { $ref: "#/components/schemas/UserRef" },
          participantB: { $ref: "#/components/schemas/UserRef" },
          createdAt: { type: "string" as const, format: "date-time" },
        },
      },
      ConversationSummary: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          otherParticipant: { $ref: "#/components/schemas/UserRef" },
          lastMessage: { $ref: "#/components/schemas/LastMessage" },
          lastReadMessageId: {
            type: "string" as const,
            nullable: true,
          },
          createdAt: { type: "string" as const, format: "date-time" },
        },
      },
      ReadReceipt: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          conversationId: { type: "string" as const },
          userId: { type: "string" as const },
          lastReadMessageId: {
            type: "string" as const,
            nullable: true,
          },
          user: {
            type: "object" as const,
            properties: {
              id: { type: "string" as const },
              name: { type: "string" as const, nullable: true },
            },
          },
        },
      },
      Message: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          conversationId: { type: "string" as const },
          senderId: { type: "string" as const },
          content: { type: "string" as const },
          createdAt: { type: "string" as const, format: "date-time" },
        },
      },
      PagedMessages: {
        type: "object" as const,
        properties: {
          messages: {
            type: "array" as const,
            items: { $ref: "#/components/schemas/Message" },
          },
          nextCursor: { type: "string" as const, nullable: true },
        },
      },
      UserSearchResult: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          name: { type: "string" as const, nullable: true },
          email: { type: "string" as const },
          image: { type: "string" as const, nullable: true },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/api/conversations": {
      post: {
        summary: "Find or create a 1-on-1 DM conversation",
        tags: ["Conversations"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object" as const,
                required: ["recipientId"],
                properties: {
                  recipientId: {
                    type: "string" as const,
                    description: "MongoDB ObjectId of the recipient user",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Existing or newly created conversation",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Conversation" },
              },
            },
          },
          "400": {
            description:
              "Missing/invalid recipientId or self-conversation attempt",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "401": { description: "Unauthorized — missing or invalid Bearer token" },
          "404": {
            description: "Recipient user not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "429": { description: "Rate limit exceeded (10 conversations per hour)" },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      get: {
        summary: "List all DM conversations for the authenticated user",
        description:
          "Returns conversations sorted by most recent message. Includes the other participant's info, the last message, and read receipt status.",
        tags: ["Conversations"],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description:
              "Array of conversation summaries sorted by most recent message",
            content: {
              "application/json": {
                schema: {
                  type: "array" as const,
                  items: { $ref: "#/components/schemas/ConversationSummary" },
                },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/conversations/{id}/receipts": {
      get: {
        summary: "Get read receipts for a conversation",
        tags: ["Conversations"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path" as const,
            name: "id",
            required: true,
            schema: { type: "string" as const },
            description: "Conversation ID",
          },
        ],
        responses: {
          "200": {
            description: "Array of read receipts with user info",
            content: {
              "application/json": {
                schema: {
                  type: "array" as const,
                  items: { $ref: "#/components/schemas/ReadReceipt" },
                },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "403": { description: "Forbidden — caller is not a participant" },
          "404": { description: "Conversation not found" },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/conversations/{id}/messages": {
      get: {
        summary: "Fetch paginated message history for a conversation",
        description:
          "Returns messages in reverse chronological order using cursor-based pagination.",
        tags: ["Messages"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path" as const,
            name: "id",
            required: true,
            schema: { type: "string" as const },
            description: "Conversation ID",
          },
          {
            in: "query" as const,
            name: "cursor",
            required: false,
            schema: { type: "string" as const },
            description: "Message ID to paginate from (cursor-based pagination)",
          },
          {
            in: "query" as const,
            name: "limit",
            required: false,
            schema: {
              type: "integer" as const,
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            description: "Number of messages to return",
          },
        ],
        responses: {
          "200": {
            description: "Paginated messages (newest first)",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PagedMessages" },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "403": { description: "Forbidden — not a participant" },
          "404": { description: "Conversation not found" },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/users/search": {
      get: {
        summary: "Search users by name to start a DM",
        description:
          "Returns up to 10 users whose name starts with the query string. Excludes the calling user from results.",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "query" as const,
            name: "q",
            required: true,
            schema: { type: "string" as const, minLength: 3 },
            description: "Name prefix to search for (minimum 3 characters)",
          },
        ],
        responses: {
          "200": {
            description: "Up to 10 matching users (excludes the caller)",
            content: {
              "application/json": {
                schema: {
                  type: "array" as const,
                  items: { $ref: "#/components/schemas/UserSearchResult" },
                },
              },
            },
          },
          "400": {
            description: "Query must be at least 3 characters",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "429": { description: "Rate limit exceeded (20 requests per minute)" },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/health": {
      get: {
        summary: "Health check",
        tags: ["System"],
        security: [],
        responses: {
          "200": {
            description: "Server is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    status: { type: "string" as const, example: "ok" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
