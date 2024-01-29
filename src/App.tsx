import { useState } from 'react'
import {
    bitable,
    IOpenSingleSelect,
    IOpenMultiSelect,
    FieldType,
    IAttachmentField,
    ITableMeta
} from '@lark-base-open/js-sdk'
import { Button, Modal, Select, Input } from '@douyinfe/semi-ui'
import './App.css'

// async function init(selectedTable: string, setModalIsShow: React.Dispatch<React.SetStateAction<boolean>>) {
//     let flag = false
//     await bitable.base.getTable(selectedTable).catch(() => {
//         // newTable()

//         setModalIsShow(true)
//         flag = true
//     })
//     await bitable.base
//         .getTable('资金流向结果')
//         .then(() => {
//             setModalIsShow(true)
//             flag = true
//         })
//         .catch(() => {
//             return
//         })
//     if (flag) return

//     const table = await bitable.base.getTable('账单')
//     const fieldMetaList = await table.getFieldMetaList()

//     const requiredNames = {
//         消费事项: 1,
//         出资人: 3,
//         金额: 2,
//         使用者: 4,
//         支付日期: 5
//     }

//     const nameCount = {
//         消费事项: 0,
//         出资人: 0,
//         金额: 0,
//         使用者: 0,
//         支付日期: 0
//     }

//     for (const item of fieldMetaList) {
//         const name = item.name
//         const type = item.type

//         // 检查name是否在所需列表中，且type是否匹配
//         // @ts-expect-error 类型以后处理，先出活
//         if (requiredNames[name] !== undefined && requiredNames[name] === type) {
//             // @ts-expect-error 类型以后处理，先出活
//             nameCount[name]++
//         }
//     }

//     // 确保所有name都至少出现一次
//     for (const name in nameCount) {
//         // @ts-expect-error 类型以后处理，先出活
//         if (nameCount[name] === 0) {
//             setModalIsShow(true)
//             return false
//         }
//     }

//     return true
// }

async function newTable(newTableName: string) {
    const { tableId } = await bitable.base.addTable({
        name: newTableName,
        fields: []
    })

    const table = await bitable.base.getTable(tableId)
    const field = await table.getField<IAttachmentField>('文本')

    const col1Name = '消费事项'
    const col2Name = '出资人'
    const col3Name = '金额'
    const col4Name = '使用者'
    const col5Name = '支付日期'

    await table.setField(field.id, {
        name: col1Name
    })

    await table.addField({ type: FieldType.SingleSelect, name: col2Name })
    await table.addField({ type: FieldType.Number, name: col3Name })
    await table.addField({ type: FieldType.MultiSelect, name: col4Name })
    await table.addField({ type: FieldType.DateTime, name: col5Name })
}

async function getBill(targetTableName: string) {
    const table = await bitable.base.getTable(targetTableName)
    const recordIdList = await table.getRecordList()
    const fields = await table.getFieldMetaList()
    let payerField = ''
    let userField = ''
    let amountField = ''
    for (const field of fields) {
        if (field.name == '出资人') {
            payerField = field.id
            continue
        }
        if (field.name == '使用者') {
            userField = field.id
            continue
        }
        if (field.name == '金额') {
            amountField = field.id
            continue
        }
    }

    interface UserMapValue {
        paid: number
        shouldPay: number
        needPay?: number
    }

    interface UserMap {
        [key: string]: UserMapValue
    }

    const userMap: UserMap = {}
    for (const recordId of recordIdList) {
        const record = await table.getRecordById(recordId.id)
        const amount = record.fields[amountField]
        const payer = (record.fields[payerField] as IOpenSingleSelect).text
        const users = (record.fields[userField] as IOpenMultiSelect).map(v => v.text)
        if (userMap[payer] === undefined) {
            userMap[payer] = {
                paid: 0,
                shouldPay: 0
            }
        }
        userMap[payer].paid += Number(amount)
        const length = users.length
        const avgAmount = Number(amount) / length
        for (const user of users) {
            if (userMap[user] === undefined) {
                userMap[user] = {
                    paid: 0,
                    shouldPay: 0
                }
            }
            userMap[user].shouldPay += avgAmount
        }
    }
    for (const key of Object.keys(userMap)) {
        const user = userMap[key]
        const need = user.shouldPay - user.paid
        user.needPay = need
    }
    const payments = {}
    const maxReceiver = Object.keys(userMap).reduce((maxReceiver, person) => {
        //@ts-expect-error 这个算法是js写的，用到ts里还没理清数据结构
        if (userMap[person]['needPay'] && userMap[person]['needPay'] < userMap[maxReceiver]['needPay']) {
            return person
        }
        return maxReceiver
    }, Object.keys(userMap)[0])
    Object.keys(userMap).forEach(user => {
        const amountToPay = userMap[user]['needPay'] || 0
        if (user == maxReceiver) return
        if (amountToPay > 0) {
            //@ts-expect-error 这个算法是js写的，用到ts里还没理清数据结构
            if (!payments[user]) {
                //@ts-expect-error 这个算法是js写的，用到ts里还没理清数据结构
                payments[user] = {}
            }
            //@ts-expect-error 这个算法是js写的，用到ts里还没理清数据结构
            payments[user][maxReceiver] = amountToPay
        } else {
            //@ts-expect-error 这个算法是js写的，用到ts里还没理清数据结构
            if (!payments[maxReceiver]) {
                //@ts-expect-error 这个算法是js写的，用到ts里还没理清数据结构
                payments[maxReceiver] = {}
            }
            //@ts-expect-error 这个算法是js写的，用到ts里还没理清数据结构
            payments[maxReceiver][user] = -amountToPay
        }
    })

    return payments
}

async function write2NewTable(sourceTableName: string) {
    const { tableId } = await bitable.base.addTable({
        name: '资金流向结果',
        fields: []
    })

    const table = await bitable.base.getTable(tableId)
    const field = await table.getField<IAttachmentField>('文本')

    const col1Name = '姓名1'
    const col2Name = '行为'
    const col3Name = '姓名2'
    const col4Name = '金额'
    const col5Name = '单位'

    await table.setField(field.id, {
        name: col1Name
    })
    await table.addField({ type: FieldType.Text, name: col2Name })
    await table.addField({ type: FieldType.Text, name: col3Name })
    await table.addField({ type: FieldType.Number, name: col4Name })
    await table.addField({ type: FieldType.Text, name: col5Name })

    const field1 = await table.getField(col1Name)
    const field2 = await table.getField(col2Name)
    const field3 = await table.getField(col3Name)
    const field4 = await table.getField(col4Name)
    const field5 = await table.getField(col5Name)

    const payment = await getBill(sourceTableName)

    for (const name1 of Object.keys(payment)) {
        //@ts-expect-error 获取payment的算法是js写的，用到ts里还没理清数据结构
        const name2 = Object.keys(payment[name1])[0]
        //@ts-expect-error 获取payment的算法是js写的，用到ts里还没理清数据结构
        const money = payment[name1][Object.keys(payment[name1])[0]]

        const cell1 = await field1.createCell(name1)
        const cell2 = await field2.createCell('应付')
        const cell3 = await field3.createCell(name2)
        const cell4 = await field4.createCell(money)
        const cell5 = await field5.createCell('元')

        await table.addRecords([cell1, cell2, cell3, cell4, cell5])
    }
}

async function getTableList(setTableList: React.Dispatch<React.SetStateAction<ITableMeta[]>>) {
    const tableList = await bitable.base.getTableMetaList()
    setTableList(tableList)
}

function App() {
    const [modalIsShow, setModalIsShow] = useState(false)
    const [tableList, setTableList] = useState<ITableMeta[]>([])
    const [selectedTable, setSelectedTable] = useState('')
    const [newTableName, setNewTableName] = useState('')

    return (
        <>
            <div className='container'>
                <p>1:初次使用请新建账单模版，以自动生成本插件需要的特定字段的表格：</p>
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
                    新建账单模版
                </Button>

                <p>2:请选择账单所在表：</p>
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
                    开始计算
                </Button>
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
