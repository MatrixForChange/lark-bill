import { useState } from 'react'
import { Button, Modal, Select, Input } from '@douyinfe/semi-ui'
import './App.css'
import { getTableList, checkBillTableIsValid, newBillTable, outputResult } from './utils'
import { ITableMeta } from '@lark-base-open/js-sdk'

function App() {
    const [newBillTableModalIsShow, setNewBillTableModalIsShow] = useState(false)
    const [conflictModalIsShow, setConflictModalIsShow] = useState(false)
    const [newResultTableModalIsShow, setNewResultTableModalIsShow] = useState(false)
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
                            setNewBillTableModalIsShow(true)
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
                        placeholder='请点击选择数据表'
                        onFocus={() => {
                            getTableList(setTableList)
                        }}
                    >
                        {tableList.map(item => (
                            <Select.Option value={item.id}>{item.name}</Select.Option>
                        ))}
                    </Select>
                    <Button
                        onClick={async () => {
                            if (await checkBillTableIsValid(selectedTable)) {
                                setNewTableName(
                                    `输出结果_${(() => {
                                        const date = new Date()
                                        return `${date.getFullYear()}${
                                            date.getMonth() + 1
                                        }${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
                                    })()}`
                                )
                                setNewResultTableModalIsShow(true)
                            } else {
                                setConflictModalIsShow(true)
                            }
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
                visible={newBillTableModalIsShow}
                cancelText='放弃 ❌'
                okText='新建 ⭕️'
                onOk={() => {
                    newBillTable(newTableName)
                    setNewBillTableModalIsShow(false)
                }}
                onCancel={() => {
                    setNewBillTableModalIsShow(false)
                }}
                closeOnEsc={true}
            >
                <Input value={newTableName} onChange={setNewTableName}></Input>
            </Modal>

            <Modal
                title='温馨提示：'
                visible={conflictModalIsShow}
                cancelText='放弃 ❌'
                okText='新建账单模版 📝'
                onOk={() => {
                    setNewTableName(
                        `账单模版_${(() => {
                            const date = new Date()
                            return `${date.getFullYear()}${
                                date.getMonth() + 1
                            }${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
                        })()}`
                    )
                    setConflictModalIsShow(false)
                    setNewBillTableModalIsShow(true)
                }}
                onCancel={() => {
                    setConflictModalIsShow(false)
                }}
                closeOnEsc={true}
            >
                <p>
                    当前选中的表格字段名、字段属性不符合要求。本插件需要往具有特定字段名、字段属性的同名表格读取数据。
                </p>
                <p>建议您创建账单模版，记录消费事项，再进行计算。</p>
            </Modal>

            <Modal
                title='新建结果表格：'
                visible={newResultTableModalIsShow}
                cancelText='放弃 ❌'
                okText='新建并输出 ⭕️'
                onOk={() => {
                    outputResult(selectedTable, newTableName)
                    setNewResultTableModalIsShow(false)
                }}
                onCancel={() => {
                    setNewResultTableModalIsShow(false)
                }}
                closeOnEsc={true}
            >
                <Input value={newTableName} onChange={setNewTableName}></Input>
            </Modal>
        </>
    )
}

export default App
