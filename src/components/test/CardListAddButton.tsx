import { COLLECTION } from '@/constants'
import { card_list } from '@/mock/data'
import { store } from '@remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import Button from '../shared/Button'

function CardListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTION.CARD))

      batch.set(docRef, card)
    })
    await batch.commit()
    alert('카드리스트 추가완료')
  }
  return <Button onClick={handleButtonClick}>카드리스트 추가하기</Button>
}
export default CardListAddButton
