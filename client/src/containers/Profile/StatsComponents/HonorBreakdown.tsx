import React from 'react'
import honorBreakdownIcon from '../../../assets/honorbreakdown.svg'
import '../stats.scss'
import './honor-breakdown.scss'
import ProgressBarBlock from './ProgressBarBlock'

const HonorBreakdown: React.FC = () => {
    return (
        <div className='honor-breakdown'>
            <div className="header">
                <img src={honorBreakdownIcon} id="honorBreakdownIcon" />
                <label htmlFor="honorBreakdownIcon" className="icon-label">Honor Breakdown</label>
            </div>
            <div className='progress-bars'>
                <ProgressBarBlock name="Completed Challenge" done={5} left={10}/>
                <ProgressBarBlock name="Authored Challenge & Translation" done={null} left={0}/>
                <ProgressBarBlock name="Comments" done={null} left={0}/>
                <ProgressBarBlock name="Referrals" done={null} left={0}/>
                <ProgressBarBlock name="Achievements" done={8} left={9}/>
            </div>
        </div>
        )
}
export default  HonorBreakdown