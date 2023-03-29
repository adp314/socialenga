import { useQuery } from "react-query";
import { BoardData } from "@/types";

export const useGetBoard = () => {
  return useQuery<BoardData | null>(["board"], async () => {
    const response: Response = await fetch("/api/user/get-board");
    const data: BoardData = await response.json();
    return data;
  });
};
