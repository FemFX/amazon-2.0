"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { UserService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export interface IFavoriteButtonProps {
  productId: number;
}

const FavoriteButton: FC<IFavoriteButtonProps> = ({ productId }) => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { profile } = useProfile();

  const { mutate } = useMutation(
    ["toggle favorite"],
    () => UserService.toggleFavorite(productId),
    {
      onSuccess() {
        queryClient.invalidateQueries(["get profile"]);
      },
    }
  );

  if (!profile) return null;

  const isExists = profile.favorites.some(
    (favorite) => favorite.id === productId
  );

  return (
    <div>
      <button onClick={() => mutate()} className="text-primary">
        {isExists ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
    </div>
  );
};
export default FavoriteButton;
