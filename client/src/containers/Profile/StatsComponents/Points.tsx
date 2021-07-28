import React from 'react'
import pointsIcon from '../../../assets/points.svg'
import '../../../styles/stats.scss'

const Points: React.FC = () => {
    return (
        <div>
            <img src={pointsIcon} id="pointsIcon" />
            <label htmlFor="pointsIcon" className="iconLabel">Points</label>
            <p>
                <span className="field-name">Rank:</span>
                <span className="field-value">4</span>
            </p>
            <p>
                <span className="field-name">Honor:</span>
                <span className="field-value">455</span>
            </p>
            <p>
                <span className="field-name">Total Completed Challenge:</span>
                <span className="field-value">17</span>
            </p>
        </div>
        )
}
export default  Points