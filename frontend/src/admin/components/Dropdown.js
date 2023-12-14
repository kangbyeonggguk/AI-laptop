import React, { useState } from "react";

import "./Dropdown.css";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const modelhandler = (id, model, screen_size) => {
    props.setInputList({
      ...props.inputlist,
      laptop_info_list_id: id,
      model: model,
      screen_size: screen_size,
    });
  };
  console.log(props.modellist);
  return (
    <div className="dropdown-container">
      <div className="dropdown-button" onClick={toggleDropdown}>
        <a>
          {props.inputlist.model} {props.inputlist.screen_size}
          {props.inputlist.screen_size && <span>인치</span>}
        </a>
        <a>▼</a>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {props.modellist.map((list, index) => (
            <li
              key={index}
              onClick={() => {
                modelhandler(list[0], list[1], list[2]);
                toggleDropdown();
              }}
            >
              {list[1]} {list[2]}인치
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
