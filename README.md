## 주요 내용

### 합성 컴포넌트 기법

합성컴포넌트 기법은 컴포넌트의 재사용성을 극대화 시킬 수 있는 방법이다. 많은 사람들이 예시로 들기는 `select`와 `option`의 관계로 들 수 있다. 내가 생각하기엔 합성 컴포넌트는 자바스크립트에서 프로토타입 슬롯을 사용해 인스턴스를 만들어 재사용하는 방법 같은 느낌을 받았다.

예시를 들어 이야기 해보자

```
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
      as={as} // emotion 용
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
```

`ListRow`컴포넌트는 단순히 데이터를 받아와 `List`를 세로로 나열하는 리스트 컴포넌트이다. 나는 컴포넌트를 만들때 리스트를 나열 하는 컴포넌트를 자주 사용한다.

하지만 자주 사용할수록 컴포넌트가 복잡해진다.

```tsx
function ListRowTexts({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}) {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

// 합성 컴포넌트
ListRow.Texts = ListRowTexts

export default ListRow
```

`ListRow.Texts = ListRowTexts` 이렇게 사용하면서 컴포넌트는 확장성을 갖는다.

합성 컴포넌트는 `ListRow` 컴포넌트에 `Texts`라는 슬롯을 추가해 새로운 컴포넌트 `ListRowTexts`를 합성 시켜 확장성을 높인다.

```tsx
<ul>
  {benefit.map((text, index) => {
    return (
      <motion.li
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
          key={text}
          left={<IconCheck />}
          contents={
            <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
          }
        />
      </motion.li>
    )
  })}
</ul>
```

`ListRow.Texts` 라는 컴포넌트를 사용하면 정해놓았던 방식으로 얼마든지 추가하여 사용할 수 있다.

하지만 합성 컴포넌트는 100프로 정답은 아니다. 가독성을 해칠 수 있고 개념에 대한 학습이 필요하다. 하지만 확장성이 생기고 다양한 수정사항에 대응이 가능하다는 장점이 있다.

###

### Controlled / Uncontrolled 컴포넌트

![image](https://raw.githubusercontent.com/thdtjdgml415/next-blog/main/assets/img/m-card/m-card0.webp)

두 컴포넌트의 차이는 state로 값을 제어 / Ref를 사용해 값을 제어 하는 방식의 차이이다.

우선 Controlled 방식은 state로 값을 관리하기 때문에 값을 입력받으면 리렌더링이 일어나 성능에 영향을 미칠 수 있다. 하지만 상호작용하는 내용이 많다면 제어컴포넌트가 훨씬 값을 관리하기 편하다

Uncontolled 방식은 Ref를 이용해 Dom에 직접 접근해 value값을 제어한다. 이는 값을 입력받아도 리렌더링이 일어나지 않는다. 하지만 Input의 갯수가 많이 질 수록 Ref는 늘어나기 때문에 값을 관리하기 힘들어진다.

즉, 비 제어컴포넌트는 성능을 향상시킬 수 있다는 장점이 있지만 Ref를 각각 관리 해야하기 때문에 어려움이 있고 제어컴포넌트는 값을 state로 관리하기 좋지만 리렌더링으로 인한 성능에 영향을 미칠 수 있다.

적절한 상황에 맞게 사용하는 것이 좋을 거 같다.

### 트리쉐이킹

번들사이즈의 용량을 줄이는 작업

![image](https://raw.githubusercontent.com/thdtjdgml415/next-blog/main/assets/img/m-card/m-card1.webp)

브라우저에 성능 탭에서 가보면 번들을 로딩하는 동안 우리는 흰 페이지를 보고 있다. 번들 사이즈가 커지면 초기 로딩시간이 길어지며 점점 흰 페이지를 보는 기간이 늘어 날 것이기 때문에 사이즈를 줄이는 것이 좋다. 이를 **트리쉐이킹**이라고 한다.

| 모듈을 불러오는 방식이 차이 | Common JS (CJS)        | Ecma Script Module (ESM)        |
| --------------------------- | ---------------------- | ------------------------------- |
| 문법                        | require/ module.export | import / export, export default |
| 로딩방식                    | 동적                   | 정적                            |
| 분석시점                    | 런타임(코드 실행시)    | 빌드                            |
| 버전                        | ES5                    | ES6                             |

모듈을 불러오는 방식은 두가지가 존재한다. CJS방식은 동적으로 특정 조건에 따라 모듈을 불러오거나 내보낼 수 있다는 장점이 있다 그렇기 때문에 동적이지만 코드 실행시 분적하기 때문에 트리쉐이킹 방식에는 적합하지 않다. 필요없는 변수나 조건들을 찾아내 삭제하는 것은 런타임 시 확인이 불가능하고 빌드시 실시간으로 확인해서 삭제하는 것이 좋기 때문이다.

따라서 트리쉐이킹을 위한 모듈을 불러오는 방식은 ESM을 사용해 보겠다.

```bash
yarn build
```

![image](https://raw.githubusercontent.com/thdtjdgml415/next-blog/main/assets/img/m-card/m-card2.webp)

터미널에서 해당 프로젝트를 빌드 시 프로젝트의 용량을 확인할 수 있다.

```bash
// NPM
npm install --save-dev webpack-bundle-analyzer
// Yarn
yarn add -D webpack-bundle-analyzer
```

빌드된 파일에서 특정 파일이 얼마나 용량을 가지고 있는지 체크할 수 있는 패키지를 다운 받는다.

그리고 다운받은 패키지의 모듈을 사용해야하기 때문에 초기 설정했던 CRACO 설정 파일에 webpack을 추가해주어야 한다.

```jsx
// craco.config.js
const CracoAlias = require(`craco-alias`)
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 패키지 불러오기

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  babel: {
    presets: [
      [
        '@babel/preset-react',
        { runtime: 'automatic', importSource: '@emotion/react' },
      ],
    ],
    plugins: ['@emotion/babel-plugin'],
  },
  // 웹펙 패키지 오버라이드
  webpack: {
    plugins: [new BundleAnalyzerPlugin()],
  },
}
```

그리고 프로젝트를 시작하면 두가지 창이 든다.

하나는 자신의 프로젝트 또 하나는 번들 사이즈를 나타내는 표이다.

![image](https://raw.githubusercontent.com/thdtjdgml415/next-blog/main/assets/img/m-card/m-card3.webp)

나는 번들 사이즈의 용량을 줄이기 위해 사용하는 것이기 때문에 초록색 부분만 보면 된다. 네모의 사이즈가 클 수록 용량을 많이 먹는데 여기서 `lodash`를 확인한 결과 1곳에서 사용한다.

이는 합리적이지 못한다. `lodash`에서 `platten`이라는 함수를 사용하는데 모든 패키지를 가져오기 때문이다. 이는 lodash 패키지가 CJS 방식인 동적으로 설계 되어있기 때문에 우리가 원하는 패키지만 불러오지 못하도록 되어있다. 따라서 lodash에서 원하는 함수만 사용해보고자 한다.

우선 lodash를 ESM으로 설계한 패키지를 불러오는 방법을 사용해 보았다.

https://www.npmjs.com/package/lodash-es

이 방법을 사용해도 용량이 줄지만 완벽한 방법은 아닌 거 같다. 나는 극한으로 1개의 함수만 사용하고 있기 때문에 특정한 한개의 함수만 가져오는 모듈을 사용하겠다.

https://www.npmjs.com/package/lodash.flatten

해당 라이브러리를 설치하고 확인결과

![image](https://raw.githubusercontent.com/thdtjdgml415/next-blog/main/assets/img/m-card/m-card4.webp)
보이지 않을 정도로 용량이 줄었고

bundle사이즈 또한 1.4mb → 1.3mb 로 감소했다
