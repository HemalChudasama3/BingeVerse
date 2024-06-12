"use client"

import { AppProps } from 'next/app';
import Layout from './layout';

import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';

import useCurrentUser from '@/hooks/useCurrentUser';
import { redirect } from 'next/dist/server/api-utils';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <>
    <h1>BingeVerse</h1>
    <p className='text-white'>Logged in as : {user?.name}</p>
    <button className='h-10 w-full bg-white' onClick={() => signOut()}>Logout</button>
    </>
  );
}
