import '../../app/globals.css'
import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import { clearToken } from "@/util/APIUtils";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

export default function User() {
  const router = useRouter();
  const { user: currentUser, loaded, fetchUser, isAuthenticated } = useCurrentUser();

  const signOut = () => {
    clearToken();
    redirect();
  }

  const redirect = () => {
    router.push('/login').then(/* Do Nothing */);
  };

  useEffect(() => {
    if (loaded && !isAuthenticated) {
      redirect();
    }
  }, [isAuthenticated, loaded]);

  return (
    <div>
      <button onClick={signOut}>Sign out</button>
      <button onClick={fetchUser}>Refresh</button>
      <div>
        {currentUser && (
          <div>
            <div>
              <strong>Name:</strong> {currentUser.name}
            </div>
            <div>
              <strong>Email:</strong> {currentUser.email}
            </div>
            {currentUser.pictureUrl && (
              <div>
                <img src={currentUser.pictureUrl} alt={currentUser.name} width="100" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
