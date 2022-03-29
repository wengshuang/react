import React, { useMemo, useState } from 'react'

function SubCounter({ onClick, number }: any) {
  console.log('SubCounter render')
  return <button onClick={onClick}>{number}add</button>
}

function Input({ name, change }: any) {
  console.log('Counter render')
  return <input type="text" value={name} onChange={change} />
}
export default function Counter6() {
  const [name, setName] = useState('计数器')
  const [number, setNumber] = useState(0)

  function change(e: any) {
    setName(e.target.value)
  }
  const Count = useMemo(() => <SubCounter number={number} onClick={() => setNumber(number + 1)} />, [number])
  const Input1 = useMemo(() => <Input name={name} change={change} />, [name])
  return (
    <>
      {Input1}
      {Count}
      {/* <SubCounter number={number} onClick={() => setNumber(number + 1)} />
      <Input name={name} change={change} /> */}
    </>
  )
}
