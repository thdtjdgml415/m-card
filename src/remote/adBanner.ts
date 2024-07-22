import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

import { COLLECTION } from '@constants/index'
import { AdBanner } from '@/models/card'

export async function getAdBanner() {
  const adBannerSnapShot = await getDocs(collection(store, COLLECTION.ADBANNER))

  return adBannerSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}
