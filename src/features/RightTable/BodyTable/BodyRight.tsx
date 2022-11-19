import React from 'react';
import {HeaderRight} from '../HeaderTable/HeaderRight';
import './bodyRight.css'
import {GetDaysArrays} from '../../../getDays';

type DataDays = {
    dataDays: GetDaysArrays[]
}

export const BodyRight = (props: DataDays) => {

    let days = props.dataDays

    let dataWeeksYearsMonth = (days: GetDaysArrays[]) => {
        let result: any = {
            month: [],
        }
        for (let i = 0; i < days.length; i++) {
            result.month.push({
                month: days[i][0].month,
                year: days[i][0].year,
                weeks: days[i][0].year % 4 === 0 ? 4 : 5       //Если год высокосный то получаем в месяце 4 недели
            })
        }
        return result
    }

    let month = dataWeeksYearsMonth(days)

    return (
        <div className={'bodyRight'}>
            <div className={'headRow'}>
                {
                    month.month.map((d: any, index: number) => {

                        return <div key={index}>
                            <div style={{display: 'flex'}}>
                                <HeaderRight month={d.month} weeks={d.weeks - 4}/>
                                <HeaderRight month={d.month} weeks={d.weeks - 3}/>
                                <HeaderRight month={d.month} weeks={d.weeks - 2}/>
                                <HeaderRight month={d.month} weeks={d.weeks - 1}/>
                                <HeaderRight month={d.month} weeks={d.weeks}/>
                            </div>
                        </div>
                    })}
            </div>


        </div>
    );
};
