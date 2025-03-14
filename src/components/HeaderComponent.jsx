import React from "react";

function HeaderComponent() {
  return (
    <div className="w-[50%] m-auto flex flex-col text-2xl tracking-[10px] text-[#00494d] pb-6 pt-10">
      <div className="w-full flex justify-center">
        <img src="/assets/logo.svg" alt="logo" />
      </div>
    </div>
  );
}

export default HeaderComponent;
