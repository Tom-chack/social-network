import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../helpers/api";
import { Row, Col } from 'antd';
import fb from "../../images/facebook.png";
import git from "../../images/github.jpg";
import lin from "../../images/linkdin.png";
import twit from "../../images/twitter.png";
import viber from "../../images/viber.png";
import whap from "../../images/Whatsapp.png";

import 'antd/dist/antd.css';



function About() {
  const [about, setAbout] = useState([]);
  const { user } = useSelector((state) => state.userDuck)
  console.log(user.username)

  //fetching from db.json
  useEffect (() => {
    fetch(`${api}/users`)
    .then((res) => res.json())
    .then((res) => setAbout(res))
  }, []);

  return (
    <>
      <div className="about-me">
        <Row>
          <h2>About Me</h2>
          <Col span={24}>{about.map ((item) => {
            if (user.username === item.username) {
              return item.about;
            }
            })}
          </Col>
        </Row>
        <Row className="social-links">
          <h2>Social Network</h2>
          <Col span={24}>{about.map ((item) => {
            if (user.username === item.username) {
              return (
                <>
                  <div className={item.fb ? "icons-container" : ""}>
                    {item.fb ? <>
                              <img className="icons" src={fb}/> 
                              <a className="social-network-links" href={item.fb} target="_blank" rel="noreferrer">{item.fb}</a>
                            </> : ""
                    } 
                  </div>
                  <div className={item.tw ? "icons-container" : ""}> 
                    {
                      item.tw ?
                      <><img className="icons" src={twit}/> 
                      <a className="social-network-links" href={item.tw} target="_blank" rel="noreferrer">{item.tw}</a>
                      </> : ""
                    }
                    
                  </div>
                  <div className={item.lin ? "icons-container" : ""}>
                    {
                      item.lin ? <><img className="icons" src={lin}/> 
                                    <a className="social-network-links" href={item.lin} target="_blank" rel="noreferrer">{item.lin}</a>
                                  </> : ""
                    }
                  </div>
                  <div className={item.git ? "icons-container" : ""}>
                    {
                      item.git ?  <> <img className="icons" src={git}/> 
                                      <a className="social-network-links" href={item.git} target="_blank" rel="noreferrer">{item.git}</a>
                                  </> : ""
                    }
                  </div>
                  <div className={item.vib ? "icons-container" : ""}>
                    {
                      item. vib ? <><img className="icons" src={viber}/> 
                                    <a className="social-network-links" href={item.vib} target="_blank" rel="noreferrer">{item.vib}</a>
                                  </>: ""
                    }
                  </div>
                  <div className={item.wapp ? "icons-container" : ""}>
                    {
                      item.wapp ? <><img className="icons" src={whap}/> 
                                    <a className="social-network-links" href={item.wapp} target="_blank" rel="noreferrer">{item.wapp}</a>
                                  </> : ""
                    }
                  </div>
                </>
              )
              
            }
            })}
          </Col>
        </Row>
    </div>
    </>  
  );
}

export default About;
