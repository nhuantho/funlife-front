import React, { useState } from "react";
import "./Posts.css";
import { Button, Input } from 'antd';
import axios from "axios";
import swal from 'sweetalert';
import { useAppContext } from "../Routers/Index";

const { TextArea } = Input;

function AddPosts() {
  const {user} = useAppContext()
  const [value, setValue] = useState('');
  const [baseImage, setBaseImage] = useState("");
  const [loadingCancel, setLoadingCancel] = useState(false)
  const [loadingConfirm, setLoadingConfirm] = useState(false)
  const [dataSource, setDataSource] = useState([])

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const postApi = () => {
    setLoadingConfirm(true) // xoay
    axios({
      method: 'post',
      url: "https://funlife.azurewebsites.net/addPost",
      data: {
        "userName" : user[0].userName,
        "content" : value,
        "image" : baseImage
      },
    }).then((res) => {
      setDataSource(res.data)
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setValue("")
      setBaseImage("")
      swal({
        title: "Đã thêm bài viết thành công",
        icon: "success",
        dangerMode: true,
      });
      setLoadingConfirm(false)
    })
  }

  const Cancel = () => {
    setLoadingCancel(true)
    setBaseImage("")
    setValue("")
    setLoadingCancel(false)
  }
  
  const Confirm = () => {
    if(value === "" || value === null){
      swal({
        title: "Bạn chưa nhập nội dung",
        icon: "warning",
        dangerMode: true,
      });
    }else{
      postApi()
    }
  }

  return (
    <div style={{textAlign: "center", marginTop: 20}}>
      <TextArea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Viết chia sẻ..."
        autoSize={{ minRows: 5, maxRows: 15 }}
      />
      <img src={baseImage} height="500px" style={{marginTop: 30}}/>
      <br></br>
      
      <div style={{height:40, paddingTop: 8}}>
        <label>
          <input
            type="file"
            onChange={(e) => {
              uploadImage(e);
            }}
            style={{display: "none"}}
          />
          {baseImage === ""?"Chọn ảnh":"Chọn ảnh khác"}
        </label>
      </div>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: 30}}>
        <Button loading={loadingConfirm} onClick={Confirm}type="primary" style={{marginRight: 30}}>Đăng bài</Button>
        <Button loading={loadingCancel} onClick={Cancel} type="primary" style={{marginLeft: 30}}>Hủy bài viết</Button>
      </div>
    </div>
  );
}

export default AddPosts;