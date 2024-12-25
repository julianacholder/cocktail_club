import React from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import CocktailPage from "./CocktailPage";

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<CocktailPage/>}/>
      </Routes>
     </Router>
  );
}

export default App;

