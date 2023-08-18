import { groq } from 'next-sanity';
import { client } from '../../../../../sanity/lib/client';
import urlFor from '../../../../../sanity/lib/urlFor';
import Image from 'next/image';
import { Post } from '../../../../../typings';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '../../../components/RichTextComponents';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const query = groq`*[_type=='post']
  {
    slug
  }`;
  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({ slug: slug }));
}

async function Post({ params: { slug } }: Props) {
  const query = groq`
  *[_type=='post' && slug.current ==$slug] [0]
  {
    ...,
    author->,
    categories[]->
  }
  `;
  const post = await client.fetch(query, { slug });
  return (
    <article className="px-10 pb-28">
      <section className="space-y-2 border border-[#F7AB0A] text-white">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="object-cover object-center mx-auto"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>
          <section className="p-5 bg-[#F7AB0A] w-full">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h1 className="text-4xl font-extrabold">{post.title}</h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex itemx-center space-x-2">
                <Image
                  className="rounded-full h-auto"
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  height={40}
                  width={60}
                />
                <div className="w-64 ">
                  <h3 className="text-lg font-bold mt-3">{post.author.name}</h3>
                  <div></div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="italic pt-10">{post.description}</h2>
              <div className="flex items-center justify-end space-x-2 ">
                {post.categories.map((category: any) => (
                  <p
                    key={category.id}
                    className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
      <div className="mt-5">
        <PortableText value={post.body} components={RichTextComponents} />
      </div>
    </article>
  );
}

export default Post;
