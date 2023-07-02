import React from 'react'
import {GetbyId} from "../../api";
import useSWR from 'swr'
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import Zona from '../../components/Zona';
type Props = {}

const ParkingDetail = (props: Props) => {
    const { parkingId } = useParams()
    
  const { data, error, isLoading } = useSWR(
    `/api/AdminParking/GetById/GetParkingCartById/${parkingId}`,
    GetbyId.user
  );
  console.log(data,"data")
  return (
    <React.Fragment>
    <Tab.Group>
      <Tab.List className=" w-1/2 flex justify-between space-x-1 rounded-xl p-1 mb-5">
      <Tab className={({selected})=>(
  "w-1/2 rounded-lg py-2.5 text-sm font-medium leading-5 text-primary ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2 " +
  (selected ? "bg-white shadow" : "text-blue-10")
)}>
Parking Detail
</Tab>
        <Tab className={({selected})=>(
  "w-1/2 rounded-lg py-2.5 text-sm font-medium leading-5 text-primary ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2 " +
  (selected ? "bg-white shadow" : "text-blue-10")
)}>
Zona
</Tab>
<Tab className={({selected})=>(
  "w-1/2 rounded-lg py-2.5 text-sm font-medium leading-5 text-primary ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2 " +
  (selected ? "bg-white shadow" : "text-blue-10")
)}>
Parking Places
</Tab>
       
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <div className="w-1/2 h-[200px] flex items-center justify-between p-5 bg-white">
            <div className="w-1/2">
              <div className="w-full mt-10">
                <p className="font-inter text-16 leading-30 text-[#7E92A2] ">
                  {data?.data?.name}
                  
                </p>
                <p className="font-inter text-16 leading-30 text-[#7E92A2] ">
                  {data?.data?.objectNames.map((item:any)=>(
                      <p key={item.id} className="font-inter text-16 leading-30 text-[#7E92A2] ">
                          {item}
                      </p>
                  ))}
                  
                </p>

              </div>
              
            </div>
         
          </div>

        
        </Tab.Panel>
        <Tab.Panel>
            <Zona parkingId={parkingId}/>
          
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  </React.Fragment>
  )
}

export default ParkingDetail