import React from 'react';
import {Classes, H2,H4,Label} from '@blueprintjs/core'
// import fundamentals from '../../assets/books-icon.svg'
import { ReactComponent as Fundamentals } from '../../assets/books-icon.svg';
import { ReactComponent as Rankup } from '../../assets/rank-up-icon.svg'
import { ReactComponent as Practice } from '../../assets/practice-icon.svg'
import { ReactComponent as Beta } from '../../assets/beta-icon.svg'
import { ReactComponent as Random } from '../../assets/shuffle-icon.svg'
import RadioItem from './RadioItem'
import './create-task-settings.scss'
import { useState } from 'react';
interface Props {}

const CreateTaskSettings: React.FC<Props> = () => {
    const [checkedState, setChecked] = useState("fundamentals")
    const CLASSES = ["fundamentals", "rankup","practice","beta","random"]
    const TEXTS = ["Fundamentals", "Rank Up","Practice","Beta","Random"]
    let i=0;
    const ELEMENTS = [<Fundamentals key={i++}/>,<Rankup key={i++}/>,<Practice key={i++}/>,<Beta key={i++}/>,<Random key={i++}/>, ]
    return (
    <div className="create-task-settings">
        <H2 className="heading">Create a New Task</H2>
        <form>
            <Label htmlFor="task-name" >Name</Label>
            <input className={Classes.INPUT} id="task-name" placeholder="Enter Task Name"/>
            <H4 className="disciplines-heading">Disciplines</H4>
                <div className="radio-list">
                    {CLASSES.map((item, index)=>{
                        return (
                    <RadioItem 
                    component={ELEMENTS[index]}
                    checkedState={checkedState} 
                    setChecked={setChecked}
                    classNameComp={item}
                    text={TEXTS[index]}
                    key={index}/>
                        )
                    })}
                </div>
                
            

            {/* Here must be a select block, copy it from another component. */}

            <Label htmlFor="estimated-rank">Estimated Rank</Label>
            <input className={Classes.INPUT} id="estimated-rank" placeholder="Enter Estimated Rank"/>

            <Label htmlFor="tags">Tags</Label>
            <input className={Classes.INPUT} id="tags" placeholder="Enter Tags (separated by comma)"/>
            
            <label className="switch"> 
                <input type="checkbox"/>
                {/* invisible checkbox */}
                <span className="slider round"></span>
                {/* slider */}
            </label>
        </form>
    </div>
    )
};

export default CreateTaskSettings;
