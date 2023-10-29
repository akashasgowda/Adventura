import React from "react";
import { Container, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            {/* <Route path="/create-adventure" exact element={<Create />} /> */}
            <Route path="/auth" exact element={<Auth />} />
          </Routes>
        </Container>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
