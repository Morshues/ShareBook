'use client'

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setToken } from "@/api/ApiClient";

const OAuth2RedirectHandler: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams?.get('token');
    const error = searchParams?.get('error');

    if (token) {
      setToken(token);
      router.push('/user');
    } else {
      router.push('/login?' + error);
    }
  }, []);

  return null;
}

export default OAuth2RedirectHandler;