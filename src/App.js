import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useGlobalContext } from "./context";

// import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import LessonList from "./pages/LessonList";
import Lesson from "./pages/Lesson";
import VocabList from "./pages/VocabList";
import Vocab from "./pages/Vocab";
import ConvoList from "./pages/ConvoList";
import Convo from "./pages/Convo";

// import components
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Login from "./components/Login";
import useToken from "./components/useToken";
import Test from "pages/Test";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  const { loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/lessons">
          <LessonList />
        </Route>
        <Route exact path="/lesson/:lessonId">
          <Lesson />
        </Route>
        <Route path="/vocabularies">
          <VocabList />
        </Route>
        <Route path="/lesson/:lessonId/vocabulary/:vocabIndex">
          <Vocab />
        </Route>
        <Route path="/conversations">
          <ConvoList />
        </Route>
        <Route path="/lesson/:lessonId/conversation/:convoIndex">
          <Convo />
        </Route>
        <Route path="/test">
          <Test />
        </Route>

        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
