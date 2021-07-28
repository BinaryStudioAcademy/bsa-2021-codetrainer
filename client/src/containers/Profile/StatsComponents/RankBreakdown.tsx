import React from 'react'
import rankBreakdownIcon from '../../../assets/rankBreakdown.svg'
import '../../../styles/stats.scss'

const RankBreakdown: React.FC = () => {
    return (
        <div>
            <div className='header'>
                <img src={rankBreakdownIcon} id="rankBreakdownIcon"/>
                <label htmlFor="rankBreakdownIcon" className="iconLabel">Rank Breakdown</label>
            </div>
        </div>
        )
}
export default RankBreakdown