import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../lib/auth.js'
import SignIn from '../components/SignIn'
import Episode from '../components/Episode'
import { VStack } from '@chakra-ui/react'

// const PlaylistQuery = gql`
//   {
//     playlists {
//       name
//       episodes {
//         id
//       }
//     }
//   }
// `

const EpisodeFeed = () => {

  // const FeedQuery = gql`
  //   {
  //     continentes {
  //       Nome
  //     }
  //   }
  // `

  const FeedQuery = gql`
    {
      products(filter: {sku: {in: ["24-WG03","24-WG09"]}}) {
        items {
          name
          sku
        }
      }
    }
  `

  const { data, error } = useQuery(FeedQuery)
  // const { data: playlistData } = useQuery(PlaylistQuery)

  const { signOut } = useAuth()

  function opendata() {
    console.log("teste use query", data)
    console.log("error", error)
  }


  return (
    <div>
      {/* <VStack spacing={8} w="100%">
        {data?.episodeFeed.map((v) => {
          return (
                        <Episode
              key={v.id}
              episode={v}
              playlists={playlistData?.playlists}
            />
          )
          return <li key={v.id}>{v.title}</li>
        })}
      </VStack> */}
      <h1>Hello</h1>

      <button onClick={() => opendata()}>Open data</button>
    </div>
  )
}

export default function Home() {

  // const { isSignedIn } = useAuth()
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Home</h1>
      <EpisodeFeed />

      {/* {!isSignedIn() && <SignIn />}
      {isSignedIn() && <EpisodeFeed />} */}
    </div>
  )
}
