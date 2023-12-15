import React from 'react'
import styles from './PageWrapper.module.scss'
import { FCC } from 'src/types'
import { Breadcrumb, Col, Layout, Row, Typography } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'

const { Content } = Layout
const { Title, Text } = Typography

export interface BreadCrumbItemProps {
  href?: string
  title: React.ReactNode
}
interface PageWrapperProps {
  title?: string
  description?: string
  actions?: React.ReactNode
  breadcrumbs?: BreadCrumbItemProps[]
}

export const PageWrapper: FCC<PageWrapperProps> = ({
  actions,
  title,
  children,
  description,
  breadcrumbs = [],
}) => {
  const breadcrumbItems = [
    {
      href: '',
      title: <HomeOutlined />,
    },
    ...breadcrumbs,
  ]
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Layout>
        <Content>
          <Breadcrumb
            style={{
              marginBottom: '12px',
            }}
            items={breadcrumbItems}
          />
          <div
            style={{
              marginBottom: '26px',
            }}
          >
            <Row gutter={[16, 16]} justify={'space-between'}>
              <Col xs={24} xl={12}>
                <Title
                  level={2}
                  style={{
                    margin: 0,
                  }}
                >
                  {title}
                </Title>
              </Col>
              <Col>{actions}</Col>
            </Row>
            <div>
              <Text type='secondary'>{description}</Text>
            </div>
          </div>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

PageWrapper.displayName = 'PageWrapper'

export default PageWrapper
