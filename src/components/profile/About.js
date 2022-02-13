import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import fb from "../../images/facebook.png";
import git from "../../images/github.jpg";
import lin from "../../images/linkdin.png";
import twit from "../../images/twitter.png";
import viber from "../../images/viber.png";
import whap from "../../images/Whatsapp.png";

import "antd/dist/antd.css";

function About() {
  const { profile } = useSelector((state) => state.userDuck);

  return (
    <>
      <div className="about-me">
        <Row>
          <h2>About Me</h2>
          <Col span={24}>{profile.about}</Col>
        </Row>
        <Row className="social-links">
          <h2>Social Network</h2>
          <Col span={24}>
            <>
              <div>
                {profile.fb ? (
                  <>
                    <img className="icons" src={fb} />
                    <a
                      className="social-network-links"
                      href={profile.fb}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile.fb}
                    </a>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div>
                {profile.tw ? (
                  <>
                    <img className="icons" src={twit} />
                    <a
                      className="social-network-links"
                      href={profile.tw}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile.tw}
                    </a>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div>
                {profile.lin ? (
                  <>
                    <img className="icons" src={lin} />
                    <a
                      className="social-network-links"
                      href={profile.lin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile.lin}
                    </a>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div>
                {profile.git ? (
                  <>
                    {" "}
                    <img className="icons" src={git} />
                    <a
                      className="social-network-links"
                      href={profile.git}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile.git}
                    </a>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div>
                {profile.vib ? (
                  <>
                    <img className="icons" src={viber} />
                    <a
                      className="social-network-links"
                      href={profile.vib}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile.vib}
                    </a>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div>
                {profile.wapp ? (
                  <>
                    <img className="icons" src={whap} />
                    <a
                      className="social-network-links"
                      href={profile.wapp}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile.wapp}
                    </a>
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default About;
