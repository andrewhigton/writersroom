import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const HeaderMain = () => {  

    return (  
        <div className="header-below"> 
        <Link className=''
            to="/topics">
    		Topics
    	</Link>    	
    	<Link className='story-links'
         to="/stories">
    		Stories
    	</Link>    
    	<Link className='story-links'
         to="/articles">
    		Articles
    	</Link>
    	<Link className='story-links' 
        to="/about">
    		About
    	</Link>
        </div> 
    );
}

export default HeaderMain;