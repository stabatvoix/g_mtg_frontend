import React, { Suspense, useMemo } from 'react'
import { FCC } from 'src/types'
import { Col, Divider, notification, Row, Typography } from 'antd'
import { ChannelCard, PageWrapper, SelectSearchable } from 'src/components'
import { useTranslation } from 'src/hooks'
const { Title } = Typography
import { Outlet, useParams } from 'react-router-dom'
import { ChannelActionsRoutesNames } from 'src/routes/projectsRoutes'
import {
  useExtraActionsPost,
  useFetchOneItem,
  useUpdateItem,
} from 'src/services/base/hooks'
import { ProjectsModel } from 'src/models'
import GoToEntityDetail from '../../../components/_base/GoToEntityDetail/GoToEntityDetail'
import { ProductsRoutesNames } from 'src/routes/productsRoutes'
import { AddSalesChannelsToProject } from 'src/components/projects/AddSalesChannelsToProject/AddSalesChannelsToProject'
const EditableMarkdown = React.lazy(
  () => import('src/components/_base/EditableMarkdown/EditableMarkdown')
)
interface ProjectPageProps {
  prop?: any
}

export const ProjectPage: FCC<ProjectPageProps> = ({ prop }) => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const [isShowAddSalesChannelsModal, setIsShowAddSalesChannelsModal] =
    React.useState(false)

  const {
    data,
    refetch,
  }: {
    data: any
    isLoading: boolean
    refetch: CallableFunction
  } = useFetchOneItem({
    model: ProjectsModel,
    id: Number(id),
    options: {
      enabled: !!id,
    },
  })

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

  const handleUpdate = (field: string, text: string) => {
    updateProject(
      { id: data?.data?.id, fields: { [field]: text } },
      {
        onSuccess: () => {
          refetch()
          notification.success({
            message: t('Успешно обновлено'),
          })
        },
        onError: () => {
          notification.error({
            message: t('Не удалось обновить'),
          })
        },
      }
    )
  }

  const {
    mutate: addSalesChannelsToProject,
    isLoading: isAddSalesChannelsToProjectLoading,
  } = useExtraActionsPost('addSalesChannelsToProject')

  const handleAddSalesChannelsToProject = (
    salesChannels: Record<string, number[]>
  ) => {
    addSalesChannelsToProject(
      {
        url: ProjectsModel.addSalesChannelsUrl(data?.data?.id as number),
        record: salesChannels,
      },
      {
        onSuccess: () => {
          refetch()
          notification.success({
            message: t('Успешно добавлено'),
          })
        },
        onError: (err) => {
          notification.error({
            message: t('Не удалось добавить'),
          })
          console.error(err)
        },
      }
    )
  }
  const handleShowAddSalesChannelsModal = (isShow: boolean) => {
    setIsShowAddSalesChannelsModal(isShow)
  }

  return (
    <PageWrapper
      title={data?.data?.name}
      breadcrumbs={[
        {
          title: t('Проекты'),
          href: '/projects',
        },
        {
          title: data?.data?.name,
        },
      ]}
    >
      <div>
        <Row gutter={16}>
          <Col xs={24}>
            <Title level={4}>{t('Описание')}</Title>
          </Col>
          <Col xs={24} xl={12}>
            {data?.data ? (
              <Suspense>
                <EditableMarkdown
                  text={data?.data?.description}
                  onSave={(text) => handleUpdate('description', text)}
                />
              </Suspense>
            ) : null}
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col xs={24}>
            <Title level={4}>
              {t('Дополнительные данные для формирования запроса в LLM')}
            </Title>
          </Col>
          <Col xs={24} xl={12}>
            {data?.data ? (
              <Suspense>
                <EditableMarkdown
                  text={data?.data?.prompt}
                  onSave={(text) => handleUpdate('prompt', text)}
                />
              </Suspense>
            ) : null}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24}>
            <Title level={4}>{t('Продукт')}</Title>
          </Col>
          <Col xs={24} xl={12}>
            <GoToEntityDetail
              text={data?.data?.product?.name}
              url={`/${ProductsRoutesNames.PRODUCTS}/${data?.data?.product?.id}`}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col xs={24}>
            <Title level={4}>{t('Каналы связи')}</Title>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <AddSalesChannelsToProject
              isLoading={isAddSalesChannelsToProjectLoading}
              visible={isShowAddSalesChannelsModal}
              onAdd={handleAddSalesChannelsToProject}
              onCancel={() => handleShowAddSalesChannelsModal(false)}
              onShowModal={() => handleShowAddSalesChannelsModal(true)}
            />
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
