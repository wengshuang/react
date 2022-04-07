import React, { useEffect } from 'react'
import { Modal, Form, Select, Button, message, Input } from 'antd'
import BraftEditor from 'braft-editor'
import api from '../../../api/blogs'
const { Option } = Select
export default function AddModel(props: any) {
  const [form] = Form.useForm()
  async function handleOk() {
    try {
      const data = await form.validateFields()
      data.content = BraftEditor.createEditorState(data.content).toHTML()
      if (props.id) {
        await api.updateBlog({
          id: props.id,
          title: data.title,
          content: data.content
        })
      } else {
        await api.addBlog(data)
      }
      message.success('操作成功！')
      props.save()
    } catch (e) {
      console.log('error', e)
    }
  }

  useEffect(() => {
    if (props.visible) {
      if (props.id) {
        api
          .getBlogById({
            id: props.id
          })
          .then(({ data: { data } }) => {
            console.log(data)
            form.setFieldsValue({
              title: data.title,
              content: BraftEditor.createEditorState(data.content),
              tagId: data.tagId
            })
          })
      } else {
        form.resetFields()
      }
    }
  }, [props.visible])

  function editChange(editorState: any) {
    const html = editorState.toHTML()
    if (html === '<p></p>') {
      form.setFields([
        {
          name: 'content',
          value: ''
          // errors:'wewewewewe'
        }
      ])
    }
  }
  return (
    <>
      <Modal
        title={props.id ? '编辑博客' : '新增博客'}
        forceRender
        destroyOnClose
        style={{
          top: '5vh'
        }}
        visible={props.visible}
        width={1100}
        bodyStyle={{
          maxHeight: '700px',
          overflow: 'auto'
        }}
        onCancel={() => {
          form.resetFields()

          props.onCancel()
        }}
        footer={[
          <Button key="submit" type="primary" onClick={() => handleOk()}>
            提交
          </Button>
        ]}
      >
        <Form form={form} preserve={false} autoComplete="off" labelCol={{ span: 2 }}>
          <Form.Item label="所属标签" name="tagId" rules={[{ required: true }]}>
            <Select style={{ width: '220px' }} disabled={!!props.id}>
              {props.tags.map((item: any) => {
                return (
                  <Option value={item._id} key={item._id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="标题" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="内容" name="content" rules={[{ required: true }]}>
            <BraftEditor style={{ border: '1px solid #d1d1d1' }} onChange={editChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
