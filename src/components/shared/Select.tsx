import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import { forwardRef, SelectHTMLAttributes } from 'react'

import { Option } from '@/models/apply'
import Flex from './Flex'
import Text from './Text'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  //   placeholder 속성이 빠졌는지 확인해야함
  placeholder: string
}

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.grey};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: #cccccc;
  }
`

// 첫번쨰 타입은 어떤 ref일지 두번째는 어떤 props일지 적어줘야함
const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, value, ...props },
  ref,
) {
  return (
    <Flex direction="column">
      <Text
        typography="t7"
        color="black"
        display="inline-block"
        style={{ marginBottom: 6 }}
      >
        {label}
      </Text>
      <BaseSelect required={true} ref={ref} value={value} {...props}>
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  )
})
export default Select
