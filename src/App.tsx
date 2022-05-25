import React, { useEffect } from 'react';
import styles from './App.module.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage, PlaceOrder } from "./pages";
import { Navigate } from "react-router-dom";
import { useSelector, useAppDispatch } from "./redux/hooks";
import { getShoppingCart } from "./redux/shoppingCart/slice"


// const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
//   const routeComponent = (props) => {
//     return isAuthenticated ? (
//       React.createElement(component, props)
//     ) : (
//       <Navigate to={{ pathname: "/signIn" }} />
//     ); 
//   }
//   return <Route element={routeComponent} {...rest} />;
// }

const ProtectedRoute = ({
  user,
  redirectPath = '/',
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

function App() {
  const jwt = useSelector((s) => s.user.token);
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if(jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

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

          {/* Router6 中实现私有路由 */}
          <Route
            path="/shoppingCart"
            element={
              <ProtectedRoute user={jwt}>
                <ShoppingCartPage />
              </ProtectedRoute>
            }  
          >
          </Route>
          <Route
            path="/placeOrder"
            element={
              <ProtectedRoute user={jwt}>
                <PlaceOrder />
              </ProtectedRoute>
            }  
          >
          </Route>
          <Route path='*' element={<>404 我叼你妈的</>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
