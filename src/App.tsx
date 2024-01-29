import { useState } from 'react'
import { Button, Modal, Select, Input } from '@douyinfe/semi-ui'
import './App.css'
import { getTableList, newTable, write2NewTable } from './utils'
import { ITableMeta } from '@lark-base-open/js-sdk'

function App() {
    const [modalIsShow, setModalIsShow] = useState(false)
    const [tableList, setTableList] = useState<ITableMeta[]>([])
    const [selectedTable, setSelectedTable] = useState('')
    const [newTableName, setNewTableName] = useState('')

    return (
        <>
            <div className='container'>
                <div>
                    <p>初次使用：</p>
                    <Button
                        onClick={() => {
                            setNewTableName(
                                `账单模版_${(() => {
                                    const date = new Date()
                                    return `${date.getFullYear()}${
                                        date.getMonth() + 1
                                    }${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
                                })()}`
                            )
                            setModalIsShow(true)
                        }}
                        theme='solid'
                        type='primary'
                    >
                        新建账单模版 📝
                    </Button>
                </div>

                <div>
                    <p>请选择账单所在表：</p>
                    <Select
                        value={selectedTable}
                        //@ts-expect-error 明明有这个属性，但是不知道抽什么风静态报错
                        onChange={setSelectedTable}
                        placeholder={'请点击选择数据表'}
                        onFocus={() => {
                            getTableList(setTableList)
                        }}
                    >
                        {tableList.map(item => (
                            <Select.Option value={item.id}>{item.name}</Select.Option>
                        ))}
                    </Select>
                    <Button
                        onClick={() => {
                            write2NewTable(selectedTable)
                        }}
                        theme='solid'
                        type='primary'
                        style={{ marginLeft: 8 }}
                    >
                        开始计算 🚀
                    </Button>
                </div>
            </div>

            <Modal
                title='新建账单模版：'
                visible={modalIsShow}
                onOk={() => {
                    newTable(newTableName)
                    setModalIsShow(false)
                }}
                onCancel={() => {
                    setModalIsShow(false)
                }}
                closeOnEsc={true}
            >
                <Input value={newTableName} onChange={setNewTableName}></Input>
            </Modal>
        </>
    )
}

export default App
