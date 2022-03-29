import { Pagination } from 'antd'
// interface Ipage{
//   total: number
//   pageSize:10|20|50|100
// }

export default function Page(props: any) {
  return (
    <Pagination
      showSizeChanger
      showQuickJumper
      showTotal={(total) => `Total ${total} items`}
      onChange={props.onChange}
      {...props}
    />
  )
}
