import { BaseModel, BaseModelProps } from 'src/models/Base'

export interface ProductsFields extends BaseModelProps {
  id: number
  name: string
  key_name: string
  description: string
}

export class ProductsModel extends BaseModel {
  static modelName = 'products'

  static url() {
    return 'g-gmp/products/'
  }
}
