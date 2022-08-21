import { useState } from 'react'

import Link from '@/components/Link'
import Pagination from '@/components/Pagination'
import Tag from '@/components/Tag'
import { Anchor } from '@/components/anchor'
import formatDate from '@/lib/utils/formatDate'

import type { ComponentProps } from 'react'
import type { PostFrontMatter } from 'types/PostFrontMatter'
interface Props {
  posts: PostFrontMatter[]
  initialDisplayPosts?: PostFrontMatter[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function ListLayout({
  posts,
  initialDisplayPosts = [],
  pagination,
}: Props) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent =
      frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredBlogPosts

  return (
    <>
      <div>
        <div className='pt-6 pb-8 space-y-2 md:space-y-5'>
          <div className='relative max-w-lg'>
            <input
              aria-label='Search articles'
              type='text'
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search articles'
              className='block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-zinc-500 focus:ring-zinc-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100 placeholder:italic placeholder:ring-zinc-500'
            />
            <svg
              className='absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
        </div>
        <ul className="flex flex-col gap-4">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const {
              slug,
              date,
              title: frontMatterTitle,
              summary,
              tags,
            } = frontMatter
            return (
              <li key={slug} className="relative transition duration-300 group hover:bg-neutral-800 p-7 hover:ring-2 hover:ring-gray-100/90">
                <article className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                  <dl>
                    <dt className='sr-only'>Published on</dt>
                    <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className='space-y-3 xl:col-span-3'>
                    <div>
                      <h3 className='text-2xl font-bold leading-8 tracking-tight'>
                        <Link
                          href={`/blog/${slug}`}
                          className='text-gray-900 dark:text-gray-100'
                        >
                          {frontMatterTitle}
                        </Link>
                      </h3>
                      <div className='flex flex-wrap'>
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className='prose text-gray-500 max-w-none dark:text-gray-400'>
                      {summary}
                    </div>
                  </div>
                </article>
                <Anchor
                className="flex items-center space-x-2 before:inset-0 before:content-[''] sm:before:absolute"
                href={`/blog/${slug}`}
               />
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  )
}
