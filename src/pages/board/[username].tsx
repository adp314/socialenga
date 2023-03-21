import { useRouter } from "next/router";
import { NavLayout } from "@/layouts/NavLayout";
import { type NextPage } from "next";

const BoardPage: NextPage = () => {
  const router = useRouter();

  const { username } = router.query;
  return (
    <div className="animate-gradient bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <NavLayout />
      <div> board page = {username}</div>
    </div>
  );
};

export default BoardPage;
