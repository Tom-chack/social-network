import { Image } from "antd";
import { HeartOutlined,MessageOutlined }from  '@ant-design/icons';

function ActivityCard({date,image,id,content,likes}) {
    const Avatar = () => {
    return <Image src={image} className='activityAvatar'  />;
    
    };
    const Like=()=>{
        return <HeartOutlined  width={20}/>;
    }
    const Comment=()=>{
        return  <MessageOutlined/>
    }
    return (
         <div className="activityCard">
           <Avatar/>
           
            {id}<br/>
            {date}<br/>
            {content}<br/>
               <div className="likesComments">
                     <h5><Like/> likes{likes} </h5>  
                     <h5><Comment/>comments 0 </h5>
               </div>
           
         </div>
);
    
}
export default ActivityCard;