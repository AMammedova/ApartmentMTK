import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import SosModal from "../Modals/SosModal";
import { Link, useNavigate } from "react-router-dom";
import ApartmentsModal from "../Modals/ApartmentsModal";
export interface IHeaders {
  isStatus?: boolean;
  isAvatar?: boolean;
  title?: string;
  icon?: any;
  isAccess?: boolean;
  id: number;
}

type PropsType = {
  headers: IHeaders[];
  modal: JSX.Element;
  openModal: () => void;
  data: any;
  setProcess: React.Dispatch<React.SetStateAction<string>>;
  setCompanyId: React.Dispatch<React.SetStateAction<number>>;
  setSelectedRow: React.Dispatch<React.SetStateAction<any>>;
};

const Tables = ({
  headers,
  modal,
  openModal,
  data,
  setProcess,
  setCompanyId,
  setSelectedRow,
}: PropsType) => {
  const nav = useNavigate();

  function isValidDate(dateString: any) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  const handleTableRow = ({ id }: any) => nav(`/references/companies/${id}`);

  return (
    <div className="w-full mt-8 overflow-x-auto">
      <table className="table w-full table-auto">
        <thead>
          <tr>
            {headers.map(({ id, icon, isAccess, isAvatar, title }) => (
              <th
                key={id}
                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                {isAccess || isAvatar ? icon : title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item: any) => (
            <tr
              key={item.id}
              className="cursor-pointer  hover:bg-gray-200"
              onClick={() => handleTableRow({ id: item.id })}
            >
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex-shrink-0 w-10 h-10">
                  <img
                    className="rounded-full"
                    src="/icons/exclamation.svg"
                    alt=""
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-gray-900">
                    {item?.companyName}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-gray-900">
                    {item?.directorName}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item?.directorSurname}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                  {item?.directorFatherName}
                </div>
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item?.phonenumber}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item?.email}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item?.objectName}
              </td>{" "}
              
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item?.vendorName}
              </td>{" "}
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item?.voen}
              </td>{" "}
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item?.vin}
              </td>{" "}
             
              <td
                className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  onClick={() => {
                    openModal();
                    setProcess("Edit");
                    setCompanyId(item.id);
                    setSelectedRow(item);
                  }}
                  className="cursor-pointer"
                  src="/icons/edit.svg"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal}
    </div>
  );
};

export default Tables;
