import React from 'react'
import honorBreakdownIcon from '../../../assets/honorbreakdown.svg'
import '../stats.scss'
import './honor-breakdown.scss'
import ProgressBarBlock from './ProgressBarBlock'

interface HonorBreakdownProps {
    completedChallengeDone: number | null,
    completedChallengeLeft: number,
    authoredChallengeDone: number | null,
    authoredChallengeLeft: number,
    commentsDone: number | null,
    commentsLeft: number,
    referralsDone: number | null,
    referralsLeft: number,
    achievementsDone: number | null,
    achievementsLeft: number
}

const HonorBreakdown: React.FC<HonorBreakdownProps> = (props) => {

    const {completedChallengeDone, completedChallengeLeft, authoredChallengeDone,
        authoredChallengeLeft, commentsDone, commentsLeft, referralsDone, referralsLeft,
        achievementsDone, achievementsLeft} = props;

    return (
        <div className='honor-breakdown'>
            <div className="header">
                <img src={honorBreakdownIcon} id="honorBreakdownIcon" />
                <label htmlFor="honorBreakdownIcon" className="icon-label">Honor Breakdown</label>
            </div>
            <div className='progress-bars'>
                <ProgressBarBlock name="Completed Challenge" done={completedChallengeDone} left={completedChallengeLeft}/>
                <ProgressBarBlock name="Authored Challenge & Translation" done={authoredChallengeDone} left={authoredChallengeLeft}/>
                <ProgressBarBlock name="Comments" done={commentsDone} left={commentsLeft}/>
                <ProgressBarBlock name="Referrals" done={referralsDone} left={referralsLeft}/>
                <ProgressBarBlock name="Achievements" done={achievementsDone} left={achievementsLeft}/>
            </div>
        </div>
        )
}
export default  HonorBreakdown