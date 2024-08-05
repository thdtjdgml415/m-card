import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import { getAdBanner } from '@/remote/adBanner'
import { colors } from '@styles/colorPalette'
import { useQuery } from 'react-query'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import Flex from '../shared/Flex'
import Text from '../shared/Text'
function AdBanners() {
  const { data, isLoading } = useQuery(['adBanners'], () => getAdBanner())

  if (data == null || isLoading) {
    return (
      <Container>
        <Flex direction="column" css={bannerContainerStyles}>
          <Text bold={true}>로딩</Text>
          <Text typography="t7"></Text>
        </Flex>
      </Container>
    )
  }
  return (
    <Container>
      <Swiper spaceBetween={8} autoplay={true}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold={true}>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

export default AdBanners

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`
