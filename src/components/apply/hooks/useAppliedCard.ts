import { getApplyedCard } from '@/remote/apply'
import { useQuery, type UseQueryOptions } from 'react-query'

import { ApplyValues } from '@models/apply'

function useAppliedCard({
  userId,
  cardId,
  options,
}: {
  userId: string
  cardId: string
  options?: Pick<
    UseQueryOptions<ApplyValues | null>,
    'onSuccess' | 'onError' | 'suspense'
  >
}) {
  return useQuery(
    ['applied', userId, cardId],
    () => getApplyedCard({ userId, cardId }),
    options,
  )
}
export default useAppliedCard
