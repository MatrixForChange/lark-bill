import { useState } from 'react'
import { Button, Modal, Select, Input, Tabs, TabPane, Toast } from '@douyinfe/semi-ui'
import { IconFile } from '@douyinfe/semi-icons';
import './App.css'
import { getTableList, newTravelBillTable, outputResult, newUniBillTable, newPlayBillTable, getTableFields } from './utils'
import { ITableMeta, IFieldMeta, FieldType } from '@lark-base-open/js-sdk'

const tabList = [
    { key: "1", title: "旅游分账", desc: "本账单模版适用于小伙伴一起出行旅游使用，将途中消费记录下来，待旅游结束再进行分账。（多人消费事后分账案例）" },
    { key: "2", title: "统一算帐", desc: "本账单模版适用于同事或舍友之间，一人买单然后统一算账。（一人先付事后算帐案例）" },
    { key: "3", title: "得分记账", desc: "本账单模版适用于棋牌娱乐等记分，最后算出玩家应向赢家支付的分数。（娱乐记分案例）" }
]

function App() {
    const [newBillTableModalIsShow, setNewBillTableModalIsShow] = useState(false)
    const [conflictModalIsShow, setConflictModalIsShow] = useState(false)
    const [newResultTableModalIsShow, setNewResultTableModalIsShow] = useState(false)
    const [tableList, setTableList] = useState<ITableMeta[]>([])
    const [tableFields, setTableFields] = useState<IFieldMeta[]>([])
    const [selectedTable, setSelectedTable] = useState('')
    const [selectedSingle, setSelectedSingle] = useState("")
    const [selectedNumber, setSelectedNumber] = useState("")
    const [selectedMulti, setSelectedMulti] = useState("")
    const [newTableName, setNewTableName] = useState('')
    const [currentTab, setCurrentTab] = useState(tabList[0].key)

    return (
        <>
            <div className='container'>
                <div>
                    <p>初次使用：</p>
                    <Button
                        onClick={() => {
                            setCurrentTab(tabList[0].key)
                            setNewTableName(
                                `${tabList[0].title}_${(() => {
                                    const date = new Date()
                                    return `${date.getFullYear()}${('0' + date.getMonth() + 1).slice(-2)}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
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
                        onChange={id => {
                            getTableFields(id as string, setTableFields, setSelectedSingle, setSelectedNumber, setSelectedMulti)
                            setSelectedTable(id as string)
                        }}
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
                        onClick={() => {
                            if (selectedSingle === "" || selectedNumber === '' || selectedMulti === "") {
                                setConflictModalIsShow(true)
                            } else {
                                setNewTableName(
                                    `输出结果_${(() => {
                                        const date = new Date()
                                        return `${date.getFullYear()}${('0' + date.getMonth() + 1).slice(-2)}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
                                    })()}`
                                )
                                setNewResultTableModalIsShow(true)
                            }
                        }}
                        theme='solid'
                        type='primary'
                        style={{ marginLeft: 8 }}
                    >
                        开始计算 🚀
                    </Button>
                </div>

                <div>
                    <p>自选列（字段）：</p>
                    <span>出资人 / 赢家：</span>
                    <Select
                        value={selectedSingle}
                        onChange={id => {
                            setSelectedSingle(id as string)
                        }}
                        placeholder='请点击选择类型为“单选”的列'
                    >
                        {tableFields.map(item => (
                            item.type === FieldType.SingleSelect && <Select.Option value={item.id}>{item.name}</Select.Option>
                        ))}
                    </Select>

                    <br />
                    <br />

                    <span>金额 / 分数：</span>
                    <Select
                        value={selectedNumber}
                        onChange={id => {
                            setSelectedNumber(id as string)
                        }}
                        placeholder='请点击选择类型为“数字”的列'
                    >
                        {tableFields.map(item => (
                            item.type === FieldType.Number && <Select.Option value={item.id}>{item.name}</Select.Option>
                        ))}
                    </Select>

                    <br />
                    <br />

                    <span>使用者 / 玩家：</span>
                    <Select
                        value={selectedMulti}
                        onChange={id => {
                            setSelectedMulti(id as string)
                        }}
                        placeholder='请点击选择类型为“多选”的列'
                    >
                        {tableFields.map(item => (
                            item.type === FieldType.MultiSelect && <Select.Option value={item.id}>{item.name}</Select.Option>
                        ))}
                    </Select>
                </div>
            </div>

            <Modal
                title='新建账单模版：'
                visible={newBillTableModalIsShow}
                cancelText='放弃 ❌'
                okText='新建 ⭕️'
                onOk={() => {
                    if (currentTab === "1") {
                        newTravelBillTable(newTableName)
                    } else if (currentTab === "2") {
                        newUniBillTable(newTableName)
                    } else if (currentTab === "3") {
                        newPlayBillTable(newTableName)
                    } else {
                        Toast.error("未知错误")
                    }
                    setNewBillTableModalIsShow(false)
                }}
                onCancel={() => {
                    setNewBillTableModalIsShow(false)
                }}
                closeOnEsc={true}
            >
                <Tabs tabPosition="left" type='line' onTabClick={key => {
                    setCurrentTab(key)
                    setNewTableName(
                        `${tabList[parseInt(key) - 1].title}_${(() => {
                            const date = new Date()
                            return `${date.getFullYear()}${('0' + date.getMonth() + 1).slice(-2)}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
                        })()}`
                    )
                }}>
                    {tabList.map(item => (
                        <TabPane
                            tab={
                                <span>
                                    <IconFile />
                                    {item.title}
                                </span>
                            }
                            itemKey={item.key}
                        >
                            <div style={{ padding: '0 1.2rem' }}>
                                <h3>{item.title}</h3>
                                <p style={{ lineHeight: 1.8 }}>{item.desc}</p>
                                <p style={{ lineHeight: 1.8, fontWeight: "bold", marginTop: "3rem" }}>请输入新建账单模版的表格名称：</p>
                                <Input value={newTableName} onChange={setNewTableName}></Input>
                            </div>

                        </TabPane>
                    ))}
                </Tabs>
            </Modal>

            <Modal
                title='温馨提示：'
                visible={conflictModalIsShow}
                cancelText='放弃 ❌'
                okText='新建账单模版 📝'
                onOk={() => {
                    setCurrentTab(tabList[0].key)
                    setNewTableName(
                        `${tabList[0].title}_${(() => {
                            const date = new Date()
                            return `${date.getFullYear()}${('0' + date.getMonth() + 1).slice(-2)}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
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
                <p>建议您新建账单模版，记录事项，再进行计算。</p>
            </Modal>

            <Modal
                title='新建结果表格：'
                visible={newResultTableModalIsShow}
                cancelText='放弃 ❌'
                okText='新建并输出 ⭕️'
                onOk={() => {
                    outputResult(selectedTable, newTableName, selectedSingle, selectedNumber, selectedMulti)
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
