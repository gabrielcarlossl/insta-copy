import React, { useState, useEffect } from 'react'

import { useSession } from 'next-auth/react'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  DotsHorizontalIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon
} from "@heroicons/react/outline"
import { onSnapshot, orderBy, query, addDoc, collection, serverTimestamp, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Moment from 'react-moment'

export default function Post({ id, username, userImg, img, caption }) {


  const { data: session } = useSession()
  const [comments, setComments] = useState("")
  const [comment, setComment] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, id]
  )

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'),
        snapshot => setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    } else {

      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username
      })
    }
  }

  const sendComment = async (e) => {
    e.preventDefault()
    const commentToSend = comment
    setComment('')
    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    })
  }

  return (
    <div className='bg-white my-7 border rounded-sm'>
      {/* header */}
      <div className='flex items-center p-5'>
        <img
          className='w-12 h-12 rounded-full object-contain border p-1 mr-3 cursor-pointer'
          src={userImg}
          alt=""
        />
        <p className='wrap font-bold cursor-pointer'>{username}</p>
        <DotsHorizontalIcon className='h-5 cursor-pointer'></DotsHorizontalIcon>
      </div>

      {/* image */}
      <img className='object-cover w-full' src={img} alt="" />

      {/* buttons */}
      {session && (
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4'>
            {hasLiked ? (
              <HeartIconSolid onClick={likePost} className='btn text-red-500'></HeartIconSolid>
            ) : (

              <HeartIcon onClick={likePost} className='btn'></HeartIcon>
            )}

            <ChatIcon className='btn'></ChatIcon>
            <PaperAirplaneIcon className='btn rotate-45'></PaperAirplaneIcon>
          </div>

          <BookmarkIcon className='btn'></BookmarkIcon>
        </div>
      )}

      {/* captions */}
      <p className='p-5  truncate'>

        { likes.length > 0 && (
          <span className='flex text-sm font-bold mb-1'>{likes.length} Likes</span>
        )}

        <span className='font-bold mr-1'>{username} </span>
        {caption}
      </p>

      {/* comments */}

      {comments.length > 0 && (
        <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
          {comments.map(comment => (
            <div key={comment.id} className='flex items-center space-x-2 mb-3'>
              <img
                className='h-7 rounded-full'
                src={comment.data().userImage} />
              <p className='text-sm flex-1'><span className='font-bold'>{comment.data().username}</span> {comment.data().comment}</p>
              <Moment fromNow className='pr-5 text-xs'>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (

        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7'></EmojiHappyIcon>
          <input
            className='border-none flex-1 focus:ring-0 outline-none'
            placeholder='Adicione um comentário...'
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <button
            type='submit'
            disabled={!comment}
            onClick={sendComment}
            className='font-semibold text-blue-400'

          >Publicar</button>

        </form>
      )}



    </div>
  )
}
