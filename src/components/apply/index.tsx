import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import useUser from '@/hooks/auth/useUser'
import { APPLY_STATUS, ApplyValues } from '@/models/apply'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProgressBar from '../shared/ProgressBar'

const LAST_STEP = 3

function Apply({ onSubmit }: { onSubmit: (applyValues: ApplyValues) => void }) {
  const user = useUser()
  const { id } = useParams() as { id: string }
  const strageKey = `applied-${user?.uid}-${id}`

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(strageKey)

    if (applied == null) {
      return {
        step: 0,
        userId: user?.uid,
        cardId: id,
      }
    }
    return JSON.parse(applied)
  })

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(strageKey)
      onSubmit({
        ...applyValues,
        applyedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    } else {
      localStorage.setItem(strageKey, JSON.stringify(applyValues))
    }
  }, [applyValues, onSubmit, localStorage])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'crediScore' | 'payDate'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  return (
    <div>
      <ProgressBar progress={(applyValues.step as number) / LAST_STEP} />
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </div>
  )
}

export default Apply
