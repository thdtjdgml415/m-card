import Text from '@shared/Text'
import './App.css'
import Button from './components/shared/Button'

function App() {
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
    </div>
  )
}

export default App
