import React, { useEffect } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import api from '@/api/tags'

export default function AddModel(props: any) {
  const [form] = Form.useForm()
  async function handleOk() {
    try {
      const data = await form.validateFields()
      console.log(data)
      await api.addTag(data)
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
            提交
          </Button>
        ]}
      >
        <Form form={form} preserve={false} autoComplete="off">
          <Form.Item label="名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
