import React, { useReducer, useState } from "react";
import {
  CreateTransport,
  Delete,
  GetAll,
  GetbyId,
  UpdateTransport,
} from "../../api";
import useSWR, { KeyedMutator } from "swr";
import { useParams } from "react-router-dom";
import ObjectsModal from "../../components/Modals/ObjectsModal";
import Tables from "../../components/Table/TransportTable";
import Transport from "../Transport";
import {
  PencilIcon,
  PlusCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import useGetResponse from "../../hooks/useGetResponse";
import useSWRMutation from "swr/mutation";
import Tabs, { ITabs } from "../../components/Tabs";
type Props = {};

export interface IEmployeesArgs {
  image: string;
  name: string;
  surname: string;
  patrionimyc: string;
  hasCompany: boolean;
  jobPosition: string;
  objectNames: string[];
  buildingNames: any[];
  roleName: string;
  voen: string;
  email: string;
  phoneNumber: string;
}

export interface ITransportArgs {
  id: string;
  brand: string;
  serialNumber: string;
  color: string;
}

const EmployeesDetail = (props: Props) => {
  const [tabs] = useState<ITabs[]>([
    {
      id: 1,
      name: "EmployeesDetail",
      component: <EmployeeTab />,
    },
    { id: 2, name: "Transport", component: <TransportTab /> },
  ]);

  return <Tabs tabs={tabs} />;
};

const TransportTab = () => {
  const { employeesId } = useParams();

  const {
    trigger,
    data: updateTransportData,
    error: updatetransportError,
    isMutating,
  } = useSWRMutation("/api/Transport/Create", CreateTransport.user);
  const formik = useFormik({
    initialValues: { id: 0, brand: "", color: "", serialNumber: "" },
    onSubmit: ({ id: EmployeeOrUserId, ...arg }) => {
      trigger({
        EmployeeOrUserId: employeesId,
        ...arg,
      });
      mutate();
      setAddTransport(false);
    },
  });

  const {
    data: transportData,
    isLoading: transportIsLoading,
    error: transportError,
    mutate,
  } = useSWR<{ data: ITransportArgs[] }>(
    employeesId ? `api/Transport/GetByEmployeeOrUserId/${employeesId}` : null,
    GetAll.user,
    { revalidateIfStale: true }
  );

  const [addTransport, setAddTransport] = useState(false);

  const handleAddTransport = () => setAddTransport(!addTransport);
  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center">
        <h2 className="flex-1 text-2xl font-bold text-center">Transport</h2>
        <span className="cursor-pointer" onClick={handleAddTransport}>
          <PlusCircleIcon className="absolute right-0 w-8 h-8 -translate-y-1/2 top-1/2" />
        </span>
      </div>
      {addTransport && (
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-3 gap-4 p-4 mt-4 ml-2 mr-4 bg-white border border-dashed rounded shadow place-items-center border-primary"
        >
          <input
            id="brand"
            name="brand"
            type="text"
            placeholder="Brand"
            onChange={formik.handleChange}
            value={formik.values.brand}
            className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
          ></input>
          <input
            id="color"
            name="color"
            type="text"
            placeholder="Color"
            onChange={formik.handleChange}
            value={formik.values.color}
            className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
          ></input>
          <input
            id="serialNumber"
            name="serialNumber"
            type="text"
            placeholder="Serial Number"
            onChange={formik.handleChange}
            value={formik.values.serialNumber}
            className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
          ></input>
          <button
            type="submit"
            className="w-full col-span-1 col-start-2 px-10 py-1 font-semibold text-white rounded bg-primary"
          >
            Save
          </button>
        </form>
      )}
      {transportIsLoading ? (
        <div className="grid grid-cols-3 gap-4 p-4 mt-4 bg-white border border-dashed rounded shadow place-items-center border-primary">
          <h3 className="w-full h-8 text-xl font-semibold text-dark animate-pulse bg-slate-200"></h3>
          <p className="w-full h-8 font-semibold text text-dark animate-pulse bg-slate-200"></p>
          <p className="w-full h-8 font-semibold text-icon animate-pulse bg-slate-200"></p>
        </div>
      ) : transportError ? (
        <div>error</div>
      ) : transportData?.data === null ? (
        <div className="flex justify-center w-full pt-40 text-lg font-medium text-center ">
          <p className="border w-fit px-4 py-1.5 rounded bg-primary text-white">
            Transport Not Found
          </p>
        </div>
      ) : (
        <TransportCard data={transportData} mutate={mutate} />
      )}
    </div>
  );
};

export const TransportCard = ({
  data,
  mutate,
}: {
  data: { data: ITransportArgs[] } | undefined;
  mutate: KeyedMutator<{
    data: ITransportArgs[];
  }>;
}) => {
  return (
    <div className="grid max-h-[800px] gap-4 py-4 px-2 overflow-auto">
      {data?.data?.map((item) => (
        <TransportItem key={item?.id} mutate={mutate} {...item} />
      ))}
    </div>
  );
};

export const TransportItem = ({
  id,
  brand,
  color,
  serialNumber,
  mutate,
}: ITransportArgs & {
  mutate: KeyedMutator<{
    data: ITransportArgs[];
  }>;
}) => {
  const { employeesId } = useParams();

  const {
    trigger,
    data: updateTransportData,
    error: updatetransportError,
    isMutating,
  } = useSWRMutation("/api/Transport/Update", UpdateTransport.user);

  const formik = useFormik({
    initialValues: {
      id: id,
      brand: brand,
      color: color,
      serialNumber: serialNumber,
    },
    onSubmit: ({ id, ...arg }) => {
      trigger({ id: id, ...arg });
      mutate();
      setEdit(false);
    },
  });

  const { data: deleteTransportData, trigger: deleteTransportTrigger } =
    useSWRMutation(`api/Transport/Delete/${id}`, Delete.user);

  const [isEdit, setEdit] = useState(false);
  const handleEdit = () => setEdit(!isEdit);
  return (
    <form
      key={id}
      onSubmit={formik.handleSubmit}
      className="relative grid grid-cols-3 gap-4 p-4 bg-white border border-dashed rounded shadow place-items-center border-primary"
    >
      {isEdit ? (
        <>
          <input
            id="brand"
            name="brand"
            type="text"
            placeholder="Brand"
            onChange={formik.handleChange}
            value={formik.values.brand || brand}
            required
            className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
          ></input>
          <input
            id="color"
            name="color"
            type="text"
            placeholder="Color"
            onChange={formik.handleChange}
            value={formik.values.color || color}
            className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
            required
          ></input>
          <input
            id="serialNumber"
            name="serialNumber"
            type="text"
            placeholder="Serial Number"
            onChange={formik.handleChange}
            value={formik.values.serialNumber || serialNumber}
            className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
            required
          ></input>
          <button
            type="button"
            onClick={() => {
              deleteTransportTrigger({ deleteId: employeesId });
              setEdit(false);
            }}
            className="w-full col-span-1 col-start-1 px-10 py-1 font-semibold text-white bg-red-500 rounded"
          >
            Delete
          </button>
          <button
            type="submit"
            className="w-full col-span-1 px-10 py-1 font-semibold text-white rounded bg-primary"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-dark">{brand}</h3>
          <p className="font-semibold text text-dark">{color}</p>
          <p className="font-semibold text-icon">{serialNumber}</p>
        </>
      )}
      <p
        onClick={handleEdit}
        className={`absolute flex items-center justify-center w-6 h-6 rounded cursor-pointer right-4 ${
          isEdit && "bottom-4"
        } bg-slate-200`}
      >
        {isEdit ? (
          <XMarkIcon className="w-4 h-4" />
        ) : (
          <PencilIcon className="w-4 h-4" />
        )}
      </p>
    </form>
  );
};

const EmployeeTab = () => {
  const { employeesId } = useParams();

  let { data, error, isLoading } = useSWR<{ data: IEmployeesArgs }>(
    `/api/Employees/GetDetail/${employeesId}`,
    GetAll.user
  );

  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [process, setProcess] = useState("");
  const closeModal = (): void => {
    setIsOpen(false);
  };
  const openModal = (): void => {
    setIsOpen(true);
  };

  if (isLoading) <div>Loading...</div>;
  if (error) <div>error</div>;

  const employeesData = data?.data as IEmployeesArgs;

  return (
    <div className="w-full">
      <div className="h-[400px] flex items-center justify-between p-5 bg-white">
        <div className="w-full">
          <div className="object-cover w-16 h-16 rounded-full">
            <img
              loading="lazy"
              src={employeesData?.image}
              alt={employeesData?.name}
            />
          </div>
          <div className="font-bold font-inter text-[26px] leading-30 text-dark">
            {employeesData?.name} {employeesData?.surname}
          </div>
          <div className="font-inter text-[22px] leading-30 mt-5 text-dark">
            {employeesData?.roleName}
          </div>
          <div className="font-inter  text-[20px] leading-30 mt-3 text-dark">
            {employeesData?.jobPosition}
          </div>
          <div className="w-full mt-10">
            <p className="font-inter leading-30 text-dark">Tel:</p>
            <p className="font-inter text-16 leading-30 text-[#7E92A2] ">
              {employeesData?.phoneNumber}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
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
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="w-1/2">
              <p className="font-inter font-semibold text-[14px] leading-30 text-[#7E92A2]">
                Patrionimyc
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {employeesData?.patrionimyc}
              </p>
            </div>

            <div className="w-1/2">
              <p className="font-inter font-semibold text-[14px] leading-30 text-[#7E92A2]">
                Voen
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {employeesData?.voen}
              </p>
            </div>

            <div className="w-1/2">
              <p className="font-inter font-semibold text-[14px] leading-30 text-[#7E92A2]">
                Email
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {employeesData?.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-1/2">
              <p className="font-inter font-semibold text-[14px] leading-30 text-[#7E92A2]">
                Obyekt Adlari
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {employeesData?.objectNames}
              </p>
            </div>

            <div className="w-1/2">
              <p className="font-inter font-semibold text-[14px] leading-30 text-[#7E92A2]">
                Tikili Adlari
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {employeesData?.buildingNames || "-"}
              </p>
            </div>

            <div className="w-1/2">
              <p className="font-inter font-semibold text-[14px] leading-30 text-[#7E92A2]">
                Has Company
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {employeesData?.hasCompany}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesDetail;
