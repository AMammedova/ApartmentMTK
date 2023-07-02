import React,{useState} from "react";
import {GetbyId} from "../../api";
import useSWR from 'swr'
import { useParams } from "react-router-dom";
import ObjectsModal from "../../components/Modals/ObjectsModal";
type Props = {};

const ObjectDetail = (props: Props) => {
  const { objectId } = useParams()
  const { data, error, isLoading } = useSWR(`/api/VendorObjects/GetById?id=${objectId}`,GetbyId.user)
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [process, setProcess] = useState("");
  const closeModal = (): void => {
    setIsOpen(false);
  };
  const openModal = (): void => {
    setIsOpen(true);
  };
  return (
    <React.Fragment>
    
      <div className="w-1/2 h-[400px] flex items-center justify-between p-5 bg-white">
        <div className="w-1/2">
          <div className="font-bold font-inter text-[26px] leading-30 text-dark">
            {data?.data?.vendorName}
          </div>
          <div className="font-inter text-[22px] leading-30 mt-5 text-dark">
            {data?.data?.regionName}
          </div>
          <div className="font-inter  text-[20px] leading-30 mt-3 text-dark">
            {data?.data?.address}
          </div>
          <div className="w-full mt-10">
              <p className="font-inter text-[20px] leading-30 text-dark">
               Title
              </p>
              <p className="font-inter text-16 leading-30 text-[#7E92A2] ">
              {data?.data?.title}
              </p>
            </div>
        </div>
        <div className="w-1/6 flex items-center justify-between">
          <div className="w-[50px] h-[50px] border-[1px] border-slate-300 rounded-full flex items-center justify-center">
            <img
              src="/icons/edit.svg"
              alt=""
              className="rounded-full w-[50px] h-[30px] p-1 cursor-pointer"
              onClick={() => {
                openModal();
                setProcess("Edit");
        
              }}
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
      
     
     
     
    </React.Fragment>
  );
};

export default ObjectDetail;
