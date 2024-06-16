"use client"

import { AppProps } from 'next/app';
import Layout from '../styles/layout';

import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';

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

  return (
    <>
    <div className='bg-gray-950 h-screen w-screen text-white'>
      <Navbar />
      <Billboard />
    </div>
    </>
  );
}
