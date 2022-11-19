import React from 'react';
import './tree.css'

type TreePropsType = {
    dataForRenderTree: [{ days: number, title: string, startDate: string }][]
}

export const Tree = (props: TreePropsType) => {

    const renderData = props.dataForRenderTree.map((d, index) => {
        return d.map((obj, index) => {
            return <div key={index}>
                <div style={{height:'40px', border: '1px solid rgba(38, 40, 66, 0.12)'}}>{obj.title}</div>
                <div style={{height: '24px', width: `${d[0].days * 14}px`, marginLeft: '100px'}}></div>
            </div>
        })


    })


    return (
        <div className={'treeWrap'}>
            {renderData}
        </div>
    );
};
