import React from 'react';

import { Header, Footer, Sidebar, Main } from "./Skeleton";

class App extends React.Component {
  render() {
    return (
    	<div className="App">
	    	<Header />
    		<Sidebar />
	    	<Main />
			</div>
    );
  }
}

export default App;
