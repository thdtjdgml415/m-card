import AdBanners from '@/components/Home/AdBanners'
import CardList from '@/components/Home/CardList'
import ListRow from '@/components/shared/ListRow'
import Top from '@/components/shared/Top'
import { Suspense } from 'react'

function HomePage() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해 꼭 필요한 카드를 모와봤어요"
      />

      <AdBanners />

      <Suspense
        fallback={[...new Array(10)].map((_, idx) => {
          return <ListRow.Skeleton key={idx} />
        })}
      >
        <CardList />
      </Suspense>
    </div>
  )
}
export default HomePage
