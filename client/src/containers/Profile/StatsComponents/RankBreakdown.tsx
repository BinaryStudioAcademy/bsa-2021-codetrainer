import React from 'react'
import rankBreakdownIcon from '../../../assets/rankBreakdown.svg'
import '../../../styles/rankBreakdown.scss'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const RankBreakdown: React.FC = () => {
    const percentage = 25;

    return (
        <div>
            <div className='header rank-breakdown'>
                <img src={rankBreakdownIcon} id="rankBreakdownIcon"/>
                <label htmlFor="rankBreakdownIcon" className="iconLabel">Rank Breakdown</label>
                <CircularProgressbar
                    className='circular-progressbar'
                    value={percentage}
                    text='Next Rank'
                    strokeWidth={5}
                    styles={buildStyles(circularProgressBarStyles)}
                />
            </div>
        </div>
        )
}
export default RankBreakdown;

const circularProgressBarStyles = {
    // strokeLinecap: 'butt',
    textSize: '5px',
    // pathTransitionDuration: 0.5,
    pathColor: `#ec4179`,
    // textColor: '#f88',
    trailColor: '#F0F3F9',
    backgroundColor: '#F0F3F9',
}