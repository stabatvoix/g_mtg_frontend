import React, { CSSProperties } from 'react'
import { FCC } from 'src/types'
import { Layout, Menu, theme, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
const { Sider } = Layout
const { Title } = Typography

interface SideBarProps {
  sideBarItems?: any[]
}
export const SideBar: FCC<SideBarProps> = ({ sideBarItems }) => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([])

  React.useEffect(() => {
    const path = window.location.pathname
    const route = sideBarItems?.find((route) => path.includes(route.to))
    setSelectedKeys([route?.to])
  }, [])

  const handleMenuClick = (e: any) => {
    setSelectedKeys([e.key])
  }
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0,
        borderRight: '1px solid #1f1f1f',
      }}
      collapsible
    >
      <h1
        style={{
          textAlign: 'center',
          margin: '20px 0',
        }}
      >
        <Title
          level={3}
          style={{
            color: '#fff',
          }}
        >
          GENA
        </Title>
      </h1>
      <Menu
        theme='dark'
        mode='vertical'
        selectedKeys={selectedKeys}
        items={sideBarItems?.map((item: any, index: number) => ({
          key: item.to,
          icon: item.icon,
          label: <NavLink to={item.to}>{item.title}</NavLink>,
        }))}
        onClick={handleMenuClick}
      />
    </Sider>
  )
}

SideBar.displayName = 'SideBar'

export default SideBar
