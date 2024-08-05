import { ApplyValues } from '@/models/apply'
import { 약관목록 } from '@constants/apply'
import Agreement from '@shared/Agreement'
import FixedBottomButton from '@shared/FixedBottomButton'
import { MouseEvent, useCallback, useState } from 'react'

function Terms({ onNext }: { onNext: (terms: ApplyValues['terms']) => void }) {
  const [termsAgrement, setTermsAgrement] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgrement((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  const 모든약관이_동의되었는가 = Object.values(termsAgrement).every(
    (동의여부) => 동의여부,
  )
  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={모든약관이_동의되었는가}
          onChange={handleAllAgreement}
        >
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgrement[id]}
            onChange={(_, checked) => {
              setTermsAgrement((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        onClick={() => {
          onNext(Object.keys(termsAgrement))
        }}
        disabled={모든약관이_동의되었는가 === false}
      />
    </div>
  )
}

export default Terms
