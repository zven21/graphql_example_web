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
      <div className="space-y-2 flex flex-col m-4 p-4">
        <h1 className="text-red-400 font-semibold text-2xl">{post.title}</h1>
        <div className="text-gray-600">{post.desc}</div>
      </div>
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