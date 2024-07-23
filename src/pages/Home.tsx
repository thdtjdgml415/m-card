<<<<<<< HEAD
import AdBanners from '@/components/Home/AdBanners'
import CardList from '@/components/Home/CardList'
import Top from '@/components/shared/Top'
function HomePage() {
=======
import Top from '@/components/shared/Top'
import { getAdBanner } from '@remote/adBanner'
import { getCards } from '@remote/card'
import { useEffect } from 'react'
function HomePage() {
  useEffect(() => {
    getCards().then((res) => console.log(res))
  }, [])

  useEffect(() => {
    getAdBanner().then((res) => console.log(res))
  }, [])
>>>>>>> 77b9a6a2174119c93ca9bfacc069cc914a53103a
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해 꼭 필요한 카드를 모와봤어요"
<<<<<<< HEAD
      />
      <AdBanners />
      <CardList />
=======
      ></Top>
>>>>>>> 77b9a6a2174119c93ca9bfacc069cc914a53103a
    </div>
  )
}
export default HomePage
