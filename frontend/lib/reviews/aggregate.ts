import { cache } from "react";
import prisma from "@/prisma/connection";

export type ReviewAggregate = {
  average: number;
  total: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
};

export const getReviewAggregate = cache(
  async (documentId: string): Promise<ReviewAggregate> => {
    const grouped = await prisma.review.groupBy({
      by: ["rating"],
      where: { documentId },
      _count: { _all: true },
    });

    const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    let total = 0;
    let sum = 0;

    for (const g of grouped) {
      const r = g.rating as 1 | 2 | 3 | 4 | 5;
      if (r < 1 || r > 5) continue;
      const c = g._count._all;
      distribution[r] = c;
      total += c;
      sum += r * c;
    }

    return {
      average: total > 0 ? sum / total : 0,
      total,
      distribution,
    };
  }
);
