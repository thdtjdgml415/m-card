import { 결제일옵션, 신용점수옵션, 연소득옵션 } from '@constants/apply'
import { ApplyValues } from '@models/apply'
import { ChangeEvent, useCallback, useState } from 'react'
import FixedBottomButton from '../shared/FixedBottomButton'
import Select from '../shared/Select'

type InfoValues = Pick<ApplyValues, 'salary' | 'crediScore' | 'payDate'>

function BasicInfo({ onNext }: { onNext: (infoValues: InfoValues) => void }) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    crediScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const 모든정보가선택되었는가 = Object.values(infoValues).every(
    (value) => value,
  )

  return (
    <div>
      <Select
        name="salary"
        label={'연소득'}
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="crediScore"
        label={'신용점수'}
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        value={infoValues.crediScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label={'결제일'}
        options={결제일옵션}
        placeholder={결제일옵션[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        label="다음"
        disabled={모든정보가선택되었는가 === false}
        onClick={() => onNext(infoValues)}
      />
    </div>
  )
}

export default BasicInfo
