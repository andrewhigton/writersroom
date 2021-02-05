import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/routing/privateRoute';
import Header from './components/header/header.component';
import HeaderMain from './components/header/header-main.component';
import HomePage from './pages/homepage/homepage';
import StoriesPage from './pages/stories/stories';
import TopicsPage from './pages/topics/topics';
import TopicPage from './pages/topic/topic';
import TopicForm from './components/topics/topicForm';
import StoryForm from './components/story/storyForm';
import StoryPage from './pages/story/story';
import AboutPage from './pages/about/about';
import ArticlesPage from './pages/articles/articles';
import SignInSignUpPage from './pages/signin-signup/signin-signup';
import { selectCurrentUser } from './redux/user/user.selectors';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'; 
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'; 
import './App.css';

class App extends React.Component {
  
  constructor(props) {
        super(props);
        this.state = {
          redirectToReferrer: false
        }
    }

  unsubscribeFromAuth = null; 

  componentDidMount() {
  
  const { setCurrentUser } = this.props;

  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
       if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
        setCurrentUser({
          id: snapShot.id,
          ...snapShot.data()
          })
        
        }, () => {
          })
        }
       
    setCurrentUser(userAuth)
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    }

  render () {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <HeaderMain/>
       <Switch>
         <Route exact path='/' component={HomePage} />
         
         <Route exact path='/about' component={AboutPage} />
         <Route exact path='/articles' component={ArticlesPage} />
         <Route exact path='/login' 
         render={() => this.props.currentUser ? 
          (<Redirect to='/' />) :
          (<SignInSignUpPage />)
          }/>
         <Route exact path='/register' 
         render={() => this.props.currentUser ? 
          (<Redirect to='/' />) :
          (<SignInSignUpPage />)
          }
         component={SignInSignUpPage} />
         <PrivateRoute exact path='/topicForm' component={TopicForm} />
         <PrivateRoute exact path='/topics' component={TopicsPage} />
         <PrivateRoute exact path='/topics/:id' component={TopicPage} />      
         <PrivateRoute exact path='/storyForm' component={StoryForm} />
      	 <PrivateRoute exact path='/stories' component={StoriesPage} />
         <PrivateRoute exact path='/story/:id' component={StoryPage} />
    	 </Switch>
      </BrowserRouter>
    </div>
    );
  }
}

const mapStateToProps = ( state ) => ({
  currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);