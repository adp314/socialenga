import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { z } from "zod";

type BoardInput = {
  name: string;
  image: string;
  banner: string;
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({
    req,
    res,
  });

  if (!session) {
    res.status(401).end();
    console.error("no session");
    return;
  }

  const boardInput = JSON.parse(req.body) as BoardInput;

  const board = await prisma.board.create({
    data: {
      name: boardInput.name,
      image: boardInput.image,
      banner: boardInput.banner,
      holderId: session.user.id,
    },
  });
  console.log(board);

  res.status(201).send(board);
}
