import React from 'react';
import styles from './App.module.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage } from "./pages";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          {/* 传给 element：history，location，match */}
          <Route path='/' element={<HomePage />} />
          <Route path='/signIn' element={<SignInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          {/* 动态路由使用 */}
          <Route path='/detail/:id' element={<DetailPage />} />
          {/* ? 表示参数可选 */}
          <Route path='/search/:keywords' element={<SearchPage />} />
          <Route path='*' element={<>404 我叼你妈的</>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
