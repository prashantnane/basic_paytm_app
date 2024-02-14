import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const Send = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="flex flex-col justify-center h-full">
        <div className="w-96 bg-white shadow-lg rounded-lg border space-y-8 p-4 max-w-md text-card-foreground h-min">
          <div className="flex flex-col p-6 space-y-1.5">
            <h2 className="text-center font-bold text-3xl">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-full h-12 w-12 bg-green-200 justify-center flex mr-2 mt-1">
                <div className="justify-center flex-col flex h-full text-2xl">
                  {name[0]}
                </div>
              </div>
              <div className="justify-center flex flex-col h-full text-2xl font-semibold">
                {name}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label for="amount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Amount (in Rs)</label>
                <input onChange={(e) => {setAmount(e.target.value)}} className="flex h-10 w-full rounded-md border border-input bg-background text-sm px-3 py-2" type="number" placeholder="Enter Amount"></input>
              </div>
            </div>
            <button onClick={() => {
              axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white mt-5">Initiate Transfer</button>
          </div>
        </div>
      </div>
    </div>
  );
};
