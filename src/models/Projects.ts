import { BaseModel, BaseModelProps } from 'src/models/Base'

export interface ProjectFields extends BaseModelProps {
  id: number
  name: string
  description: string
  productType: string
}

export class ProjectsModel extends BaseModel {
  static modelName = 'projects'

  static url() {
    return '/projects'
  }
}
