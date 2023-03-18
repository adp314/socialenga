import socialenga_logo from "@/assets/images/Socialenga.png";
import Image from "next/image";
import { BiUser } from "react-icons/bi";
import { MdTranslate } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";
import { DropdownNav } from "@/components/DropdownNav";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { i18n } from "next-i18next.config";

export function NavLayout() {
  const { data: session } = useSession();
  const { t } = useTranslation(["common"]);
  const router = useRouter();

  const handleLanguageChange = (locale: string) => {
    void router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <nav className="flex h-16 w-full items-center justify-between bg-base-100 pr-4 font-Urbanist text-black shadow-xl">
      <div className="flex items-center justify-start">
        <div className="w-20">
          <Image src={socialenga_logo} alt="Socialenga logo" />
        </div>
        <p className="text-2xl font-bold text-indigo-900 ">Socialenga</p>
        <span className="mx-5 h-6 w-0.5 bg-[#1c103e79]"></span>

        <div className="dropdown dropdown-right">
          <button
            tabIndex={0}
            className="btn-sm  flex h-10 items-center justify-center rounded-md bg-indigo-300 text-white"
          >
            <MdTranslate className="text-xl text-black" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box flex w-max items-center justify-center bg-base-100 p-1.5 shadow"
          >
            <li>
              <a onClick={() => handleLanguageChange("en")}>EN</a>
            </li>
            <li>
              <a onClick={() => handleLanguageChange("fr")}>FR</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="form-control">
        <label className="input-group-sm input-group">
          <span className="border border-indigo-900 bg-indigo-900 ">
            <FaSearch className="text-white" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className=" input-bordered input-md w-56 border border-indigo-900"
          />
        </label>
      </div>
      {session ? (
        <DropdownNav />
      ) : (
        <div
          className="flex cursor-pointer items-center justify-end gap-3"
          onClick={() => void signIn()}
        >
          <p className="text-lg">{t("nav_connection")}</p>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-900 shadow-md">
            <BiUser className="text-xl text-white" />
          </div>
        </div>
      )}
    </nav>
  );
}
