import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/server/db";

export default async function getBoard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).end(); // or redirect to login page
    return;
  }

  const board = await prisma.board.findFirst({
    where: {
      id: session.user.id,
      boardName: {
        not: null,
      },
    },
  });

  if (board) {
    res.status(200).send(board);
  } else {
    res.status(400).end();
  }
}
