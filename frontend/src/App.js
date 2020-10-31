import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Editor from './components/Editor'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className='App vh-100'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/editor/:id' exact component={Editor} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
