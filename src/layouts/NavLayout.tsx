import socialenga_logo from "@/assets/images/Socialenga.png";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { NavUserLogged } from "@/components/NavUserLogged";
import { TradBtn } from "@/components/TradBtn";
import { NavUserLogout } from "@/components/NavUserLogout";

export const NavLayout = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex h-16 w-full items-center justify-between bg-base-100 pr-4 font-Urbanist text-black shadow-xl">
      <div className="flex items-center justify-start">
        <div className="w-20">
          <Image src={socialenga_logo} alt="Socialenga logo" />
        </div>
        <p className="text-2xl font-bold text-indigo-900 ">Socialenga</p>
        <span className="mx-5 h-6 w-0.5 bg-[#1c103e79]"></span>
        <TradBtn />
      </div>

      <div className="form-control rounded-lg shadow">
        <label className="input-group-sm input-group">
          <span className=" bg-indigo-300 ">
            <FaSearch className="text-black" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className=" input-bordered input-md w-56 bg-neutral-50"
          />
        </label>
      </div>

      {session ? <NavUserLogged /> : <NavUserLogout />}
    </nav>
  );
};
