import clsx from 'clsx';
import { useRouter } from 'next/router';

import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'

import Logo from '@/data/logo.svg'

import Footer from './Footer'
import Link from './Link'
import MobileNav from './MobileNav'
import SectionContainer from './SectionContainer'
import ThemeSwitch from './ThemeSwitch'

import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  const route = useRouter().route;
  return (
    <SectionContainer>
      <div className='flex flex-col justify-between h-screen'>
        {/* <header className='flex items-center justify-between py-10'>
          <div>
            <Link href='/' aria-label={siteMetadata.headerTitle}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center sm:mr-3'>
                  <Logo />
                </div>
              </div>
            </Link>
          </div>
          <div className='flex items-center text-base leading-5'>
            <div className='hidden sm:block'>
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className='p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4'
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header> */}
        <main className='mb-auto'>{children}</main>
        <div
        className={clsx(
          'fixed inset-x-0 bottom-0 z-10 flex justify-center',
          'motion-safe:animate-slide-up-fade pointer-events-none',
        )}
      >
        <nav
          className={clsx(
            'container relative mx-4 mt-4 mb-8 flex max-w-xl items-stretch justify-around overflow-x-auto overflow-y-hidden p-2',
            'rounded-md dark:bg-zinc-800/70 bg-zinc-200/70 shadow-lg shadow-black/10 dark:shadow-black/50',
            'pointer-events-auto backdrop-blur-sm',
            'snap-x sm:snap-none',
            'navbar-style'
          )}
          data-navigation-container=''
        >
          <Link href='/' className={clsx(
                'navbar-item-style',
                'relative z-10 m-2 cursor-pointer select-none dark:text-gray-100 text-gray-800 focus:outline-none',
                'transfor transition delay-100 duration-200 ease-out hover:scale-110',
                {
                  active: route === '/',
                },
                [route === '/' && ['font-bold border-b-2']]
              )}>
            About
          </Link>
          <Link href='/works' className={clsx(
                'navbar-item-style',
                'relative z-10 m-2 cursor-pointer select-none dark:text-gray-100 text-gray-800 focus:outline-none',
                'transfor transition delay-100 duration-200 ease-out hover:scale-110',
                {
                  active: route === '/works',
                },
                [route === '/works' && ['font-bold border-b-2']]
              )}>
            
              Works
            
          </Link>
          <Link href='/dashboard' className={clsx(
                'navbar-item-style',
                'relative z-10 m-2 cursor-pointer select-none dark:text-gray-100 text-gray-800 focus:outline-none',
                'transfor transition delay-100 duration-200 ease-out hover:scale-110',
                {
                  active: route === '/dashboard',
                },
                [route === '/dashboard' && ['font-bold border-b-2']]
              )}>
           
              Dashboard
          </Link>
          <Link href='/blog' className={clsx(
                'navbar-item-style',
                'relative z-10 m-2 cursor-pointer select-none dark:text-gray-100 text-gray-800 focus:outline-none',
                'transfor transition delay-100 duration-200 ease-out hover:scale-110',
                {
                  active: route === '/blog',
                },
                [route === '/blog' && ['font-bold border-b-2']
              ]
              )}>
           
              Blog
          </Link>
          <ThemeSwitch />
          {/* <span
            className={clsx('navbar-item-animate rounded-sm bg-white', {
              active: route === '/about',
            })}
          ></span> */}
        </nav>
      </div>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
