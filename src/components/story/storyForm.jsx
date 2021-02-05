import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStory } from '../../redux/stories/stories.actions';
import '../../App.css';

const StoryForm = ({ currentUser, match, getStoryCrits }) => {

const history = useHistory();
  
const [storyData, setStoryData] = useState({
    title: '',
    text: '',
  });

const handleChange = (e) => {
    setStoryData({ ...storyData, [e.target.name]: e.target.value });
  }

const {
    title,
    text
  } = storyData;

  const handleSubmit = (e) => {
      if(!storyData.title || !storyData.text) {
        alert('Please complete both fields')
      }  
     	let data = {
    	  title: storyData.title,
    	  text: storyData.text,
        // user: currentUser.displayName,
    	  date: new Date()
    	};
     e.preventDefault();
	   addStory(data)
     history.push('/stories')
     setStoryData({
      title: '',
      text: '',
      });
  }

  return (
    <Fragment>
    <div className="createTopic">
	    	<h1 className='topicsHeader'>Post your story</h1>
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
          >Paste here . . . 
          </textarea>
        
        <button type="submit">Submit</button>
      </form>

	</div>
	</Fragment>
    )
 };

export default connect(null, {addStory})(StoryForm);