import { css } from '@emotion/react'
import { MouseEvent } from 'react'
import Flex from './Flex'
import Text from './Text'

function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  )
}
function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <IconCheck checked={checked} withCircle={true} />
      <Text bold={true}>{children}</Text>
    </Flex>
  )
}
function AgreementDescription({
  children,
  checked,
  onChange,
  link,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
  link?: string
}) {
  return (
    <Flex>
      <Flex
        onClick={(e) => {
          onChange(e, !checked)
        }}
      >
        <IconCheck checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link != null ? (
        <a href={link} target="_blank">
          <Text typography="t6">링크</Text>
        </a>
      ) : null}
    </Flex>
  )
}

function IconCheck({
  checked,
  withCircle = false,
}: {
  checked: boolean
  withCircle?: boolean
}) {
  return (
    <svg
      data-name="Livello 1"
      id="Livello_1"
      viewBox="0 0 128 128"
      width={24}
      height={24}
    >
      <title />
      {withCircle ? (
        <path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z" />
      ) : null}

      {checked ? (
        <path d="M87.9,42.36,50.42,79.22,40.17,68.43a3,3,0,0,0-4.35,4.13l12.35,13a3,3,0,0,0,2.12.93h.05a3,3,0,0,0,2.1-.86l39.65-39a3,3,0,1,0-4.21-4.28Z" />
      ) : null}
    </svg>
  )
}

const agreementContainerStyles = css`
  padding: 24px;
  & li {
    cursor: pointer;
  }
`

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription
export default Agreement
