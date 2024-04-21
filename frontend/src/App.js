import Navbar from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Form from "./pages/Form";
import Footer from "./components/Footer";
import Create from "./pages/Create";
import TaskPage from "./pages/TaskPage";
import { Web3Provider } from "./components/Web3Provider";

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="contents">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/explore">
                <Explore />
              </Route>
              <Route path="/connect">
                <Form />
              </Route>
              <Route path="/tasks/:id">
                <TaskPage />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
