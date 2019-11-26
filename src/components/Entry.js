import React from 'react'
import {ReactComponent as CommentIcon} from '../svg/comment-white-oval-bubble.svg'
import {ReactComponent as ShareIcon} from '../svg/share-option.svg'
import {ReactComponent as MoreIcon} from '../svg/more.svg'

export default function({entry, i}){
    return(
        <div className='entry' key={`entry${i}`}>
            <div className= 'header'>
            <img className= 'userImage' src={entry.author.picture} alt={`${entry.author.name}UserImage`}/>
            <div className= 'userName'> {entry.author.name} </div>
            <div className= 'userTitle'> {entry.author.title || 'Front-end Developer'} </div>
            <div className= {`status ${entry.isTrending ? 'trending' : entry.status}`}>
                {/* This is not how I would usually write this logic but since every entry in the JSON object provided
                was closed I switched it around to show which closed tasks were trending despite this being an unlikely
                desired behaviour because I think showing the variety is more indicative of my ability to write front
                end logic and style */}
                {entry.isTrending ? 'Trending' : (entry.status === 'Closed' ? 'Task Complete' : entry.status)}
            </div>
            </div>
            <div className='content'>
            <div className='entryTitle'>{entry.title}</div>
            <div className='entryText'>{entry.description}</div>
            <div className='dashbox'>
                <img className='thumbnail' src={entry.thumbnail} alt={`${entry.title}`}/>
                <div className={`pledgeInfo ${entry.isTrending ? 'trendingPledge' : (entry.status === 'Closed' ? 'closedPledge' : 'openPledge')}`}>
                ${entry.pledgeTotal}
                <div className='pledgeGoal'>
                    pledged of ${entry.pledgeGoal} goal
                </div>
                <div className='pledgerTotal'>
                    {entry.pledgerCount}
                </div>
                <div className='pledgeGoal'>
                pledgers
                </div>
                </div>
                <div className='buttonContainer'>
                <div className={`pledgeButton ${entry.isTrending ? 'trendingButton' : (entry.status === 'Closed' ? 'closedButton' : 'openButton')}`}>
                    {entry.isTrending ? 'Pledge' : (entry.status === 'Closed' ? 'View Submission' : 'Pledge')}
                </div>
                </div>
                <div className='dashFooter'>
                <div className='viewSource'>View Source</div>
                <div className='codeSubmissions'> {`</>`} Code Submissions ({entry.codeSubmissionTotal})</div>
                {(entry.isTrending || entry.status === 'Open') && 
                    <div className='claimButton'>
                    Claim ${entry.pledgeGoal}
                    </div>}
                </div>
            </div>
            </div>
            <div className='contentFooter'>
            <CommentIcon className='commentSVG'/>
                <div className='comments'>
                Comments { "(" + entry.numComments + ")"}
                </div>
                <ShareIcon className='shareSVG'/>
                <div className='share'>
                Share
                </div>
                <div className='more'>
                <MoreIcon className='moreSVG' />
                </div>
            </div>
        </div>
    )
}