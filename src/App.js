import React from 'react';
import Main from './components/Main'
import Navbar from './components/Navbar'
import Footer  from './components/Footer'
import './App.css';



const App = () => (
  <div>
		<Navbar />
	  <main className="mui-container">
	  	<Main />
	  </main>
	  <div className="mui-container">
		  <Footer />
		 </div>
	</div>
)

export default App;
