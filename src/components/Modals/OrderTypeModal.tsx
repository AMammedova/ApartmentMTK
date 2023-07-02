import { Fragment, useState,useEffect } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { Formik, Field, Form } from "formik";
import useSWR from "swr";

import useGetResponse from "../../hooks/useGetResponse";

import { Delete } from "../../api";
import { AddOrderType } from "../../api";
import { EditOrderType } from "../../api";
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
  name: string;
  paymentType: string;
  prepaymentType: string;
  priceType: string;
  fromPrice?: number;
  toPrice?: number;
  stable?: number;
};

const OrderTypeModal = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}: Props) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [paymentType, setPaymentType] = useState("false");
  const [priceType, setPriceType] = useState("");
  console.log(selectedRow, "selectedRow");
  const handleSubmit = async (values: Values) => {
    console.log(values, "values");
    setIsButtonDisabled(true);
    const parsedValues = {
      ...values,
      paymentType: values.paymentType === "true",
      prepaymentType: parseInt(values.prepaymentType),
      priceType: parseInt(values.priceType),
    };

    const res = await useGetResponse(
      AddOrderType.user("/api/OrderTypeAdmin/Create", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
    setPaymentType("false");
    setPriceType("");
    setIsButtonDisabled(false);
  };

  useEffect(() => {
    if (selectedRow) {
      setPaymentType(selectedRow.paymentType.toString());
      setPriceType(selectedRow.priceType.toString());
    } else {
      setPaymentType("false");
      setPriceType("");
    }
  }, [selectedRow]);
  
useEffect(() => {
  if(isOpen){
    if(process==="Add"){
      setPaymentType("false");
      setPriceType("");
      
    }
    else{
      setPaymentType(selectedRow.paymentType.toString());
      setPriceType(selectedRow.priceType.toString());
    }
  }
 
},[isOpen])
  const handleEdit = async (values: Values) => {
    setIsButtonDisabled(true);
    const parsedValues = {
      ...values,
      paymentType: values.paymentType === "true",
      prepaymentType: values.paymentType==="true" ? parseInt(values.prepaymentType):-1,
      priceType:  values.paymentType==="true" ? parseInt(values.priceType) :-1,
      
      fromPrice:values.paymentType==="true" && (values.priceType==="1" || values.priceType==="2") ? values.fromPrice: -1,
      toPrice:values.paymentType==="true" && values.priceType==="1" ? values.toPrice : -1,
      stable:values.paymentType==="true" && values.priceType==="0" ? values.stable : -1,
      id: selectedRow.id,
    };

    const res = await useGetResponse(
      EditOrderType.user("/api/OrderTypeAdmin/Update", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
    setPaymentType("false");
    setPriceType("");
    setIsButtonDisabled(false);
  };

  const deleteObject = async (deleteId: any) => {
    setIsButtonDisabled(true);
    const res = await useGetResponse(
      Delete.user("/api/OrderTypeAdmin/Delete", {
        arg: { deleteId },
      }),
      mutate,
      closeModal
    );

    alert(res);
    setPaymentType("false");
    setPriceType("");
    setIsButtonDisabled(false);

  };

  const handleDelete = () => {
    deleteObject(deleteId);
  };
const handleCloseModal=()=>{
closeModal();
setIsButtonDisabled(false);

}


  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
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
                      Add Order Type
                      <XCircleIcon
                        onClick={handleCloseModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        name: "",
                        paymentType: "false",
                        prepaymentType: "-1",
                        priceType: "-1",
                        fromPrice: -1,
                        toPrice: -1,
                        stable: -1,
                      }}
                      onSubmit={handleSubmit}
                    >
                      {(props) => (
                        <Form action="">
                          <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-1/2">
                              <label
                                htmlFor="name"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Name
                              </label>
                              <Field
                                name="name"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div className="w-1/2">
                              <label
                                htmlFor="paymentType"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Payment Type
                              </label>
                              <Field
                                as="select"
                                name="paymentType"
                                id="paymentType"
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  setPaymentType(e.target.value);
                                  props.setFieldValue(
                                    "paymentType",
                                    e.target.value
                                  );
                                }}
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              >
                                <option value="-1">Choose</option>
                                <option value="true">Odenisli</option>
                                <option value="false">Odenissiz</option>
                              </Field>
                            </div>
                          </div>
                          {paymentType === "true" && (
                            <>
                              {" "}
                              <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                                <div className="w-1/2">
                                  <label
                                    htmlFor="prepaymentType"
                                    className="inline-flex items-center w-1/2 justify-star"
                                  >
                                    Prepayment
                                  </label>
                                  <Field
                                    as="select"
                                    name="prepaymentType"
                                    id="prepaymentType"
                                    className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                    required
                                  >
                                    <option value="-1">Choose</option>
                                    <option value="1">
                                      Advance payment required
                                    </option>
                                    <option value="0">
                                      No advance payment is required
                                    </option>
                                  </Field>
                                </div>
                                <div className="w-1/2">
                                  <label
                                    htmlFor="priceType"
                                    className="inline-flex items-center w-1/2 justify-star"
                                  >
                                    Price Type
                                  </label>
                                  <Field
                                    as="select"
                                    name="priceType"
                                    id="priceType"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLSelectElement>
                                    ) => {
                                      setPriceType(e.target.value);
                                      props.setFieldValue(
                                        "priceType",
                                        e.target.value
                                      );
                                    }}
                                    className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                    required
                                  >
                                    <option value="-1">Choose</option>
                                    <option value="0">Stable</option>
                                    <option value="1">From/To</option>
                                    <option value="2">From</option>
                                    <option value="3">Not mentioned</option>
                                  </Field>
                                </div>
                              </div>
                              {priceType === "1" && (
                                <>
                                  <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                                    <div className="w-1/2">
                                      <label
                                        htmlFor="fromPrice"
                                        className="inline-flex items-center w-1/2 justify-star"
                                      >
                                        From
                                      </label>
                                      <Field
                                        name="fromPrice"
                                        type="number"
                                        className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                        required
                                      />
                                    </div>
                                    <div className="w-1/2">
                                      <label
                                        htmlFor="toPrice"
                                        className="inline-flex items-center w-1/2 justify-star"
                                      >
                                        To
                                      </label>
                                      <Field
                                        name="toPrice"
                                        type="number"
                                        className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                        required
                                      />
                                    </div>
                                  </div>
                                </>
                              )}
                              {priceType === "0" && (
                                <>
                                  <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                                    <div className="w-1/2">
                                      <label
                                        htmlFor="stable"
                                        className="inline-flex items-center w-1/2 justify-star"
                                      >
                                        Stable
                                      </label>
                                      <Field
                                        name="stable"
                                        type="number"
                                        className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                        required
                                      />
                                    </div>
                                  </div>
                                </>
                              )}
                              {priceType === "2" && (
                                <>
                                  <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                                    <div className="w-1/2">
                                      <label
                                        htmlFor="fromPrice"
                                        className="inline-flex items-center w-1/2 justify-star"
                                      >
                                        From
                                      </label>
                                      <Field
                                        name="fromPrice"
                                        type="number"
                                        className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                        required
                                      />
                                    </div>
                                  </div>
                                </>
                              )}
                            </>
                          )}
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
                      Edit Order Type
                      <XCircleIcon
                        onClick={handleCloseModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        name: selectedRow?.name || "",
                        paymentType: selectedRow.paymentType.toString() || "false",
                        prepaymentType: selectedRow.prepaymentType.toString() || "-1",
                        priceType: selectedRow.priceType.toString() || "-1",
                        fromPrice: selectedRow.fromPrice || -1,
                        toPrice: selectedRow.toPrice || -1,
                        stable: selectedRow.stable || -1,
                      }}
                      onSubmit={handleEdit}
                    >
                      {(props) => (
                        <Form action="">
                          <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-1/2">
                              <label
                                htmlFor="name"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Name
                              </label>
                              <Field
                                name="name"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div className="w-1/2">
                              <label
                                htmlFor="paymentType"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Payment Type
                              </label>
                              <Field
                                as="select"
                                name="paymentType"
                                id="paymentType"
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  setPaymentType(e.target.value);
                                  props.setFieldValue(
                                    "paymentType",
                                    e.target.value
                                  );
                                }}
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              >
                                <option value="-1">Choose</option>
                                <option value="true">Odenisli</option>
                                <option value="false">Odenissiz</option>
                              </Field>
                            </div>
                          </div>
                          {paymentType === "true" &&
                           (
                            <>
                              
                              <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                                <div className="w-1/2">
                                  <label
                                    htmlFor="prepaymentType"
                                    className="inline-flex items-center w-1/2 justify-star"
                                  >
                                    Prepayment
                                  </label>
                                  <Field
                                    as="select"
                                    name="prepaymentType"
                                    id="prepaymentType"
                                    className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                    required
                                  >
                                    <option value="-1">Choose</option>
                                    <option value="1">
                                      Advance payment required
                                    </option>
                                    <option value="0">
                                      No advance payment is required
                                    </option>
                                  </Field>
                                </div>
                                <div className="w-1/2">
                                  <label
                                    htmlFor="priceType"
                                    className="inline-flex items-center w-1/2 justify-star"
                                  >
                                    Price Type
                                  </label>
                                  <Field
                                    as="select"
                                    name="priceType"
                                    id="priceType"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLSelectElement>
                                    ) => {
                                      setPriceType(e.target.value);
                                      props.setFieldValue(
                                        "priceType",
                                        e.target.value
                                      );
                                    }}
                                    className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                    required
                                  >
                                    <option value="-1">Choose</option>
                                    <option value="0">Stable</option>
                                    <option value="1">From/To</option>
                                    <option value="2">From</option>
                                    <option value="3">Not mentioned</option>
                                  </Field>
                                </div>
                              </div>
                              {
                                priceType === "1" && (
                                  <>
                                    <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                                      <div className="w-1/2">
                                        <label
                                          htmlFor="fromPrice"
                                          className="inline-flex items-center w-1/2 justify-star"
                                        >
                                          From
                                        </label>
                                        <Field
                                          name="fromPrice"
                                          type="number"
                                          className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                          required
                                        />
                                      </div>
                                      <div className="w-1/2">
                                        <label
                                          htmlFor="toPrice"
                                          className="inline-flex items-center w-1/2 justify-star"
                                        >
                                          To
                                        </label>
                                        <Field
                                          name="toPrice"
                                          type="number"
                                          className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                          required
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}
                              {priceType === "0" && (
                                <>
                                  <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                                    <div className="w-1/2">
                                      <label
                                        htmlFor="stable"
                                        className="inline-flex items-center w-1/2 justify-star"
                                      >
                                        Stable
                                      </label>
                                      <Field
                                        name="stable"
                                        type="number"
                                        className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                        required
                                      />
                                    </div>
                                  </div>
                                </>
                              )}
                              {priceType === "2" && (
                                <>
                                  <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                                    <div className="w-1/2">
                                      <label
                                        htmlFor="fromPrice"
                                        className="inline-flex items-center w-1/2 justify-star"
                                      >
                                        From
                                      </label>
                                      <Field
                                        name="fromPrice"
                                        type="number"
                                        className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                        required
                                      />
                                    </div>
                                  </div>
                                </>
                              )}
                            </>
                          )}
                          <div className="flex items-center justify-around w-full mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-red-400 rounded-full outline font-inter"
                              onClick={handleDelete}
                              disabled={isButtonDisabled}
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

export default OrderTypeModal;
