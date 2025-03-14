import { useState } from "react";

import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import BillComponent from "./components/BillComponent";

function App() {
  return (
    <div className="h-screen lg:w-full lg:flex lg:flex-col">
      <div className="">
        <HeaderComponent />
      </div>
      <div className="w-full h-[100%] lg:m-auto lg:h-[65%] lg:w-[70%] flex justify-center mt-5 bg-white rounded-t-2xl lg:rounded-2xl overflow-y-auto ">
        <BillComponent />
      </div>
    </div>
  );
}

export default App;
