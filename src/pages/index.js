import Link from 'next/link';
import Head from 'next/head';

import { gql } from "@apollo/client";
import client from "../apollo-client";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query ListPosts {
        listPosts {
          id
          title
          desc
          user {
            email
          }
        }
      }
    `,
  });

  return {
    props: {
      posts: data.listPosts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>List Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {posts.map((item) => (
        <div key={item.id}>
          <Link href={`/posts/${item.id}`}>
            <h3>{item.title}</h3>
          </Link>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  )
}
