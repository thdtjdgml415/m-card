import { css } from '@emotion/react'
import Flex from './Flex'
import Skeleton from './Skeleton'
import Spacing from './Spacing'
import Text from './Text'
interface ListRowProps {
  left?: React.ReactNode
  contents?: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
}

function ListRow({
  left,
  contents,
  right,
  withArrow,
  onClick,
  as = 'li',
}: ListRowProps) {
  return (
    <Flex
      as={as}
      css={listRowContainerStyles}
      onClick={onClick}
      align={'center'}
    >
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`

const listRowLeftStyles = css`
  margin-right: 14px;
`
const listRowContentsStyles = css`
  flex: 1;
`

function ListRowSkeleton() {
  return (
    <Flex as={'li'} css={listRowContainerStyles}>
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentsStyles}>
        {
          <ListRow.Texts
            title={
              <>
                <Skeleton width={67} height={23} />
                <Spacing size={2} />
              </>
            }
            subTitle={<Skeleton width={85} height={20} />}
          />
        }
      </Flex>

      <IconArrowRight />
    </Flex>
  )
}

function ListRowTexts({
  title,
  subTitle,
}: {
  title: React.ReactNode
  subTitle: React.ReactNode
}) {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

function IconArrowRight() {
  return (
    <svg
      width={24}
      height={24}
      className="feather feather-chevron-right"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
// 합성 컴포넌트
ListRow.Texts = ListRowTexts
ListRow.Skeleton = ListRowSkeleton

export default ListRow
