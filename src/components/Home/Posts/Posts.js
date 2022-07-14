import axios from "axios"
import { useEffect, useState } from "react"
import TestLoading from "../../Loading/TestLoading"

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
                    <div style={{marginTop: 20, width: 500, justifyContent: "center"}}>
                    <p>{posts.content}</p>
                    <div>
                      <img src={posts.image} style={{height: 500}}/>  
                    </div>
                    </div>
                )
            })
          }
        </div>
    );
}