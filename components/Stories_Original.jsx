import React, { useEffect, useState } from 'react'
import faker from 'faker';
import { faker2 } from '@faker-js/faker';
import Story from './Story'


export default function Stories(props) {

    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const suggestions = [...Array(7)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }));

        setSuggestions(suggestions)
    }, []);


   

    return (
        <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll '>
            {suggestions.map((profile) => (
                <Story key={profile.id} img={profile.avatar} username={profile.username}></Story>
            ))}
        </div>
    )
}
