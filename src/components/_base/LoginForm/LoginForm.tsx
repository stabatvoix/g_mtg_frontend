import React from 'react'
import { FCC } from 'src/types'
import { Form, Input, Button, Checkbox } from 'antd'
import { Store } from 'antd/lib/form/interface'

interface LoginFormProps {
  prop?: any
}
export const LoginForm: FCC<LoginFormProps> = () => {
  const setLoginPasswordToLocalStorage = (values: Store) => {
    localStorage.setItem('login', values.username)
    localStorage.setItem('password', values.password)
  }
  const onFinish = (values: Store) => {
    setLoginPasswordToLocalStorage(values)
    // Здесь вы можете обработать отправку данных (логин и пароль)
  }

  return (
    <Form
      name='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ maxWidth: '300px', margin: 'auto', marginTop: '50px' }}
    >
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Введите логин!' }]}
      >
        <Input placeholder='Логин' />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Введите пароль!' }]}
      >
        <Input.Password placeholder='Пароль' />
      </Form.Item>

      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <a style={{ float: 'right' }} href='/'>
          Забыли пароль?
        </a>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm
