import React from "react";
import { useSelector } from "react-redux";
import { Col, Card } from "antd";
import fb from "../../../images/facebook.png";
import git from "../../../images/github.jpg";
import lin from "../../../images/linkdin.png";
import twit from "../../../images/twitter.png";
import viber from "../../../images/viber.png";
import whap from "../../../images/Whatsapp.png";

import "./About.css";

function About() {
  const { profile } = useSelector((state) => state.userDuck);

  return (
    <div className='about'>
      <h2 style={{ marginTop: "2px" }}>About Me</h2>
      <Card className='any-row-about-me' style={{ backgroundColor: "#fafafa" }}>
        <Col span={24}>{profile.about}</Col>
      </Card>
      <h2>Social Network</h2>
      <Card className='social-links' style={{ backgroundColor: "#fafafa" }}>
        <div>
          {profile.fb ? (
            <>
              <img className='icons' src={fb} alt='Facebook' />
              <a
                className='social-network-links'
                href={profile.fb}
                target='_blank'
                rel='noreferrer'
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
              <img className='icons' src={twit} alt='Twitter' />
              <a
                className='social-network-links'
                href={profile.tw}
                target='_blank'
                rel='noreferrer'
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
              <img className='icons' src={lin} alt='LinkedIn' />
              <a
                className='social-network-links'
                href={profile.lin}
                target='_blank'
                rel='noreferrer'
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
              <img className='icons' src={git} alt='GitHub' />
              <a
                className='social-network-links'
                href={profile.git}
                target='_blank'
                rel='noreferrer'
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
              <img className='icons' src={viber} alt='Viber' />
              <a
                className='social-network-links'
                href={profile.vib}
                target='_blank'
                rel='noreferrer'
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
              <img className='icons' src={whap} alt='WhatsApp' />
              <a
                className='social-network-links'
                href={profile.wapp}
                target='_blank'
                rel='noreferrer'
              >
                {profile.wapp}
              </a>
            </>
          ) : (
            ""
          )}
        </div>
      </Card>
    </div>
  );
}

export default About;
