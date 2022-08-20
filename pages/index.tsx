import Link from '@/components/Link'
import NewsletterForm from '@/components/NewsletterForm'
import { ProfileImage } from '@/components/ProfileImage'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { PostFrontMatter } from 'types/PostFrontMatter'

const MAX_DISPLAY = 5

export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[]
}> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <div className='mx-auto mt-40 mb-64 flex max-w-2xl flex-col items-start justify-center border-gray-200 dark:border-gray-700'>
        <div className='flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:gap-8'>
          <h3 className='font-normal text-gray-700 dark:text-gray-200'>
            <b>Hi! I&apos;m Roy</b> — a Frontend Engineer that love to build web
            apps that scalable, resilient and favorable for both user and
            developer
          </h3>

          <ProfileImage size='large' />
        </div>
      </div>
      {/* {siteMetadata.newsletter.provider !== '' && (
        <div className='flex items-center justify-center pt-4'>
          <NewsletterForm />
        </div>
      )} */}
    </>
  )
}
