import React, { Fragment, useEffect, useState } from "react";
import Tables, { IHeaders } from "../../components/Table/CompaniesTable";
import SearchInput from "../../components/SearchInput";
import Filter from "../../components/Filter";
import OrderDate from "../../components/OrderDate";
import AddBtn from "../../components/AddBtn";
import useSWR from "swr";
import { GetAll } from "../../api";
import CompaniesModal from "../../components/Modals/CompaniesModal";

const Companies = () => {
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

  const { data, error, isLoading, mutate } = useSWR(
    "/api/VendorCompany/GetAllByVendorId",
    (key) => GetAll.user(key),
    { revalidateIfStale: true }
  );

  const headers: IHeaders[] = [
    {
      id: 1,
      isAvatar: true,
      icon: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.51 4.35L11.57 0.92C10.6 0.36 9.40004 0.36 8.42004 0.92L2.49004 4.35C1.52004 4.91 0.920044 5.95 0.920044 7.08V13.92C0.920044 15.04 1.52004 16.08 2.49004 16.65L8.43004 20.08C9.40004 20.64 10.6 20.64 11.58 20.08L17.52 16.65C18.49 16.09 19.09 15.05 19.09 13.92V7.08C19.08 5.95 18.48 4.92 17.51 4.35ZM10 5.84C11.29 5.84 12.33 6.88 12.33 8.17C12.33 9.46 11.29 10.5 10 10.5C8.71004 10.5 7.67004 9.46 7.67004 8.17C7.67004 6.89 8.71004 5.84 10 5.84ZM12.68 15.16H7.32004C6.51004 15.16 6.04004 14.26 6.49004 13.59C7.17004 12.58 8.49004 11.9 10 11.9C11.51 11.9 12.83 12.58 13.51 13.59C13.96 14.25 13.48 15.16 12.68 15.16Z"
            fill="#7E92A2"
          />
        </svg>
      ),
    },

    {
      id: 2,
      title: "Company Name",
    },
    {
      id: 3,
      title: "Director Name",
    },
    {
      id: 4,
      title: "Director Surname",
    },
    {
      id: 5,
      title: "Director Father Name",
    },
    {
      id: 6,
      title: "Phonenumber",
    },
    {
      id: 7,
      title: "Email",
    },
    {
      id: 8,
      title: "Object Name",
    },
    {
      id: 9,
      title: "Vendor Name",
    },
    {
      id: 10,
      title: "Voen",
    },

    {
      id: 11,
      title: "Vin",
    },
    {
      id: 12,
      title: "Edit",
    },
  ];

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <p className="font-bold font-inter text-16 leading-30 text-dark">
          Ümumi: {data?.data?.length} Companies
        </p>{" "}
        <div className="flex items-center gap-4">
          <AddBtn
            openModal={openModal}
            setProcess={setProcess}
            modal={
              <CompaniesModal
                mutate={mutate}
                isOpen={isOpen}
                closeModal={closeModal}
                process={process}
                deleteId={companyId}
                selectedRow={selectedRow}
              />
            }
          />

          <OrderDate />

          <Filter />
        </div>
      </div>
      <Tables
        openModal={openModal}
        modal={
          <CompaniesModal
            mutate={mutate}
            isOpen={isOpen}
            closeModal={closeModal}
            process={process}
            deleteId={companyId}
            selectedRow={selectedRow}
          />
        }
        headers={headers}
        data={data}
        setProcess={setProcess}
        setCompanyId={setCompanyId}
        setSelectedRow={setSelectedRow}
      />
    </Fragment>
  );
};

export default Companies;
