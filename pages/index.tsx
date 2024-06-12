"use client"

import { AppProps } from 'next/app';
import Layout from '../styles/layout';

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
    <div className='bg-black h-screen w-screen'>

    <h1 className='text-white text-lg'>BingeVerse</h1>
    <p className='text-white'>Logged in as : {user?.name}</p>
    <button className='h-10 w-full bg-white' onClick={() => signOut()}>Logout</button>
    </div>
    </>
  );
}
