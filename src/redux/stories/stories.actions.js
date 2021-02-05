import { firestore } from '../../firebase/firebase.utils';
import {
	GET_STORIES,
  GET_STORY,
  GET_CRITS
} from './stories.types';

export const getAllStories = () => async dispatch => {  
   	let reduxStoriesList = [];
   	let stories = firestore.collection('stories')
   	await stories.orderBy('date', 'desc').get()
   	.then(snapshot => snapshot.forEach(doc => {
      const { title, text, user, date } = doc.data();
      reduxStoriesList.push({ 
        key: doc.id,
        title,
        text,
        user, 
        date
        })
  }));
    dispatch({
      type: GET_STORIES,
      payload: reduxStoriesList
    });
}

export const getStoryById = id => async dispatch => {  
    let reduxStory = [];
    let story = firestore.collection('stories').doc(`${id}`)
    await story.get()
    .then(doc => {
      const { title, text, date } = doc.data();
      reduxStory.push({ 
        key: doc.id,
        title: title,
        text: text,
        date: date
        })
    })
  
    dispatch({
      type: GET_STORY,
      payload: reduxStory
    });
}


export const addStory = ( data ) => {
      firestore.collection('stories').doc().set(data)
  }

export const getStoryCommentsApi = (id) => async dispatch => {
        
  let docs
    await firestore.collection('stories')
    .doc(id)
    .collection('crits')
    .orderBy('date')
    .onSnapshot(snapshot => {
    docs = snapshot.docs.map(doc =>doc.data())
    if (docs) {
      dispatch(getStoryCrits(docs))
      }
      return
    })
  }

export const getStoryCrits = (docs) => async dispatch => {       
    const reduxStoryCrits = []
      docs.forEach(doc => {
      const { text, date, user } = doc;
      const id = doc.id;
      reduxStoryCrits.push({ 
        key: id,
        user,
        text, 
        date
        })
      })

      dispatch({
      type: GET_CRITS,
      payload: reduxStoryCrits
      })
  // }
    // // dispatch({
    // //   type: POST_ERROR,
    // //   payload: { msg: err.response.statusText, status: err.response.status }
    // //     })
   // }
  }

export const addStoryCrit = ( data, id ) =>  {
    let dataObject = {
      text: data.text,
      user: data.user,
      date: data.date
    }

    firestore.collection('stories')
    .doc(data.id)
    .collection('crits')
    .add(dataObject)
  }