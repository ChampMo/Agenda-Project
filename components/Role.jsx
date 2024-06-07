import React, { useState, useEffect } from "react";
import "./Role.css";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { Icon } from '@iconify/react';

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex.split('').map(function (char) {
      return char + char;
    }).join('');
  }

  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return 'rgb(' + [r, g, b].join(', ') + ')';
}

function getContrastColor(color) {
  color = hexToRgb(color);

  if (!color || !/^rgb\(\d+,\s*\d+,\s*\d+\)$/.test(color)) {
    console.log("Invalid color format:", color);
    return "black";
  }

  const rgb = color.match(/\d+/g).map(Number);

  const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;

  const contrastColor = luminance < 0.5 ? "white" : "black";
  return contrastColor;
}








function Role({ workspace_id, loadingInfo, setLoadingInfo, page, setData, data }) {
  const [loading, setLoading] = useState(true);
  const [roleInfo, setRoleInfo] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(null);

  useEffect(() => {
    const getRole = async () => {
      if(page === 'alltask'){
        try {
          const response = await axios.post("http://localhost:8000/api/getrole/task", {
            workspace_id,
            task_id:data,
            withCredentials: true
          });
          setRoleInfo(response.data.role);
        } catch (error) {
          console.error("Error fetching role data:", error);
        } finally {
          setLoading(false);
        }
      }else{
        try {
          const response = await axios.post("http://localhost:8000/api/getrole", {
            workspace_id,
            withCredentials: true
          });
          setRoleInfo(response.data.role);
        } catch (error) {
          console.error("Error fetching role data:", error);
        } finally {
          setLoading(false);
        }
      };
    }

    if (workspace_id !== undefined) {
      getRole();
    }
  }, [workspace_id, loadingInfo]);

console.log('roleInforoleInfo',roleInfo)


  const handleDelete = async (items, index) => {
    try {
      console.log(items.role_id)
      await axios.delete("http://localhost:8000/api/deleterole", {
        data: { role_id: items.role_id }
      });
      setDeletingIndex(index);
      setTimeout(() => {
        setDeletingIndex(null);
        setLoadingInfo(p=>!p)
      }, 200);
      
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  }

console.log('data',data)


  const handleSelect = (items, index) => {
    if(page.page==='addtask'){
      const role = data.role;
      const roleIndex = role.findIndex((role) => role === items.role_id);
      if (roleIndex === -1) {
        role.push(items.role_id);
      } else {
        role.splice(roleIndex, 1);
      }
      setData({ ...data, role });
    }
  }

  const handleSytle = (items, index) => {
    if(page.page==='addtask'){
      const role = data.role;
      const roleIndex = role.findIndex((role) => role === items.role_id);
      if (roleIndex !== -1) {
        return { backgroundColor: items.color };
      }else{
        return { backgroundColor: '#e7e7e7' };
      }
    }else{
      return { backgroundColor: items.color };
    }
  }

  const handleStyleText = (items, index)=>{
    if(page.page==='addtask'){
      const role = data.role;
      const roleIndex = role.findIndex((role) => role === items.role_id);
      if (roleIndex !== -1) {
        return { color: getContrastColor(items.color) };
      }else{
        return { color: '#686868' };
      }
    }else{
      return { color: getContrastColor(items.color) };
    }
  }
  return (
    <>
      {loading ? (
        <div 
        style={{height: page==='alltask'?20:50}}
        className="bg-loading">
          <DotLoader
            color="#2960cd"
            loading={loading}
            size={page==='alltask'?20:50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        roleInfo.length > 0 ? (
          roleInfo.map((items, index) => (
            <div
              onClick={()=>handleSelect(items, index)}
              className={page === 'alltask'?'rolemini':`role ${deletingIndex === index ? 'scale-down' : ''}`}
              key={index}
              style={handleSytle(items, index)}
            >
              <span style={handleStyleText(items, index)}>
                {items.role_name}
              </span>
              {page === 'roleEdit' && <div onClick={()=>handleDelete(items, index)} className="del-role"><Icon icon="zondicons:close-solid" /></div>}
            </div>
          ))
        ) : (
          <div className="no-roles">{page === 'alltask'?"No Role":"Your workspace has no role."}</div>
        )
      )}
    </>
  );
}

export default Role;
