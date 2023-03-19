import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export const NavUserLogged = () => {
  const { data: session } = useSession();
  return (
    <>
      {session && (
        <div className="flex cursor-pointer items-center justify-end gap-3">
          <p className="text-xl">{session.user.name}</p>

          <div className="dropdown dropdown-bottom dropdown-end">
            <label
              tabIndex={0}
              className="btn relative flex h-12 w-12 overflow-hidden rounded-xl shadow-md"
            >
              <Image
                src={session.user.image as string}
                alt="test"
                fill={true}
                object-fit="cover"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box mt-2 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a>Options</a>
              </li>
              <li onClick={() => void signOut()} className="hover:bg-red-300">
                <a>Deconnexion</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};