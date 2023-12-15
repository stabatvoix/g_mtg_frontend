import React, { lazy, Suspense } from 'react'
import styles from './ProjectCard.module.scss'
import { FCC } from 'src/types'
import { Card, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
const ReactMarkdown = lazy(() => import('react-markdown'))

const { Title, Paragraph } = Typography

interface ProjectCardProps {
  projectId: number
  title?: string
  productType?: string
  description?: string
  onClick?: () => void
}
export const ProjectCard: FCC<ProjectCardProps> = ({
  projectId,
  title,
  productType,
  description = '',
  onClick,
}) => {
  return (
    <NavLink to={`/projects/${projectId}`}>
      <Card
        title={<Title level={4}>{title}</Title>}
        style={{ width: '100%', marginBottom: 16, height: '350px' }} // Задаем фиксированную высоту
        hoverable
        onClick={onClick}
      >
        <div>
          <Paragraph strong>Тип продукта: </Paragraph>
          <Paragraph>{productType}</Paragraph>
          <Paragraph strong>Описание: </Paragraph>
          <Suspense fallback={<div>Loading...</div>}>
            <Paragraph
              style={{
                overflow: 'scroll',
                height: '150px',
              }}
            >
              <ReactMarkdown>{description}</ReactMarkdown>
            </Paragraph>
          </Suspense>
        </div>
      </Card>
    </NavLink>
  )
}

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard
