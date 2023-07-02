import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { Formik, Field, Form } from "formik";
import useSWR from "swr";

import useGetResponse from "../../hooks/useGetResponse";

import { CreateTransport, Delete, UpdateTransport } from "../../api";
import { GetAll } from "../../api";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  process: string;
  deleteId: number;
  selectedRow: any;
  mutate: any;
};

export type TransportValues = {
  brand: string;
  serialNumber: string;
  color: string;
  id?: string;
};

const TransportModal = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}: Props) => {
  const { data, isLoading, error } = useSWR(
    "/api/Users/GetAllForAdmin",
    GetAll.user
  );

  const handleSubmit = async (values: TransportValues) => {
    const parsedValues = {
      ...values,
      employeeOrUserId: values.id,
    };

    console.log("dataRegions", values);

    const res = await useGetResponse(
      CreateTransport.user("/api/Transport/Create", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
  };

  const handleEdit = async (values: TransportValues) => {
    const parsedValues = {
      brand: values.brand,
      serialNumber: values.serialNumber,
      color: values.color,
      id: values.id,
    };

    const res = await useGetResponse(
      UpdateTransport.user("/api/Transport/Update", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
  };

  const deleteObject = async (deleteId: any) => {
    const res = await useGetResponse(
      Delete.user(`/api/Transport/Delete`, {
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

  if (isLoading) <div>Loading...</div>;
  if (error) <div>error...</div>;

  const usersDetail = data?.data?.map(
    ({ id, name, surname }: { id: string; name: string; surname: string }) => ({
      id,
      name,
      surname,
    })
  );

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
                      Add Transport
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        brand: "",
                        serialNumber: "",
                        color: "",
                        id: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      {(formikProps) => (
                        <Form action="">
                          <div className="grid items-center justify-between grid-cols-2 gap-4 mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div>
                              <label
                                htmlFor="brand"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Brand
                              </label>
                              <Field
                                name="brand"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="serialNumber"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Serial Number
                              </label>
                              <Field
                                name="serialNumber"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="color"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Color
                              </label>
                              <Field
                                name="color"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="id"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                UserId
                              </label>
                              <Field
                                as="select"
                                name="id"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              >
                                <option value="">Select</option>
                                {usersDetail?.map(
                                  ({
                                    id,
                                    name,
                                    surname,
                                  }: {
                                    id: string;
                                    name: string;
                                    surname: string;
                                  }) => (
                                    <option key={id} value={id}>
                                      {name} {surname}
                                    </option>
                                  )
                                )}
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
                      )}
                    </Formik>
                  </Dialog.Panel>
                ) : process === "Edit" ? (
                  <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Transport Edit
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={
                        selectedRow || {
                          brand: "",
                          serialNumber: "",
                          color: "",
                          id: "",
                        }
                      }
                      onSubmit={handleEdit}
                    >
                      {(formikProps) => (
                        <Form action="">
                          <div className="grid items-center justify-between grid-cols-2 gap-4 mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div>
                              <label
                                htmlFor="brand"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Brand
                              </label>
                              <Field
                                name="brand"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="serialNumber"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Serial Number
                              </label>
                              <Field
                                name="serialNumber"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="color"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Color
                              </label>
                              <Field
                                name="color"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
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
                      )}
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

export default TransportModal;
