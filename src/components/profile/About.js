import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from 'antd';
import fb from "../../images/facebook.png";
import git from "../../images/github.jpg";
import lin from "../../images/linkdin.png";
import twit from "../../images/twitter.png";
import viber from "../../images/viber.png";
import whap from "../../images/Whatsapp.png";

import 'antd/dist/antd.css';



function About() {
  const { user } = useSelector((state) => state.userDuck)

  return (
    <>
      <div className="about-me">
        <Row>
          <h2>About Me</h2>
          <Col span={24}> 
          {
            user.about
          }
          </Col>
        </Row>
        <Row className="social-links">
          <h2>Social Network</h2>
          <Col span={24}>
                <>
                  <div >
                    {user.fb ? <>
                              <img className="icons" src={fb}/> 
                              <a className="social-network-links" href={user.fb} target="_blank" rel="noreferrer">{user.fb}</a>
                            </> : ""
                    } 
                  </div>
                  <div> 
                    {
                      user.tw ?
                      <><img className="icons" src={twit}/> 
                      <a className="social-network-links" href={user.tw} target="_blank" rel="noreferrer">{user.tw}</a>
                      </> : ""
                    }
                    
                  </div>
                  <div>
                    {
                      user.lin ? <><img className="icons" src={lin}/> 
                                    <a className="social-network-links" href={user.lin} target="_blank" rel="noreferrer">{user.lin}</a>
                                  </> : ""
                    }
                  </div>
                  <div>
                    {
                      user.git ?  <> <img className="icons" src={git}/> 
                                      <a className="social-network-links" href={user.git} target="_blank" rel="noreferrer">{user.git}</a>
                                  </> : ""
                    }
                  </div>
                  <div>
                    {
                      user. vib ? <><img className="icons" src={viber}/> 
                                    <a className="social-network-links" href={user.vib} target="_blank" rel="noreferrer">{user.vib}</a>
                                  </>: ""
                    }
                  </div>
                  <div>
                    {
                      user.wapp ? <><img className="icons" src={whap}/> 
                                    <a className="social-network-links" href={user.wapp} target="_blank" rel="noreferrer">{user.wapp}</a>
                                  </> : ""
                    }
                  </div>
                </>
          </Col>
        </Row>
    </div>
    </>  
  );
}

export default About;
