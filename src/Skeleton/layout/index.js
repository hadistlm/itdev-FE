import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from "../routers";

const Main = () => {
  return (
  	<React.Suspense fallback={<h1>Still Loading…</h1>}>
	    <Switch> 
	  		{/* The Switch decides which component to show based on the current URL.*/}
	  		{Object.keys(routes).map(index => (
	  			<Route exact path={routes[index].path} component={routes[index].component}></Route>
			  ))}
	    </Switch>
    </React.Suspense>
  );
}

export default Main;