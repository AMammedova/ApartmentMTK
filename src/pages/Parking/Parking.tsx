import React, { Fragment, useEffect, useState } from "react";
import Tables, { IHeaders } from "../../components/Table/CompaniesTable";
import SearchInput from "../../components/SearchInput";
import Filter from "../../components/Filter";
import OrderDate from "../../components/OrderDate";
import AddBtn from "../../components/AddBtn";
import useSWR from "swr";
import { Link, useNavigate } from "react-router-dom";
import { GetAll } from "../../api";



const Parking = () => {
    const nav = useNavigate();
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [process, setProcess] = useState("");
  const [companyId, setCompanyId] = useState<number>(0);
  const [selectedRow, setSelectedRow] = useState(null);

  const closeModal = (): void => {
    setIsOpen(false);
  };

  console.log(selectedRow, "selectedRow");

  const openModal = (): void => {
    setIsOpen(true);
  };

  const { data, error, isLoading ,mutate} = useSWR(
    "/api/AdminParking/GetAll/GetParkingCart",
    (key) => GetAll.user(key),
    { revalidateIfStale: true }
  );
 console.log(data?.data?.objectNames,"data?.data?.objectNames");
 const handleCard = ({ id }: any) => {{nav(`/settings/parking/${id}`)}};
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        {
            data?.data.map((item:any)=>(
                <div key={item.id} className="w-full p-4 shadow-md lg:max-w-lg cursor-pointer"  onClick={() => handleCard({ id: item.id })}>
                <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">
                        {item.name}
                    </h3>
                    {item?.objectNames.map((objectName:any,id:any)=>(
                        <p key={id} className="text-gray-600">
                            {objectName}
                        </p>
                    ))}
                  
                </div>
            </div>
            ))
        }
    
      </div>
    </Fragment>
  );
};

export default Parking;
