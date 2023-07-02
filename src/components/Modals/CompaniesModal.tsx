import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { Delete } from "../../api";
import { GetAll } from "../../api";
import { EditApartment } from "../../api";
import { CreateCompany } from "../../api";
import { EditCompany } from "../../api";
import useGetResponse from "../../hooks/useGetResponse";
type Props = {
  isOpen: boolean;
  closeModal: () => void;
  process: string;
  deleteId: number;
  selectedRow: any;
  mutate: any;
};
type Values = {
  DirectorName: string;
  DirectorSurname: string;
  DirectorFatherName: string;
  Phonenumber: string;
  Email: string;
  Logo: File | null;
  ObjectId: string;
  CompanyName: string;
  VOEN: string;
  VIN: string;
};

const CompaniesModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const {
    data: dataObjects,
    error: errorObjects,
    isLoading: isLoadingObjects,
  } = useSWR("/api/VendorObjects/GetAll", (key) => GetAll.user(key));

  const handleSubmit = async (values: Values) => {
    setIsButtonDisabled(true);
    const parsedValues = {
      ...values,
      ObjectId: Number(values.ObjectId),
    };
    const formData = new FormData();
    formData.append("DirectorName", parsedValues.DirectorName);
    formData.append("DirectorSurname", parsedValues.DirectorSurname);
    formData.append("DirectorFatherName", parsedValues.DirectorFatherName);
    formData.append("Phonenumber", parsedValues.Phonenumber);
    formData.append("Email", parsedValues.Email);
    // if(parsedValues.Logo){
    //   formData.append("Logo", parsedValues.Logo);
    // }
    if (selectedImage !== null) {
      formData.append("Logo", selectedImage);
    }
    formData.append("ObjectId", String(parsedValues.ObjectId));
    formData.append("CompanyName", parsedValues.CompanyName);
    formData.append("VOEN", parsedValues.VOEN);
    formData.append("VIN", parsedValues.VIN);
    const res = await useGetResponse(
      CreateCompany.user("/api/VendorCompany/Create", {
        arg: formData,
      }),
      mutate,
      closeModal
    );

    alert(res);
    setIsButtonDisabled(false);
  };
  const handleEdit = async (values: Values) => {
    setIsButtonDisabled(true);

    const parsedValues = {
      ...values,
      ObjectId: Number(values.ObjectId),
      id: selectedRow.id,
    };
    const formData = new FormData();
    formData.append("Id", parsedValues.id);
    formData.append("DirectorName", parsedValues.DirectorName);
    formData.append("DirectorSurname", parsedValues.DirectorSurname);
    formData.append("DirectorFatherName", parsedValues.DirectorFatherName);
    formData.append("Phonenumber", parsedValues.Phonenumber);
    formData.append("Email", parsedValues.Email);
    if (selectedImage !== null) {
      formData.append("Logo", selectedImage);
    } else if (selectedRow.logo) {
      console.log("else if");
      const response = await fetch(selectedRow.logo);
      console.log(response, "response");
      const imageBlob = await response.blob();
      console.log(imageBlob, "imageBlob");
      formData.append("Logo", imageBlob, "logo.png");
    }
    formData.append("ObjectId", String(parsedValues.ObjectId));
    formData.append("CompanyName", parsedValues.CompanyName);
    formData.append("VOEN", parsedValues.VOEN);
    formData.append("VIN", parsedValues.VIN);
    const res = await useGetResponse(
      EditCompany.user("/api/VendorCompany/Update", {
        arg: formData,
      }),
      mutate,
      closeModal
    );

    alert(res);
    setIsButtonDisabled(false);
  };

  const deleteObject = async (deleteId: any) => {
    const res = await useGetResponse(
      Delete.user("/api/VendorCompany/Delete", {
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
        <Dialog as="div" className="relative z-10" onClose={()=>{closeModal();setSelectedImage(null)}}>
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
                      Add Company
                      <XCircleIcon
                        onClick={()=>{closeModal();setSelectedImage(null)}}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        DirectorName: "",
                        DirectorSurname: "",
                        DirectorFatherName: "",
                        Phonenumber: "",
                        Email: "",
                        Logo: null,
                        ObjectId: "",
                        CompanyName: "",
                        VOEN: "",
                        VIN: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      {(formikProps) => (
                        <Form>
                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              {" "}
                              <label
                                htmlFor="ObjectId"
                                className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                              >
                                Object Name
                              </label>
                              <Field
                                as="select"
                                id="ObjectId"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                name="ObjectId"
                                required
                              >
                                <option value="-1">Choose</option>
                                {dataObjects?.data.map((item: any) => (
                                  <option value={item.id}>{item.title}</option>
                                ))}
                              </Field>
                            </div>
                            <div className="w-[48%]">
                              {" "}
                              <label
                                htmlFor="DirectorName"
                                className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                              >
                                Director Name
                              </label>
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="DirectorName"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="DirectorSurname"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Director Surname
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="text"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="DirectorSurname"
                                />
                              </div>
                            </div>
                            <div className="w-[48%]">
                              <label
                                htmlFor="DirectorFatherName"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Father Name
                              </label>
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="DirectorFatherName"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="CompanyName"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Company Name
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="text"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="CompanyName"
                                  required
                                />
                              </div>
                            </div>
                            <div className="w-[48%]">
                              <label
                                htmlFor="VOEN"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Voen
                              </label>
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="VOEN"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="VIN"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Vin
                              </label>
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="VIN"
                                required
                              />
                            </div>
                            <div className="w-[48%]">
                              <label
                                htmlFor="Phonenumber"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Phone Number
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="text"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="Phonenumber"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="email"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Email
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="Email"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="Email"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="Logo"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Logo
                              </label>

                              <input
                                type="file"
                                id="Logo"
                                name="Logo"
                                accept="image/*"
                                onChange={handleChange}
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div className="w-[48%] flex items-center justify-center">
                              <div className="w-[140px] h-[100px] rounded-lg  object-cover object-center">
                                {selectedImage && (
                                  <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected Image"
                                    className="object-contain w-full h-full "
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-around w-full mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <button
                              type="submit"
                              disabled={isButtonDisabled}
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
                  <Dialog.Panel className="w-full max-w-[40em] p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Edit Company
                      <XCircleIcon
                        onClick={()=>{closeModal();setSelectedImage(null)}}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        ObjectId:
                          dataObjects?.data.find(
                            (item: any) =>
                              item.title === selectedRow?.objectName
                          )?.id || "",
                        DirectorName: selectedRow?.directorName || "",
                        DirectorSurname: selectedRow?.directorSurname || "",
                        DirectorFatherName:
                          selectedRow?.directorFatherName || "",
                        Phonenumber: selectedRow?.phonenumber || "",
                        Email: selectedRow?.email || "",
                        Logo: null,
                        CompanyName: selectedRow?.companyName || "-1",
                        VOEN: selectedRow?.voen || "",
                        VIN: selectedRow?.vin || "",
                      }}
                      onSubmit={handleEdit}
                    >
                      {(formikProps) => (
                        <Form>
                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              {" "}
                              <label
                                htmlFor="ObjectId"
                                className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                              >
                                Object Name
                              </label>
                              <Field
                                as="select"
                                id="ObjectId"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                name="ObjectId"
                                required
                              >
                                <option value="-1">Choose</option>
                                {dataObjects?.data.map((item: any) => (
                                  <option value={item.id}>{item.title}</option>
                                ))}
                              </Field>
                            </div>
                            <div className="w-[48%]">
                              {" "}
                              <label
                                htmlFor="DirectorName"
                                className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                              >
                                Director Name
                              </label>
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="DirectorName"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="DirectorSurname"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Director Surname
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="text"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="DirectorSurname"
                                />
                              </div>
                            </div>
                            <div className="w-[48%]">
                              <label
                                htmlFor="DirectorFatherName"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Father Name
                              </label>
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="DirectorFatherName"
                              />
                            </div>
                          </div>

                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="CompanyName"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Company Name
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="text"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="CompanyName"
                                />
                              </div>
                            </div>
                            <div className="w-[48%]">
                              <label
                                htmlFor="VOEN"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Voen
                              </label>
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="VOEN"
                              />
                            </div>
                          </div>

                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="VIN"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Vin
                              </label>
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="VIN"
                              />
                            </div>
                            <div className="w-[48%]">
                              <label
                                htmlFor="Phonenumber"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Phone Number
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="text"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="Phonenumber"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="email"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Email
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="Email"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="Email"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="Image"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Image
                              </label>

                              <input
                                type="file"
                                id="Logo"
                                name="Logo"
                                accept="image/*"
                                onChange={handleChange}
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              />
                            </div>
                            <div className="w-[48%] flex items-center justify-center">
                              <div className="w-[140px] h-[100px] rounded-lg  object-cover object-center">
                                {selectedImage && selectedImage ? (
                                  <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected Image"
                                    className="object-contain w-full h-full "
                                  />
                                ) : (
                                  <img
                                    className="w-full h-full"
                                    src={selectedRow.logo}
                                    alt=""
                                  />
                                )}
                              </div>
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
                              disabled={isButtonDisabled}
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

export default CompaniesModal;
