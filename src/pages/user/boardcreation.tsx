import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { NavLayout } from "@/layouts/NavLayout";
import { prisma } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { useQuery } from "react-query";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });
  

  if (!session || !session.user || !session.user.board) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  const board = await prisma.board.findFirst({
    where: {
      boardName: session.user.board.boardName,
    },
  });

  if (!board) {
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
  return (
    <div className="h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <NavLayout />
    </div>
  );
};

export default BoardCreation;
