import { Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { Formik, Field, Form } from "formik";
import useSWR from "swr";

import useGetResponse from "../../hooks/useGetResponse";

import { Delete } from "../../api";
import { CreateResident } from "../../api";
import { EditResidents } from "../../api";
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
  Name: string;
  Surname: string;
  Phonenumber: string;
  Email: string;
  Image: File | null;
  VendorCompanyId: string;
};

const ResidentsModal = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}: Props) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const {
    data: dataCompany,
    error: errorCompany,
    isLoading: isLoadingCompany,
  } = useSWR("/api/VendorCompany/GetAllByVendorId", (key) => GetAll.user(key));
  console.log(selectedRow, "selectedRow");
  const handleSubmit = async (values: Values) => {
    console.log(values, "values");
    setIsButtonDisabled(true);

    const parsedValues = {
      ...values,
      VendorCompanyId: Number(values.VendorCompanyId),
    };
    console.log(parsedValues, "parsedValues");
    const formData = new FormData();
    formData.append("Name", parsedValues.Name);
    formData.append("Surname", parsedValues.Surname);
    formData.append("Phonenumber", parsedValues.Phonenumber);
    formData.append("Email", parsedValues.Email);
    // if (parsedValues.Image) {
    //   formData.append("Image", parsedValues.Image);
    // }
    if (selectedImage !== null) {
      formData.append("Image", selectedImage);
    }
    formData.append("VendorCompanyId", String(parsedValues.VendorCompanyId));

    const res = await useGetResponse(
      CreateResident.user("/api/VendorResident/Create", {
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
      VendorCompanyId: Number(values.VendorCompanyId),
      id: selectedRow.id,
    };
    const formData = new FormData();
    formData.append("Id", parsedValues.id);
    formData.append("Name", parsedValues.Name);
    formData.append("Surname", parsedValues.Surname);
    formData.append("Phonenumber", parsedValues.Phonenumber);
    formData.append("Email", parsedValues.Email);
    if (selectedImage !== null) {
      formData.append("Image", selectedImage);
    } else if (selectedRow.image) {
      const response = await fetch(selectedRow.image);
      console.log(response, "response");
      console.log(fetch(selectedRow.image), "fetchhh");
      const imageBlob = await response.blob();
      formData.append("Image", imageBlob, "image.png");
    }
    formData.append("VendorCompanyId", String(parsedValues.VendorCompanyId));
    const res = await useGetResponse(
      EditResidents.user("/api/VendorResident/Update", {
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
      Delete.user("/api/VendorResident/Delete", {
        arg: { deleteId },
      }),
      mutate,
      closeModal
    );

    alert(res);
  };

  const handleDelete = () => {
    console.log(deleteId, "deleteId");
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
                  <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                     Add Resident 
                      <XCircleIcon
                        onClick={()=>{closeModal();setSelectedImage(null)}}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        Name: "",
                        Surname: "",
                        Phonenumber: "",
                        Email: "",
                        Image: null,
                        VendorCompanyId: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      {(formikProps) => (
                        <Form action="" encType="multipart/form-data">
                          <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div>
                              <label
                                htmlFor="Name"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Name
                              </label>
                              <Field
                                type="text"
                                id="Name"
                                name="Name"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="Surname"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Surname
                              </label>
                              <Field
                                type="text"
                                id="Surname"
                                name="Surname"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="whitespace-nowrap">
                              <label
                                htmlFor="Phonenumber"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Phone Number
                              </label>
                              <Field
                                type="text"
                                id="Phonenumber"
                                name="Phonenumber"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div className="w-1/2">
                              <label
                                htmlFor="Email"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Email
                              </label>
                              <Field
                                type="email"
                                id="Email"
                                name="Email"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-1/2">
                              <label
                                htmlFor="VendorCompanyId"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Company
                              </label>
                              <Field
                                as="select"
                                name="VendorCompanyId"
                                id="VendorCompanyId"
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
                          </div>
                          <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            
                          <div className="w-[48%]">
                              <label
                                htmlFor="Image"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Image
                              </label>

                              <input
                                type="file"
                                id="Image"
                                name="Image"
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
                  <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Edit Resident
                      <XCircleIcon
                        onClick={()=>{closeModal();setSelectedImage(null)}}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        Name: selectedRow.name,
                        Surname: selectedRow.surname,
                        
                        Phonenumber: selectedRow.phonenumber,
                        Email: selectedRow.email,
                        Image: null,
                        VendorCompanyId:
                          dataCompany?.data.find(
                            (item: any) =>
                              item.companyName === selectedRow?.companyName
                          )?.id || "",
                      }}
                      onSubmit={handleEdit}
                    >
                      {(formikProps) => (
                        <Form action="" encType="multipart/form-data">
                          <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div>
                              <label
                                htmlFor="Name"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Name
                              </label>
                              <Field
                                type="text"
                                id="Name"
                                name="Name"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="Surname"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Adress
                              </label>
                              <Field
                                type="text"
                                id="Surname"
                                name="Surname"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-1/2">
                              <label
                                htmlFor="Email"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Email
                              </label>
                              <Field
                                type="email"
                                id="Email"
                                name="Email"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="Phonenumber"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Phone Number
                              </label>
                              <Field
                                type="text"
                                id="Phonenumber"
                                name="Phonenumber"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                       
                            <div className="w-1/2">
                              <label
                                htmlFor="VendorCompanyId"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Company
                              </label>
                              <Field
                                as="select"
                                name="VendorCompanyId"
                                id="VendorCompanyId"
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
                          </div>

                          <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                              <label
                                htmlFor="Image"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Image
                              </label>

                              <input
                                type="file"
                                id="Image"
                                name="Image"
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
                                ): <img
                                className="w-full h-full"
                                src={selectedRow.image}
                                alt=""
                              />}
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

export default ResidentsModal;
