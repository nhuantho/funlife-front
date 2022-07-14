import React from 'react'
import 'antd/dist/antd.css';
import "./Posts.css"
import { useState } from 'react'
import {Table} from 'antd'
import axios from 'axios'
import { useEffect } from 'react'

export default function Posts() {
  const [loading, setLoading] = useState(false)

  const [dataSource, setDataSource] = useState([])

  const [check, setCheck] = useState(false)

  const API = "https://funlife.azurewebsites.net/getAllUsers"

  useEffect(()=> (
    getApi()
  ),[])

  const columns = [
    {
      key: "1",
      title: "Tài khoản",
      dataIndex: "userName"
    },
    {
      key: "2",
      title: "Họ tên",
      dataIndex: "fullName"
    },
    {
      key: "3",
      title: "Ngày sinh",
      dataIndex: "dateOfBirth"
    },
    {
      key: "4",
      title: "Giới tính",
      dataIndex: "gender"
    },
    {
      key: "5",
      title: "Số điện thoại",
      dataIndex: "phoneNumber"
    },
    {
      key: "6",
      title: "Địa chỉ",
      dataIndex: "address"
    },
    {
      key: "7",
      title: "Công việc",
      dataIndex: "job"
    },
    {
      key: "8",
      title: "Admin",
      dataIndex: "isAdmin"
    }
  ]

  const getApi = () => {
    setLoading(true)
    axios({
      method: 'get',
      url: API,
      data: null,
    }).then((res) => {
      setDataSource(res.data)
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className="App">
    <Table 
      columns={columns}
      dataSource={dataSource}
      loading={loading}   // loading
    ></Table>
    </div>
  )
}

