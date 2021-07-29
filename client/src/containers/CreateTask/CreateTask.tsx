import React from 'react';
import CreateTaskSettings from './CreateTaskSettings'
interface Props {}

const CreateTask: React.FC<Props> = () => (
    <div>
        {/* <Header/>
        <Sidebar/> */}
        <CreateTaskSettings/>
        {/* Solition block here
        Description block here
        Tests block here
        Buttons block here */}
    </div>
);

export default CreateTask;
