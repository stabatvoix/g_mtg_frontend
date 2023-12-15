import React from 'react'
import { FCC } from 'src/types'
import { Layout } from 'antd'
import { LoginForm } from 'src/components'
import { useTranslation } from 'src/hooks'

const { Header, Content } = Layout

interface LoginPageProps {
  prop?: any
}
export const LoginPage: FCC<LoginPageProps> = ({ prop }) => {
  const { t } = useTranslation()
  return (
    <Layout className='layout'>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <span>ГЕНА</span>
      </Header>
      <Content style={{ padding: '10px 50px', textAlign: 'center' }}>
        <h1>{t('Авторизация')}</h1>
        <LoginForm />
      </Content>
    </Layout>
  )
}

LoginPage.displayName = 'LoginPage'
