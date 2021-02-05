import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import StoryAndTopicItem from '../storyAndTopicItem/storyAndTopicItem';
import './topic-component.css';

const TopicComponent = ({ topic }) => {
return (
  <Fragment>
        <div className='pageHeader'>
        <h1 className='pageHeaderLeft'>Messageboard</h1>
        <Link to="/topicForm" className="pageHeaderRight">New thread</Link>
        </div>
          
            {topic.map(post => {
              return <StoryAndTopicItem 
              topic={post} 
              key={post.key}
              topicItem
              />
          })}        
   </Fragment> 
 )
}

export default TopicComponent;