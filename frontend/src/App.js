import Navbar from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Task from "./pages/TaskPage";
import Form from "./pages/Form";

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='contents'>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path='/explore'>
              <Explore />
            </Route>
            <Route path='/tasks/:id'>
              <Task />
            </Route>
            <Route path='/connect'>
              <Form />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
