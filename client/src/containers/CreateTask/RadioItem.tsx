import React from 'react';

interface Props {
    component: React.ReactElement,
    checkedState: string,
    setChecked: (value:string)=>void,
    classNameComp: string,
    text: string
}

const RadioItem: React.FC<Props> = (props) => {
    return(
    <div className={props.checkedState===props.classNameComp?"radio-item active":"radio-item"}
    onClick={()=>{props.setChecked(props.classNameComp)}}>
        {props.component}
        <label>{props.text}</label>
    </div>)
};

export default RadioItem;
