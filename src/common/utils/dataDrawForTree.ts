import {DataType} from '../../api/api';
import {getCountofDays} from './getCountofDays';

export     let dataForDrawTree = (data: DataType) => {

    let period_start = (date: string) => {
        return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`
    }
    let period_end = (date: string) => {
        return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`
    }


    let dataForRender: [{ isOpen: boolean, days: number, title: string, startDate: string, endDate: string }][] = []  //массив данных которые отрисовывают дерево вложенности и временной отрезок
    if (data.hasOwnProperty('chart')) {
        dataForRender.push([ {isOpen: false,
            days: getCountofDays(period_start(data.chart.period_start), period_end(data.chart.period_end)),
            title: data.chart.title,
            startDate: period_start(data.chart.period_start),
            endDate: period_end(data.chart.period_end)
        }])
        if (data.chart.hasOwnProperty('sub')) {

            let pushFunc: any = (dataInChart: any) => {
                //debugger
                let dataForPush = []
                if (dataInChart) {

                    for (let i = 0; i < dataInChart.length; i++) {
                        dataForPush.push( {isOpen: false,
                            days: getCountofDays(period_start(dataInChart[i].period_start), period_end(dataInChart[i].period_end)),
                            title: dataInChart[i].title,
                            startDate: period_start(dataInChart[i].period_start),
                            endDate: period_end(dataInChart[i].period_end)
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