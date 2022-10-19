import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import Stories from './Stories'
import Posts from './Posts'
import MiniProfile from './MiniProfile'
import Suggestions from './Suggestions'

export default function Feed(props) {

  const { data: session } = useSession()

  return (
    <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>

      {/* section */}
      <section className='col-span-2'>

        {/* stories */}
        <Stories></Stories>

        {/* posts */}
        <Posts></Posts>

      </section>

      {session && (
            
      <section className='hidden xl:inline-grid md:col-span-1'>
        <div className='fixed top-20'>

          <MiniProfile></MiniProfile>

          <Suggestions></Suggestions>

        </div>

      </section>
      )}

    </main>
  )
}
