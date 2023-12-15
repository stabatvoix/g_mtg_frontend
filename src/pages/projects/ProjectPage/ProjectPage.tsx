import React, { Suspense, useMemo } from 'react'
import styles from './ProjectPage.module.scss'
import { FCC } from 'src/types'
import { Col, Divider, Input, notification, Row, Typography } from 'antd'
import { ChannelCard, PageWrapper } from 'src/components'
import { useTranslation } from 'src/hooks'
const { Title } = Typography
import { Outlet } from 'react-router-dom'
import { ChannelActionsRoutesNames } from 'src/routes/projectsRoutes'
import { useUpdateItem } from 'src/services/base/hooks'
import { ProjectsModel } from 'src/models'
const EditableMarkdown = React.lazy(
  () => import('src/components/_base/EditableMarkdown/EditableMarkdown')
)
interface ProjectPageProps {
  prop?: any
}

const fakeProjectData = {
  id: 1,
  title: 'Проект 1',
  productType: 'Тип продукта 1',
  description:
    '## 🔨 Требования к окружению\n' +
    '## ⌨️ Доступные скрипты\n' +
    '\n' +
    '```json\n' +
    '    "start": "vite",\n' +
    '    "build": "tsc && vite build",\n' +
    '    "preview": "vite preview",\n' +
    '    "test": "vitest",\n' +
    '    "husky-install": "husky install",\n' +
    '    "new:component": "hygen new component"\n' +
    '```',
}

export const ProjectPage: FCC<ProjectPageProps> = ({ prop }) => {
  const { t } = useTranslation()
  const channelsCardsFakeData = useMemo(() => {
    return [
      {
        id: 1,
        title: t('СМС'),
        to: `${ChannelActionsRoutesNames.CHANNELS}/sms`,
      },
      {
        id: 2,
        title: t('ПУШ'),
        to: `${ChannelActionsRoutesNames.CHANNELS}/push`,
      },
      {
        id: 3,
        title: t('КУРЬЕР'),
        to: `${ChannelActionsRoutesNames.CHANNELS}/courier`,
      },
    ]
  }, [t])

  const { mutate: updateProject } = useUpdateItem(ProjectsModel)

  const handleSaveDescription = (text: string) => {
    updateProject(
      { id: fakeProjectData.id, fields: { description: text } },
      {
        onSuccess: () => {
          notification.success({
            message: t('Описание проекта успешно обновлено'),
          })
        },
        onError: () => {
          notification.error({
            message: t('Не удалось обновить описание проекта'),
          })
        },
      }
    )
  }

  return (
    <PageWrapper
      title={fakeProjectData.title}
      breadcrumbs={[
        {
          title: t('Проекты'),
          href: '/projects',
        },
        {
          title: fakeProjectData.title,
        },
      ]}
    >
      <div>
        <Suspense>
          <EditableMarkdown
            text={fakeProjectData.description}
            onSave={handleSaveDescription}
          />
        </Suspense>
        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col xs={24} xl={12}>
            <Input.TextArea
              placeholder={t('Введите промт...')}
              autoSize={{ minRows: 3, maxRows: 12 }}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col xs={24}>
            <Title level={4}>{t('Каналы связи')}</Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          {channelsCardsFakeData.map((channelCardFakeData) => (
            <Col key={channelCardFakeData.id} xs={24} xl={8}>
              <ChannelCard
                title={channelCardFakeData.title}
                to={channelCardFakeData.to}
              />
            </Col>
          ))}
        </Row>
        <Divider />
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </PageWrapper>
  )
}

ProjectPage.displayName = 'ProjectPage'

export default ProjectPage
