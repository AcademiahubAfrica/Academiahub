"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/messaging/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

interface Commenter {
  id: string;
  name: string | null;
  image: string | null;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  documentId: string;
  createdAt: string;
  user: Commenter;
}

interface CommentsProps {
  initialComments: Comment[];
  documentId: string;
  totalComments: number;
}

const Comments = ({
  initialComments,
  documentId,
  totalComments,
}: CommentsProps) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentCount, setCommentCount] = useState(totalComments);
  const [newComment, setNewComment] = useState("");
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const handlePost = () => {
    const content = newComment.trim();
    if (!content || isPending) return;

    startTransition(async () => {
      const res = await fetch(`/api/documents/${documentId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Failed to post comment:", data.error);
        return;
      }

      const comment: Comment = await res.json();
      setComments((prev) => [comment, ...prev]);
      setCommentCount((prev) => prev + 1);
      setNewComment("");
    });
  };

  const handleEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditSubmit = (commentId: string) => {
    const content = editContent.trim();
    if (!content || isPending) return;

    startTransition(async () => {
      const res = await fetch(
        `/api/documents/${documentId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        console.error("Failed to edit comment:", data.error);
        return;
      }

      const updated: Comment = await res.json();
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? updated : c))
      );
      setEditingId(null);
      setEditContent("");
    });
  };

  const handleDelete = (commentId: string) => {
    if (isPending) return;

    startTransition(async () => {
      const res = await fetch(
        `/api/documents/${documentId}/comments/${commentId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        const data = await res.json();
        console.error("Failed to delete comment:", data.error);
        return;
      }

      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setCommentCount((prev) => prev - 1);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  const handleEditKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    commentId: string
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEditSubmit(commentId);
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditContent("");
    }
  };

  const currentUserId = session?.user?.id;

  return (
    <div className="bg-white border border-[#D9D9D9] rounded-[15px] py-3.5 px-2.75 md:px-4.5">
      <h4 className="mb-2.5 text-sm lg:base font-medium lg:leading-5 leading-[130%]">
        Comments ({commentCount})
      </h4>

      <div className="flex items-center gap-1 md:gap-3.25 mb-3 md:-5 lg:mb-7">
        <Avatar className="size-7.5 md:size-10 ">
          <AvatarImage src={session?.user?.image || undefined} />
          <AvatarFallback>
            {getInitials(session?.user?.name || "")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 h-8.5 md:h-11.25 items-center gap-2">
          <Input
            className="bg-primary-light md:bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal h-full border-none rounded-lg shadow-xs"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isPending}
          />
          <Button
            className="h-full"
            onClick={handlePost}
            disabled={isPending || !newComment.trim()}
          >
            Post
          </Button>
        </div>
      </div>

      <div
        className="space-y-2 h-[50vh]! lg:h-[60vh]! pb-5 max-sm:overflow-y-auto md:overflow-hidden  md:space-y-2.75 max-sm:[scrollbar-width:none]
  max-sm:[&::-webkit-scrollbar]:display-none hover:overflow-auto"
      >
        {comments.map((comment) => {
          const isEditable =
            Date.now() - new Date(comment.createdAt).getTime() <=
            72 * 60 * 60 * 1000;

          return (
          <div
            className="flex items-center gap-1 md:gap-3.25 "
            key={comment.id}
          >
            <Avatar className="size-7.5 md:size-10 ">
              <AvatarImage src={comment.user.image || undefined} />
              <AvatarFallback>
                {getInitials(comment.user.name || "")}
              </AvatarFallback>
            </Avatar>
            <div className=" flex-1 space-y-0.5 ">
              <p className="font-semibold text-sm  leading-3.5 md:leading-4.5">
                {comment.user.name || "Anonymous"}
              </p>
              {editingId === comment.id ? (
                <div className="flex items-center gap-2">
                  <Input
                    className="text-xs md:text-sm h-8"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, comment.id)}
                    disabled={isPending}
                    autoFocus
                  />
                  <Button
                    size="sm"
                    onClick={() => handleEditSubmit(comment.id)}
                    disabled={isPending || !editContent.trim()}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-[#adadad]!"
                    onClick={() => {
                      setEditingId(null);
                      setEditContent("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <p className="font-normal text-xs md:text-sm leading-3.5 md:leading-4.5">
                  {comment.content}
                </p>
              )}
            </div>
            {currentUserId === comment.userId && editingId !== comment.id && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <EllipsisVertical className="size-4 text-grey" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-45 md:w-65 rounded-xl md:rounded-2xl p-1.5 md:p-2.5">
                  {isEditable && (
                  <DropdownMenuItem
                    onClick={() => handleEdit(comment)}
                    className="h-7 md:h-9 text-xs md:text-base gap-2 md:gap-3 hover:bg-[#adadad]!"
                  >
                    <Pencil className="size-3.5 md:size-5" />
                    Edit
                  </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(comment.id)}
                    className="h-7 md:h-9 text-xs md:text-base gap-2 md:gap-3"
                  >
                    <Trash2 className="size-3.5 md:size-5" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          );
        })}
        {comments.length === 0 && (
          <p className="text-center text-grey text-sm py-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default Comments;
