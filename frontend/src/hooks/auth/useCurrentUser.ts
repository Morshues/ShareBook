import { useCallback, useEffect, useState } from "react";

import { getCurrentUser } from "@/api/ApiClient";
import { User } from "@/types/user";

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  const fetchUser = useCallback(async () => {
    setLoaded(false);
    try {
      const userResponse = await getCurrentUser();
      if (userResponse == null || userResponse.status != 'success') {
        setLoaded(true);
        return;
      }

      setUser(userResponse.data);
      setLoaded(true);
    }
    catch (error) {
      setUser(null);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchUser().then(/* Do Nothing */);
  }, [fetchUser]);

  const isAuthenticated = user != null;

  return { user, loaded, isAuthenticated };
};