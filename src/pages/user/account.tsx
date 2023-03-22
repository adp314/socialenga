import type { NextPage } from "next";
import { useState } from "react";
import { NavLayout } from "@/layouts/NavLayout";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  firstname: string;
  lastname: string;
  exampleRequired: string;
};

const Account: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data.username);

  return (
    <div className="h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <NavLayout />
      <div className="mt-16 flex w-full items-center justify-center">
        <form
          className="form-control w-full max-w-xs rounded-lg bg-white p-4 text-black"
          onSubmit={void handleSubmit(onSubmit)}
        >
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            className="input-bordered input w-full max-w-xs"
            defaultValue="Username here"
            {...register("username")}
          />
          <input
            className="input-bordered input w-full max-w-xs"
            {...register("exampleRequired", { required: true })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Account;
