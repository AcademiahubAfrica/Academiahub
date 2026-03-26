"use client";

import React, { useState } from "react";
import Reviews from "./Reviews";
import Comments from "./Comments";
import { Button } from "@/components/ui/button";
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
  createdAt: Date;
  user: Commenter;
}

interface Props {
  comments: Comment[];
  id: string;
  totalcomments: number;
}

const CommentOrReview = ({ comments, id, totalcomments }: Props) => {
  const [show, setShow] = useState("comments");

  const handleView = () => {
    setShow("reviews");
    if (show === "reviews") {
      setShow("comments");
    }
  };
  return (
    <>
      {show === "reviews" && (
        <Button onClick={() => handleView()} variant={"ghost2"}>
          {" "}
          Comments{" "}
        </Button>
      )}
      {show === "comments" ? (
        <Comments
          initialComments={comments.map((c) => ({
            id: c.id,
            content: c.content,
            userId: c.userId,
            documentId: c.documentId,
            createdAt: c.createdAt.toISOString(),
            user: c.user,
          }))}
          documentId={id}
          totalComments={totalcomments}
          onChangeView={handleView}
        />
      ) : (
        <Reviews />
      )}
    </>
  );
};

export default CommentOrReview;
