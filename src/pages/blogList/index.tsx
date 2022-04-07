import React, { useEffect, useState } from 'react'

import { Form, Input, Button, Table, Row, Col, message, Select } from 'antd'
import AddModel from './components/AddModel'
import tagApi from '../../api/tags'

import api from '../../api/blogs'
const { Option } = Select
const BlogMenu = function () {
  const [form] = Form.useForm()
  const [tableData, settableData] = useState([])
  const [loading, setloading] = useState(false)

  const [total, settotal] = useState(0)
  const [currentPage, setcurrentPage] = useState(1)
  const [pageSize, setpageSize] = useState(20)

  const [top, settop] = useState(200)
  const [id, setid] = useState('')
  const [visible, setvisible] = useState(false)
  const [tags, setTags] = React.useState([])
  const onFinish = () => {
    getData()
  }

  const getData = async (current: number = currentPage, size: number = pageSize) => {
    try {
      setloading(true)
      const {
        data: { data }
      } = await api.getBlogs({
        currentPage: current,
        pageSize: size,
        title: form.getFieldValue('title'),
        tagId: form.getFieldValue('tagId')
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
    tagApi.getAllTags().then(({ data }) => {
      setTags(data.data)
    })
  }, [])
  // useMemo(()=>)
  async function del(val: any) {
    console.log(val)
    try {
      await api.delBlog({
        id: val._id
      })
      message.success('操作成功')
      getData()
    } catch (e) {
      console.log(e)
    }
  }
  async function modify(val: any) {
    setid(val._id)
    setvisible(true)
  }
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center' as 'center',
      key: 'title'
    },
    {
      title: '所属标签',
      dataIndex: 'tagName',
      align: 'center' as 'center',
      key: 'tagName'
    },
    {
      title: '操作',
      align: 'center' as 'center',
      key: 'action',
      render: (text: any, record: any) => {
        return (
          <>
            <Button type="link" onClick={() => del(record)}>
              删除
            </Button>
            <Button type="link" onClick={() => modify(record)}>
              修改
            </Button>
          </>
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
            <Form.Item name="title">
              <Input placeholder="输入名称" />
            </Form.Item>
            <Form.Item name="tagId">
              <Select style={{ width: '220px' }} allowClear>
                {tags.map((item: any) => {
                  return (
                    <Option value={item._id} key={item._id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                查询
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={2} offset={2} className="text-right">
          <Button
            type="primary"
            onClick={() => {
              setid('')

              setvisible(true)
            }}
          >
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
      <AddModel
        visible={visible}
        save={save}
        onOk={() => setvisible(false)}
        onCancel={() => setvisible(false)}
        tags={tags}
        id={id}
      />
    </>
  )
}
export default BlogMenu
