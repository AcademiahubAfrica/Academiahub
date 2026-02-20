export const frontendSpec = {
  openapi: "3.0.3",
  info: {
    title: "AcademiaHub Frontend API",
    version: "1.0.0",
    description:
      "Next.js API Routes — documents, profiles, notifications, analytics, auth. Authentication is cookie-based (NextAuth session cookie sent automatically by the browser). Log in at /login before using protected endpoints.",
  },
  servers: [
    {
      url: "/",
      description: "Next.js server (same origin)",
    },
  ],
  components: {
    schemas: {
      Error: {
        type: "object" as const,
        properties: {
          error: { type: "string" as const },
        },
      },
      MessageResponse: {
        type: "object" as const,
        properties: {
          message: { type: "string" as const },
        },
      },
      PaginationMeta: {
        type: "object" as const,
        properties: {
          page: { type: "integer" as const },
          limit: { type: "integer" as const },
          total: { type: "integer" as const },
          totalPages: { type: "integer" as const },
        },
      },
      UserPublic: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          name: { type: "string" as const, nullable: true },
          email: { type: "string" as const },
          image: { type: "string" as const, nullable: true },
        },
      },
      Bio: {
        type: "object" as const,
        nullable: true,
        properties: {
          institution: { type: "string" as const },
          department: { type: "string" as const },
          academicLevel: { type: "string" as const },
          aboutMe: { type: "string" as const },
          state: { type: "string" as const },
          country: { type: "string" as const },
        },
      },
      ProfileStats: {
        type: "object" as const,
        properties: {
          uploads: { type: "integer" as const },
          downloads: { type: "integer" as const },
          likes: { type: "integer" as const },
          saves: { type: "integer" as const },
        },
      },
      DocumentCategory: {
        type: "string" as const,
        enum: ["RESEARCH", "SEMINAR", "PROJECT", "ANALYSIS"],
      },
      Document: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          title: { type: "string" as const },
          description: { type: "string" as const },
          category: { $ref: "#/components/schemas/DocumentCategory" },
          institution: { type: "string" as const },
          year: { type: "integer" as const },
          fileUrl: { type: "string" as const },
          fileKey: { type: "string" as const },
          fileName: { type: "string" as const },
          fileSize: { type: "integer" as const },
          downloads: { type: "integer" as const },
          likes: { type: "integer" as const },
          authorId: { type: "string" as const },
          createdAt: { type: "string" as const, format: "date-time" },
          author: { $ref: "#/components/schemas/UserPublic" },
        },
      },
      Comment: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          content: { type: "string" as const },
          userId: { type: "string" as const },
          documentId: { type: "string" as const },
          createdAt: { type: "string" as const, format: "date-time" },
          user: { $ref: "#/components/schemas/UserPublic" },
        },
      },
      Notification: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          userId: { type: "string" as const },
          type: {
            type: "string" as const,
            enum: ["LIKE", "COMMENT", "UPLOAD", "MESSAGE", "SYSTEM"],
          },
          message: { type: "string" as const },
          read: { type: "boolean" as const },
          actorId: { type: "string" as const, nullable: true },
          documentId: { type: "string" as const, nullable: true },
          createdAt: { type: "string" as const, format: "date-time" },
        },
      },
    },
  },
  paths: {
    // ─── Auth ──────────────────────────────────────────────
    "/api/auth/token": {
      get: {
        summary: "Get the raw NextAuth session token (JWE)",
        description:
          "Returns the encrypted JWE session token from the NextAuth cookie. This token is passed as a Bearer token to the Express backend.",
        tags: ["Auth"],
        security: [],
        responses: {
          "200": {
            description: "Raw JWE token string",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    token: { type: "string" as const },
                  },
                },
              },
            },
          },
          "401": {
            description: "Not authenticated — no session cookie present",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/auth/verify-email": {
      post: {
        summary: "Verify a user's email with a code",
        tags: ["Auth"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object" as const,
                required: ["email", "code"],
                properties: {
                  email: { type: "string" as const, format: "email" },
                  code: { type: "string" as const },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Email verified successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "400": {
            description:
              "Missing fields, already verified, expired code, or invalid code",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
        },
      },
    },
    "/api/auth/resend-code": {
      post: {
        summary: "Resend email verification code",
        description:
          "Rate-limited to one request per 60 seconds per user.",
        tags: ["Auth"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object" as const,
                required: ["email"],
                properties: {
                  email: { type: "string" as const, format: "email" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Verification code sent successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "400": {
            description: "Missing email or already verified",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "429": {
            description: "Too many requests — wait before retrying",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "500": {
            description: "Failed to send verification code",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
        },
      },
    },

    // ─── Users ─────────────────────────────────────────────
    "/api/users": {
      get: {
        summary: "Get all users",
        description:
          "Returns all users. If the caller is authenticated, they are excluded from results.",
        tags: ["Users"],
        security: [],
        responses: {
          "200": {
            description: "Array of user objects",
            content: {
              "application/json": {
                schema: {
                  type: "array" as const,
                  items: { $ref: "#/components/schemas/UserPublic" },
                },
              },
            },
          },
          "501": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
        },
      },
      post: {
        summary: "Register a new user (sign up)",
        tags: ["Users"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object" as const,
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string" as const },
                  email: { type: "string" as const, format: "email" },
                  password: {
                    type: "string" as const,
                    format: "password",
                    minLength: 8,
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User created — verification email sent",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    message: { type: "string" as const },
                    email: { type: "string" as const },
                  },
                },
              },
            },
          },
          "409": {
            description: "Email already registered",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "501": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
        },
      },
      put: {
        summary: "Update a user by ID",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object" as const,
                required: ["id"],
                properties: {
                  id: { type: "string" as const },
                },
                additionalProperties: true,
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated user object",
          },
          "501": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a user by ID",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object" as const,
                required: ["id"],
                properties: {
                  id: { type: "string" as const },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Deleted user object",
          },
          "501": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
        },
      },
    },

    // ─── Profile ───────────────────────────────────────────
    "/api/profile/me": {
      get: {
        summary: "Get the authenticated user's own profile with stats",
        tags: ["Profile"],
        responses: {
          "200": {
            description: "Profile with stats",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    id: { type: "string" as const },
                    name: { type: "string" as const },
                    email: { type: "string" as const },
                    image: { type: "string" as const, nullable: true },
                    bio: { $ref: "#/components/schemas/Bio" },
                    stats: { $ref: "#/components/schemas/ProfileStats" },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      put: {
        summary: "Update authenticated user's profile bio",
        tags: ["Profile"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object" as const,
                required: [
                  "institution",
                  "department",
                  "academicLevel",
                  "state",
                  "country",
                ],
                properties: {
                  institution: { type: "string" as const },
                  department: { type: "string" as const },
                  academicLevel: { type: "string" as const },
                  aboutMe: { type: "string" as const },
                  state: { type: "string" as const },
                  country: { type: "string" as const },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated bio object",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    bio: { $ref: "#/components/schemas/Bio" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Missing required fields",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/profile/{userId}": {
      get: {
        summary: "Get another user's public profile with stats",
        tags: ["Profile"],
        parameters: [
          {
            in: "path" as const,
            name: "userId",
            required: true,
            schema: { type: "string" as const },
            description: "User ID",
          },
        ],
        responses: {
          "200": {
            description: "Public profile with stats (no email)",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    id: { type: "string" as const },
                    name: { type: "string" as const },
                    image: { type: "string" as const, nullable: true },
                    bio: { $ref: "#/components/schemas/Bio" },
                    stats: { $ref: "#/components/schemas/ProfileStats" },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },

    // ─── Documents ─────────────────────────────────────────
    "/api/documents": {
      get: {
        summary: "List documents with optional filtering and pagination",
        tags: ["Documents"],
        security: [],
        parameters: [
          {
            in: "query" as const,
            name: "authorId",
            schema: { type: "string" as const },
            description: "Filter by author ID",
          },
          {
            in: "query" as const,
            name: "category",
            schema: { type: "string" as const },
            description:
              'Filter by category (all | research | seminar | project | analysis). "all" returns everything.',
          },
          {
            in: "query" as const,
            name: "q",
            schema: { type: "string" as const },
            description: "Case-insensitive title search",
          },
          {
            in: "query" as const,
            name: "page",
            schema: { type: "integer" as const, default: 1, minimum: 1 },
          },
          {
            in: "query" as const,
            name: "limit",
            schema: {
              type: "integer" as const,
              default: 12,
              minimum: 1,
              maximum: 50,
            },
          },
        ],
        responses: {
          "200": {
            description: "Paginated document list",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    documents: {
                      type: "array" as const,
                      items: { $ref: "#/components/schemas/Document" },
                    },
                    pagination: {
                      $ref: "#/components/schemas/PaginationMeta",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Failed to fetch documents",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      post: {
        summary: "Upload a new document",
        tags: ["Documents"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object" as const,
                required: [
                  "title",
                  "description",
                  "category",
                  "institution",
                  "year",
                  "fileUrl",
                  "fileKey",
                  "fileName",
                ],
                properties: {
                  title: { type: "string" as const },
                  description: { type: "string" as const },
                  category: {
                    type: "string" as const,
                    enum: ["research", "seminar", "project", "analysis"],
                  },
                  institution: { type: "string" as const },
                  year: { type: "integer" as const },
                  fileUrl: { type: "string" as const },
                  fileKey: { type: "string" as const },
                  fileName: { type: "string" as const },
                  fileSize: { type: "integer" as const, default: 0 },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created document",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Document" },
              },
            },
          },
          "400": {
            description: "Missing required fields or invalid category",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Failed to create document",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/documents/{id}": {
      get: {
        summary:
          "Get a single document with author info and interaction status",
        tags: ["Documents"],
        parameters: [
          {
            in: "path" as const,
            name: "id",
            required: true,
            schema: { type: "string" as const },
            description: "Document ID",
          },
        ],
        responses: {
          "200": {
            description: "Document with isLiked and isSaved flags",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/Document" },
                    {
                      type: "object" as const,
                      properties: {
                        isLiked: { type: "boolean" as const },
                        isSaved: { type: "boolean" as const },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "Document not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/documents/{id}/save": {
      post: {
        summary: "Save (bookmark) a document",
        tags: ["Documents"],
        parameters: [
          {
            in: "path" as const,
            name: "id",
            required: true,
            schema: { type: "string" as const },
            description: "Document ID",
          },
        ],
        responses: {
          "201": {
            description: "Saved successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "409": {
            description: "Already saved",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Remove a document bookmark",
        tags: ["Documents"],
        parameters: [
          {
            in: "path" as const,
            name: "id",
            required: true,
            schema: { type: "string" as const },
            description: "Document ID",
          },
        ],
        responses: {
          "200": {
            description: "Unsaved successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "Not saved",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/documents/{id}/like": {
      post: {
        summary: "Like a document",
        description:
          "Increments the document's like counter and creates a LIKE notification for the author.",
        tags: ["Documents"],
        parameters: [
          {
            in: "path" as const,
            name: "id",
            required: true,
            schema: { type: "string" as const },
            description: "Document ID",
          },
        ],
        responses: {
          "201": {
            description: "Liked successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "409": {
            description: "Already liked",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Unlike a document",
        description: "Decrements the document's like counter.",
        tags: ["Documents"],
        parameters: [
          {
            in: "path" as const,
            name: "id",
            required: true,
            schema: { type: "string" as const },
            description: "Document ID",
          },
        ],
        responses: {
          "200": {
            description: "Unliked successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "Not liked",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/documents/{id}/download": {
      post: {
        summary: "Record a file download",
        description:
          "Creates a DownloadRecord and increments the document's download counter in a transaction.",
        tags: ["Documents"],
        parameters: [
          {
            in: "path" as const,
            name: "id",
            required: true,
            schema: { type: "string" as const },
            description: "Document ID",
          },
        ],
        responses: {
          "201": {
            description: "Download recorded successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "Document not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/documents/{id}/comments": {
      get: {
        summary: "Get comments for a document (paginated)",
        tags: ["Documents"],
        parameters: [
          {
            in: "path" as const,
            name: "id",
            required: true,
            schema: { type: "string" as const },
            description: "Document ID",
          },
          {
            in: "query" as const,
            name: "page",
            schema: { type: "integer" as const, default: 1, minimum: 1 },
          },
          {
            in: "query" as const,
            name: "limit",
            schema: {
              type: "integer" as const,
              default: 20,
              minimum: 1,
              maximum: 50,
            },
          },
        ],
        responses: {
          "200": {
            description: "Paginated comments",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    comments: {
                      type: "array" as const,
                      items: { $ref: "#/components/schemas/Comment" },
                    },
                    pagination: {
                      $ref: "#/components/schemas/PaginationMeta",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      post: {
        summary: "Add a comment to a document",
        description:
          "Creates a COMMENT notification for the document author (unless self-comment).",
        tags: ["Documents"],
        parameters: [
          {
            in: "path" as const,
            name: "id",
            required: true,
            schema: { type: "string" as const },
            description: "Document ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object" as const,
                required: ["content"],
                properties: {
                  content: {
                    type: "string" as const,
                    maxLength: 2000,
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Comment created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Comment" },
              },
            },
          },
          "400": {
            description: "Content required or exceeds 2000 characters",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "Document not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },

    // ─── Notifications ─────────────────────────────────────
    "/api/notifications": {
      get: {
        summary: "Get user's notifications (newest first, paginated)",
        tags: ["Notifications"],
        parameters: [
          {
            in: "query" as const,
            name: "page",
            schema: { type: "integer" as const, default: 1, minimum: 1 },
          },
          {
            in: "query" as const,
            name: "limit",
            schema: {
              type: "integer" as const,
              default: 20,
              minimum: 1,
              maximum: 50,
            },
          },
        ],
        responses: {
          "200": {
            description: "Paginated notifications",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    notifications: {
                      type: "array" as const,
                      items: { $ref: "#/components/schemas/Notification" },
                    },
                    pagination: {
                      $ref: "#/components/schemas/PaginationMeta",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/notifications/{id}/read": {
      patch: {
        summary: "Mark a single notification as read",
        tags: ["Notifications"],
        parameters: [
          {
            in: "path" as const,
            name: "id",
            required: true,
            schema: { type: "string" as const },
            description: "Notification ID",
          },
        ],
        responses: {
          "200": {
            description: "Notification marked as read",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "Notification not found or not owned by caller",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/notifications/read-all": {
      patch: {
        summary: "Mark all notifications as read",
        tags: ["Notifications"],
        responses: {
          "200": {
            description: "All notifications marked as read",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/notifications/unread-count": {
      get: {
        summary: "Get count of unread notifications",
        tags: ["Notifications"],
        responses: {
          "200": {
            description: "Unread count",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    count: { type: "integer" as const },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },

    // ─── Analytics ─────────────────────────────────────────
    "/api/analytics": {
      get: {
        summary:
          "Get authenticated user's stats and monthly download chart data",
        description:
          "Returns aggregate stats and download counts for the last 12 calendar months.",
        tags: ["Analytics"],
        responses: {
          "200": {
            description: "Stats and monthly downloads",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    stats: { $ref: "#/components/schemas/ProfileStats" },
                    monthlyDownloads: {
                      type: "array" as const,
                      items: {
                        type: "object" as const,
                        properties: {
                          month: {
                            type: "string" as const,
                            example: "Feb 2026",
                          },
                          count: { type: "integer" as const },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Something went wrong",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
  },
};
