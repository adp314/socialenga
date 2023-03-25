import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/server/db";

type BoardInput = {
  boardName: string;
  boardImage: string;
  boardBanner: string;
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  const boardInput = req.body as BoardInput;

  const board = await prisma.board.create({
    data: {
      boardName: boardInput.boardName,
      boardImage: boardInput.boardImage,
      boardBanner: boardInput.boardBanner,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  res.status(201).send(board);
}
