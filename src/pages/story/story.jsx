import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../components/spinner/Spinner.js';
import '../../App.css';
import StoryAndTopicItem from '../../components/storyAndTopicItem/storyAndTopicItem';
import { getStoryById, addStoryCrit, getStoryCommentsApi } from '../../redux/stories/stories.actions';
import { createStructuredSelector } from 'reselect';
import { selectStoryById, selectAllCrits } from '../../redux/stories/stories.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Story = ({ 
  getStoryById, 
  getStoryCommentsApi,
  story,
  currentUser,
	crits, 
  match, 
  loading }) => {
  
 let id = match.params.id

useEffect(() => {
    getStoryById(id);
  }, [getStoryById, id]);   

useEffect(() => {
     getStoryCommentsApi(id)
  }, [getStoryCommentsApi, id]);

const [storyCrit, setStoryCrit] = useState({
    text: '',
    id: id,
    user: currentUser
    });

const handleChange = (e) => {
    setStoryCrit({ ...storyCrit, [e.target.name]: e.target.value });
    }

    const {
    text
    } = storyCrit;

    const handleSubmit = (e) => {

      let data = {
        text: storyCrit.text,
        id: match.params.id, 
        user: currentUser.displayName,
        date: new Date()
      };
       e.preventDefault();
       addStoryCrit(data, id)
       setStoryCrit({
        text: ''
        });
    }

return !story ? ( <Spinner/> ) : (
	<Fragment>
    <Link to='/stories'>
        <p className='backButton'>Back to Stories</p>
    </Link>
        <StoryAndTopicItem 
          key={story[0].id}
          topic={story[0]} 
          loading={loading}
          crits={crits}
          topicItem
          storyItem
        />

    {Object.keys(crits).map(post => {
          return <StoryAndTopicItem 
          key={crits[post].key}
          topic={crits[post]}
          loading={loading}
          />
    })}
    <form onSubmit={e => handleSubmit(e)}>
      <button >Add crit</button>
      <textarea
            className="createTopic"
            name="text"
            type="text" 
            value={text}
            onChange={handleChange} 
            >
      </textarea>
      </form>
	</Fragment>
	)
}

const mapDispatchToProps = (dispatch, ownProps) => {
      return {
      getStoryById: (id) => dispatch(getStoryById(id)),
      getStoryCommentsApi: (id) => dispatch(getStoryCommentsApi(id)),
      }
  }

const mapStateToProps = createStructuredSelector({
  story: selectStoryById,
  currentUser: selectCurrentUser,
  crits: selectAllCrits
})

export default connect(mapStateToProps, mapDispatchToProps)(Story);