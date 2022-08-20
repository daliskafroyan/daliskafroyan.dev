import type { ReactNode } from 'react'
import { useWindowScroll } from 'react-use';

interface Props {
  children: ReactNode
}

const GradientBackground = () => {
  const { y } = useWindowScroll();

  return (
    <>
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div
          className="h-full bg-[url('/public/static/images/bg-gradient.jpg')] bg-top bg-no-repeat opacity-[0.3] will-change-transform"
          style={{
            transform: `translateY(${Math.min(y * 5, 167)}px)`,
          }}
        ></div>
      </div>
    </>
  );
};

export default function SectionContainer({ children }: Props) {
  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0'>
      {children}
      {/* <GradientBackground /> */}
    </div>
  )
}
