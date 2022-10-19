import React, { useEffect, useState } from 'react'

import { faker } from '@faker-js/faker';

import Story from './Story'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Stories(props) {

  const {data: session} = useSession()

  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(77)].map((_, i) => ({
      id: i,
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className='
      flex 
      space-x-2 
      p-6 
      bg-white 
      mt-8 
      border-gray-200 border rounded-sm 
      overflow-x-scroll scrollbar-thin scrollbar-thumb-black
      '>

      {session && (
        <Story 
          img={session.user.image} 
          username={session.user.username}>
        </Story>
      )}
      {suggestions.map((profile) => (
        <Story 
          key={profile.id} 
          img={profile.avatar} 
          username={profile.username}>
        </Story>
      ))}

    </div>
  )
}