import { BaseModel, BaseModelProps } from 'src/models'

export interface CicadaFilesModelProps extends BaseModelProps {
  cicadaFile: string
  objectId: string | number
}
export class CicadaFilesModel extends BaseModel {
  static modelName = 'cicadaFiles'
  static url() {
    return '/cicada-file/cicada-files'
  }
}
