import React from 'react';
import "./style/index.css";
import "./style/daterangepicker.css";
import { Header, Footer, Sidebar, Main } from "./Skeleton";

class App extends React.Component {
  render() {
    return (
    	<div className="App">
	    	<Header />
    		<Sidebar />
	    	<Main />
	    	<Footer />
			</div>
    );
  }
}

export default App;
