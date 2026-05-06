import { Hero } from '@/components/sections/Hero'
import { Photography } from '@/components/sections/Photography'
import { Video } from '@/components/sections/Video'
import { Design } from '@/components/sections/Design'
import { Info } from '@/components/sections/Info'
import { getEffectiveConfig } from '@/lib/adminContent'
import { projects as defaultProjects } from '@/lib/portfolio'

export const revalidate = 0

export default async function Home() {
  const config = await getEffectiveConfig()

  const photoProjects = config.photography.projects
    .filter((pc) => pc.visible)
    .flatMap((pc) => {
      const base = defaultProjects.find((p) => p.id === pc.id)
      const visibleImages = pc.images.filter((img) => img.visible).map((img) => img.src)
      if (!visibleImages.length) return []
      return [{
        id: pc.id,
        title: pc.title ?? base?.title ?? config.photography.filterLabels[pc.id] ?? pc.id,
        filterGroup: pc.filterGroup ?? base?.filterGroup ?? pc.id,
        images: visibleImages,
      }]
    })

  const visibleVideos = config.videos.filter((v) => v.visible)

  return (
    <>
      <Hero />
      <Photography
        projects={photoProjects}
        filterLabels={config.photography.filterLabels}
        filterOrder={config.photography.filterOrder}
      />
      <Video videos={visibleVideos} />
      <Design />
      <Info info={config.info} />
    </>
  )
}
