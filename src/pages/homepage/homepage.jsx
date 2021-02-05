import React, { useEffect } from 'react';
import QuoteCard from '../../components/quotecard/quotecard.component';
import TopicsComponent from '../topics/topics'; 
import { connect } from 'react-redux';
import { selectAllTopics } from '../../redux/topics/topics.selectors';
import { getAllTopicsApi, addTopic } from '../../redux/topics/topics.actions';
import '../../App.css';

const HomePage = ({ getAllTopicsApi, topic, loading }) =>  {

	useEffect(() => {
   		getAllTopicsApi();
  	}, [getAllTopicsApi]);   

	return (
		<div className='home-page'>
    		<QuoteCard />
        <TopicsComponent 
        topic={topic}
        />    		
    	</div>
  	)
	}

const mapStateToProps = state => ({  
    topic: selectAllTopics(state) 
})

const mapDispatchToProps = (dispatch) => {
      return {
      getAllTopicsApi: () => dispatch(getAllTopicsApi()),
      addTopic: (data) => dispatch(addTopic(data))
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

