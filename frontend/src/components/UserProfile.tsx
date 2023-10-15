import React from "react";
import { Avatar } from "@nextui-org/react";
import { User as NextUser } from "@nextui-org/user";

import { User } from "@/types/user";

interface UserProps {
  user: User | null;
}

function UserProfile({ user }: UserProps) {
  return (
    <>
      <NextUser
        name={user?.name}
        description={user?.email}
        avatarProps={{
          src: user?.pictureUrl
        }}
        className="hidden sm:flex mt-0.5"
      />
      <Avatar
        src={user?.pictureUrl}
        className="flex sm:hidden mt-0.5"
      />
    </>
  );
}

export default UserProfile;
