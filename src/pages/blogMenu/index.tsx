import React, { useEffect, useState } from 'react'

import { Form, Input, Button, Table, Row, Col, message } from 'antd'
import AddModel from './components/AddModel'

import api from '../../api/tags'
const BlogMenu = function () {
  const [form] = Form.useForm()
  const [tableData, settableData] = useState([])
  const [loading, setloading] = useState(false)

  const [total, settotal] = useState(0)
  const [currentPage, setcurrentPage] = useState(1)
  const [pageSize, setpageSize] = useState(20)

  const [top, settop] = useState(200)
  const [visible, setvisible] = useState(false)
  const onFinish = () => {
    getData()
  }

  const getData = async (current: number = currentPage, size: number = pageSize) => {
    console.log('getData', currentPage, 323232)
    try {
      setloading(true)
      const {
        data: { data }
      } = await api.getTags({
        currentPage: current,
        pageSize: size,
        name: form.getFieldValue('name')
      })
      settotal(data.total)
      settableData(data.data)
      setloading(false)
    } catch (e) {
      console.log(e)
    }
  }
  const onChange = (c: number, size: number) => {
    setcurrentPage(c)
    setpageSize(size)
    // getData(c, size)
  }
  const save = () => {
    getData()
    setvisible(false)
  }
  useEffect(() => {
    getData()
  }, [pageSize, currentPage])

  useEffect(() => {
    settop((document.querySelector('.ant-table-body') as any).getBoundingClientRect().top)
  }, [])
  // useMemo(()=>)
  async function del(val: any) {
    console.log(val)
    try {
      await api.delTag({
        id: val._id
      })
      message.success('操作成功')
      getData()
    } catch (e) {
      console.log(e)
    }
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center' as 'center',
      key: 'name'
    },
    {
      title: '操作',
      align: 'center' as 'center',
      key: 'action',
      render: (text: any, record: any) => {
        return (
          <Button type="link" onClick={() => del(record)}>
            删除
          </Button>
        )
      }
    }
  ]
  return (
    <>
      <Row>
        <Col span={20}>
          <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            autoComplete="off"
            style={{
              marginBottom: '20px'
            }}
          >
            <Form.Item name="name">
              <Input placeholder="输入名称" />
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
        rowKey="_id"
        dataSource={tableData}
        pagination={{
          total,
          current: currentPage,
          pageSize,
          onChange,
          showSizeChanger: true,
          showTotal: (total) => `总共 ${total} 条`
        }}
        scroll={{
          y: `calc(100vh - ${top + 76}px)`
        }}
      />
      <AddModel visible={visible} save={save} onOk={() => setvisible(false)} onCancel={() => setvisible(false)} />
    </>
  )
}
export default BlogMenu
