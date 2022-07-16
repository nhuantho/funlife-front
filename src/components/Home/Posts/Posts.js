import axios from "axios"
import { useEffect, useState } from "react"
import TestLoading from "../../Loading/TestLoading"
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Card, CardBody, CardText,CardImg, CardTitle, Container } from 'reactstrap'

// eslint-disable-next-line import/no-anonymous-default-export
export default function(){
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    useEffect(()=> (
        getApi()
    ),[])
    const getApi = () => {
        setLoading(true) // xoay
        axios({
          method: 'get',
          url: "https://funlife.azurewebsites.net/getAllPosts",
          data: null
        }).then((res) => {
          setDataSource(res.data)
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          setLoading(false)
        })
      }
    return(
        
        <div>
        {loading === true ? <TestLoading/>:null}
          {
            dataSource.map((posts) => {
                return(
                  <Container >

                  
                    {/* <div style={{marginTop: 20, width: 500, justifyContent: "center"}}>
                    <p>{posts.content}</p>
                    <div>
                      <img src={posts.image} style={{height: 500}}/>  
                    </div>
                    </div> */}

                    <Card style={{margin:30, width:680}}>
                      <CardBody>
                        <CardTitle tag="h3" >
                        Admin :
                        </CardTitle>
                        <CardText tag = "text">
                          {posts.content}
                        </CardText>
                        <CardText>
                          <small className="text-muted">
                            Chưa có thời gian Đăng bài
                          </small>
                        </CardText>
                      </CardBody>
                      <CardImg
                        alt="Card image cap"
                        bottom
                        src={posts.image}
                        width="100%"
                      />
                    </Card>

                  </Container>
                  
                  
              )
            })
          }
        </div>

        
    );
}