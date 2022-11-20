import React, {useEffect, useState} from 'react';
import './App.css';
import {DataType, getData} from '../api/api';
import {getDaysArray, GetDaysArrays} from '../common/utils/getDays';
import {BodyLeft} from '../features/LeftTable/BodyTable/BodyLeft';
import {BodyRight} from '../features/RightTable/BodyTable/BodyRight';
import {Tree} from '../features/Tree/Tree';
import {dataForDrawTree} from '../common/utils/dataDrawForTree';


function App() {

    let [dataFromBack, setDataFromBack] = useState<DataType>(
        {
            project: '',
            period: '02.01.1969-31.12.1970',
            chart: {
                id: 1,
                title: '',
                period_start: '',
                period_end: '',
                sub: [
                    {
                        id: 2,
                        title: '',
                        period_start: '',
                        period_end: '',
                        sub: [
                            {
                                id: 3,
                                title: '',
                                period_start: '',
                                period_end: '',
                                sub: [
                                    {
                                        id: 4,
                                        title: '',
                                        period_start: '',
                                        period_end: '',
                                        sub: [
                                            {
                                                id: 5,
                                                title: '',
                                                period_start: '',
                                                period_end: ''
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    )
    const funcGetFromBack = async () => {
        setDataFromBack(await getData())
    }

    useEffect(() => {
        funcGetFromBack()
    }, [])

    const dataForRenderTree = dataForDrawTree(dataFromBack)

    const dataPeriod = {                                         //Получаю из строки даты начало и конца и перевожу в number даты
        startDay: +dataFromBack.period.slice(0, 2),
        startMonth: +dataFromBack.period.slice(3, 5),
        startYear: +dataFromBack.period.slice(6, 10),
        endDay: +dataFromBack.period.slice(11, 13),
        endMonth: +dataFromBack.period.slice(14, 16),
        endYear: +dataFromBack.period.slice(17, 21),
    }
    type DataPeriodType = typeof dataPeriod

    const dataForTable: GetDaysArrays[] = []  //массив данных для отрисовки тавблицы по месяцам

    //функция которая считает сколько месяцев нужно вызвать  пушим наши месяца с количеством дней в массив
    let launchDatasCount = (dataPeriod: DataPeriodType) => {
        const startData = getDaysArray(dataPeriod.startYear, dataPeriod.startMonth)
        const countsMonth = dataPeriod.endMonth - dataPeriod.startMonth
        const countsYears = dataPeriod.endYear - dataPeriod.startYear
        dataForTable.push(startData)
        if (countsYears === 0) {
            let i = 0
            while (i < countsMonth) {
                i++
                let dataForPush = getDaysArray(dataPeriod.startYear, dataPeriod.startMonth + i)
                dataForTable.push(dataForPush)
            }
        } else {
//Тут  функция которая высчитывает при разнице лет > 0
            let monthDiff = (dataFrom: any, dataTo: any) => {
                let dateFrom = new Date(dataFrom.year, dataFrom.month)
                let dateTo = new Date(dataTo.year, dataTo.month)

                return dateTo.getMonth() - dateFrom.getMonth() +
                    (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
            }
            let countMonth = monthDiff({year: dataPeriod.startYear, month: dataPeriod.startMonth}, {
                year: dataPeriod.endYear,
                month: dataPeriod.endMonth
            })
            let i = 0
            let currentMonth = dataPeriod.startMonth
            let currentYear = dataPeriod.startYear
            while (i <= countMonth) {
                i++
                let dataForPush = getDaysArray(dataPeriod.startYear, currentMonth + 1)
                currentMonth = currentMonth + 1
                if (currentMonth === 12) {
                    currentMonth = 1
                    currentYear = currentYear + 1
                }
                dataForTable.push(dataForPush)
            }
        }
    }
    launchDatasCount(dataPeriod)

    return (
        <>
            <div>{`${dataFromBack.project} / ${dataFromBack.period}`}</div>
            <div className={'app'}>
                <BodyLeft/>
                <BodyRight dataDays={dataForTable}/>
            </div>
            <Tree dataForRenderTree={dataForRenderTree}/>
        </>
    );
}

export default App;
