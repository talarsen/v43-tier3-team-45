import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import "../App.css";
// import TeamProjects from "./TeamProjects";
import { useDispatch, useSelector } from "react-redux";
import TeamProjects from "./TeamProjects";
import { BsSearch } from "react-icons/bs";
import { GrProjects } from "react-icons/gr";
import { createProject } from "../store/projectReducer";

function SideNavBar({ sidebarOpen }) {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();

  const selectedTeam = useSelector((state) => state.team.currentTeam);
  const selectedTeamProjects = useSelector((state) => {
    if (selectedTeam !== null) {
      return state.team.currentTeam.projects;
    } else {
      return null;
    }
  });
  let teamProjectArray;
  if (selectedTeam !== null) {
    teamProjectArray = selectedTeamProjects.map((project, index) => (
      <div key={index}>
        <TeamProjects
          project={project}
          index={index}
          key={index}
          sidebarOpen={sidebarOpen}
        />
      </div>
    ));
  }

  const handleClick = (e) => {
    e.preventDefault();
    const project = {
      name: "new project",
      issues: [],
    };
    dispatch(createProject(project));
  };

  return (
    <>
      <div
        className={`flex items-center rounded-md bg-light-white my-4 ${
          !sidebarOpen ? "px-2.5" : "px-4"
        } py-2`}
      >
        <BsSearch
          className={`text-white text-lg block float-left cursor-pointer ${
            sidebarOpen && "mr-2"
          }`}
        />
        <input
          type={"search"}
          placeholder="Search"
          className={`text-base bg-transparent w-full text-white focus:outline-none ${
            !sidebarOpen && "hidden"
          }`}
        />
      </div>
      <ul
        className={`origin-left font-medium text-lg duration-400 ${
          !sidebarOpen && "scale-0"
        }`}
      >
        {selectedTeamProjects && teamProjectArray}
      </ul>
      <button
        className={`origin-left font-medium text-lg duration-400 ${
          !sidebarOpen && "scale-0"
        }`}
        onClick={(e) => handleClick(e)}
      >
        <p>Create new Project</p>
      </button>
    </>
  );
}

export default SideNavBar;
