import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { FormControl, FormLabel, Button, Input } from '@chakra-ui/react'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()

  function onSubmit(e) {
    e.preventDefault()
    signIn({ email, password })
  }

  return (
    <div>
      <FormControl b="1px" id="signin">
        <FormLabel m={4}>Sign In</FormLabel>
        <Input
          m={4}
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          m={4}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button m={4} w="100%" onClick={onSubmit} type="submit">
          Log In
        </Button>
      </FormControl>
    </div>
  )
}

export default SignIn
