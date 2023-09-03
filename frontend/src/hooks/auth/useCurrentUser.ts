import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { getCurrentUser } from "@/util/APIUtils";

export const useCurrentUser = () => {
  const [isInit, setIsInit] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isInit) {
      setIsInit(false);
      fetchUser().then(/* Do Nothing */);
    }
  }, [isInit]);

  const fetchUser = async () => {
    setLoaded(false);
    try {
      const newUser = await getCurrentUser();
      if (newUser == null) {
        setLoaded(true);
        return;
      }

      setUser(newUser);
      setLoaded(true);
    }
    catch (error) {
      setUser(null);
      setLoaded(true);
    }
  };

  const isAuthenticated = user != null;

  return { user, loaded, fetchUser, isAuthenticated };
};