import React from "react";

import { User } from "@/types/user";

type UserProps = {
  user: User | null;
};

function UserProfile({ user }: UserProps) {
  return (
    <div>
      {user && (
        <div>
          <div>
            <strong>Name:</strong> {user.name}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          {user.pictureUrl && (
            <div>
              <img src={user.pictureUrl} alt={user.name} width="100" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
