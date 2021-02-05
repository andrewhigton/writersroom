import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TopicComponent from '../../components/topics/topics.component';
import Spinner from '../../components/spinner/Spinner.js';
import { selectAllTopics } from '../../redux/topics/topics.selectors';
import { getAllTopicsApi, addTopic } from '../../redux/topics/topics.actions';
import '../../App.css';

const TopicsPage = ({ getAllTopicsApi, topic, loading }) => {

   useEffect(() => {
   getAllTopicsApi();
  }, [getAllTopicsApi]);   

return (
loading && !topic[0] ? ( <Spinner /> ) : (
      <div>
        <TopicComponent topic={topic} loading={loading} />
      </div>
      )
    )
 };

const mapStateToProps = state => ({  
    topic: selectAllTopics(state) 
})

const mapDispatchToProps = (dispatch) => {
      return {
      getAllTopicsApi: () => dispatch(getAllTopicsApi()),
      addTopic: (data) => dispatch(addTopic(data))
      }
  }

export default connect( mapStateToProps, mapDispatchToProps)(TopicsPage);