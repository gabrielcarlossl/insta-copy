import React from 'react'
import { getProviders, signIn as SignIn } from "next-auth/react"

import Header from '../../components/Header'


// Browser...
export default function signIn({ providers }) {
  return (
    <>
      <Header></Header>
      <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center'>

        <img className='w-80' src="https://links.papareact.com/ocw" alt="" />
        <div className='mt-40'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={() => SignIn(provider.id, {callbackUrl:'/'})}>Entrar com {provider.name}</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// Server side render
export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}