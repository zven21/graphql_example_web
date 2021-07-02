import Head from 'next/head'

import { gql } from "@apollo/client";
import client from "../../apollo-client"

export default function PostDetail({ post }) {
  return (
    <div>
      <Head>
        <title>Post Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{post.title}</h1>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: {id: "1"} },
    ],
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query post($id: ID!) {
        post (id: $id) {
          id
          title
          desc
        }
      },
    `,
    variables: {id: params.id}
  });

  return {
    props: {
      post: data.post
    },
  };
}