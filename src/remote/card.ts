import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

import { Card } from '@/models/card'
import { COLLECTION } from '@constants/index'

export async function getCards() {
  const cardSnapShot = await getDocs(collection(store, COLLECTION.CARD))

  return cardSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}
