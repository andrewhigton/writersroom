import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import Spinner from '../../components/spinner/Spinner.js';
import { createStructuredSelector } from 'reselect';
import { selectAllStories } from '../../redux/stories/stories.selectors';
import { getAllStories } from '../../redux/stories/stories.actions';
import '../../App.css';

const StoriesPage = ({ stories, getAllStories, loading }) => {
	  	useEffect(() => {
	    getAllStories();
	  }, [getAllStories]);   

return !stories ? ( <Spinner /> ) : (
    <Fragment>
    <div className='pageHeader'>
        <h1 className="pageHeaderLeft">Stories</h1>
        <Link to="/storyForm" className="pageHeaderRight">Post a story</Link>
		</div>
    {Object.keys(stories).map(post => {
        return <div className='post' key={stories[post].key}>
               <h2 className='posts-title'>{stories[post].title}</h2>
        		    <div className='posts-footer'>
                <Link to={`/story/${stories[post].key}`} className="posts-comment">Read now</Link>
        			  <p className='posts-date'>Posted on <Moment unix format='DD-MM-YYYY hh:mm'>{stories[post].date.seconds}
          		  </Moment> 
        		  	</p>
        		  	</div>
              
   			 	</div>      
              })}
    		
    </Fragment>
	);
}

StoriesPage.propTypes = {
    getAllStories: PropTypes.func.isRequired,
    stories: PropTypes.array.isRequired
  };


const mapStateToProps = createStructuredSelector({
  stories: selectAllStories
})

export default connect(mapStateToProps, {getAllStories})(StoriesPage);

   
 //  return topic === null ? ( <Spinner/> ) : (
 //    <Fragment>
 //        <div className='topicsHeader'>
 //        <h1 className="createThreadLeft">Threads</h1>
 //        <Link to="/topicForm" className="createThreadRight">Create a new thread</Link>
 //        </div>
 //        {Object.keys(topic).map(post => {
 //              return <TopicItem 
 //              topic={topic[post]} 
 //              key={topic[post].key}
 //              loading={loading}
 //              topicItem
 //              />
 //          })}
	// </Fragment>
 //    )
 // };