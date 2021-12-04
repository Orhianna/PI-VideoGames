import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './Components/Landing'
import Home from './Components/Home';
import GameCreation from './Components/GameCreation'
import GameDetail from './Components/GameDetails';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={ Landing }/>
        <Route exact path='/home' component={Home}/>
        <Route path='/newvideogame' component={GameCreation}/>
        <Route exact path='/home/:id' component={GameDetail}/>
        {/* <Route exact path="/home/:id" render={({match})=> <GameDetail match={match}/>}/> */}

        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
