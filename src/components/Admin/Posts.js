import React from 'react'
import 'antd/dist/antd.css';
import "./Posts.css"
import { useState } from 'react'
import {Row, Table} from 'antd'
import axios from 'axios'
import { useEffect } from 'react'

export default function Posts() {
  const [loading, setLoading] = useState(false)

  const [dataSource, setDataSource] = useState([])

  const [check, setCheck] = useState(false)

  const API = "https://funlife.azurewebsites.net/getAllPosts"

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
      title: "Content",
      dataIndex: "content"
    },
    {
      key: "3",
      title: "Image",
      dataIndex: ["image"],
      render: (text, row) => <img src={row["image"]} style={{height: 100}}/>
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

