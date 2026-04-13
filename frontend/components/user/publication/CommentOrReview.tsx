"use client";

import React, { useState } from "react";
import Reviews from "./Reviews";
import Comments from "./Comments";
import { Button } from "@/components/ui/button";
import type { ReviewAggregate } from "@/lib/reviews/aggregate";

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

type ReviewsProps = {
  documentId: string;
  aggregate: ReviewAggregate;
  userRating: number | null;
  canReview: boolean;
};

interface Props {
  comments: Comment[];
  id: string;
  totalcomments: number;
  reviewsProps: ReviewsProps;
}

const CommentOrReview = ({ comments, id, totalcomments, reviewsProps }: Props) => {
  const [showView, setShowView] = useState("comments");

  return (
    <>
      {showView === "reviews" && (
        <Button onClick={() => setShowView("comments")} variant={"ghost2"}>
          Comments
        </Button>
      )}
      {showView === "comments" ? (
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
          setShowView={setShowView}
        />
      ) : (
        <Reviews {...reviewsProps} />
      )}
    </>
  );
};

export default CommentOrReview;
