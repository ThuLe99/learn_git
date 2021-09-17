import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import PageRender from "./PageRender";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";

import { Alert } from "./components/alert/Alert";
import { refreshToken } from "./redux/actions/authAction";
import { getCategories } from "./redux/actions/categoryAction";
import { getHomeBlogs, geTopBlogs } from "./redux/actions/blogAction";
import { getUsers, getBlogs } from "./redux/actions/adminAction";
import io from "socket.io-client";
import SocketClient from './SocketClient'
export type State = {
  readonly timestamp: number;
  readonly value: number;
};
const App = () => {


  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io();
    dispatch({ type: 'SOCKET', payload: socket
  })
    return () => {socket.close()}
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getCategories());
    dispatch(refreshToken());
    dispatch(geTopBlogs());
    dispatch(getHomeBlogs());
    dispatch(getUsers());
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div className="container">
      <SocketClient/>
      <Router>
        <Alert />
        <Header />
        <SocketClient />
        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>

        <Footer />
      </Router>
    </div>
  );
};

export default App;
