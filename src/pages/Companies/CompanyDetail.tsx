import React, { useEffect, useState } from "react";
import {
  AddVendorRooms,
  CreateTransport,
  Delete,
  GetAll,
  IVendorRoomArgs,
  UpdateTransport,
} from "../../api";
import useSWR, { KeyedMutator } from "swr";
import { useParams } from "react-router-dom";
import Tabs, { ITabs } from "../../components/Tabs";
import {
  PencilIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ITransportArgs } from "../Employees/EmployeesDetail";
import { useFormik } from "formik";
import useSWRMutation from "swr/mutation";

type Props = {};

const CompanyDetail = (props: Props) => {
  const [tabs] = useState<ITabs[]>([
    {
      id: 1,
      name: "Company Detail",
      component: <TabOne />,
    },
    { id: 2, name: "Transport", component: <TransportTab /> },

    { id: 3, name: "Vendor Room", component: <></> },
  ]);

  return (
    <React.Fragment>
      <Tabs tabs={tabs} />
    </React.Fragment>
  );
};

export default CompanyDetail;

const TabOne = () => {
  const { companyId } = useParams();
  const { data, error, isLoading } = useSWR(
    `/api/VendorCompany/GetById?id=${companyId}`,
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

  console.log();

  return (
    <>
      <div className="w-1/2 h-[200px] flex items-center justify-between p-5 bg-white">
        <div className="w-1/2">
          <div className="w-full mt-10">
            <p className=" font-bold font-inter text-[26px] leading-30 text-dark uppercase">
              {data?.data?.companyName}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-1/6">
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

      <div className="flex items-center justify-between w-1/2">
        <div className="w-2/3 h-[300px] pr-10 ">
          {" "}
          <div className="flex flex-row items-center justify-between w-full p-5 mt-5 ">
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Director Name
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.directorName}
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Director Surname
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.directorSurname}{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full p-5 mt-5 font-bold font-inter text-16 leading-30 text-dark">
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Father Name
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.directorFatherName}
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Phone
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.phonenumber}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full p-5 mt-5 font-bold font-inter text-16 leading-30 text-dark">
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Email
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.email}
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Logo
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                <img src={data?.data.logo} alt={data?.data.name} />
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full p-5 mt-5 font-bold font-inter text-16 leading-30 text-dark">
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Building Name
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.buildingName}
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Company Name
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.companyName}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full p-5 mt-5 font-bold font-inter text-16 leading-30 text-dark">
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Voen
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.voen}
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                Vin
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.vin}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TransportTab = () => {
  const { companyId } = useParams();
  const [addTransport, setAddTransport] = useState(false);

  const {
    data: transportData,
    isLoading: transportIsLoading,
    error: transportError,
    mutate,
  } = useSWR<{ data: ITransportArgs[] }>(
    companyId ? `api/Transport/GetByCompanyId/${companyId}` : null,
    GetAll.user,
    { revalidateIfStale: true }
  );

  const { trigger } = useSWRMutation(
    `api/Transport/CreateForCompany`,
    CreateTransport.user
  );

  const formik = useFormik({
    initialValues: { id: 0, brand: "", color: "", serialNumber: "" },
    onSubmit: ({ id: CompanyId, ...arg }) => {
      setAddTransport(false);
      trigger({ vendorCompanyId: companyId, ...arg });
      mutate();
    },
  });

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
      ) : (
        <TransportCard data={transportData} mutate={mutate} />
      )}
    </div>
  );
};

const TransportCard = ({
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

const TransportItem = ({
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
  const { companyId } = useParams();

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
    useSWRMutation(`api/Transport/Delete`, Delete.user);

  const [isEdit, setEdit] = useState(false);
  const handleEdit = () => setEdit(!isEdit);

  useEffect(() => {
    console.log(deleteTransportData);
  }, []);
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
              deleteTransportTrigger({ deleteId: companyId });
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
{/**\}
const VendorRoomTab = () => {
  const { companyId } = useParams();
  const [addVendorRoom, setAddVendorRoom] = useState(false);

  const {
    data: VendorRoomData,
    isLoading: VendorRoomIsLoading,
    error: VendorRoomError,
    mutate,
  } = useSWR<{ data: IVendorRoomArgs[] }>(
    companyId ? `api/VendorRooms/GetById?id=${companyId}` : null,
    GetAll.user,
    { revalidateIfStale: true }
  );

  const { trigger } = useSWRMutation(
    `api/VendorRooms/Create`,
    AddVendorRooms.user
  );

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      regionId: 0,
      area: "",
      floor: "",
      vendorRoomTypeId: 0,
      isRentAviable: false,
      rentPrice: 0,
    },
    onSubmit: ({ id: CompanyId, ...arg }) => {
      setAddVendorRoom(false);
      trigger({
        vendorCompanyId: companyId,
        ...arg,
      });
      mutate();
    },
  });

  const handleAddVendorRoom = () => setAddVendorRoom(!addVendorRoom);

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center">
        <h2 className="flex-1 text-2xl font-bold text-center">VendorRoom</h2>
        <span className="cursor-pointer" onClick={handleAddVendorRoom}>
          <PlusCircleIcon className="absolute right-0 w-8 h-8 -translate-y-1/2 top-1/2" />
        </span>
      </div>
      {addVendorRoom && (
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-3 gap-4 p-4 mt-4 ml-2 mr-4 bg-white border border-dashed rounded shadow place-items-center border-primary"
        >
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
          ></input>
          <input
            id="area"
            name="area"
            type="text"
            placeholder="Area"
            onChange={formik.handleChange}
            value={formik.values.area}
            className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
          ></input>
          <input
            id="floor"
            name="floor"
            type="text"
            placeholder="Floor"
            onChange={formik.handleChange}
            value={formik.values.floor}
            className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
          ></input>

          <input
            id="floor"
            name="floor"
            type="text"
            placeholder="Floor"
            onChange={formik.handleChange}
            value={formik.values.floor}
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
      {VendorRoomIsLoading ? (
        <div className="grid grid-cols-3 gap-4 p-4 mt-4 bg-white border border-dashed rounded shadow place-items-center border-primary">
          <h3 className="w-full h-8 text-xl font-semibold text-dark animate-pulse bg-slate-200"></h3>
          <p className="w-full h-8 font-semibold text text-dark animate-pulse bg-slate-200"></p>
          <p className="w-full h-8 font-semibold text-icon animate-pulse bg-slate-200"></p>
        </div>
      ) : VendorRoomError ? (
        <div>error</div>
      ) : (
        <VendorRoomCard data={VendorRoomData} mutate={mutate} />
      )}
    </div>
  );
};

const VendorRoomCard = ({
  data,
  mutate,
}: {
  data: { data: IVendorRoomArgs[] } | undefined;
  mutate: KeyedMutator<{
    data: IVendorRoomArgs[];
  }>;
}) => {
  return (
    <div className="grid max-h-[800px] gap-4 py-4 px-2 overflow-auto">
      {data?.data?.map((item) => (
        <VendorRoomItem key={item?.id} mutate={mutate} {...item} />
      ))}
    </div>
  );
};

const VendorRoomItem = ({
  id,
  brand,
  color,
  serialNumber,
  mutate,
}: IVendorRoomArgs & {
  mutate: KeyedMutator<{
    data: IVendorRoomArgs[];
  }>;
}) => {
  const { companyId } = useParams();

  const {
    trigger,
    data: updateVendorRoomData,
    error: updateVendorRoomError,
    isMutating,
  } = useSWRMutation("/api/VendorRoom/Update", UpdateVendorRoom.user);

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

  const { data: deleteVendorRoomData, trigger: deleteVendorRoomTrigger } =
    useSWRMutation(`api/VendorRoom/Delete`, Delete.user);

  const [isEdit, setEdit] = useState(false);
  const handleEdit = () => setEdit(!isEdit);

  useEffect(() => {
    console.log(deleteVendorRoomData);
  }, []);
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
              deleteVendorRoomTrigger({ deleteId: companyId });
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
};*/}
