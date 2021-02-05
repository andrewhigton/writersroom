import { createSelector } from 'reselect';

const selectTopics = state => state.topics;

export const selectAllTopics = createSelector(
	[selectTopics],
	(topic) => topic.topics
	) 

export const selectTopicById = createSelector(
	[selectTopics],
	(topic) => topic.topic
	) 

export const selectAllTopicComments = createSelector(
	[selectTopics],
	(topic) => topic.comments
	) 
