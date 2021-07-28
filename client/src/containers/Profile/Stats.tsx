import React from 'react'
import Points from './StatsComponents/Points'
interface StatsProps {
}

const Stats: React.FC<StatsProps> = (props) => {
    return (
        <div>
            <Points/>
            {/* <HonorBreakdown/>
            <Community/>
            <Languages/>
            <RankBreakdown/> */}

        </div>
        )
}
export default  Stats