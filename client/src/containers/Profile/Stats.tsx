import React from 'react'
import Points from './StatsComponents/Points'
import HonorBreakdown from './StatsComponents/HonorBreakdown'
import Languages from './StatsComponents/Languages';
import Community from './StatsComponents/Community';
import RankBreakdown from './StatsComponents/RankBreakdown';

interface StatsProps {
}

const Stats: React.FC<StatsProps> = (props) => {
    return (
        <div className='stats'>
            <Points/>
            <Languages />
            <HonorBreakdown/>
            <RankBreakdown/>
            <Community />
        </div>
        )
}
export default  Stats