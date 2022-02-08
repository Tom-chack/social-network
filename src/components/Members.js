import React, {useEffect, useState} from "react";
import './profile/members.css'
import {DATA} from "../helpers/constants";
import { Card, Avatar } from 'antd';
import { dateToLocalFormat } from 'date-format-ms';
import {Link} from "react-router-dom";
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import Post from "./widgets/Post";


const { Meta } = Card;



function getDate(sec){
 return dateToLocalFormat(new Date(sec), 'd.m.Y')
}



function Members() {

  const [users, setUsers] = useState(DATA.users)
  const [filtered, setFiltered] = useState([])
  const [inputValue, setInputValue] = useState('')


  useEffect(()=>{
    setFiltered(users)
  },[])

  useEffect(()=>{
    filterUsers()
  },[inputValue])



  const getInputValue = (e) => {
    setInputValue(e.target.value)
  }
  
  const filterUsers = () => {
    let filteredUsers ;
    if (inputValue === ''){
      filteredUsers = users;
    }
    else{
      filteredUsers = users.filter((item)=>{
        if (item.name.toLowerCase().includes(inputValue.toLowerCase())){
          return item;
        }
      })
    }
    setFiltered(filteredUsers)
  }

  const pagination = () => {

  }


  return (
      <div className={'members-container'}>

          <div className={'members-content'}>

            <div className={'members-search'}>

              <div>
                <span className={'members-span'}>Members</span>
              </div>

              <div>
                <Input
                    placeholder={'Search...'}
                    onChange={getInputValue}
                    prefix={<UserOutlined />}
                />

              </div>

            </div>

            {
              filtered.map(item=>(
                  <Card key={item.id}
                      cover={
                        <img
                            src={item.bgImg}
                            alt={`${item.name}'s background image`}
                        />
                      }
                  >
                    <Meta
                        avatar={<Avatar src={item.img} />}
                        title={<Link to={`/profile/${item.id}`} style={{color: 'black'}}>{item.name}</Link>}
                        description={`Joined ${getDate(item.date)}`}
                    />
                  </Card>
              ))
            }

            <Pagination
                defaultCurrent={1}
                total={filtered.length}
                defaultPageSize={5}
            />

          </div>

          <div className={'widgets-content'}>
            <Post posts={DATA.posts} users={DATA.users}/>
          </div>

      </div>
  )
}

export default Members;
