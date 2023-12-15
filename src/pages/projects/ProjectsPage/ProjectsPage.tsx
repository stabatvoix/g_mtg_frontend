import React from 'react'
import { FCC } from 'src/types'
import PageWrapper from '../../../components/_base/PageWrapper/PageWrapper'
import { useTranslation } from 'src/hooks'
import ProjectCard from '../../../components/_base/ProjectCard/ProjectCard'
import { Col, Form, Row } from 'antd'
import ProjectCreation from 'src/components/projects/ProjectCreateModal/ProjectCreateModal'
import { ProjectFields, ProjectsModel } from 'src/models'
import { useInfinityFetchData } from 'src/services/base/useInfinityFetchData'
import { MoreBtn } from 'src/components'
import { useCreateItem } from 'src/services/base/hooks'

const MODEL = ProjectsModel

export const ProjectsPage: FCC = () => {
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [form] = Form.useForm()

  const {
    dataCount,
    rowData,
    fetchNextPage,
    refetch,
    isFetching,
    isLoading,
    hasNextPage,
  }: any = useInfinityFetchData({
    model: MODEL,
    defFilters: {},
  })

  const { mutate: create, isLoading: isCreating } = useCreateItem(MODEL)

  const handleCreate = (values: ProjectFields) => {
    create(values, {
      onSuccess: () => {
        form.resetFields()
        refetch()
        setIsModalVisible(false)
      },
    })
  }

  return (
    <PageWrapper
      title={t('Проекты')}
      itemsCount={dataCount}
      actions={
        <ProjectCreation
          form={form}
          isLoading={isCreating}
          isVisible={isModalVisible}
          onCreate={handleCreate}
          showModal={setIsModalVisible}
        />
      }
      breadcrumbs={[
        {
          href: '/projects',
          title: t('Проекты'),
        },
      ]}
    >
      <Row gutter={[24, 24]}>
        {rowData?.map((project: ProjectFields, index: number) => (
          <Col key={index} xs={24} md={12} xl={8}>
            <ProjectCard
              key={project.id}
              projectId={project.id}
              title={project.name}
              product={project.product.name}
              description={project.description}
            />
          </Col>
        ))}
      </Row>
      {hasNextPage && (
        <MoreBtn
          isLoading={isFetching || isLoading}
          onMore={() => {
            fetchNextPage()
          }}
        />
      )}
    </PageWrapper>
  )
}

ProjectsPage.displayName = 'ProjectsPage'

export default ProjectsPage
