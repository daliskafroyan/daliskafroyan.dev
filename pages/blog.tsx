import { PageSEO } from '@/components/SEO'
import SectionTitle from '@/components/SectionTitle'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { getAllFilesFrontMatter } from '@/lib/mdx'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { ComponentProps } from 'react'

export const POSTS_PER_PAGE = 5

export const getStaticProps: GetStaticProps<{
  posts: ComponentProps<typeof ListLayout>['posts']
  initialDisplayPosts: ComponentProps<typeof ListLayout>['initialDisplayPosts']
  pagination: ComponentProps<typeof ListLayout>['pagination']
}> = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <SectionTitle title='All Post' />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </>
  )
}
