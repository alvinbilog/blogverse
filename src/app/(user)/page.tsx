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
export const revalidate = 30;
export default async function HomePage() {
  const posts = await client.fetch(query);

  return (
    <div>
      <BlogLists posts={posts} />
    </div>
  );
}
