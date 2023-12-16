import { BaseModel, BaseModelProps } from 'src/models/Base'

export interface ProjectFields extends BaseModelProps {
  id: number
  name: string
  description: string
  product: any
  prompt: string
}

export class ProjectsModel extends BaseModel {
  static modelName = 'projects'

  static url() {
    return 'g-gmp/projects/'
  }

  static addSalesChannelsUrl(id: number) {
    return `${this.url()}${id}/add-sales-channels/`
  }
}
