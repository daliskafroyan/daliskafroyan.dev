interface SectionTitleProps {
  title: string,
  subTitle?: string
}

export default function SectionTitle(props: SectionTitleProps)  {
  const {title, subTitle} = props;

  return (
    <div className="pt-[10vh] md:pt-[15vh]">
      <h1 className='text-zinc-700 dark:text-zinc-200'>{title}</h1>
      <p className='mt-2 text-zinc-500 dark:text-zinc-400'>
        {subTitle}
      </p>
    </div>
  )
}