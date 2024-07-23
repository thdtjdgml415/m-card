import AdBanners from '@/components/Home/AdBanners'
import CardList from '@/components/Home/CardList'
import Top from '@/components/shared/Top'
function HomePage() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해 꼭 필요한 카드를 모와봤어요"
      />
      <AdBanners />
      <CardList />
    </div>
  )
}
export default HomePage
