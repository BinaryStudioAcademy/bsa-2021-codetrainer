import React from 'react'
import Points from './StatsComponents/Points'
import '../../styles/stats.scss';
import Languages from './StatsComponents/Languages';
import Community from './StatsComponents/Community';
interface StatsProps {
}

const Stats: React.FC<StatsProps> = (props) => {
    return (
        <div className='stats'>
            <Points/>
            <Languages />
            <Community />
            {/* <HonorBreakdown/>
            <Community/>
            <Languages/>
            <RankBreakdown/> */}

        </div>
        )
}
export default  Stats