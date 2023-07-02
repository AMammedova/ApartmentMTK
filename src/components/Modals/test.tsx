import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import useSWR from "swr";
import useGetResponse from "../../hooks/useGetResponse";
import { Delete } from "../../api";
import { CreateResident } from "../../api";
import { EditObjects } from "../../api";
import { GetAll } from "../../api";
import { Formik, Field, Form } from "formik";
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
  FatherName: string;
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
  const {
    data: dataCompany,
    error: errorCompany,
    isLoading: isLoadingCompany,
  } = useSWR("/api/VendorCompany/GetAllByVendorId", (key) => GetAll.user(key));

  const handleSubmit = async (values: Values) => {
    console.log(values, "values");

    const parsedValues = {
      ...values,
      VendorCompanyId: Number(values.VendorCompanyId),
    };

    console.log(parsedValues, "parsedValues");

    const formData = new FormData();
    formData.append("Name", parsedValues.Name);
    formData.append("Surname", parsedValues.Surname);
    formData.append("FatherName", parsedValues.FatherName);
    formData.append("Phonenumber", parsedValues.Phonenumber);
    formData.append("Email", parsedValues.Email);
    if (parsedValues.Image) {
      formData.append("Image", parsedValues.Image);
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
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  {process === "Add" && (
                    <Formik
                      initialValues={{
                        Name: "",
                        Surname: "",
                        FatherName: "",
                        Phonenumber: "",
                        Email: "",
                        Image: null,
                        VendorCompanyId: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      {(formikProps) => (
                        <Form>
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Create Resident
                          </Dialog.Title>
                          <div className="mt-2 space-y-6">
                            <div>
                              <label
                                htmlFor="Name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Name
                              </label>
                              <div className="mt-1">
                                <Field
                                  type="text"
                                  id="Name"
                                  name="Name"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="Surname"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Surname
                              </label>
                              <div className="mt-1">
                                <Field
                                  type="text"
                                  id="Surname"
                                  name="Surname"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="FatherName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Father Name
                              </label>
                              <div className="mt-1">
                                <Field
                                  type="text"
                                  id="FatherName"
                                  name="FatherName"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="Phonenumber"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Phone Number
                              </label>
                              <div className="mt-1">
                                <Field
                                  type="text"
                                  id="Phonenumber"
                                  name="Phonenumber"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="Email"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Email
                              </label>
                              <div className="mt-1">
                                <Field
                                  type="email"
                                  id="Email"
                                  name="Email"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="Image"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Image
                              </label>
                              <div className="mt-1">
                                <input
                                  type="file"
                                  id="Image"
                                  name="Image"
                                  accept="image/*"
                                  onChange={(event) => {
                                    const file = (
                                      event.currentTarget as HTMLInputElement
                                    ).files?.[0];
                                    formikProps.setFieldValue("Image", file);
                                  }}
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="VendorCompanyId"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Vendor Company
                              </label>
                              <div className="mt-1">
                               
                                <Field
                                  as="select"
                                  name="VendorCompanyId"
                                  id="VendorCompanyId"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                  required
                                >
                                  <option value="-1">Choose</option>{" "}
                                  {dataCompany?.data.map((item: any) => (
                                    <option value={item.id} key={item.id}>
                                      {item.companyName}{" "}
                                    </option>
                                  ))}{" "}
                                </Field>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <button
                              type="submit"
                              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-hover"
                            >
                              Create
                            </button>
                            <button
                              type="button"
                              onClick={closeModal}
                              className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-hover"
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}

                  {process === "edit" && (
                    <Formik
                      initialValues={{
                        Name: selectedRow.Name,
                        Surname: selectedRow.Surname,
                        FatherName: selectedRow.FatherName,
                        Phonenumber: selectedRow.Phonenumber,
                        Email: selectedRow.Email,
                        Image: null,
                        VendorCompanyId: String(selectedRow.VendorCompanyId),
                      }}
                      onSubmit={handleSubmit}
                    >
                      {(formikProps) => (
                        <Form>
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Edit Resident
                          </Dialog.Title>
                          <div className="mt-2 space-y-6">
                            <div>
                              <label
                                htmlFor="Name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Name
                              </label>
                              <div className="mt-1">
                                <Field
                                  type="text"
                                  id="Name"
                                  name="Name"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="Surname"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Surname
                              </label>
                              <div className="mt-1">
                                <Field
                                  type="text"
                                  id="Surname"
                                  name="Surname"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="FatherName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Father Name
                              </label>
                              <div className="mt-1">
                                <Field
                                  type="text"
                                  id="FatherName"
                                  name="FatherName"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="Phonenumber"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Phone Number
                              </label>
                              <div className="mt-1">
                                <Field
                                  type="text"
                                  id="Phonenumber"
                                  name="Phonenumber"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="Email"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Email
                              </label>
                              <div className="mt-1">
                                <Field
                                  type="email"
                                  id="Email"
                                  name="Email"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="Image"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Image
                              </label>
                              <div className="mt-1">
                                {/* <input
                                  type="file"
                                  id="Image"
                                  name="Image"
                                  accept="image/*"
                                  onChange={(event) => {
                                    formikProps.setFieldValue(
                                      "Image",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                /> */}
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="VendorCompanyId"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Vendor Company
                              </label>
                              <div className="mt-1">
                                //{" "}
                                <Field
                                  as="select"
                                  name="VendorCompanyId"
                                  id="VendorCompanyId"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                  required
                                >
                                  {" "}
                                  <option value="-1">Choose</option>{" "}
                                  {dataCompany?.data.map((item: any) => (
                                    <option value={item.id} key={item.id}>
                                      {item.companyName}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <button
                              type="submit"
                              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-hover"
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              onClick={closeModal}
                              className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-hover"
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}

                  <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover"
                      onClick={closeModal}
                    >
                      <span className="sr-only">Close</span>
                      <XCircleIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ResidentsModal;
