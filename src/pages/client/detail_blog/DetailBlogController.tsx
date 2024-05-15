import { useQuery } from "react-query";
import DetailBlogView from "./DetailBlogView"
import { getOnePost } from "@/service/post";
import { useParams } from "react-router";
import { useState } from "react";
import Loading from "@/components/Loading";


const DetailBlogController = () => {
  const {id}:any = useParams()
  const [loading,setLoading] = useState(false)
  const { data: post } = useQuery("post_detail", {
    queryFn: () => {
      setLoading(true)
      return getOnePost(id);
    },
    onSuccess(data:any) {
      if(Object.keys(data)[0]){
        setLoading(false)
      }
    },
    refetchOnWindowFocus: false,
  });
  
  return (
    <>
    
    {!loading&& <DetailBlogView post={post&&post} />}
    </>
  )
}

export default DetailBlogController