import React from 'react'
import { Spin } from 'antd'
export default function Loading() {
  return (
    <div className="flex-1 flex item-center content-center">
      <Spin />
    </div>
  )
}
