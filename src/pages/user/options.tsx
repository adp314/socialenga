import type { NextPage } from "next";
import { NavLayout } from "@/layouts/NavLayout";

const Options: NextPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <NavLayout />
      <div className="mt-16 flex w-full items-center justify-center">
        <form
          className="form-control w-full max-w-xs rounded-lg bg-white p-4"
          onSubmit={handleSubmit}
        >
          <label className="label" htmlFor="name">
            <span className="label-text">What is your name?</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Type here"
            className="input-bordered input w-full max-w-xs"
          />
          <button className="btn mt-4" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Options;
