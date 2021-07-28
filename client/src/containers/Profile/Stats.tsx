import React from 'react'
import Points from './StatsComponents/Points'
import HonorBreakdown from './StatsComponents/HonorBreakdown'

interface StatsProps {
}

const Stats: React.FC<StatsProps> = (props) => {
    return (
        <div className='stats'>
            <Points/>
            <HonorBreakdown/>
            {/* <Community/>
            <Languages/>
            <RankBreakdown/> */}

        </div>
        )
}
export default  Stats