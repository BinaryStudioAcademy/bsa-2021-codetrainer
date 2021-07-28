import React from 'react'
import honorBreakdownIcon from '../../../assets/honorbreakdown.svg'
import '../../../styles/stats.scss'
import '../../../styles/honorBreakdown.scss'

import {ProgressBar} from '@blueprintjs/core'


const HonorBreakdown: React.FC = () => {
    return (
        <div>
            <div className="header">
                <img src={honorBreakdownIcon} id="honorBreakdownIcon" />
                <label htmlFor="honorBreakdownIcon" className="honorBreakdownLabel">Honor Breakdown</label>
            </div>
            <div className="progress-bar-block">
                <div className="progress-bar-info">
                    <p className="progress-name">Completed Challenge</p>
                    <p className="progress-info-done">
                        <span id="progress-done">5</span>
                        <span id="progress-of-symbol">/</span>
                        <span id="progress-left">10</span>
                    </p>
                </div>
                <ProgressBar animate={false} stripes={false} className="progressBar" value={0.5}/>
            </div>
            <div className="progress-bar-block">
                <div className="progress-bar-info">
                    <p className="progress-name">Authored Challenge & Translation</p>
                    <p className="progress-info-done">
                        <span id="progress-left">0</span>
                    </p>
                </div>
                <ProgressBar animate={false} stripes={false} className="progressBar" value={0}/>
            </div>
            <div className="progress-bar-block">
                <div className="progress-bar-info">
                    <p className="progress-name">Comments</p>
                    <p className="progress-info-done">
                        <span id="progress-left">0</span>
                    </p>
                </div>
                <ProgressBar animate={false} stripes={false} className="progressBar" value={0}/>
            </div>
            <div className="progress-bar-block">
                <div className="progress-bar-info">
                    <p className="progress-name">Referrals</p>
                    <p className="progress-info-done">
                        <span id="progress-left">0</span>
                    </p>
                </div>
                <ProgressBar animate={false} stripes={false} className="progressBar" value={0}/>
            </div>
            <div className="progress-bar-block">
                <div className="progress-bar-info">
                    <p className="progress-name">Achievements</p>
                    <p className="progress-info-done">
                        <span id="progress-done">8</span>
                        <span id="progress-of-symbol">/</span>
                        <span id="progress-left">9</span>
                    </p>
                </div>
                <ProgressBar animate={false} stripes={false} className="progressBar" value={0.88}/>
            </div>
        </div>
        )
}
export default  HonorBreakdown