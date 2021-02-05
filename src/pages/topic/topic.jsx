import React, { Fragment, useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import StoryAndTopicItem from '../../components/storyAndTopicItem/storyAndTopicItem';
import { createStructuredSelector } from 'reselect';
import { selectTopicById, selectAllTopicComments } from '../../redux/topics/topics.selectors';
import { addTopicComment, getTopicCommentsApi } from '../../redux/topics/topics.actions';
import { getTopicById } from '../../redux/topics/topics.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import Spinner from '../../components/spinner/Spinner.js';
import '../../App.css';

const TopicPage = ({ 
	getTopicById, 
	getTopicCommentsApi,
	addTopicComment,
	topic,
	currentUser,
	comments,
	match,
	loading 
	}) => {

	//everyting undefined here
	// console.log(topic)

	const history = useHistory();
	let topicID = match.params.id

	useEffect(() => {
		getTopicById(topicID);
	}, [getTopicById, topicID]);	

	useEffect(() => {
		getTopicCommentsApi(topicID);
	}, [getTopicCommentsApi, topicID]);

	
	const [topicComment, setTopicComment] = useState({
    text: '',
    user: currentUser
  	});

    const handleChange = (e) => {
    setTopicComment({ ...topicComment, [e.target.name]: e.target.value });
    }

    const {
    text
    } = topicComment;

    const handleSubmit = (e) => {
    	if(!topicComment.text) {
        alert('Please fill in the comment form');
      	return;  
      }  
     	let data = {
    	  text: topicComment.text,
    	  id: match.params.id, 
          user: currentUser.displayName,
    	  date: new Date()
    	};

     e.preventDefault();
	     addTopicComment(data, match.params.id)
	     setTopicComment({
	      text: ''
	      });
      history.push(`/topics/${topicID}`)
	  }

	return loading ? ( <Spinner /> ) : (
		<Fragment>
			
			<Link to='/topics'>
				<p className='backButton'>Back to Topics</p>
			</Link>
			{!topic ? <Spinner /> : 
			<StoryAndTopicItem 
              topic={topic[0]} 
              loading={loading}
              topicItem
              comments={comments}
              />
          	}
	        {Object.keys(comments).map(post => {
              return <StoryAndTopicItem 
              topic={comments[post]} 
              key={comments[post].key}
              loading={loading}
              
              />
          })}
	        <form onSubmit={e => handleSubmit(e)}>
			<button >Add comment</button>
			<textarea
			  className="createTopic"
	          name="text"
	          type="text" 
	          value={text}
	          onChange={e => handleChange(e)} 
	          >Enter your comment . . . 
	        </textarea>
	        </form>
		</Fragment>
		)
	}

	const mapDispatchToProps = (dispatch) => {
  		return {
  		addTopicComment: (data, match) => dispatch(addTopicComment(data, match)),
  		getTopicById: (id) => dispatch(getTopicById(id)),
  		getTopicCommentsApi: (topicID) => dispatch(getTopicCommentsApi(topicID)),
  		}
	}

	const MapStateToProps = createStructuredSelector({
		topic: selectTopicById,
		currentUser: selectCurrentUser,
		comments: selectAllTopicComments
	})

	export default connect(MapStateToProps, mapDispatchToProps)(TopicPage);