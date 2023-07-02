import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Formik, Field, Form } from "formik";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { CreateBuilding } from "../../api";
import { GetAll } from "../../api";
import { EditBuilding } from "../../api";
import { Delete } from "../../api";
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
  Image: any;
  Name: string;
  RegionId: string;
  Street: string;
  BuildingNo: string;
  SecurityPhone: string;
  Floor: number;
  Entrance: number;
  VendorObjectId: string;
};

const BuildingsModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}) => {
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
  console.log(dataObjects, "dataObjects");
  const {
    data: dataRegions,
    error: errorRegions,
    isLoading: isLoadingRegions,
  } = useSWR("/api/Region/GetAll", (key) => GetAll.user(key));
  console.log(selectedRow, "selectedRow");
  const handleSubmit = async (values: Values) => {
    console.log(values, "values");

    const parsedValues = {
      ...values,
      VendorObjectId: Number(values.VendorObjectId),
      RegionId: Number(values.RegionId),
    };
    console.log(parsedValues, "parsedValues");
    const formData = new FormData();
    formData.append("Name", parsedValues.Name);
    formData.append("Street", parsedValues.Street);
    formData.append("BuildingNo", parsedValues.BuildingNo);
    formData.append("SecurityPhone", parsedValues.SecurityPhone);
    formData.append("Floor", String(parsedValues.Floor));
    formData.append("Entrance", String(parsedValues.Entrance));
    // if (parsedValues.Image) {
    //   formData.append("Image", parsedValues.Image);
    // }
    if (selectedImage !== null) {
      formData.append("Image", selectedImage);
    }
    formData.append("VendorObjectId", String(parsedValues.VendorObjectId));
    formData.append("RegionId", String(parsedValues.RegionId));

    const res = await useGetResponse(
      CreateBuilding.user("/api/VendorBuildings/Create", {
        arg: formData,
      }),
      mutate,
      closeModal
    );

    alert(res);
    setSelectedImage(null);
  };
 

  const handleEdit = async (values: Values) => {
    const parsedValues = {
      ...values,
      VendorObjectId: Number(values.VendorObjectId),
      RegionId: Number(values.RegionId),
      Id: selectedRow.id,
    };

    const formData = new FormData();
    formData.append("Id", parsedValues.Id);
    formData.append("Name", parsedValues.Name);
    formData.append("Street", parsedValues.Street);
    formData.append("BuildingNo", parsedValues.BuildingNo);
    formData.append("SecurityPhone", parsedValues.SecurityPhone);
    formData.append("Floor", String(parsedValues.Floor));
    formData.append("Entrance", String(parsedValues.Entrance));

    // Check if a new image is selected, otherwise use the previous value as the default
    if (selectedImage !== null) {
      formData.append("Image", selectedImage);
    } else if (selectedRow.image) {
      console.log("else if");
      const response = await fetch(selectedRow.image);
      console.log(response, "response");
      const imageBlob = await response.blob();
      console.log(imageBlob, "imageBlob");
      formData.append("Image", imageBlob, "image.png");
    }

    formData.append("VendorObjectId", String(parsedValues.VendorObjectId));
    formData.append("RegionId", String(parsedValues.RegionId));

    const res = await useGetResponse(
      EditBuilding.user("/api/VendorBuildings/Update", {
        arg: formData,
      }),
      mutate,
      closeModal
    );

    alert(res);
    setSelectedImage(null);
  };

  const deleteObject = async (deleteId: any) => {
    const res = await useGetResponse(
      Delete.user("/api/VendorBuildings/Delete", {
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
                  <Dialog.Panel className="w-full max-w-[40em] p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Add Building
                      <XCircleIcon
                        onClick={()=>{closeModal();setSelectedImage(null)}}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        Image: null,
                        Name: "",
                        RegionId: "",
                        Street: "",
                        BuildingNo: "",
                        SecurityPhone: "",
                        Floor: -1,
                        Entrance: -1,
                        VendorObjectId: "-1",
                      }}
                      onSubmit={handleSubmit}
                    >
                      {(formikProps) => (
                        <Form>
                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              {" "}
                              <label
                                htmlFor="Name"
                                className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                              >
                                Name
                              </label>
                              <Field
                                type="text"
                                id="Name"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                name="Name"
                                required
                              />
                            </div>
                            <div className="w-[48%]">
                              {" "}
                              <label
                                htmlFor="RegionId"
                                className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                              >
                                Region
                              </label>
                              <Field
                                as="select"
                                name="RegionId"
                                id="RegionId"
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

                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="Street"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Street
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="text"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="Street"
                                  id="Street"
                                />
                              </div>
                            </div>
                            <div className="w-[48%]">
                              <label
                                htmlFor="BuildingNo"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Building No
                              </label>
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="BuildingNo"
                                id="BuildingNo"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="SecurityPhone"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Security Phone
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="text"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="SecurityPhone"
                                  id="SecurityPhone"
                                />
                              </div>
                            </div>
                            <div className="w-[48%]">
                              <label
                                htmlFor="Entrance"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Entrance
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="number"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="Entrance"
                                  id="Entrance"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="Floor"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Floor
                              </label>

                              <Field
                                type="number"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="Floor"
                                id="Floor"
                              />
                            </div>
                            <div className="w-[48%]">
                              <label
                                htmlFor="VendorObjectId"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Object
                              </label>
                              <Field
                                as="select"
                                id="VendorObjectId"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                name="VendorObjectId"
                                required
                              >
                                <option value="-1">Choose</option>
                                {dataObjects?.data.map((item: any) => (
                                  <option value={item.id}>{item.title}</option>
                                ))}
                              </Field>
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
                      Edit Buildings
                      <XCircleIcon
                        onClick={()=>{closeModal();setSelectedImage(null)}}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        Image: null,
                        Name: selectedRow.name || "",
                        RegionId:
                          dataRegions?.data.find(
                            (item: any) => item.name === selectedRow?.regionName
                          )?.id || "",
                        Street: selectedRow.street || "",
                        BuildingNo: selectedRow.buildingNo || "",
                        SecurityPhone: selectedRow.securityPhone || "",
                        Floor: selectedRow.floor || -1,
                        Entrance: selectedRow.entrance || -1,
                        VendorObjectId:
                          dataObjects?.data.find(
                            (item: any) =>
                              item.title === selectedRow?.vendorObjectName
                          )?.id || "",
                      }}
                      onSubmit={handleEdit}
                    >
                      {(formikProps) => (
                        <Form>
                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              {" "}
                              <label
                                htmlFor="Name"
                                className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                              >
                                Name
                              </label>
                              <Field
                                type="text"
                                id="Name"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                name="Name"
                                required
                              />
                            </div>
                            <div className="w-[48%]">
                              {" "}
                              <label
                                htmlFor="RegionId"
                                className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                              >
                                Region
                              </label>
                              <Field
                                as="select"
                                name="RegionId"
                                id="RegionId"
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

                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="Street"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Street
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="text"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="Street"
                                  id="Street"
                                />
                              </div>
                            </div>
                            <div className="w-[48%]">
                              <label
                                htmlFor="BuildingNo"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Building No
                              </label>
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="BuildingNo"
                                id="BuildingNo"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="SecurityPhone"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Security Phone
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="text"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="SecurityPhone"
                                  id="SecurityPhone"
                                />
                              </div>
                            </div>
                            <div className="w-[48%]">
                              <label
                                htmlFor="Entrance"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Entrance
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  type="number"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  name="Entrance"
                                  id="Entrance"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="Floor"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Floor
                              </label>

                              <Field
                                type="number"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="Floor"
                                id="Floor"
                              />
                            </div>
                            <div className="w-[48%]">
                              <label
                                htmlFor="VendorObjectId"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Object
                              </label>
                              <Field
                                as="select"
                                id="VendorObjectId"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                name="VendorObjectId"
                                required
                              >
                                <option value="-1">Choose</option>
                                {dataObjects?.data.map((item: any) => (
                                  <option value={item.id}>{item.title}</option>
                                ))}
                              </Field>
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

export default BuildingsModal;
