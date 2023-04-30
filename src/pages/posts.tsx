import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/CommandPalette/useCommandPalettePostActions';
import LayoutPerPage from '@/components/LayoutPerPage';
import PostList, { PostForPostList } from '@/components/PostList';
//import { siteConfigs } from '@/configs/siteConfigs';
import { allPostsNewToOld } from '@/lib/contentLayerAdapter';
import generateRSS from '@/lib/generateRSS';

type PostForIndexPage = PostForPostList;

type Props = {
  posts: PostForIndexPage[];
  commandPalettePosts: PostForCommandPalette[];
};

const tagFilter = [
  'All',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Kotlin',
  'Swift',
  'SwiftUI',
  'Android',
  'iOS',
  'Flutter',
  'Dart',
  'Firebase',
  'AWS',
  'Azure',
  'Python',
  'AI / ML',
];

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const locale = context.locale!;

  const commandPalettePosts = getCommandPalettePosts();
  const posts = allPostsNewToOld.map((post) => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    description: post.description,
    path: post.path,
    tags: post.tags,
  })) as PostForIndexPage[];

  console.log(posts);

  generateRSS();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['indexPage', 'common'])),
      posts,
      commandPalettePosts,
    },
  };
};

const Post: NextPage<Props> = ({ posts, commandPalettePosts }) => {
  const [filterPosts, setFilterPosts] = useState(posts);
  const { t } = useTranslation(['common']);
  const [selectedType, setSelectedType] = useState('All');
  const [isFiltering, setIsFiltering] = useState(false);
  useCommandPalettePostActions(commandPalettePosts);

  const handleFilter = (type: string) => {
    setSelectedType(type);
    const result = posts.filter((v) =>
      v.tags?.toLocaleString().toLowerCase().includes(type.toLowerCase())
    );

    setFilterPosts(result);
    console.log(result);
  };

  console.log(posts);
  return (
    <LayoutPerPage>
      <div className="my-4  divide-gray-200 transition-colors dark:divide-gray-700">
        <div className="prose prose-lg my-8 dark:prose-dark">
          <h2>{t('posts')}</h2>
        </div>

        <div className="my-4 flex flex-wrap gap-2 transition-colors">
          <button
            className="rounded-full bg-gray-50 py-2  px-4 font-semibold  dark:bg-gray-800 dark:text-white"
            onClick={() => {
              setIsFiltering(!isFiltering);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
          </button>
        </div>

        <div
          className={`my-4 flex flex-wrap gap-2 transition-all delay-150 duration-300 ease-in-out ${
            isFiltering
              ? ' visible h-14 opacity-100	'
              : ' invisible h-0 opacity-0'
          }  `}
        >
          {tagFilter.map((type) => (
            <button
              key={type}
              className={`${
                selectedType === type
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : 'bg-gray-100 dark:bg-gray-800'
              } rounded-full  py-2 px-4 font-semibold   dark:bg-gray-700 dark:text-white`}
              onClick={() => handleFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="pb-10"></div>

        <PostList posts={filterPosts} />
      </div>
    </LayoutPerPage>
  );
};

export default Post;
