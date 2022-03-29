import React, { useEffect } from 'react'
import {Modal,Form,Input,Button} from 'antd'
export default function AddModel (props: any) {

  const [form] = Form.useForm()
  console.log(form.validateFields(),form.getFieldsValue())
  function handleOk () {
  }
  useEffect(() => {
    if (props.visible) {
      form.setFieldsValue({
        domainCode:'323232'
      })
    }

  }, [props.visible])

  return <>
  <Modal
        title="Modal 1000px width"
        forceRender
        destroyOnClose
        style={{
          top:'10vh'
        }}
        visible={props.visible}
        width={1000}
    onCancel={() => {
    form.resetFields()

      props.onCancel()
    }}
        footer={[
          <Button key="submit" type="primary" onClick={()=>handleOk()}>
            Submit
          </Button>
        ]}
      >
    <Form form={form} name="domain" preserve={false}>
					<Form.Item label="域编码" name="domainCode" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item label="域名称" name="domainName" rules={[{ required: true }]} >
						<Input />
					</Form.Item>
				</Form>
      </Modal>

  </>
}
