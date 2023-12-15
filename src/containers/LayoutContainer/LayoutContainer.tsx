import React, { ReactElement, Suspense } from 'react'
import { LayoutLoading, SideBar } from 'src/components/'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { FCC } from 'src/types'
import { Link } from 'src/routes'

interface LayoutContainerProps {
  isAuthorized?: boolean
  leftContainer?: ReactElement
  centerContainer?: ReactElement
  rightContainer?: ReactElement
  links?: Link[]
}

export const LayoutContainer: FCC<LayoutContainerProps> = ({
  isAuthorized,
  links,
  children,
}) => {
  const sideBarItems: Link[] = links?.filter((item) => item.isNavLink) || []
  if (!isAuthorized) {
    return <Outlet />
  }
  return (
    <Suspense fallback={<LayoutLoading />}>
      <Layout hasSider style={{ height: '100vh' }}>
        <SideBar sideBarItems={sideBarItems} />

        <Layout>
          <div
            style={{
              padding: '20px',
              overflow: 'auto',
              height: '100vh',
            }}
          >
            {children || <Outlet />}
          </div>
        </Layout>
      </Layout>
    </Suspense>
  )
}

LayoutContainer.displayName = 'LayoutContainer'

export default LayoutContainer
