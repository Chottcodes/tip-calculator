import React, { useEffect, useState } from "react";
import ButtonComponents from "./ButtonComponents";

const BillComponent = () => {
  const [isThereANum, setIsThereANum] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [activeButton, setactiveButton] = useState(null);
  const [billTotal, setBillTotal] = useState("");
  const [customeTip, setCustomeTip] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [tipAmountPerPerson, setTipAmountPerPerson] = useState("$0.00");
  const [totalTipAmount, setTotalTipAmount] = useState("$0.00");

  const ResetFunction = () => {
    setBillTotal("");
    setCustomeTip("");
    setNumberOfPeople("");
    setTipAmountPerPerson("$0.00");
    setTotalTipAmount("$0.00");
    setIsThereANum(false);
    setIsDisabled(true);
    setactiveButton(null)
  };

  const tipAmount = (percent, total, numberofPeople) => {
    const validTotal = Number(total);
    const validNumberOfPeople = Number(numberofPeople);
    inputValidationFunction(percent, validTotal, validNumberOfPeople);
    setIsDisabled(false);
    const tipAmount = ((percent / 100) * validTotal) / validNumberOfPeople;
    return formatAsDollers(tipAmount);
  };

  const total = (percent, totalBill, numberofPeople) => {
    const validTotal = Number(totalBill);
    const validNumberOfPeople = Number(numberofPeople);
    inputValidationFunction(percent, validTotal, validNumberOfPeople);
    setIsDisabled(false);
    const totalWithTip = (percent / 100) * validTotal + validTotal;
    const totalPerPerson = totalWithTip / validNumberOfPeople;
    return formatAsDollers(totalPerPerson);
  };


  const inputValidationFunction = (
    percent,
    validTotal,
    validNumberOfPeople
  ) => {
    if (percent < 0 || isNaN(validTotal) || validTotal <= 0 || isNaN(validNumberOfPeople) || validNumberOfPeople <= 0) {
      setIsThereANum(true);
      setIsDisabled(false);
      return "$0.00";
    }
    setIsThereANum(false);
    return null;
  };
  
  const handleCustumePercent = (event) => {
    let input = event.target.value;
    setCustomeTip(input);
  };

  const formatAsDollers = (toConvert) => {
    let usDoller = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return usDoller.format(toConvert);
  };
  const displayAmounts = (percent, totalBill, numberofPeople,buttonsId) => {
    setTipAmountPerPerson(tipAmount(percent, totalBill, numberofPeople));
    setTotalTipAmount(total(percent, totalBill, numberofPeople));
    setactiveButton(buttonsId)
  };
  useEffect(() => {
    if (customeTip && numberOfPeople) {
      setIsDisabled(false);
      displayAmounts(customeTip, billTotal, numberOfPeople);
    } else if (customeTip || numberOfPeople === "") {  
      setactiveButton(null);
    }
  
   
    if (numberOfPeople !== "") {
      setIsThereANum(false);
      setactiveButton(null);
    }
  }, [customeTip, numberOfPeople]);

  return (
    <div className="w-[90%] h-[75%] lg:h-[95%] transition-all duration-300  lg:w-[95%] lg:flex lg:items-center lg:justify-center lg:gap-5">
      <div className="h-[90%] lg:w-[50%] lg:h-full">
        <div className="w-full h-[20%] lg:h-[22%] flex flex-col ">
          <p className="pt-5 pb-2 text-2xl lg:text-lg text-[#00494d]">Bill</p>
          <div className="w-full h-[50%] flex items-center rounded-lg relative">
            <img
              className="h-5 pl-3 absolute left-2"
              src="/assets/icon-dollar.svg"
              alt="dollar"
            />
            <input
              type="number"
              placeholder="0"
              value={billTotal}
              onChange={(event) => setBillTotal(event.target.value)}
              className="w-full h-full rounded-lg bg-[#eefdfe] lg:focus:border-2 lg:focus:border-[#26c0ab] lg:focus:outline-none text-right p-3 text-[24px] text-[#00494d]"
            />
          </div>
        </div>
        <div className="w-full h-[55%]">
          <p className="text-xl text-[#00494d] lg:text-lg pt-4 pb-4">
            Select Tip %
          </p>
          <div className=" h-[80%] lg:h-[60%]  gap-4 w-full overflow-hidden grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            <ButtonComponents
              isActive={activeButton === '5%'}
              clickFunction={() => displayAmounts(5, billTotal, numberOfPeople,'5%')}
              number="5%"
            />
            <ButtonComponents
              isActive={activeButton === '10%'}
              clickFunction={() =>
                displayAmounts(10, billTotal, numberOfPeople,'10%')
              }
              number="10%"
            />
            <ButtonComponents
            isActive={activeButton === '15%'}
              clickFunction={() =>
                displayAmounts(15, billTotal, numberOfPeople,'15%')
              }
              number="15%"
            />
            <ButtonComponents
            isActive={activeButton === '25%'}
              clickFunction={() =>
                displayAmounts(25, billTotal, numberOfPeople,'25%')
              }
              number="25%"
            />
            <ButtonComponents
            isActive={activeButton === '50%'}
              clickFunction={() =>
                displayAmounts(50, billTotal, numberOfPeople,'50%')
              }
              number="50%"
            />
            <input
              className=" text-[24px] w-full h-[100%] rounded-2xl lg:rounded-md text-[#00494d] bg-[#eefdfe] lg:border-2 lg:focus:border-[#26c0ab] lg:focus:outline-none text-right pr-5 placeholder:text-center placeholder:lg:p-5 placeholder:lg:text-2xl placeholder:text-[#00494d]"
              type="number"
              placeholder="Custome"
              value={customeTip}
              onChange={handleCustumePercent}
            />
          </div>
        </div>
        <div className="w-full h-[15%] mt-3 md:mt-7 lg:mt-0">
          <div className="w-full flex justify-between">
            <p className="text-xl text-[#00494d] pb-4">Number of People</p>
            <p
              className={`${
                isThereANum ? "text-red-600 block text-xl" : "hidden"
              } pb-4`}
            >
              Can't be Zero
            </p>
          </div>
          <div className="w-full h-[60%] relative flex items-center  rounded-lg">
            <img
              className="absolute h-5 left-2"
              src="/assets/icon-person.svg"
              alt="person Icon"
            />
            <input
              className={`${
                isThereANum ? "border-2 border-red-400 " : "border-none"
              } h-full w-full text-right p-3 text-[24px] bg-[#eefdfe] text-[#00494d] rounded-lg`}
              type="number"
              placeholder="0"
              value={numberOfPeople}
              onChange={(event) => setNumberOfPeople(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="h-[60%] lg:w-[50%] lg:h-full">
        <div className="h-[100%] mt-2 md:mt-0">
          <div className="h-[90%] md:h-[95%] rounded-xl w-full mt-5 bg-[#00494d] flex flex-col items-center lg:justify-center">
            <div className="w-[90%] md:h-[30%] flex mt-4 md:mt-5">
              <div className="w-[50%] flex flex-col justify-center">
                <p className="text-xl md:text-2xl text-[#f4fafa]">Tip Amount</p>
                <p className="text-lg md:text-xl text-[#77a5a7]">/ person</p>
              </div>
              <div className="w-[50%] flex items-center justify-center">
                <h1 className="text-[30px] md:text-3xl text-[#26c0ab]">
                  {tipAmountPerPerson}
                </h1>
              </div>
            </div>
            <div className=" w-[90%] md:h-[30%]  flex mt-7 md:mt-0">
              <div className="w-[50%] flex flex-col justify-center ">
                <p className="text-xl text-[#f4fafa] md:text-2xl">Total</p>
                <p className="text-lg text-[#77a5a7] md:text-xl">/ person</p>
              </div>
              <div className="w-[50%] flex items-center justify-center">
                <h1 className="text-[#26c0ab] text-[30px] md:text-3xl">
                  {totalTipAmount}
                </h1>
              </div>
            </div>
            <div
              className={`w-[90%] h-[25%] lg:h-[15%] rounded-lg ${
                isDisabled
                  ? " bg-[#5e7a7d] text-[#184b51]"
                  : "bg-[#26c0ab] hover:bg-[#abeee5]"
              } mt-5`}
            >
              <button
                onClick={ResetFunction}
                disabled={isDisabled}
                className="w-full h-full rounded text-2xl "
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillComponent;
