import React, { useEffect, useState } from 'react'
import './PeopleRole.css'
import UserInfoBox from '../UserInfoBox.jsx'
import Role from '../Role.jsx';
import axios from "axios";


function PeopleRole({workspace_id}) {
    
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [inputColor, setInputColor] = useState('#000')
    const [name, setName] = useState('')
    const handleAddrole = async () => {
        await axios.post("http://localhost:8000/api/addrole", {
            workspace_id,
            role_name:name,
            color:inputColor
        })
        .then((response)=>{
            setName('')
            setInputColor('#000')
            console.log(response.data)
            setLoadingInfo(p=>!p)
        })
    }
  return (
    <>
        <div className='peoplerole-show'>
            <div className="text-share">Share</div>
            <div className="container-shareset">
                <div className="container-search-people">
                    <input className='input-search-people' placeholder='emample@gmail.com'/>
                    <div className="bt-search-people">Search</div>
                </div>

            </div>
            <div className="text-role-set">Role</div>
            <div className="container-roleset">
                <div className='container-role-add'>
                    <div className='bginput-role-add'>
                        <input className='input-role' placeholder='Role Name' onChange={(e)=>setName(e.target.value)} value={name}/>
                        <input className='input-color' type='color' onChange={(e)=>setInputColor(e.target.value)} value={inputColor}/>
                    </div>
                    <div className="bt-role-add" onClick={name.replace(/\s+/g, '') === '' ?() => setName(''): handleAddrole}>Add Role</div>
                </div>
                <div className="container-role-show">
                    <Role workspace_id={workspace_id} loadingInfo={loadingInfo} setLoadingInfo={setLoadingInfo} page='roleEdit'/>
                </div>
            </div>
            <div className="text-people">People</div>
            <div className="container-peopleset">
                <div className="head-peopleset">
                    <div className="head-img"></div>
                    <div className="head-email">Email</div>
                    <div className="head-username">Usermane</div>
                    <div className="head-role">Role</div>
                </div>
                <UserInfoBox/>
                <UserInfoBox/>
                <UserInfoBox/>
            </div>
            <div className="bgexit-workspace">
                <div className="exit-workspace">Exit Workspace</div>
            </div>
            
        </div>
    </>

  )
}

export default PeopleRole;