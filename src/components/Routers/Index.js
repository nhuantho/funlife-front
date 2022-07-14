import { Menu } from "antd";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { HomeOutlined, UserOutlined, UserAddOutlined, SettingOutlined, LoginOutlined, LogoutOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Form_login from "../Form_login/Form_login";
import Home from "../Home/Home";
import Form_regist from "../Form_regist/Form_regist";
import { createContext, useContext, useState } from "react";
import Profile from "../User/Profile";
import Admin from "../Admin/Admin";
import SetOfQuestions from "../Questions/SetOfQuestions";
import Res from "../Result/Result";
import LadingPage from "../LandingPage/LandingPage";
import Logo from "../../Icon/Logo";

const u = [{
  "userName": "",
  "fullName": "",
  "dateOfBirth": "",
  "gender": "",
  "address": "",
  "phoneNumber": "",
  "job": "",
  "university": "",
  "password": "",
  "isAdmin": 0,
  "posts": [],
  "userQuestions": [],
  "userSetOfQuestions": [],
  "userPsychologicalTowers": [],
  "userPsychologists": []
}]

const qa = [{
  question:{
    "code": "",
    "content": ""
  },
  answer:{
    "code": "",
    "content": "",
    "point": 0
  }
}]

const r = [
  {
      "code": "",
      "diseaseLevel": "",
      "pointMin": 0,
      "pointMax": 0,
      "advice": ""
  }
]

export const AppContext = createContext({
  user: {},
  setUser: () => {},
  questionAnswer:{},
  setQuestionAnswer: () => {},
  soq: "",
  setSoq: () => {},
  res:{},
  setRes: () => {}
});

export const useAppContext = () => useContext(AppContext); 

export default function Index(){
  const [user, setUser] = useState(u);
  const [questionAnswer, setQuestionAnswer] = useState(qa);
  const [soq, setSoq] = useState("");
  const [res, setRes] = useState(r);
  // title={user.userName === null || user.userName === "" ? "Tài khoản" : user.userName}
  const checkUser = () => {
    if(user[0].userName === null || user[0].userName === "") return "Tài khoản";
    else{ 
      if(user[0].isAdmin === 0) return "Xin chào " + user[0].userName + "!";
      else return "Xin chào quản lý " + user[0].userName + "!";
    }
  }

  const checkProfile = () => {
    if(user[0].userName === null || user[0].userName === "") return "/login";
    else return "/profile";
  }

  const checkLogin = () => {
    if(user[0].userName === null || user[0].userName === "") return "/resgiter";
    else return "/login";
  }

  const checkSetUser = () => {
    if (checkLogin()==="/login"){
      setUser(u);
      setQuestionAnswer(qa);
      setRes(r);
    }
  }

  console.log(user);
  return(
    <AppContext.Provider value={{user, setUser, questionAnswer, setQuestionAnswer, soq, setSoq, res, setRes}}>
      <Router>
        <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
        <Menu.Item key="0" ><Link to={"/"}><Logo/></Link></Menu.Item>
        <Menu.Item key="1" icon={<HomeOutlined />}><Link to={"/home"}>Trang Chủ</Link></Menu.Item>
        <Menu.Item key="6" icon={<QuestionCircleOutlined />}><Link to={"/test"}>Kiểm tra tâm lý</Link></Menu.Item>
        <Menu.SubMenu key="2" title={checkUser()} icon={ <UserOutlined />}>
          <Menu.Item key="3" icon={user[0].userName === null || user[0].userName === ""?<LoginOutlined/>:<UserOutlined />}>
            <Link to={checkProfile()}>{user[0].userName === null || user[0].userName === ""?"Dăng nhập":"Thông tin của bạn"}</Link>
          </Menu.Item>
          {user[0].isAdmin !== 0 ?
          (<Menu.Item key="4" icon={<SettingOutlined />}>
            <Link to={"/admin"}>Quản lý</Link>
          </Menu.Item>):null}
          <Menu.Item key="5" icon={user[0].userName === null || user[0].userName === ""? <UserAddOutlined />:<LogoutOutlined/>} onClick={checkSetUser}>
            <Link to={checkLogin()}>{user[0].userName === null || user[0].userName === ""?"Dăng ký":"Đăng xuất"}</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
        <div>
          <Routes>
            <Route path="/" element={<LadingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Form_login />} />
            <Route path="/resgiter" element={<Form_regist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/test" element={<SetOfQuestions />} />
            <Route path="/result" element={<Res />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}