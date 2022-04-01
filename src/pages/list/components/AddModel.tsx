import React, { useEffect } from 'react'
import { Modal, Form, Input, Button, Radio, message } from 'antd'
import api from '../../../api/member'

export default function AddModel(props: any) {
  const [form] = Form.useForm()
  async function handleOk() {
    try {
      const data = await form.validateFields()
      console.log(data)
      await api.addMember(data)
      message.success('操作成功！')
      props.save()
    } catch (e) {
      console.log('error', e)
    }
  }
  useEffect(() => {
    if (props.visible) {
      form.resetFields()
    }
  }, [form, props.visible])

  return (
    <>
      <Modal
        title="新增会员"
        forceRender
        destroyOnClose
        style={{
          top: '25vh'
        }}
        visible={props.visible}
        width={500}
        onCancel={() => {
          form.resetFields()

          props.onCancel()
        }}
        footer={[
          <Button key="submit" type="primary" onClick={() => handleOk()}>
            Submit
          </Button>
        ]}
      >
        <Form form={form} preserve={false} autoComplete="off">
          <Form.Item label="姓名" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="性别" name="sex" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="0">男</Radio>
              <Radio value="1">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="年龄" name="age" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="籍贯" name="city" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
