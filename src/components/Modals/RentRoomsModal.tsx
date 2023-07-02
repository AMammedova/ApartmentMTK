import React,{useState} from "react";
import { Dialog, Transition } from "@headlessui/react";

import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { GetAll } from "../../api";
import { Formik, Field, Form } from "formik";
import useSWR, { mutate } from "swr";
import { Delete } from "../../api";
import { AddRentRooms } from "../../api";
import { EditRentRoom } from "../../api";
import useGetResponse from "../../hooks/useGetResponse";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  process: string;
  deleteId: number;
  selectedRow: any;
  mutate: any;
  vendorRoomId: any;
};
type Values = {
  startDate: string;
  endDate: string;
  description: string;
  companyTenantId: string;
  name: string;
};

const RentRoomsModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
  vendorRoomId,
}) => {

  const {
    data: dataCompany,
    error: errorCompany,
    isLoading: isLoadingCompany,
  } = useSWR("/api/VendorCompany/GetAllByVendorId", (key) => GetAll.user(key));

  const handleSubmit = async (values: Values) => {
    console.log(values, "values");

    const parsedValues = {
      ...values,
      startDate: new Date(values.startDate)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .reverse()
        .join("-"),
      endDate: new Date(values.endDate)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .reverse()
        .join("-"),
      companyTenantId: parseInt(values.companyTenantId),
      vendorRoomId: parseInt(vendorRoomId),
    };
    const res = await useGetResponse(
      AddRentRooms.user("/api/RentRooms/Create", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
  };
  const handleEdit = async (values: Values) => {
    const parsedValues = {
      ...values,
      startDate: new Date(values.startDate)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .reverse()
        .join("-"),
      endDate: new Date(values.endDate)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .reverse()
        .join("-"),
      companyTenantId: parseInt(values.companyTenantId),
      vendorRoomId: parseInt(vendorRoomId),
      id: selectedRow.id,
    };
    const res = await useGetResponse(
      EditRentRoom.user("/api/RentRooms/Update", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
  };
  const deleteObject = async (deleteId: any) => {
    const res = await useGetResponse(
      Delete.user("/api/RentRooms/Delete", {
        arg: { deleteId },
      }),
      mutate,
      closeModal
    );

    alert(res);
  };

  const handleDelete = () => {
    deleteObject(deleteId);
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {process === "Add" ? (
                  <Dialog.Panel className="w-full max-w-[40em] p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Add RentRoom
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        startDate: "",
                        endDate: "",
                        description: "",
                        name: "",
                        companyTenantId: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="startDate"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Start Date
                            </label>
                            <Field
                              type="date"
                              className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              name="startDate"
                              required
                            />
                          </div>
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="endDate"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              End Date
                            </label>
                            <Field
                              type="date"
                              className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              name="endDate"
                              required
                            />
                          </div>
                        </div>

                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="companyTenantId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Company
                            </label>
                            <Field
                              as="select"
                              name="companyTenantId"
                              id="companyTenantId"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataCompany?.data.map((item: any) => (
                                <option value={item.id} key={item.id}>
                                  {item.companyName}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="name"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Name
                            </label>
                            <Field
                              type="text"
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              name="name"
                              required
                            />
                          </div>
                        </div>

                        <div className="w-full  flex items-end justify-between  mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="description"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Description
                            </label>

                            <Field
                              className="mt-3 w-full min-h-[100px] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              as="textarea"
                              name="description"
                              id="description"
                              required
                            ></Field>
                          </div>
                        </div>
                        <div className="flex w-full items-center justify-around mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <button
                            type="submit"
                            className="flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-white border border-transparent rounded-full bg-primary hover:bg-primary-200 focus:outline-none"
                          >
                            Əlavə et
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </Dialog.Panel>
                ) : process === "Edit" ? (
                  <Dialog.Panel className="w-full max-w-[40em] p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Edit Rent Room
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        startDate:selectedRow.startDate|| "",
                        endDate:selectedRow.endDate|| "",
                        description:selectedRow.description|| "",
                        name:selectedRow.name|| "",
                        companyTenantId: dataCompany?.data.find(
                          (item: any) => item.companyName === selectedRow?.companyName
                        )?.id || "",
                      
                      }}
                      onSubmit={handleEdit}
                    >
                      <Form>
                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="startDate"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Start Date
                            </label>
                            <Field
                              type="date"
                              className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              name="startDate"
                              required
                            />
                          </div>
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="endDate"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              End Date
                            </label>
                            <Field
                              type="date"
                              className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              name="endDate"
                              required
                            />
                          </div>
                        </div>

                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="companyTenantId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Company
                            </label>
                            <Field
                              as="select"
                              name="companyTenantId"
                              id="companyTenantId"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataCompany?.data.map((item: any) => (
                                <option value={item.id} key={item.id}>
                                  {item.companyName}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="name"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Name
                            </label>
                            <Field
                              type="text"
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              name="name"
                              required
                            />
                          </div>
                        </div>

                        <div className="w-full  flex items-end justify-between  mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="description"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Description
                            </label>

                            <Field
                              className="mt-3 w-full min-h-[100px] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              as="textarea"
                              name="description"
                              id="description"
                              required
                            ></Field>
                          </div>
                        </div>
                        <div className="flex w-full items-center justify-around mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-red-400 rounded-full outline font-inter"
                            onClick={handleDelete}
                          >
                            Delete
                          </button>
                          <button
                            type="submit"
                            className="flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-white border border-transparent rounded-full bg-primary hover:bg-primary-200 focus:outline-none"
                          >
                            Edit
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </Dialog.Panel>
                ) : null}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default RentRoomsModal;
