import { Link } from "react-router-dom"
import {LeftOutlined} from '@ant-design/icons'
import { useState } from "react"


const Pagination = ({usersPerPage, total, paginate,nextPage, prevPage}) =>{

const [activeClass, setActiveClass] = useState()
const pageNumber = []

for (let i = 1; i <= Math.ceil(total / usersPerPage); i++) {
    pageNumber.push(i)
    
}



    return (
        <div>
            <ul className="pagination">
                <Link to={''} className={'page-link'}>
                    <li onClick={()=>prevPage()} className="page-item">{'<'}</li>
                </Link>
                    {
                        pageNumber.map(number=>(
                            
                                <Link 
                                    to={''} 
                                    className={'page-link'} 
                                    onClick={()=>paginate(number)}
                                    key={number}
                                >

                                    <li className="page-item" key={number}>
                                        {number}
                                    </li>

                                </Link>
                            
                        ))

                    }
                <Link to={''} className={'page-link'}>
                    <li onClick={()=>nextPage()} className="page-item">{'>'}</li>
                </Link>
            </ul>
        </div>
    )
}

export default Pagination