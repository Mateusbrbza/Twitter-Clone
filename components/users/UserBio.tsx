import axios from "axios";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import { GrMail } from "react-icons/gr";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";
import useFollowListModal from "@/hooks/useFollowListModal";

import Button from "../Button";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const router = useRouter();

  const editModal = useEditModal();
  const followersModal = useFollowListModal();

  const { isFollowing, toggleFollow } = useFollow(userId);

  const createConversationAndNavigate = async () => {
    if (currentUser) {
      try {
        await axios.put(`/api/messages/${fetchedUser?.id}`);
        router.push(`/messages?selectedUser=${fetchedUser?.id}`);
      } catch (error) {
        console.error("Error creating or finding conversation:", error);
      }
    }
  };

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end gap-2 p-2">
        {currentUser?.id !== userId && (
          <Button
            onClick={createConversationAndNavigate}
            label={<GrMail size={25} />}
            secondary
          />
        )}
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? "Unfollow" : "Follow"}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div
            className="
          flex
          flex-row
          items-center
          gap-2
          mt-4
          text-neutral-500
          "
          >
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div
            onClick={() => followersModal.onOpen("following")}
            className="flex flex-row items-center gap-1 cursor-pointer"
          >
            <p className="text-white">{fetchedUser?.followingCount || 0}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div
            onClick={() => followersModal.onOpen("followers")}
            className="flex flex-row items-center gap-1 cursor-pointer"
          >
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;