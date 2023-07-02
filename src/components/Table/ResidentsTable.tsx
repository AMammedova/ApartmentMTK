
import { Link, useNavigate } from "react-router-dom";
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
  setSelectedRow: React.Dispatch<React.SetStateAction<any>>;
  setResidentId: React.Dispatch<React.SetStateAction<number>>;
};

const Tables = ({
  headers,
  modal,
  openModal,
  data,
  setProcess,
  setSelectedRow,
  setResidentId
}: PropsType) => {
  const nav = useNavigate();

   const handleTableRow = ({id}:any) => nav(`/references/residents/${id}`);

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
                    {item.name}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.surname}
              </td>
              
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.phonenumber}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.email}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.companyName}
              </td>
              <td
                className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  onClick={() => {
                    openModal();
                    setProcess("Edit");
                    setSelectedRow(
                      item
                    );
                    setResidentId(item.id);
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
