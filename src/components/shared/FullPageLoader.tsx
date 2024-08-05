import Flex from './Flex'
import Spacing from './Spacing'
import Text from './Text'

function FullPageLoader({ message }: { message: string }) {
  return (
    <Flex
      style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0 }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img
          src="https://cdn.pixabay.com/animation/2022/12/23/16/22/16-22-13-468_512.gif"
          alt="로딩중"
        />
        {message != null ? (
          <>
            <Spacing size={120} />
            <Text bold={true} typography="t4">
              {message}
            </Text>
          </>
        ) : null}
      </Flex>
    </Flex>
  )
}

export default FullPageLoader
