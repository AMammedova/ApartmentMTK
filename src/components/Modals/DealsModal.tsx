import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DealsSubModal from "./DealsSubModal";
import { Formik, Field, Form, FormikHelpers } from "formik";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { CreateDeal } from "../../api";
import { Delete } from "../../api";
import { EditDeal } from "../../api";
import useGetResponse from "../../hooks/useGetResponse";
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
  Description: string;
  OrderStatusId: string;
  OrderTypeId: string;
  OrderSourceId: string;
  PriorityId: string;
  OrderClassId: string;
  AppUserId: string;
  ActualDeadline: string;
  NormativeDeadline: string;
  IsAccident: string;
  Image: any;
};

const DealsModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}) => {
  const [isOpenSub, setIsOpenSub] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const [employee, setEmployee] = useState<any>({});
  console.log(employee, "employee");
  console.log(employee?.id, "employeedd");
  console.log(selectedRow, "selectedRow");

  const closeModalSub = (): void => {
    setIsOpenSub(false);
  };

  const openModalSub = (): void => {
    setIsOpenSub(true);
  };

  const handleSubmit = async (values: Values) => {
    console.log(values, "values");

    const parsedValues = {
      ...values,
      ActualDeadline: new Date(values.ActualDeadline)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .reverse()
        .join("-"),
      NormativeDeadline: new Date(values.NormativeDeadline)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .reverse()
        .join("-"),
      OrderSourceId: Number(values.OrderSourceId),
      OrderTypeId: Number(values.OrderTypeId),
      PriorityId: Number(values.PriorityId),
      OrderStatusId: Number(values.OrderStatusId),
      OrderClassId: Number(values.OrderClassId),
      AppUserId: employee?.id || "",
      IsAccident: values.IsAccident === "true",
    };
    const formData = new FormData();
    formData.append("Description", parsedValues.Description);
    if (selectedImage !== null) {
      formData.append("Image", selectedImage);
    }
    formData.append("OrderStatusId", String(parsedValues.OrderStatusId));
    formData.append("OrderTypeId", String(parsedValues.OrderTypeId));
    formData.append("PriorityId", String(parsedValues.PriorityId));
    formData.append("OrderClassId", String(parsedValues.OrderClassId));
    formData.append("OrderSourceId", String(parsedValues.OrderSourceId));
    formData.append("AppUserId", String(parsedValues.AppUserId));
    formData.append("ActualDeadline", parsedValues.ActualDeadline);
    formData.append("NormativeDeadline", parsedValues.NormativeDeadline);
    formData.append("IsAccident", String(parsedValues.IsAccident));
    const res = await useGetResponse(
      CreateDeal.user("/api/OrderAdmin/Create", {
        arg: formData,
      }),
      mutate,
      closeModal
    );

    alert(res);
    setEmployee({});
  };
  const handleEdit = async (values: Values) => {
    const parsedValues = {
      ...values,
      ActualDeadline: new Date(values.ActualDeadline)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .reverse()
        .join("-"),
      NormativeDeadline: new Date(values.NormativeDeadline)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .reverse()
        .join("-"),
      OrderSourceId: Number(values.OrderSourceId),
      OrderTypeId: Number(values.OrderTypeId),
      PriorityId: Number(values.PriorityId),
      OrderStatusId: Number(values.OrderStatusId),
      OrderClassId: Number(values.OrderClassId),
      AppUserId: employee?.id || "",
      IsAccident: values.IsAccident === "true",
    };
    const formData = new FormData();
    formData.append("Description", parsedValues.Description);
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
    formData.append("OrderStatusId", String(parsedValues.OrderStatusId));
    formData.append("OrderTypeId", String(parsedValues.OrderTypeId));
    formData.append("PriorityId", String(parsedValues.PriorityId));
    formData.append("OrderClassId", String(parsedValues.OrderClassId));
    formData.append("OrderSourceId", String(parsedValues.OrderSourceId));
    formData.append("AppUserId", String(parsedValues.AppUserId));
    formData.append("ActualDeadline", parsedValues.ActualDeadline);
    formData.append("NormativeDeadline", parsedValues.NormativeDeadline);
    formData.append("IsAccident", String(parsedValues.IsAccident));
    const res = await useGetResponse(
      EditDeal.user("/api/OrderAdmin/Update", {
        arg: formData,
      }),
      mutate,
      closeModal
    );

    alert(res);
  };
  const deleteObject = async (deleteId: any) => {
    const res = await useGetResponse(
      Delete.user("/api/OrderAdmin/Delete", {
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
  const {
    data: dataOrderType,
    error: errorOrderType,
    isLoading: isLoadingOrderType,
  } = useSWR("/api/OrderType/GetAll", (key) => GetAll.user(key));
  const {
    data: dataOrderSource,
    error: errorOrderSource,
    isLoading: isLoadingOrderSource,
  } = useSWR("/api/OrderSource/GetAll", (key) => GetAll.user(key));

  const {
    data: dataOrderClass,
    error: errorOrderClass,
    isLoading: isLoadingOrderClass,
  } = useSWR("/api/OrderClass/GetAll", (key) => GetAll.user(key));
  const {
    data: dataOrderPriority,
    error: errorOrderPriority,
    isLoading: isLoadingOrderPriority,
  } = useSWR("/api/OrderPriority/GetAll", (key) => GetAll.user(key));
  const {
    data: dataOrderStatus,
    error: errorOrderStatus,
    isLoading: isLoadingOrderStatus,
  } = useSWR("/api/OrderStatus/GetAll", (key) => GetAll.user(key));

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
                      Add Deal
                      <XCircleIcon
                        onClick={()=>{closeModal();setSelectedImage(null)}}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        Description: "",
                        OrderStatusId: "-1",
                        OrderTypeId: "-1",
                        OrderSourceId: "-1",
                        PriorityId: "-1",
                        OrderClassId: "-1",
                        AppUserId: employee?.fullName || "",
                        IsAccident: "false",
                        ActualDeadline: "",
                        NormativeDeadline: "",
                        Image: null,
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        

                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="AppUserId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              İcraçı
                            </label>
                            <div className="relative flex items-center justify-between">
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="AppUserId"
                                value={employee?.fullName}
                                disabled
                              />

                              <ChevronDownIcon
                                className="h-5 w-5 text-gray-400 absolute top-[50%] right-4 cursor-pointer"
                                onClick={openModalSub}
                              />
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="OrderTypeId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Order Type
                            </label>
                            <Field
                              as="select"
                              id="OrderTypeId"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                              name="OrderTypeId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataOrderType?.data?.map((item: any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="OrderSourceId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Order Source
                            </label>
                            <div className="relative flex items-center justify-between">
                              <Field
                                as="select"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                id="OrderSourceId"
                                name="OrderSourceId"
                                required
                              >
                                <option value="-1">Choose</option>
                                {dataOrderSource?.data?.map((item: any) => (
                                  <option value={item.id}>{item.name}</option>
                                ))}
                              </Field>
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="PriorityId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Priorty
                            </label>
                            <Field
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                              as="select"
                              id="PriorityId"
                              name="PriorityId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataOrderPriority?.data?.map((item: any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="OrderClassId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Order Class
                            </label>
                            <div className="relative flex items-center justify-between">
                              <Field
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                as="select"
                                name="OrderClassId"
                                id="OrderClassId"
                                required
                              >
                                <option value="-1">Choose</option>
                                {dataOrderClass?.data?.map((item: any) => (
                                  <option value={item.id}>{item.name}</option>
                                ))}
                              </Field>
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="OrderStatusId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Status
                            </label>

                            <Field
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                              as="select"
                              name="OrderStatusId"
                              id="OrderStatusId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataOrderStatus?.data?.map((item: any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="ActualDeadline"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Actual Deadline
                            </label>
                            <Field
                              type="date"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                              name="ActualDeadline"
                              required
                            />
                          </div>
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="NormativeDeadline"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Normative Deadline
                            </label>
                            <Field
                              type="date"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                              name="NormativeDeadline"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-start justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="isAccident"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Is Accident
                            </label>
                            <Field
                              as="select"
                              name="IsAccident"
                              id="IsAccident"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option disabled value="-1">
                                Choose
                              </option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </Field>
                          </div>

                          <div className="w-[48%]">
                            <label
                              htmlFor="Description"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Description
                            </label>

                            <Field
                              className="mt-3 w-full min-h-[100px] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              as="textarea"
                              name="Description"
                              id="Description"
                              required
                            ></Field>
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
                                  className="object-cover object-center w-full h-full "
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
                    </Formik>
                  </Dialog.Panel>
                ) : process === "Edit" ? (
                  <Dialog.Panel className="w-full max-w-[40em] p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Edit Order
                      <XCircleIcon
                        onClick={()=>{closeModal();setSelectedImage(null)}}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        Description: selectedRow.description || "",
                        OrderStatusId:
                          dataOrderStatus?.data.find(
                            (item: any) =>
                              item.name === selectedRow?.orderStatusName
                          )?.id || "-1",
                        OrderTypeId:
                          dataOrderType?.data.find(
                            (item: any) =>
                              item.name === selectedRow?.orderTypeName
                          )?.id || "-1",
                        OrderSourceId:
                          dataOrderSource?.data.find(
                            (item: any) =>
                              item.name === selectedRow?.orderSourceName
                          )?.id || "-1",
                        PriorityId:
                          dataOrderPriority?.data.find(
                            (item: any) =>
                              item.name === selectedRow?.orderPriorityName
                          )?.id || "-1",
                        OrderClassId:
                          dataOrderClass?.data.find(
                            (item: any) =>
                              item.name === selectedRow?.orderClassName
                          )?.id || "-1",
                        AppUserId: selectedRow.appUserId || "",
                        IsAccident: selectedRow.isAccident || "false",
                        ActualDeadline: selectedRow.actualDeadline || "",
                        NormativeDeadline: selectedRow.normativeDeadline || "",
                        Image: null,
                      }}
                      onSubmit={handleEdit}
                    >
                      <Form>
                      

                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="AppUserId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              İcraçı
                            </label>
                            <div className="relative flex items-center justify-between">
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="AppUserId"
                                value={
                                  selectedRow.appUserName
                                    ? selectedRow.appUserName
                                    : employee?.fullName
                                }
                                disabled
                              />

                              <ChevronDownIcon
                                className="h-5 w-5 text-gray-400 absolute top-[50%] right-4 cursor-pointer"
                                onClick={openModalSub}
                              />
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="OrderTypeId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Order Type
                            </label>
                            <Field
                              as="select"
                              id="OrderTypeId"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                              name="OrderTypeId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataOrderType?.data?.map((item: any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="OrderSourceId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Order Source
                            </label>
                            <div className="relative flex items-center justify-between">
                              <Field
                                as="select"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                id="OrderSourceId"
                                name="OrderSourceId"
                                required
                              >
                                <option value="-1">Choose</option>
                                {dataOrderSource?.data?.map((item: any) => (
                                  <option value={item.id}>{item.name}</option>
                                ))}
                              </Field>
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="PriorityId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Priorty
                            </label>
                            <Field
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                              as="select"
                              id="PriorityId"
                              name="PriorityId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataOrderPriority?.data?.map((item: any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="OrderClassId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Order Class
                            </label>
                            <div className="relative flex items-center justify-between">
                              <Field
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                as="select"
                                name="OrderClassId"
                                id="OrderClassId"
                                required
                              >
                                <option value="-1">Choose</option>
                                {dataOrderClass?.data?.map((item: any) => (
                                  <option value={item.id}>{item.name}</option>
                                ))}
                              </Field>
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="OrderStatusId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Status
                            </label>

                            <Field
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                              as="select"
                              name="OrderStatusId"
                              id="OrderStatusId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataOrderStatus?.data?.map((item: any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="ActualDeadline"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Actual Deadline
                            </label>
                            <Field
                              type="date"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                              name="ActualDeadline"
                              required
                            />
                          </div>
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="NormativeDeadline"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Normative Deadline
                            </label>
                            <Field
                              type="date"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                              name="NormativeDeadline"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-start justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="isAccident"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Is Accident
                            </label>
                            <Field
                              as="select"
                              name="IsAccident"
                              id="IsAccident"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option disabled value="-1">
                                Choose
                              </option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </Field>
                          </div>

                          <div className="w-[48%]">
                            <label
                              htmlFor="Description"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Description
                            </label>

                            <Field
                              className="mt-3 w-full min-h-[100px] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              as="textarea"
                              name="Description"
                              id="Description"
                              required
                            ></Field>
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
                              ) : (
                                <img
                                  className="
                                 object-cover object-center w-full h-full"
                                  src={selectedRow.image}
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
      <DealsSubModal
        isOpenSub={isOpenSub}
        closeModalSub={closeModalSub}
        setEmployee={setEmployee}
      />
    </div>
  );
};

export default DealsModal;
