import React from 'react'
import styles from './StatisticsPage.module.scss'
import { FCC } from 'src/types'
import { PageWrapper, PaginatedTable } from 'src/components'
import { useTranslation } from 'src/hooks'
import { UsersPageActions } from 'src/components/users/UsersPageActions'
import { Columns } from 'src/pages/users/Columns'
import LoadDataModal from '../../../components/_base/LoadDataModal/LoadDataModal'
import { useNavigate } from 'react-router-dom'

interface UsersPageProps {
  prop?: any
}
export const UsersPage: FCC<UsersPageProps> = ({ prop }) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false)
  const { t } = useTranslation()
  const columns = Columns()

  const handleIsOpen = () => {
    setIsOpen(true)
  }
  const handleIsClose = () => {
    setIsOpen(false)
  }
  return (
    <PageWrapper
      title={t('Пользователи')}
      breadcrumbs={[{ title: t('Пользователи'), href: '/users' }]}
      actions={<UsersPageActions onUpload={handleIsOpen} />}
    >
      <LoadDataModal isOpen={isOpen} onClose={handleIsClose} />
      <PaginatedTable
        columns={columns}
        onRowClick={({ record }) => {
          navigate(`${record.id.value}`)
        }}
      />
    </PageWrapper>
  )
}

UsersPage.displayName = 'UsersPage'

export default UsersPage
