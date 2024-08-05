import Apply from '@/components/apply'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import FullPageLoader from '@/components/shared/FullPageLoader'
import useUser from '@/hooks/auth/useUser'
import { APPLY_STATUS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'
import useAppliedCard from '@components/apply/hooks/useAppliedCard'
import { useAlertContext } from '@contexts/AlertContext'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const STATUS_MESSAGE = {
  [APPLY_STATUS.READY]: '카드심사를 준비하고 있습니다.',
  [APPLY_STATUS.PROGRESS]: '카드를 심사중입니다. 잠시만 기다려주세요',
  [APPLY_STATUS.COMPLETE]: '카드 심사가 완료되었습니다.',
}

function ApplyPage() {
  const navigate = useNavigate()

  const [readyToPoll, setReadyToPoll] = useState(false)
  const user = useUser()
  const { id } = useParams() as { id: string }
  const { open } = useAlertContext()
  // 중복 카드신청 막기
  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess(applied) {
        if (applied == null) {
          return
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          localStorage.removeItem(`applied-${user?.uid}-${id}`)
          open({
            title: '이미 발급된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
          return
        }
        setReadyToPoll(true)
      },
      onError(err) {},
      suspense: true,
    },
  })

  // 카드 발급중인 상태 업데이트 함수
  const { data: status } = usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE as 'COMPLETE',
        },
      })
      navigate('/apply/done?success=true', {
        replace: true,
      })
    },

    onError: async () => {
      console.log('실패')
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT as 'REJECT',
        },
      })
      navigate('/apply/done?success=false', { replace: true })
    },
    enabled: true || readyToPoll,
  })

  // 카드 신청 함수
  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      console.log('카드 추가')
      // 값이 추가 되었을때 ==> 폴링 시작
      setReadyToPoll(true)
    },
    onError: () => {
      // 실패했을때 ==> 폴링 시작
      window.history.back()
    },
  })

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }
  if (readyToPoll || 카드를신청중인가) {
    // 개선여지가 있음
    return <FullPageLoader message={STATUS_MESSAGE[status ?? 'READY']} />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
