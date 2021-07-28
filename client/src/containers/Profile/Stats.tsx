import React from 'react'
import Points from './StatsComponents/Points'
import '../../styles/stats.scss';
interface StatsProps {
}

const Stats: React.FC<StatsProps> = (props) => {
    return (
        <div className='stats'>
            <Points/>
            <Points/>
            <Points/>
            <Points/>
            {/* <HonorBreakdown/>
            <Community/>
            <Languages/>
            <RankBreakdown/> */}

        </div>
        )
}
export default  Stats