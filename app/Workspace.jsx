import React, { useState, useEffect } from "react";
import "./Workspace.css";
import Navinwork from "../components/Navinwork.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Taskshow from "../components/Taskshow.jsx";
import Roleshow from "../components/Roleshow.jsx";
import Scheduleshow from "../components/Scheduleshow.jsx";
import SidebarSetting from "../components/Sidebar-setting.jsx";
import Profile from "../components/setting-menu/Profile.jsx";
import Project from "../components/setting-menu/Project.jsx";
import PeopleRole from "../components/setting-menu/PeopleRole.jsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { axiosinstant } from "../lib/axiosinstant";

function Workspace() {
  const [loadInfoname, setLoadInfoname] = useState(false)
  const [loadInfo, setLoadInfo] = useState(false)
  const location = useLocation();
  const workspace_id = location.state;
  const [sidebar, setSidebar] = useState(true);
  const [componentwork, setComponentwork] = useState("Taskshow");
  const navigate = useNavigate();

  useEffect(() => {
    
    const Checklogin = async () => {
        try {
        await axiosinstant.get("/api/checklogin")
            .then((response) => {
            if (response.data.success) {
                return;
            } else {
                navigate("/login");
            }
            })
            .catch((error) => {
            console.error(error);
            });
        } catch (error) {
        console.error(error);
        }
    };
    Checklogin();
}, []);


  const renderActiveComponent = () => {
    switch (componentwork) {
      case "Taskshow":
        return <Taskshow workspace_id = {workspace_id}/>;
      case "Roleshow":
        return <Roleshow workspace_id = {workspace_id}/>;
      case "Scheduleshow":
        return <Scheduleshow workspace_id = {workspace_id}/>;
        
      case "Profile":
        return <Profile loadInfoname={loadInfoname} setLoadInfoname={setLoadInfoname}/>;
      case "Project":
        return <Project workspace_id={workspace_id} setLoadInfo={setLoadInfo}/>;
      case "PeopleRole":
        return <PeopleRole workspace_id={workspace_id}/>;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="container-workspace">
        <Navinwork loadInfoname={loadInfoname}/>
        <Sidebar
          loadInfo={loadInfo}
          setSidebar={setSidebar}
          setComponentwork={setComponentwork}
          componentwork={componentwork}
          workspace_id={workspace_id}
        />
        {sidebar ? null : (
          <SidebarSetting
            setSidebar={setSidebar}
            setComponentwork={setComponentwork}
            componentwork={componentwork}
          />
        )}
        <div className="container-menu-show">
          <div className="sidebar-box"></div>
          {/* <Taskshow/> */}
          {/* <Roleshow/> */}
          {/* <Profile/> */}
          {/* <Project/> */}
          {/* <PeopleRole/> */}
          {renderActiveComponent()}
        </div>
      </div>
    </>
  );
}

export default Workspace;
