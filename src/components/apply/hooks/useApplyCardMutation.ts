import { ApplyValues } from '@/models/apply'
import { applyCard } from '@/remote/apply'
import { useAlertContext } from '@contexts/AlertContext'
import { useMutation } from 'react-query'

interface useApplyCardMutationProps {
  onSuccess: () => void
  onError: () => void
}

function useApplyCardMutation({
  onSuccess,
  onError,
}: useApplyCardMutationProps) {
  const { open } = useAlertContext()
  return useMutation((ApplyValues: ApplyValues) => applyCard(ApplyValues), {
    onSuccess: () => {
      onSuccess()
    },
    onError: (err) => {
      console.log(err)
      open({
        title: '카드를 신청하지 못 했습니다.. 나중에 다시 시도해주세요',
        onButtonClick: () => {
          onError()
        },
      })
    },
  })
}

export default useApplyCardMutation
