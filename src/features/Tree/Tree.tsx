import React, {useEffect, useState} from 'react';
import './tree.css'
import {getCountofDays} from '../../common/utils/getCountofDays';
import {Simulate} from 'react-dom/test-utils';
import copy = Simulate.copy;

type TreePropsType = {
    dataForRenderTree: [{ isOpen: boolean, days: number, title: string, startDate: string, endDate: string }][]
}

export const Tree = (props: TreePropsType) => {
    const colors = ['#E2EBFF', '#FFF2E0', '#CFF0D6', '#CFF0D6', '#FFF2E0']
    let [open, setOpen] = useState(false)
    let copyArr = [...props.dataForRenderTree]
    let [a, setA] = useState(copyArr)

    useEffect(()=>{
        setA([...copyArr])
    }, [open])

    const renderData = a.map((d, i) => {
        return d.map((obj, index) => {
            const lenghtBlocktime = getCountofDays(`${props.dataForRenderTree[0][0].startDate.slice(0, 2)}/01/${obj.startDate.slice(6, 10)}`, obj.startDate)
            return <div key={index} style={{position: 'relative', height: '40px'}}>
                {open && !obj.isOpen ? <>
                    <div className={'textTreeLeft'} onClick={() => {
                        //   setOpen(false)
                        //    console.log(copyArr.slice(0, i+1))
                        let res = copyArr.filter((c, indexF) => i+1>indexF )
                       setA(res)
                        console.log(res)
                    }}>
                           <span
                               style={{position: 'absolute', margin: '10px 60px', paddingLeft: `${0 + i * 20}px`}}
                           >
                        {i !== props.dataForRenderTree.length - 1 ? (obj.isOpen ? '❯' : 'ᐯ') : ''}
                               {obj.title}</span>
                    </div>
                    <div>
                        <div style={{
                            display: 'flex',
                            height: '24px',
                            width: `${d[index].days * 15}px`,
                            marginLeft: '100px',
                            backgroundColor: colors[i],
                            borderRadius: '4px',
                            position: 'absolute',
                            top: '9px',
                            left: `${275 + (lenghtBlocktime * 15)}px `
                        }}>
                            <div style={{marginTop: '3px', marginLeft: '120%', whiteSpace: 'nowrap'}}>{obj.title}</div>
                        </div>
                    </div>
                </> : <></>}
            </div>
        })
    })


    return (
        <div className={'treeWrap'}>
            {renderData}

            {!open ? <>
                <div style={{height: '40px'}}>
                    <div onClick={() => setOpen(true)} className={'textTreeLeft'} style={{
                        position: 'absolute',
                        top: '0px',
                        border: '1px solid rgba(38, 40, 66, 0.12)',
                        width: '390px'
                    }}><span
                        style={{
                            position: 'absolute',
                            margin: '10px 60px',
                            whiteSpace: 'nowrap'
                        }}

                    >❯ {props.dataForRenderTree[0][0].title}</span></div>
                    <div>
                        <div style={{
                            display: 'flex',
                            height: '24px',
                            width: `${props.dataForRenderTree[0][0].days * 15}px`,
                            marginLeft: '100px',
                            backgroundColor: colors[0],
                            borderRadius: '4px',
                            position: 'absolute',
                            top: '9px',
                            left: `${200 + (props.dataForRenderTree[0][0].days * 15)}px `
                        }}>
                            <div style={{
                                marginTop: '3px',
                                marginLeft: '120%',
                                whiteSpace: 'nowrap'
                            }}>{props.dataForRenderTree[0][0].title}</div>
                        </div>
                    </div>
                </div>
            </> : <></>}

        </div>
    );
};
