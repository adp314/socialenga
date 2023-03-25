import { NavLayout } from "@/layouts/NavLayout";
import { useState } from "react";
import { prisma } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

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
  const [boardData, setBoardData] = useState<Inputs>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const BoardSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("/api/user/post-board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardName: data.boardName,
          boardImage: data.boardImage,
          boardBanner: data.boardBanner,
        }),
      });
      if (response.ok) {
        const board = (await response.json()) as Inputs;
        setBoardData(board);
      } else {
        window.alert("Failed to create board");
      }
    } catch (err) {
      console.error(err);
    }
    console.log(boardData);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <NavLayout />
      <div className="flex h-full w-full items-center justify-center">
        <form
          className="flex flex-col gap-4 text-black"
          onSubmit={void handleSubmit(BoardSubmit)}
        >
          <input
            className="bg-neutral-200"
            {...register("boardName", { required: true })}
          />
          {errors.boardName && <span>This field is required</span>}
          <input
            className="bg-neutral-200"
            {...register("boardImage", { required: true })}
          />
          {errors.boardImage && <span>This field is required</span>}
          <input
            className="bg-neutral-200"
            {...register("boardBanner", { required: true })}
          />
          {errors.boardBanner && <span>This field is required</span>}
          <input type="submit" className="bg-neutral-200" />
        </form>
        <div>{boardData?.boardName}</div>
      </div>
    </div>
  );
};

export default BoardCreation;
