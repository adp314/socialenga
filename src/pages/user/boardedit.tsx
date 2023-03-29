import type { NextPage } from "next";
import { NavLayout } from "@/layouts/NavLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetBoard } from "@/hooks/useGetBoard";
import { BoardData } from "@/types";
import { FaTwitter, FaFacebookF, FaTiktok } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

const BoardEdit: NextPage = () => {
  const { data: board } = useGetBoard();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardData>();
  const onSubmit: SubmitHandler<BoardData> = (data) => console.log(data);

  return (
    <div className="h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] font-Urbanist text-white">
      <NavLayout />
      <div className="flex h-full w-full items-center justify-center">
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center gap-4 bg-neutral-200 p-6 text-black "
          >
            <span>
              Board name
              <input
                type="text"
                className="input w-full max-w-xs"
                defaultValue={board?.name}
                {...register("name", { required: true })}
              />
            </span>
            <span>
              Profil
              <input
                type="file"
                className="file-input-bordered file-input file-input-md w-full max-w-xs"
              />
            </span>
            <span>
              Banner
              <input
                type="file"
                className="file-input-bordered file-input file-input-md w-full max-w-xs"
              />
            </span>
            <div>
              <label>Social networks</label>
              <div className="flex w-max flex-col items-start gap-2 rounded bg-red-500 px-2">
                <div>
                  <span className="mt-2 flex items-center justify-start gap-2">
                    <FaTwitter className="text-2xl" />
                    <input
                      type="text"
                      className="input w-full max-w-xs"
                      defaultValue={board?.name}
                      {...register("name", { required: true })}
                    />
                  </span>
                </div>
                <div>
                  <span className="flex items-center justify-start gap-2">
                    <FaFacebookF className="text-2xl" />
                    <input
                      type="text"
                      className="input w-full max-w-xs"
                      defaultValue={board?.name}
                      {...register("name", { required: true })}
                    />
                  </span>
                </div>
                <div>
                  <span className="flex items-center justify-start gap-2">
                    <GrInstagram className="text-2xl" />
                    <input
                      type="text"
                      className="input w-full max-w-xs"
                      defaultValue={board?.name}
                      {...register("name", { required: true })}
                    />
                  </span>
                </div>
                <div>
                  <span className="flex items-center justify-start gap-2">
                    <FaTiktok className="text-2xl" />
                    <input
                      type="text"
                      className="input w-full max-w-xs"
                      defaultValue={board?.name}
                      {...register("name", { required: true })}
                    />
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BoardEdit;
