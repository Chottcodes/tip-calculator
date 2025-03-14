import React from "react";

const ButtonComponents = (props) => {
  return (
    <button
    className={`${props.isActive? "bg-[#26c0ab]":"bg-[#00494d]"} hover:bg-[#26c0ab] w-full h-[100%] rounded-2xl lg:rounded-md flex items-center justify-center text-2xl lg:text-xl text-[#f4fafa] `}
      onClick={props.clickFunction}
    >
      {props.number}
    </button>
  );
};

export default ButtonComponents;
