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
        <div className="space-y-2" key={item.id}>

          <div className="bg-gray-100 rounded-lg shadow-lg p-4 m-4">
            <Link href={`/posts/${item.id}`}>
              <h3 className="text-2xl font-semibold text-red-400">{item.title}</h3>
            </Link>
            <p>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
