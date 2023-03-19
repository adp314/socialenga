import { MdTranslate } from "react-icons/md";
import { useRouter } from "next/router";

export const TradBtn = () => {
  const router = useRouter();
  const handleLanguageChange = (locale: string) => {
    void router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className="dropdown-right dropdown">
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
  );
};
