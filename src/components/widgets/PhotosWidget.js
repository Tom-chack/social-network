import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./widgets.css";
import getImages from "../../services/getImages";
import { Image, Card } from "antd";

const PhotoWidget = () => {
  //Getting images
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.imageDuck);

  //Some states for random images
  const [imagesData, setImagesData] = useState([]);
  const [imagesId, setImagesId] = useState([])


  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);


  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


  const getImagesId = useCallback (() =>{
    setImagesId(shuffle(images.map(image=>image.id)).slice(0,9))
  },[images])


  
  useEffect(()=>{
    getImagesId()
  }, [images, getImagesId])

  
  const getRandomImages = useCallback(() => {
    let arr = [];
      imagesId.forEach((item) => {
        images.forEach((image) => {
          if (image.id === item) {
            arr.push(image);
          }
        });
      });
    return arr;
  }, [images, imagesId]);
  

  useEffect(()=>{
    setImagesData(getRandomImages())
  }, [images, getRandomImages])


  return (
    <Card className='widget' style={{ backgroundColor: "#fafafa" }}>
      <div className='header-div'>
        <h2>Posted Media</h2>
      </div>
      <div className='photo-content'>
        <div className='photo-content-div'>
          {imagesData.map((item) => (
            <div key={item.id} className={"photo-element"}>
              <Image src={item.url} style={{ borderRadius: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PhotoWidget;
