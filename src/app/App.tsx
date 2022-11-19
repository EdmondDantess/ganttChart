import React, {useEffect, useState} from 'react';
import './App.css';
import {DataType, getData} from '../api/api';
import {getDaysArray, GetDaysArrays} from '../getDays';
import {BodyLeft} from '../features/LeftTable/BodyTable/BodyLeft';
import {BodyRight} from '../features/RightTable/BodyTable/BodyRight';
import {Tree} from '../features/Tree/Tree';


function App() {

    let [dataFromBack, setDataFromBack] = useState<DataType>(
        {
            project: '',
            period: '02.01.1969-31.12.1969',
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
    const funcGet = async () => {
        setDataFromBack(await getData())

    }

    useEffect(() => {
         funcGet()
    }, [])


    let dataForDrawTree = (data: DataType) => {
        let period_start = (date: string) => {
            return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`
        }
        let period_end = (date: string) => {
            return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`
        }

        function getNumberOfDays(start: string, end: string) {   //"2/1/2021", "3/1/2021"  //функция высчитывает разницу дней между датама
            const date1 = new Date(start);
            const date2 = new Date(end);

            // One day in milliseconds
            const oneDay = 1000 * 60 * 60 * 24;

            // Calculating the time difference between two dates
            const diffInTime = date2.getTime() - date1.getTime();

            // Calculating the no. of days between two dates
            const diffInDays = Math.round(diffInTime / oneDay);

            return diffInDays;
        }

        let dataForRender: [{ days: number, title: string, startDate: string }][] = []  //массив данных которые отрисовывают дерево вложенности и временной отрезок
        if (data.hasOwnProperty('chart')) {
            dataForRender.push([{
                days: getNumberOfDays(period_start(data.chart.period_start), period_end(data.chart.period_end)),
                title: data.chart.title,
                startDate: period_start(data.chart.period_start)
            }])
            if (data.chart.hasOwnProperty('sub')) {

                let pushFunc: any = (dataInChart: any) => {
                    //debugger
                    let dataForPush = []
                    if (dataInChart) {

                        for (let i = 0; i < dataInChart.length; i++) {
                            dataForPush.push({
                                days: getNumberOfDays(period_start(dataInChart[i].period_start), period_end(dataInChart[i].period_end)),
                                title: dataInChart[i].title,
                                startDate: period_start(dataInChart[i].period_start)
                            })
                        }
                        // @ts-ignore
                        dataForRender.push(dataForPush)
                        return pushFunc(dataInChart[0].sub)
                    } else {
                        return dataForRender
                    }
                }

                return pushFunc(data.chart.sub)

            } else {
                return dataForRender
            }
        }

    }


    const dataForRenderTree = dataForDrawTree(dataFromBack)

    const dataPeriod = {                                         //Получаю из строки и перевожу в number даты
        startDay: +dataFromBack.period.slice(0, 2),
        startMonth: +dataFromBack.period.slice(3, 5),
        startYear: +dataFromBack.period.slice(6, 10),
        endDay: +dataFromBack.period.slice(11, 13),
        endMonth: +dataFromBack.period.slice(14, 16),
        endYear: +dataFromBack.period.slice(17, 21),
    }
    type DataPeriodType = typeof dataPeriod

    const dataForTable: GetDaysArrays[] = []  //массив данных для отрисовки тавблицы по месяцам

    let launchDatasCount = (dataPeriod: DataPeriodType) => {                               // пушим наши месяца с количеством дней в массив
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
//Тут должна быть функция которая высчитывает при разнице лет не равно 0
            return
        }
    }

    launchDatasCount(dataPeriod)

    console.log(dataForRenderTree)


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
