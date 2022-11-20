import React from 'react';
import './bodyLeft.css'

type BodyLeftPropsType = {}

export const BodyLeft = (props: BodyLeftPropsType) => {


    return (
        <div className={'leftTable'}>
            <div className={'head'}>
                <span style={{position: 'absolute', top: '40px', left: '20px'}}>Work item</span>
            </div>
            <div className={'leftBody'}>
            </div>

        </div>
    );
};
