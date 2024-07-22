import Text from '@shared/Text'
import './App.css'
import Button from './components/shared/Button'
import Input from './components/shared/Input'
import TextField from './components/shared/TextField'
import { useAlertContext } from './contexts/AlertContext'

function App() {
  const { open } = useAlertContext()
  return (
    <div>
      <Text typography="t1" color="red" display="block">
        t1
      </Text>
      <Text typography="t2" color="blue">
        t2
      </Text>
      <Text typography="t3" color="green">
        t3
      </Text>
      <Text typography="t4" color="white">
        t4
      </Text>
      <Text typography="t5" color="red">
        t5
      </Text>

      <hr />

      <Button color="success">클릭해주세요</Button>
      <Button color="success" weak={true}>
        클릭해주세요
      </Button>
      <Button color="error">클릭해주세요</Button>
      <Button color="error" weak={true}>
        클릭해주세요
      </Button>
      <Button color="primary">클릭해주세요</Button>
      <Button color="primary" weak={true}>
        클릭해주세요
      </Button>
      <Button color="primary" full={true}>
        클릭해주세요
      </Button>
      <Button disabled={true}>클릭해주세요</Button>

      <hr />

      <Input placeholder="로그인" aria-invalid={true} />
      <Input placeholder="로그인" aria-invalid={false} />
      <Input placeholder="로그인" />
      <hr />
      <p>text field</p>

      <TextField label="아이디" />
      <TextField label="패스워드" />
      <TextField label="패스워드" hasError={true} />
      {/* <Alert
        open={true}
        title="알람이 떳습니다."
        description="안녕하세요"
        onButtonClick={() => {}}
      /> */}

      <Button
        onClick={() => {
          open({
            title: '카드신청완료',
            description: '내역 페이지에서 확인해 주세요.',
            onButtonClick: () => {},
          })
        }}
      >
        Alert 오픈
      </Button>
    </div>
  )
}

export default App
