import React, { Suspense, useState } from 'react'
import { Button, Modal, Form, Input, Select, Spin } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'src/hooks'
import { ProjectFields } from 'src/models'
const MDEditor = React.lazy(() => import('@uiw/react-md-editor'))

const { Option } = Select

interface ProjectFormProps {
  visible: boolean
  onCreate: (values: ProjectFields) => void
  onCancel: () => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      onCreate({ ...values })
      form.resetFields()
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const handleCancel = () => {
    onCancel()
    form.resetFields()
  }

  return (
    <Modal
      open={visible}
      title={t('Создать проект')}
      okText={t('Создать')}
      cancelText='Отмена'
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='name'
          label={t('Название проекта')}
          rules={[{ required: true, message: 'Введите название проекта' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'productType'}
          label={t('Тип продукта')}
          rules={[{ required: true, message: 'Выберите тип продукта' }]}
        >
          <Select>
            <Option value='product1'>Продукт 1</Option>
            <Option value='product2'>Продукт 2</Option>
            {/* Добавьте нужные опции для типов продукта */}
          </Select>
        </Form.Item>
        <Suspense fallback={<Spin spinning={true} />}>
          <Form.Item
            name='description'
            label={t('Описание')}
            rules={[{ required: true, message: 'Введите описание проекта' }]}
          >
            <MDEditor data-color-mode={'light'} />
          </Form.Item>
        </Suspense>
      </Form>
    </Modal>
  )
}

interface ProjectCreationProps {
  isVisible: boolean
  showModal: (isShow: boolean) => void
  onCreate: (values: ProjectFields) => void
}

const ProjectCreation: React.FC<ProjectCreationProps> = ({
  onCreate,
  showModal,
  isVisible,
}) => {
  const { t } = useTranslation()

  return (
    <div>
      <Button
        type='primary'
        icon={<PlusCircleOutlined />}
        onClick={() => showModal(true)}
      >
        {t('Создать проект')}
      </Button>
      <ProjectForm
        visible={isVisible}
        onCreate={onCreate}
        onCancel={() => showModal(false)}
      />
    </div>
  )
}

export default ProjectCreation
