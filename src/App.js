import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Profile from "./components/auth/Profile";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route path="/" element={<SignUp />}/>
                  <Route path="/login" element={<SignIn />}/>
                  <Route path="/profile" element={<Profile />}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
