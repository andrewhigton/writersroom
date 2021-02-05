import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner.js';
import Moment from 'react-moment';
import './storyAndTopicItem.scss';

const StoryAndTopicItem = ({ 
	topic: {title, text, user, key, date}, 
	loading, 
	topicItem,
	storyItem, 
	comments,
	crits 
	}) => {

 return loading ? ( <Spinner/> ) : (
	<Fragment>
		
		{topicItem ? 
		<div className='post' key={key}>
		  <h2 className='posts-title'>{title}</h2>
		  <p className='posts-text'>{text}</p>
		  <div className='posts-footer'>
		  
		  {storyItem ? 
		  	// topic item, with title, text and date, with no user listed
		  	<Fragment>
		  	<p>
		  	Reviews{' '}
            {crits && crits.length > 0 && (
              <span className='comment-count'>{crits.length}</span>
            )}

		  </p>
		  <p className='posts-date'>Posted on <Moment
		  unix 
		  format='DD-MM-YYYY hh:mm'>
		  {date.seconds}
		  </Moment>
		  </p>
		  </Fragment>
		   :
		  //item for comments and follow-up posts without  
		  <Fragment>
		  <Link 
		  className='posts-comment'
		  to={`/topics/${key}`}>
            Comments{' '}
            {comments && comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          <p className='posts-date'>Posted by { user } on <Moment
		  unix 
		  format='DD-MM-YYYY hh:mm'>
		  {date.seconds}
		  </Moment>
		  </p>
		  </Fragment>
    	}
        </div>
		</div> 
		:
		<div className='post' key={key}>
		  <p className='posts-text'>{text}</p>
		  <div className='posts-footer'>
		  <p className='posts-date'>Posted by { user } on <Moment
		  unix 
		  format='DD-MM-YYYY hh:mm'>
		  {date.seconds}
		  </Moment>
		  </p>
		  <Link 
		  className='posts-comment'
		  to={`/topics/${key}`}>
          </Link>
		  </div>
		  
        </div>
			}
		</Fragment>
			)
		}

export default StoryAndTopicItem;