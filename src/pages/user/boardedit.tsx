import type { NextPage } from "next";
import { NavLayout } from "@/layouts/NavLayout";
import { useForm, SubmitHandler } from "react-hook-form";

type BoardEditFormInputs = {
  boardName: string;
  boardImage: string;
  boardBanner: string;
};

const BoardEdit: NextPage = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <NavLayout />
      <div className="flex items-center justify-center"></div>
    </div>
  );
};

export default BoardEdit;
