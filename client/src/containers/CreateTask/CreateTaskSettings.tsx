import React, { FormEvent } from 'react';
import {Classes, H2,Label, RadioGroup, Radio} from '@blueprintjs/core'
import { useState } from 'react';
import './create-task-settings.scss'
interface Props {}

const CreateTaskSettings: React.FC<Props> = () => {
    const [radioSelected, setRadioSelected] = useState("one")
    return (
    <div className="create-task-settings">
        <H2 className="heading">Create a New Task</H2>
        <form>
            <Label htmlFor="task-name" >Name</Label>
            <input className={Classes.INPUT} id="task-name" placeholder="Enter Task Name"/>

            <RadioGroup inline={true} 
            className="discipline-label"
            label="Discipline"
            onChange={(value:FormEvent<HTMLInputElement>)=>setRadioSelected(value.currentTarget.value)}
            selectedValue={radioSelected}>
                <div>
                <p>hello!</p>
                <Radio label="Fundamentals" value="Fundamentals"/>
                </div>
                <Radio label="Rank Up" value="Rank Up"/>
                <Radio label="Practice and Repeat" value="Practice and Repeat"/>
                <Radio label="Beta" value="Beta"/>
                <Radio label="Random" value="Random"/>
            </RadioGroup>

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
