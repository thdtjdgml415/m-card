import { COLLECTION } from '@/constants'
import { ApplyValues } from '@/models/apply'
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

import { store } from './firebase'

export async function applyCard(applyValue: ApplyValues) {
  return addDoc(collection(store, COLLECTION.CARD_APPLY), applyValue)
}

// 카드 상태 업데이트 함수
export async function updateApplyCard({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTION.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  const [applied] = snapshot.docs
  console.log(applied)

  updateDoc(applied.ref, applyValues)
}

// 카드 중복신청 확인
export async function getApplyedCard({
  userId,
  cardId,
}: {
  userId: string
  cardId: string
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTION.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  if (snapshot.docs.length === 0) {
    return null
  }
  // 유저가 신청한 정보
  const [applied] = snapshot.docs
  console.log('이미 발급된 카드', applied.data())

  return applied.data() as ApplyValues
}
