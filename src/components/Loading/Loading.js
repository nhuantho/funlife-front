import React from 'react'
import 'antd/dist/antd.css';
import "./Loading.css"
import { useState } from 'react'
import {Table} from 'antd'
import axios from 'axios'
import { useEffect } from 'react'

export default function Loading() {
  const [loading, setLoading] = useState(false)

  const [dataSource, setDataSource] = useState([])

  const API = "https://jsonplaceholder.typicode.com/todos"

  useEffect(()=> (
    getApi()
  ),[])

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id"
    },
    {
      key: "2",
      title: "User ID",
      dataIndex: "userId"
    },
    {
      key: "3",
      title: "Title",
      dataIndex: "title"
    },
    {
      key: "4",
      title: "Completed",
      dataIndex: "completed",
      render:(completed) => {
        return <p>{completed ?"Completed" : "In Progress"}</p>
      }  
    },
    
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
      <header className="App-header">

        <Table 
          columns={columns}
          dataSource={dataSource}
          loading={loading}   // loading
          ></Table>
      </header>
    </div>
  )
}

