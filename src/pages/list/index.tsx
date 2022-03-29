import React, { useEffect, useState } from 'react'

import { Form, Input, Button, Table, DatePicker, Row, Col } from 'antd'
import AddModel from './components/AddModel'

import api from '../../api/user'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
]

const List = function (props: any) {
  const [form] = Form.useForm()
  const [tableData, settableData] = useState([])
  const [loading, setloading] = useState(false)
  const [total, settotal] = useState(0)
  const [current, setcurrent] = useState(1)
  const [top, settop] = useState(200)
  const [visible, setvisible] = useState(false)
  const onFinish = (values: any) => {
    console.log('Success:', values)
    getData()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  async function getData(current?: number, size?: number) {
    try {
      setloading(true)
      const {
        data: { data },
      } = await api.getData({
        current,
        size,
      })
      settotal(data.length)
      settableData(data)
      setloading(false)
    } catch (e) {
      console.log(e)
    }
  }
  function onChange(current: number, size: number) {
    console.log(current, size)
    setcurrent(current)
  }

  useEffect(() => {
    settop((document.querySelector('.ant-table-body') as any).getBoundingClientRect().top)
    getData()
  }, [])
  // useMemo(()=>)

  return (
    <>
      <Row>
        <Col span={20}>
          <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
              marginBottom: '20px',
            }}
          >
            <Form.Item name="username">
              <Input />
            </Form.Item>

            <Form.Item name="password">
              <Input />
            </Form.Item>
            <Form.Item>
              <DatePicker picker="month" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                查询
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={2} offset={2} className="text-right">
          <Button type="primary" onClick={() => setvisible(true)}>
            新增
          </Button>
        </Col>
      </Row>

      <Table
        loading={loading}
        columns={columns}
        rowKey="name"
        dataSource={tableData}
        pagination={{
          total,
          current,
          pageSize: 20,
          onChange,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        scroll={{
          y: `calc(100vh - ${top + 76}px)`,
        }}
      />
      <AddModel visible={visible} onOk={() => setvisible(false)} onCancel={() => setvisible(false)} />
    </>
  )
}
export default List
