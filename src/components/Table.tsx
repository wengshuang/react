import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
export default function CustemTable(props: any) {
  const [top, settop] = useState(200)
  console.log('table')
  useEffect(() => {
    settop((document.querySelector('.ant-table-body') as any).getBoundingClientRect().top)
  }, [])
  return (
    <Table
      loading={props.loading}
      columns={props.columns}
      rowKey="_id"
      dataSource={props.dataSource}
      pagination={{
        showSizeChanger: true,
        ...props.pagination
      }}
      scroll={{
        y: `calc(100vh - ${top + 76}px)`
      }}
    />
  )
}
