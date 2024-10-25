

import Login from "./pages/login/Login";

import Single from "./pages/single/Single";
import New from "./pages/new/New";
import {productInputs, userInputs, utaraInputs, selatanInputs, baratInputs, timurInputs, dinasInputs,banyumanikInputs, mijenInputs, candisariInputs, genukInputs, gunungpatiInputs, ngaliyanInputs, pedurunganInputs, tembalangInputs, tuguInputs, gajahmungkurInputs} from "./formsource";
import "./style/dark.scss";
import {useContext} from "react";
import {DarkModeContext} from "./context/darkModeContext";
import { dinasColumns, tengahColumns } from "./datatablesource";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Usertengah from "./pages/usertengah/Usertengah";

import Listsemarangtengah from "./pages/listsemarangtengah/Listsemarangtengah";


function App() {
  const {darkMode} = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  
  const NotRequireAuth = ({ children }) => {
    return currentUser ? <Navigate to="/" /> : children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<NotRequireAuth><Login /></NotRequireAuth>}></Route>      
              <Route index element={<RequireAuth><Usertengah /></RequireAuth>}></Route>

              <Route path="tengah">
                <Route index element={<RequireAuth><Listsemarangtengah columns={tengahColumns} /></RequireAuth>}></Route>
                <Route path=":id" element={<RequireAuth><Single columns={tengahColumns} /></RequireAuth>}></Route>
                <Route 
                  path="new" element={<New inputs={userInputs} title="ADD NEW" />}
                />
              </Route>
            </Route>

            
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
