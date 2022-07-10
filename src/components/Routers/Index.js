import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form_login from "../Form_login/Form_login";
import Home from "../Home/Home";

export default function Index(){
    return(
      <div>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Form_login />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
}