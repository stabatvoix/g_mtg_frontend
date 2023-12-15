import React from 'react'
import { FCC } from 'src/types'
import PageWrapper from '../../../components/_base/PageWrapper/PageWrapper'
import { useTranslation } from 'src/hooks'
import ProjectCard from '../../../components/_base/ProjectCard/ProjectCard'
import { Col, Row } from 'antd'
import { useInfinityFetchData } from 'src/services/base/useInfinityFetchData'
import { ProductsFields, ProductsModel } from 'src/models/Products'
import { MoreBtn } from 'src/components'

const MODEL = ProductsModel

export const ProductsPage: FCC = () => {
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const {
    dataCount,
    rowData,
    fetchNextPage,
    isFetching,
    isLoading,
    hasNextPage,
  }: any = useInfinityFetchData({
    model: MODEL,
    defFilters: {},
  })
  const onCreateClick = (values: ProductsFields) => {
    const newProject = {
      // title: values.name,
      // productType: values.productType,
      // description: values.description,
    }
    setIsModalVisible(false)
  }

  return (
    <PageWrapper
      title={t('Продукты')}
      itemsCount={dataCount}
      // actions={
      //   <ProjectCreation
      //     isVisible={isModalVisible}
      //     onCreate={onCreateClick}
      //     showModal={setIsModalVisible}
      //   />
      // }
      breadcrumbs={[
        {
          href: '/products',
          title: t('Продукты'),
        },
      ]}
    >
      <Row gutter={[24, 24]}>
        {rowData.map((products: ProductsFields) => (
          <Col key={products.id} xs={24} md={12} xl={8}>
            <ProjectCard
              projectId={products.id}
              title={products.name}
              product={products.key_name}
              description={products.description}
              onClick={() => console.log('onClick')}
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

ProductsPage.displayName = 'ProductsPage'

export default ProductsPage
