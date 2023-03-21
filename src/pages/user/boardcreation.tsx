import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { NavLayout } from "@/layouts/NavLayout";
import { prisma } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const board = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!board) {
    return {
      redirect: {
        destination: "/user/boardcreation",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const CreateBoard: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({}) => {
  return (
    <div className="h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <NavLayout />
    </div>
  );
};

export default CreateBoard;
