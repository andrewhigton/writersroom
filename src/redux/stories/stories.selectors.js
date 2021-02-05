import { createSelector } from 'reselect';

const selectStories = state => state.stories;

export const selectAllStories = createSelector(
 [selectStories],
 story => story.stories 
 )

export const selectStoryById = createSelector(
 [selectStories],
 story => story.story 
 )

export const selectAllCrits = createSelector(
 [selectStories],
 story => story.crits
 ) 