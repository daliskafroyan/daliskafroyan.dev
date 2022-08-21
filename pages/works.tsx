import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import SectionTitle from '@/components/SectionTitle'
import projectsData from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'

export default function Works() {
  return (
    <>
      <PageSEO
        title={`Works - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
        <SectionTitle title='Works' subTitle='Showcase of my works'/>
        <div className='container py-12'>
          <div className='flex flex-wrap -m-4'>
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
    </>
  )
}
