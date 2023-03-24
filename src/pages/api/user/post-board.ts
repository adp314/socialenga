import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/server/db";

type BoardInput = {
  boardName: string;
  boardImage: string;
  boardBanner: string;
};

export default async function createBoard(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "POST") {
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
  } else {
    res.status(405).end();
  }
}
