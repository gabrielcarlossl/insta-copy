import React, { useEffect } from 'react'
import { useState } from 'react'

import { faker } from '@faker-js/faker';

export default function Suggestions(props) {

    const [suggestions, setSuggestions] = useState([])
    
    useEffect(() => {
        
        const suggestions = [...Array(5)].map((_,i) => (
            {
                id: i,
                username: faker.internet.userName(),
                avatar: faker.image.avatar(),
                company: faker.company.name()
            }
        ))
        setSuggestions(suggestions);
    }, [])
    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className='text-sm font-bold text-gray-400'>Sugestões para Você</h3>
                <button className='text-gray-600 font-semibold'>Ver tudo</button>
            </div>

            {
                suggestions.map(profile => (
                    <div key={profile.id} className='flex items-center justify-between mt-3'>
                        <img 
                        className='w-10 h-10 rounded-full border p-[2px]'
                        src={profile.avatar} alt="" />
                        <div className='flex-1 ml-4'>
                            <h2 className='font-semibold text-sm'>{profile.username}</h2>
                            <h3 className='text-xs text-gray-400'>Works at {profile.company}</h3>
                        </div>
                        <button className='text-blue-400 text-xs font-semibold pl-10'>Seguir</button>
                    </div>
                ))
            }
        </div>
    )
}
