import Valikko from './components/Valikko';
import Etusivu from './components/Etusivu';
import Selaa from './components/Selaa';
import Tarkastelu from './components/Tarkastelu';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Valikko/>
      <Route path="/" exact>
        <Redirect to="/etusivu"/>
      </Route>
      <Route path="/etusivu" component={Etusivu} /> 
      <Route path="/selaa" exact component={Selaa} />  
      <Route path="/selaa/:id" exact component={Tarkastelu} />   
    </Router>
  );
}

export default App;
