import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTopic } from '../../redux/topics/topics.actions';
import '../storyAndTopicItem/storyAndTopicItem.scss';

const TopicsForm = ({ 
  currentUser, 
  match, 
  getTopicComments,
  addTopic
   }) => {

  const history = useHistory();

  const [topicData, setTopicData] = useState({
    title: '',
    text: ''
  });

  const handleChange = (e) => {
    setTopicData({ ...topicData, [e.target.name]: e.target.value });
  }

  const {
    title,
    text,
  } = topicData;

  const handleSubmit = (e) => {
    
     	let data = {
    	  title: topicData.title,
    	  text: topicData.text,
        user: currentUser.displayName,
    	  date: new Date()
    	};
     e.preventDefault();
	   addTopic(data)
    history.push('/topics')
  }

  return (
    <Fragment>
    <div className="createTopic">
    <h1 className='topicsHeader'>Create a new thread</h1>
		<form onSubmit={e => handleSubmit(e)}>
        <h3>Title:</h3>
          <input 
          className="createTopic"
		      name="title"
          type="text" 
          value={title}
          placeholder='Enter a title'
          onChange={e => handleChange(e)} 
          />
          <h3>Text:</h3> 
          <textarea 
          className="createTopic"
          name="text"
          type="text" 
          value={text}
          onChange={e => handleChange(e)} 
          >Enter your comment . . . 
          </textarea>
        
        <button type="submit">Submit</button>
      </form>
	</div>
	</Fragment>
    )
 };

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => {
  return {
  addTopic: (data) => dispatch(addTopic(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsForm);