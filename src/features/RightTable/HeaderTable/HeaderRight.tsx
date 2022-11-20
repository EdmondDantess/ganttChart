import React from 'react';
import './headerRight.css'
import {monthsConst} from '../../../common/utils/monthArray';


type HeaderRightType = {
    month: number
    weeks: number
}


export const HeaderRight = (props: HeaderRightType) => {
    let day = 1

    switch (props.weeks) {
        case 1:
            day = 1
            break;
        case 2:
            day = 8
            break;
        case 3:
            day = 15
            break;
        case 4:
            day = 22
            break;
        default:
            day = 29
            break;
    }

    return (
        <div className={'headerRight'}>
            <div className={'month'}>{monthsConst[props.month - 1].slice(0,3)}</div>
            <div className={'days'}>
                <div className={'day'}>{day <= 31 ? day : <></>}</div>
                {day + 1 <= 31 ? <div className={'day'}>{day + 1 <= 31 ? day + 1 : <></>}</div> : <></>}
                {day + 2 <= 31 ? <div className={'day'}>{day + 2 <= 31 ? day + 2 : <></>}</div> : <></>}
                {day + 3 <= 31 ? <div className={'day'}>{day + 3 <= 31 ? day + 3 : <></>}</div> : <></>}
                {day + 4 <= 31 ? <div className={'day'}>{day + 4 <= 31 ? day + 4 : <></>}</div> : <></>}
                {day + 5 <= 31 ? <div className={'day'}>{day + 5 <= 31 ? day + 5 : <></>}</div> : <></>}
                {day + 6 <= 31 ? <div className={'day'}>{day + 6 <= 31 ? day + 6 : <></>}</div> : <></>}
            </div>
            <div className={'bodySection'}>
                <div className={'rightBorderSection'}></div>
                {day + 1 <= 31 ? <div className={'rightBorderSection'}></div> : <></>}
                {day + 2 <= 31 ? <div className={'rightBorderSection'}></div> : <></>}
                {day + 3 <= 31 ? <div className={'rightBorderSection'}></div> : <></>}
                {day + 4 <= 31 ? <div className={'rightBorderSection'}></div> : <></>}
                {day + 5 <= 31 ? <div className={'rightBorderSection'}></div> : <></>}
                {day + 6 <= 31 ? <div className={'rightBorderSection'}></div> : <></>}
            </div>
        </div>
    );
}
