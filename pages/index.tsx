import type { NextPage } from 'next'
import Head from 'next/head'

import Header from '../components/Header'
import Feed from '../components/Feed'
import Modal from '../components/Modal'

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/" />
        <link rel="shortcut icon" href="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" type="image/x-icon" />
      </Head>

      {/* Header */}
      <Header></Header>
      
      {/* Feed */}

      <Feed></Feed>
      
      <Modal></Modal>
      
    </div>
  )
}

export default Home
