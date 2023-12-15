import React from 'react'
import styles from './ProjectsPage.module.scss'
import { FCC } from 'src/types'
import PageWrapper from '../../../components/_base/PageWrapper/PageWrapper'
import { useTranslation } from 'src/hooks'
import ProjectCard from '../../../components/_base/ProjectCard/ProjectCard'
import { Col, Row } from 'antd'
import ProjectCreation from 'src/components/projects/ProjectCreateModal/ProjectCreateModal'
import { ProjectFields } from 'src/models'

interface ProjectsPageProps {
  prop?: any
}

const projectsFakeData = [
  {
    id: 1,
    title: 'Проект 1',
    productType: 'Тип продукта 1',
    description: 'Описание проекта 1',
  },
  {
    id: 2,
    title: 'Проект 2',
    productType: 'Тип продукта 2',
    description: 'Описание проекта 2',
  },
  {
    id: 3,
    title: 'Проект 3',
    productType: 'Тип продукта 3',
    description: 'Описание проекта 3',
  },
  {
    id: 4,
    title: 'Проект 4',
    productType: 'Тип продукта 4',
    description: 'Описание проекта 4',
  },
  {
    id: 5,
    title: 'Проект 5',
    productType: 'Тип продукта 5',
    description:
      'Понял вас. Давайте обновим компонент, чтобы описание было в формате ReactMarkdown, а высота карточки была фиксированной. Для этого мы будем использовать react-markdown для визуализации описания внутри карточки. Пожалуйста, убедитесь, что вы установили библиотеку react-markdown перед использованием этого компонента.' +
      'Понял вас. Давайте обновим компонент, чтобы описание было в формате ReactMarkdown, а высота карточки была фиксированной. Для этого мы будем использовать react-markdown для визуализации описания внутри карточки. Пожалуйста, убедитесь, что вы установили библиотеку react-markdown перед использованием этого компонента.',
  },
]

export const ProjectsPage: FCC<ProjectsPageProps> = ({ prop }) => {
  const [data, setData] = React.useState(projectsFakeData)
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = React.useState(false)

  const onCreateClick = (values: ProjectFields) => {
    const newProject = {
      id: data.length + 1,
      title: values.name,
      productType: values.productType,
      description: values.description,
    }
    setData([...data, newProject])
    setIsModalVisible(false)
  }

  return (
    <PageWrapper
      title={t('Проекты')}
      actions={
        <ProjectCreation
          isVisible={isModalVisible}
          onCreate={onCreateClick}
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
        {data.map((project, index) => (
          <Col key={index} xs={24} md={12} xl={8}>
            <ProjectCard
              key={project.id}
              projectId={project.id}
              title={project.title}
              productType={project.productType}
              description={project.description}
              onClick={() => console.log('onClick')}
            />
          </Col>
        ))}
      </Row>
    </PageWrapper>
  )
}

ProjectsPage.displayName = 'ProjectsPage'

export default ProjectsPage
