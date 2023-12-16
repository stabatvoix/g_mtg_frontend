import React from 'react'
import styles from './ProductPage.module.scss'
import { FCC } from 'src/types'

interface ProductPageProps {
  prop?: any
}
export const ProductPage: FCC<ProductPageProps> = ({ prop }) => {
  return (
    <div className={styles.container} data-testid='test-ProductPage'>
      ProductPage
    </div>
  )
}

ProductPage.displayName = 'ProductPage'

export default ProductPage
