import { groq } from 'next-sanity';
import { client } from '../../../sanity/lib/client';
import BlogLists from '../components/BlogLists';
const query = groq`
  *[_type=='post']{
    ...,
    author->,
    categories[]->
  }|order(_createdAt desc)
`;
export async function getStaticProps() {
  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
    // Set the revalidate interval in seconds (e.g., 1 hour = 3600 seconds)
    revalidate: 60, // Adjust this value according to your needs
  };
}
export default async function HomePage() {
  const posts = await client.fetch(query);

  return (
    <div>
      <BlogLists posts={posts} />
    </div>
  );
}
