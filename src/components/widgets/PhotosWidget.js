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
  const imagesLength = images.length;

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  //Function for getting random images
  const randomImages = useCallback(() => {
    let randomNumbers = [];
    let number;
    if (imagesLength <= 9) {
      return images;
    } else {
      for (let i = 0; i < imagesLength; i++) {
        if (randomNumbers.length < 9) {
          number = Math.floor(Math.random() * imagesLength);
          if (!randomNumbers.includes(number)) {
            randomNumbers.push(number);
          } else {
            continue;
          }
        } else {
          break;
        }
      }
    }
    return randomNumbers;
  }, [images, imagesLength]);

  const getRandomImages = useCallback(() => {
    let arr = [];
    if (randomImages().length === images.length) {
      return randomImages();
    } else {
      randomImages().forEach((item) => {
        images.forEach((image) => {
          if (image.id === item) {
            arr.push(image);
          }
        });
      });
    }
    return arr;
  }, [images, randomImages]);

  useEffect(() => {
    setImagesData(getRandomImages());
  }, [images, getRandomImages]);

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
