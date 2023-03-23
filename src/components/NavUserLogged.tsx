import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";

type BoardData = {
  id: string;
  userId: string;
  boardName: string;
  boardImage: string;
  boardBanner: string;
};

const BoardCheck = () => {
  return useQuery<BoardData | null>(["board"], async () => {
    const response: Response = await fetch("/api/user/get-board");
    const data = (await response.json()) as BoardData;
    return data;
  });
};
export const NavUserLogged = () => {
  const { data: session } = useSession();
  const { data: boardCheck } = BoardCheck();
  return (
    <>
      {session && (
        <div className="flex cursor-pointer items-center justify-end gap-3">
          <p className="text-xl">{session.user.name}</p>

          <div className="dropdown-bottom dropdown-end dropdown">
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
              {!boardCheck ? (
                <li>
                  <Link href="/user/boardcreation">Create Board</Link>
                </li>
              ) : null}
              <li>
                <Link href="/user/account">Account</Link>
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
