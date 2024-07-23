<<<<<<< HEAD
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore'
=======
import { collection, getDocs } from 'firebase/firestore'
>>>>>>> 77b9a6a2174119c93ca9bfacc069cc914a53103a
import { store } from './firebase'

import { Card } from '@/models/card'
import { COLLECTION } from '@constants/index'

<<<<<<< HEAD
// 지금 보이고 있는 마지막 요소
export async function getCards(pageParams?: QuerySnapshot<Card>) {
  // pageParams를 기준으로 null이면 최초 10개의 데이터 만 불러오고
  // null이 아니면 최초가 아니기 때문에 startAfter를 기준으로 다음 데이터를 불러오기
  const cardQuery =
    pageParams == null
      ? query(collection(store, COLLECTION.CARD), limit(15))
      : query(
          collection(store, COLLECTION.CARD),
          startAfter(pageParams),
          limit(15),
        )
  // cardQuery 커서를 기준으로 getDocs로 데이터를 불러오기
  const cardSnapShot = await getDocs(cardQuery)
  // 마지막 커서
  const lastVisible = cardSnapShot.docs[cardSnapShot.docs.length - 1]
  const items = cardSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

export async function getCard(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTION.CARD, id))

  return {
    id,
    ...(snapshot.data() as Card),
  }
=======
export async function getCards() {
  const cardSnapShot = await getDocs(collection(store, COLLECTION.CARD))

  return cardSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
>>>>>>> 77b9a6a2174119c93ca9bfacc069cc914a53103a
}
