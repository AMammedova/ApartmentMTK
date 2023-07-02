import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { Formik, Field, Form } from "formik";
import useSWR from "swr";

import useGetResponse from "../../hooks/useGetResponse";

import { Delete } from "../../api";
import { AddObjects } from "../../api";
import { EditObjects } from "../../api";
import { GetAll } from "../../api";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  process: string;
  deleteId: number;
  selectedRow: any;
  mutate: any;
};

type Values = {
  title: string;
  address: string;
  regionId: string;
};

const ObjectsModal = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}: Props) => {
  const {
    data: dataRegions,
    error: errorRegions,
    isLoading: isLoadingRegions,
  } = useSWR("/api/Region/GetAll", (key) => GetAll.user(key));

  const handleSubmit = async (values: Values) => {
    const parsedValues = {
      ...values,
      regionId: parseInt(values.regionId),
    };

    const res = await useGetResponse(
      AddObjects.user("/api/VendorObjects/Create", {
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
      regionId: parseInt(values.regionId),
      id: selectedRow.id,
    };

    const res = await useGetResponse(
      EditObjects.user("/api/VendorObjects/Update", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
  };

  const deleteObject = async (deleteId: any) => {
    const res = await useGetResponse(
      Delete.user("/api/VendorObjects/Delete", {
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
                  <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                    Add  Object 
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        title: "",
                        address: "",
                        regionId: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form action="">
                        <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div>
                            <label
                              htmlFor="title"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Title
                            </label>
                            <Field
                              name="title"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="address"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Adress
                            </label>
                            <Field
                              name="address"
                              type="text"
                              className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-1/2">
                            <label
                              htmlFor="regionId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Region
                            </label>
                            <Field
                              as="select"
                              name="regionId"
                              id="regionId"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataRegions?.data.map((item: any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex items-center justify-around w-full mt-10 font-bold font-inter text-16 leading-30 text-dark">
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
                  <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Objects Edit
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        title: selectedRow?.title || "",
                        address: selectedRow?.address || "",
                        regionId:
                          dataRegions?.data.find(
                            (item: any) => item.name === selectedRow?.regionName
                          )?.id || "",
                      }}
                      onSubmit={handleEdit}
                    >
                      <Form action="">
                        <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div>
                            <label
                              htmlFor="title"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Title
                            </label>
                            <Field
                              name="title"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="address"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Adress
                            </label>
                            <Field
                              name="address"
                              type="text"
                              className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-1/2">
                            <label
                              htmlFor="regionId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Region
                            </label>
                            <Field
                              as="select"
                              name="regionId"
                              id="regionId"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataRegions?.data.map((item: any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex items-center justify-around w-full mt-10 font-bold font-inter text-16 leading-30 text-dark">
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

export default ObjectsModal;
