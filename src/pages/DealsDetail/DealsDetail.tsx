import React from "react";
import {GetbyId} from "../../api";
import useSWR from 'swr'
import { useParams } from "react-router-dom";
type Props = {};

const DealsDetail = (props: Props) => {
  const { dealId } = useParams()
  const { data, error, isLoading } = useSWR(`/api/OrderAdmin/GetById?Id=${dealId}`,GetbyId.user)
  console.log(data,"data")
  const handleDetail = async () => {
    
  }

  return (
    <React.Fragment>
      <div className="w-1/2 h-[150px] flex items-center justify-between p-5  bg-slate-100 ">
        <div className="w-1/4 flex  items-center justify-between">
          <div className="w-[60px] h-[60px] rounded-full bg-white flex items-end justify-end"></div>{" "}
          <div className="flex-col items-start justify-start">
            <div className="font-inter text-[14px] leading-30 text-dark">
              User
            </div>
            <div className="font-bold font-inter text-16 leading-30 text-dark">
              Rustam Azizov
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          {" "}
          <div className="font-inter text-[14px] leading-30 text-dark">
            Email
          </div>
          <div className="font-bold font-inter text-16 leading-30 text-dark">
            rustam@gmail.com
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          {" "}
          <div className="font-inter text-[14px] leading-30 text-dark">
            Phone Number
          </div>
          <div className="font-bold font-inter text-16 leading-30 text-dark">
            {data?.data?.phoneNumber}
          </div>
        </div>
      </div>

      <div className="w-1/2 h-[200px] flex items-center justify-between p-5 bg-white">
        <div className="w-1/3">
          <div className="font-bold font-inter text-[26px] leading-30 text-dark">
            {data?.data?.orderType.name}
          </div>
          <div className="font-inter text-[20px] leading-30 mt-5 text-dark">
            Menzil,23
          </div>
        </div>
        <div className="w-1/6 flex items-center justify-between">
          <div className="w-[50px] h-[50px] border-[1px] border-slate-300 rounded-full flex items-center justify-center">
            <img
              src="/icons/edit.svg"
              alt=""
              className="rounded-full w-[50px] h-[30px] p-1 cursor-pointer"
            />
          </div>
          <div className="w-[50px] h-[50px] border-[1px] border-slate-300 rounded-full flex items-center justify-center">
            <img
              src="/icons/trashicon.svg"
              alt=""
              className="rounded-full w-[30px] h-[30px] p-1 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-between">
        <div className="w-2/3 h-[300px] pr-10 ">
          {" "}
          <div className=" w-full flex items-center flex-row justify-between mt-5 p-5">
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Status
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                Icrada
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Tarix
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
              {new Date(data?.data.normativeDeadline)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  .split("/")
                  .reverse()
                  .join("-")}
              </p>
            </div>
          </div>
          <div className=" w-full flex items-center flex-row justify-between mt-5 p-5 font-bold font-inter text-16 leading-30 text-dark">
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Tip
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                Usta
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Icraci
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                Nihad
              </p>
            </div>
          </div>
          <div className=" w-full flex items-center flex-row justify-between mt-5 p-5 font-bold font-inter text-16 leading-30 text-dark">
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Qiymet
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                10
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Sakin Evde
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                Deyil
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/3 h-[300px] bg-slate-100 rounded-xl"></div>
      </div>
      <div className="w-1/2 mt-10 px-5">
        <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">Detallar</p>
        <p className="font-inter text-16 leading-30 text-dark">
      {data?.data.description}
        </p>
      </div>
    </React.Fragment>
  );
};

export default DealsDetail;
