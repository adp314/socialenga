import { BiUser } from "react-icons/bi";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";

export const NavUserLogout = () => {
  const { t } = useTranslation(["nav"]);
  return (
    <div
      className="flex cursor-pointer items-center justify-end gap-3"
      onClick={() => void signIn()}
    >
      <p className="text-lg">{t("nav_connection")}</p>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-900 shadow-md">
        <BiUser className="text-xl text-white" />
      </div>
    </div>
  );
};
