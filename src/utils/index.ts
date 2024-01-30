import {
    bitable,
    IOpenSingleSelect,
    IOpenMultiSelect,
    FieldType,
    IAttachmentField,
    ITableMeta,
    IFieldMeta,
    INumberField,
    NumberFormatter
} from '@lark-base-open/js-sdk'

export async function newTravelBillTable(newTableName: string) {
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
    const example = [
        {
            titleField: '伏尔加庄园冰雪樵',
            payerField: 'Ann',
            amountField: 90,
            userField: ['Ann', 'Jim', 'Tom'],
            dateField: Date.now()
        },
        {
            titleField: '包车费去长白山高铁站',
            payerField: 'Jim',
            amountField: 400,
            userField: ['Ann', 'Jim', 'Tom', 'Tim', "Lee"],
            dateField: Date.now()
        },
        {
            titleField: '雪岭门票',
            payerField: 'Tom',
            amountField: 528,
            userField: ['Ann', 'Jim', 'Tom', 'Tim', "Lee"],
            dateField: Date.now()
        }
    ]

    await table.setField(field.id, {
        name: col1Name
    })

    await table.addField({ type: FieldType.SingleSelect, name: col2Name })
    await table.addField({ type: FieldType.Number, name: col3Name })
    await table.addField({ type: FieldType.MultiSelect, name: col4Name })
    await table.addField({ type: FieldType.DateTime, name: col5Name })

    const field1 = await table.getField(col1Name)
    const field2 = await table.getField(col2Name)
    const field3 = await table.getField<INumberField>(col3Name)
    const field4 = await table.getField(col4Name)
    const field5 = await table.getField(col5Name)

    for (const item of example) {
        const cell1 = await field1.createCell(item.titleField)
        const cell2 = await field2.createCell(item.payerField)
        const cell3 = await field3.createCell(item.amountField)
        const cell4 = await field4.createCell(item.userField)
        const cell5 = await field5.createCell(item.dateField)

        await table.addRecords([cell1, cell2, cell3, cell4, cell5])
    }

    await field3.setFormatter(NumberFormatter.DIGITAL_ROUNDED_2)
}

export async function newUniBillTable(newTableName: string) {
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
    const example = [
        {
            titleField: '奶茶',
            payerField: 'Ann',
            amountField: 66,
            userField: ['Ann', 'Jim', 'Tom'],
            dateField: Date.now()
        },
        {
            titleField: '炸串',
            payerField: 'Ann',
            amountField: 77,
            userField: ['Ann', 'Jim', 'Tom'],
            dateField: Date.now()
        },
        {
            titleField: '蛋糕',
            payerField: 'Ann',
            amountField: 88,
            userField: ['Ann', 'Jim', 'Tom'],
            dateField: Date.now()
        }
    ]

    await table.setField(field.id, {
        name: col1Name
    })

    await table.addField({ type: FieldType.SingleSelect, name: col2Name })
    await table.addField({ type: FieldType.Number, name: col3Name })
    await table.addField({ type: FieldType.MultiSelect, name: col4Name })
    await table.addField({ type: FieldType.DateTime, name: col5Name })

    const field1 = await table.getField(col1Name)
    const field2 = await table.getField(col2Name)
    const field3 = await table.getField<INumberField>(col3Name)
    const field4 = await table.getField(col4Name)
    const field5 = await table.getField(col5Name)

    for (const item of example) {
        const cell1 = await field1.createCell(item.titleField)
        const cell2 = await field2.createCell(item.payerField)
        const cell3 = await field3.createCell(item.amountField)
        const cell4 = await field4.createCell(item.userField)
        const cell5 = await field5.createCell(item.dateField)

        await table.addRecords([cell1, cell2, cell3, cell4, cell5])
    }

    await field3.setFormatter(NumberFormatter.DIGITAL_ROUNDED_2)
}

export async function newPlayBillTable(newTableName: string) {
    const { tableId } = await bitable.base.addTable({
        name: newTableName,
        fields: []
    })

    const table = await bitable.base.getTable(tableId)
    const field = await table.getField<IAttachmentField>('文本')

    const col1Name = '轮次'
    const col2Name = '赢家'
    const col3Name = '分数'
    const col4Name = '玩家'
    const col5Name = '获胜日期'
    const example = [
        {
            titleField: '第一盘',
            winnerField: '陈刀仔',
            scoreField: 1000,
            playerField: ['高进', '大军', '阿星'],
            dateField: Date.now()
        },
        {
            titleField: '第二盘',
            winnerField: '阿星',
            scoreField: 500,
            playerField: ['陈刀仔', '大军', '高进'],
            dateField: Date.now()
        },
        {
            titleField: '第三盘',
            winnerField: '陈刀仔',
            scoreField: 250,
            playerField: ['阿星', '大军', '高进'],
            dateField: Date.now()
        },
        {
            titleField: '第四盘',
            winnerField: '陈刀仔',
            scoreField: 800,
            playerField: ['阿星', '大军', '高进'],
            dateField: Date.now()
        },
    ]

    await table.setField(field.id, {
        name: col1Name
    })

    await table.addField({ type: FieldType.SingleSelect, name: col2Name })
    await table.addField({ type: FieldType.Number, name: col3Name })
    await table.addField({ type: FieldType.MultiSelect, name: col4Name })
    await table.addField({ type: FieldType.DateTime, name: col5Name })

    const field1 = await table.getField(col1Name)
    const field2 = await table.getField(col2Name)
    const field3 = await table.getField<INumberField>(col3Name)
    const field4 = await table.getField(col4Name)
    const field5 = await table.getField(col5Name)

    for (const item of example) {
        const cell1 = await field1.createCell(item.titleField)
        const cell2 = await field2.createCell(item.winnerField)
        const cell3 = await field3.createCell(item.scoreField)
        const cell4 = await field4.createCell(item.playerField)
        const cell5 = await field5.createCell(item.dateField)

        await table.addRecords([cell1, cell2, cell3, cell4, cell5])
    }

    await field3.setFormatter(NumberFormatter.DIGITAL_ROUNDED_2)
}

async function getBill(targetTableName: string, selectedSingle: string, selectedNumber: string, selectedMulti: string) {
    const table = await bitable.base.getTable(targetTableName)
    const recordIdList = await table.getRecordList()

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
        const amount = record.fields[selectedNumber]
        const payer = (record.fields[selectedSingle] as IOpenSingleSelect).text
        const users = (record.fields[selectedMulti] as IOpenMultiSelect).map(v => v.text)
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

export async function outputResult(sourceTableName: string, newTableName: string, selectedSingle: string, selectedNumber: string, selectedMulti: string) {
    const { tableId } = await bitable.base.addTable({
        name: newTableName,
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
    const field4 = await table.getField<INumberField>(col4Name)
    const field5 = await table.getField(col5Name)

    const payment = await getBill(sourceTableName, selectedSingle, selectedNumber, selectedMulti)

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

    await field4.setFormatter(NumberFormatter.DIGITAL_ROUNDED_2)
}

export async function getTableList(setTableList: React.Dispatch<React.SetStateAction<ITableMeta[]>>) {
    const tableList = await bitable.base.getTableMetaList()
    setTableList(tableList)
}

export async function getTableFields(selectedTable: string, setTableFields: React.Dispatch<React.SetStateAction<IFieldMeta[]>>, setSelectedSingle: React.Dispatch<React.SetStateAction<string>>, setSelectedNumber: React.Dispatch<React.SetStateAction<string>>, setSelectedMulti: React.Dispatch<React.SetStateAction<string>>) {
    const table = await bitable.base.getTable(selectedTable)
    const fieldMetaList = await table.getFieldMetaList()
    setTableFields(fieldMetaList)

    setSelectedSingle("")
    setSelectedNumber("")
    setSelectedMulti("")

    const selectedSingle = fieldMetaList.filter(item => item.type == FieldType.SingleSelect)[0]
    const selectedNumber = fieldMetaList.filter(item => item.type == FieldType.Number)[0]
    const selectedMulti = fieldMetaList.filter(item => item.type == FieldType.MultiSelect)[0]

    setSelectedSingle(selectedSingle.id)
    setSelectedNumber(selectedNumber.id)
    setSelectedMulti(selectedMulti.id)
}