import React from 'react';
import {HeaderRight} from '../HeaderTable/HeaderRight';
import './bodyRight.css'
import {GetDaysArrays} from '../../../common/utils/getDays';
import {dataWeeksYearsMonth} from './utils/counterWeeks';

type DataDays = {
    dataDays: GetDaysArrays[]
}

export const BodyRight = (props: DataDays) => {

    let month = dataWeeksYearsMonth(props.dataDays)

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
