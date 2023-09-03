import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setToken } from "@/util/APIUtils";

const OAuth2RedirectHandler: React.FC = () => {
  const router = useRouter();

  const getUrlParameter = (name: string): string => {
    name = name.replace(/\[/, '\\[').replace(/]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  useEffect(() => {
    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if (token) {
      setToken(token);
      router.push('/user').then(/* Do Nothing */);
    } else {
      router.push({
        pathname: '/login',
        query: { error }
      }).then(/* Do Nothing */);
    }
  }, []);

  return null;
}

export default OAuth2RedirectHandler;