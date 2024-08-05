import AdBanners from '@/components/Home/AdBanners'
import CardList from '@/components/Home/CardList'
import Button from '@/components/shared/Button'
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
      <Button>1</Button>
      <AdBanners />
      <Button>2</Button>
      <Suspense
        fallback={[...new Array(10)].map((_, idx) => {
          return <ListRow.Skeleton key={idx} />
        })}
      >
        <CardList />
      </Suspense>
      <Button>3</Button>
    </div>
  )
}
export default HomePage
