import React from 'react';
import styles from './App.module.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
