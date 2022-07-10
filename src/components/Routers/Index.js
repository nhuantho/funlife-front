import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form_login from "../Form_login/Form_login";
import Loading from "../Loading/Loading";

export default function Index(){
    return(
      <div>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Loading />} />
              <Route path="/login" element={<Form_login />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
}