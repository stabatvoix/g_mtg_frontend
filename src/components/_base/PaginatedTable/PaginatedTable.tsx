import React, { useEffect, useState } from 'react'
import qs from 'qs'
import { Button, Col, Row, Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import { useWindowSize } from 'src/hooks'
import { DeleteOutlined } from '@ant-design/icons'
import type { GetComponentProps } from 'rc-table/lib/interface'
import { NavLink } from 'react-router-dom'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
})

interface PaginatedTableProps {
  columns: ColumnsType<Record<string, any>>
  onRowClick?: ({
    record,
    rowIndex,
    event,
  }: {
    record: Record<string, any>
    rowIndex?: number
    event: React.MouseEvent<HTMLElement>
  }) => void
}

export const PaginatedTable: React.FC<PaginatedTableProps> = ({
  columns,
  onRowClick,
}) => {
  const advancedColumns = [
    ...columns,
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '5%',
      render: () => (
        <Row justify={'end'}>
          <Col>
            <Button
              danger
              type={'text'}
              icon={<DeleteOutlined />}
              onClick={(event) => {
                event.stopPropagation()
              }}
            />
          </Col>
        </Row>
      ),
    },
  ]
  const { height } = useWindowSize()
  const [data, setData] = useState<Record<string, any>[]>()
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  })

  const fetchData = () => {
    setLoading(true)
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results)
        setLoading(false)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        })
      })
  }

  useEffect(() => {
    fetchData()
  }, [JSON.stringify(tableParams)])

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<Record<string, any>>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    })

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }

  return (
    <div
      style={{
        border: '1px solid #e8e8e8',
        borderRadius: '8px',
      }}
    >
      <Table
        columns={advancedColumns}
        rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        scroll={{ x: 500, y: height - 270 }}
        // @ts-ignore
        onChange={handleTableChange}
        onRow={(record, rowIndex) => ({
          onClick: (event) => {
            onRowClick?.({ record, rowIndex, event })
          },
        })}
      />
    </div>
  )
}

export default PaginatedTable
