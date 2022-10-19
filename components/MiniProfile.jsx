import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function MiniProfile(props) {

  const {data: session} = useSession()

  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
        <img className='rounded-full border p-[2px] w-16 h-16' src={session?.user?.image} alt="" />

        <div className='flex-1 mx-4'>
            <h2 className='font-bold'>{session?.user?.username}</h2>
            <h3 className='text-sm text-gray-400'>Bem vindo ao Instagram</h3>
        </div>

        <button className='text-blue-400 text-sm font-semibold' onClick={signOut}>Sair</button>
    </div>
  )
}
