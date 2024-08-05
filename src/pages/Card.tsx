import FixedBottomButton from '@/components/shared/FixedBottomButton'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { getCard } from '@/remote/card'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'

import Flex from '@shared/Flex'

import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import useUser from '@/hooks/auth/useUser'
import { useAlertContext } from '@contexts/AlertContext'

import Review from '@/components/Card/Review'
import Spacing from '@/components/shared/Spacing'

function CardPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const user = useUser()
  const { open } = useAlertContext()
  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  })

  const moveToApply = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능힙니다.',
        onButtonClick: () => {
          navigate(`/signin`)
        },
      })
      return
    }
    navigate(`/apply/${id}`)
  }, [user, id, open, navigate])

  if (data == null) return null

  const { name, corpName, promotion, tags, benefit } = data
  const subTitle =
    promotion != null ? removeHTMLTages(promotion.title) : tags.join(', ')
  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              key={text}
              initial={{ opacity: 0, translateX: -90 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.5,
                ease: 'linear',
                delay: index * 0.1,
              }}
            >
              <ListRow
                as="div"
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>
      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHTMLTages(promotion.terms)}</Text>
        </Flex>
      ) : null}
      <Spacing size={1000} />
      <Review />
      <Spacing size={100} />
      <FixedBottomButton
        label="1분만에 신청하고 혜택받기"
        onClick={() => {
          moveToApply()
        }}
      />
    </div>
  )
}
export default CardPage

function IconCheck() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        fill={`${colors.blue}`}
      />
    </svg>
  )
}

// 데이터에 있는 태그를 지우는 함수
function removeHTMLTages(text: string) {
  return text?.replace(/<\/?[^>]+(>|$)/g, '')
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`
