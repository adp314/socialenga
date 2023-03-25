import { NavLayout } from "@/layouts/NavLayout";
import { useState } from "react";
import { prisma } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
// import { useForm, type SubmitHandler } from "react-hook-form";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { number } from "zod";

type Inputs = {
  boardName: string;
  boardImage: string;
  boardBanner: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  const board = await prisma.board.findFirst({
    where: {
      boardHolderId: session.user.id,
      boardName: null,
    },
  });

  if (board?.boardName === null) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const BoardCreation: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({}) => {
  const [boardData, setBoardData] = useState<Inputs>({
    boardName: "",
    boardImage: "",
    boardBanner: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardData({
      ...boardData,
      [event.target.name]: event.target.value,
    });
  };
  const BoardSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/user/post-board", {
        method: "POST",
        body: JSON.stringify(boardData),
      });
      if (response.ok) {
        const boardResult = (await response.json()) as Inputs;
        console.log(
          `boardname : ${boardResult.boardName} & the boardImageURL: ${boardResult.boardImage}`
        );
      } else {
        window.alert("Failed to create board");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <NavLayout />
      <div className="flex h-full w-full items-center justify-center">
        <form className="flex flex-col gap-4 text-black" onSubmit={BoardSubmit}>
          <input
            type="text"
            value={boardData.boardName}
            onChange={handleChange}
            name="boardName"
          />
          <input
            type="text"
            value={boardData.boardImage}
            onChange={handleChange}
            name="boardImage"
          />

          <input
            type="text"
            value={boardData.boardBanner}
            onChange={handleChange}
            name="boardBanner"
          />

          <input type="submit" className="bg-neutral-200" />
        </form>
        <div>{boardData?.boardName}</div>
      </div>
    </div>
  );
};

export default BoardCreation;