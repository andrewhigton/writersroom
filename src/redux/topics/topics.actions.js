import { firestore } from '../../firebase/firebase.utils';
import {
	GET_TOPICS,
  GET_TOPIC,
  GET_TOPIC_COMMENTS
} from './topics.types';

export const getAllTopicsApi = () => async dispatch => {       
   	let topics = firestore.collection('topics')
    topics.orderBy('date', 'desc')
    .onSnapshot(doc => {
      if(doc) {
        dispatch(getAllTopics(doc))
        }
      })
    }
    
export const getAllTopics = (doc) => async dispatch => {   
      let reduxTopics = []

      doc.forEach(doc => {
      const { title, text, user, date} = doc.data();
      const id = doc.id;
      reduxTopics.push({ 
        key: id,
        title,
        text,
        user, 
        date
        })
    })

    dispatch({
      type: GET_TOPICS,
      payload: reduxTopics
      });
//   //   } catch (err) {
//   //   console.log('error')
//   // }
}
 
export const getTopicCommentsApi = (id) => async dispatch => {
  let docs
    await firestore.collection('topics')
    .doc(id)
    .collection('comments')
    .orderBy('date')
    .onSnapshot(snapshot => {
    docs = snapshot.docs.map(doc =>doc.data())
    if (docs) {
      dispatch(getTopicComments(docs))
      }
      return
    })
  }

const getTopicComments = (doc) => async dispatch => {  

    const reduxTopicComments = []
    
    doc.forEach(doc => {
      const { text, date, user } = doc;
      const id = doc.id;
      reduxTopicComments.push({ 
        key: id,
        user,
        text, 
        date
        })
    })
    
    dispatch({
      type: GET_TOPIC_COMMENTS,
      payload: reduxTopicComments
      });
}

  export const getTopicById = id => async dispatch => {   
    let reduxTopic = []
    // try {
    const topic = firestore.collection('topics').doc(`${id}`)
    await topic.get()
     .then(doc => {

      const { title, text, date, user, id } = doc.data();
      reduxTopic.push({ 
        title,
        text,
        date,
        user, 
        key: id
        })
    })
    dispatch({
      type: GET_TOPIC,
      payload: reduxTopic
      });
    //} 
    // catch (err) {
    // console.log('error')
    // }
  }
 
  export const addTopic = ( data ) => async dispatch => {
      firestore
      .collection('topics')
      .doc()
      .set(data)
  }

  export const addTopicComment = ( data, id ) => async dispatch => {
    
    let dataObject = {
      text: data.text,
      user: data.user,
      date: data.date
    }
    
    firestore.collection('topics')
    .doc(data.id)
    .collection('comments')
    .add(dataObject)
    
  }