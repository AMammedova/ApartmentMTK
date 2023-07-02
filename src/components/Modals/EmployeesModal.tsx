import { Fragment, useEffect, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { Formik, Field, Form, useFormikContext } from "formik";
import useSWR from "swr";
import Multiselect from "multiselect-react-dropdown";
import useGetResponse from "../../hooks/useGetResponse";

import {
  CreateEmployees,
  Delete,
  DeleteEmployees,
  EditEmployees,
} from "../../api";
import { AddObjects } from "../../api";
import { EditObjects } from "../../api";
import { GetAll } from "../../api";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  process: string;
  deleteId: string;
  selectedRow: any;
  mutate: any;
};
interface BuildingObject {
  id: number;
  name: string;
}
export type EmployeeValues = {
  ProfileImage: string;
  name: string;
  surname: string;
  patrionimyc: string;
  hasCompany: string | null;
  jobPosition: string;
  vendorCompanyId: number | null;
  vendorObjectsId: number[];
  vendorBuildingsId: any[];
  roleId: string;
  voen: string;
  email: string;
  phoneNumber: string;
};

const EmployeesModal = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}: Props) => {
  // const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const {
    data: dataVendorCompany,
    error: errVendorCompany,
    isLoading: isLoadingVendorCompany,
  } = useSWR("/api/VendorCompany/GetAllByVendorId", (key) => GetAll.user(key));
  const [formData, setFormData] = useState({
    selectedObjectId: "",
  });
  const {
    data: dataVendorObjects,
    error: errVendorObjects,
    isLoading: isLoadingVendorObjects,
  } = useSWR("/api/VendorObjects/GetAll", (key) => GetAll.user(key));
  const {
    data: dataBuildingofObjects,
    error: errorBuildingofObject,
    isLoading: isLoadingBuildingofObject,
    mutate: mutateBuildingofObjects,
  } = useSWR(
    `/api/VendorBuildings/GetAllByObjectId?objectId=${formData.selectedObjectId}`,
    (key) => GetAll.user(key)
  );
  const [options, setOptions] = useState<Array<{ value: any; label: string }>>(
    []
  );


  
  const [selectedValues, setSelectedValues] = useState<{ value: any; label: string }[]>([]);
const [removedOptions, setRemovedOptions] = useState<{ value: any; label: string }[]>([]);


const handleSelectChange = (selectedList: any, selectedItem: any) => {
  const isAlreadySelected = selectedValues.some((item) => item.value === selectedItem.value);
  if (!isAlreadySelected) {
    setSelectedValues([...selectedValues, selectedItem]);
  }
};
  console.log(selectedValues, "selectedValues");
  const handleSelectRemove = (selectedList:any,removedItem:any) => {
    console.log(selectedList, "selectedList");
    setSelectedValues(selectedList);
    // const selectedValues = selectedList.filter((option: any) => option !== null && option !== undefined).map((option: any)=> option.id);
    setRemovedOptions((prevRemovedOptions) => [...prevRemovedOptions, removedItem]);

    console.log(selectedValues, "selectedValues");
  };
  

  useEffect(() => {
    if (dataBuildingofObjects && dataBuildingofObjects.data) {
      const extractedOptions: { value: any; label: string }[] =
        dataBuildingofObjects.data.map((item: BuildingObject) => ({
          label: item.name,
        value: item.id,
      
        }));
      setOptions(extractedOptions);
    }
  }, [dataBuildingofObjects]);
  console.log(options, "options");
  console.log(dataBuildingofObjects?.data, "options1");
  const handleObjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const objectId = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedObjectId: objectId,
    }));
    console.log(objectId, "objectId");
  };

  useEffect(() => {
    if (selectedRow) {
      const selectedObject = dataVendorObjects?.data?.find(
        (item: any) => item.title === selectedRow?.objectName
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedObjectId: selectedObject?.id || "",
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedObjectId: "",
      }));
    }
  }, [selectedRow]);

  const {
    data: dataVendorBuildingsId,
    error: errVendorBuildingsId,
    isLoading: isLoadingVendorBuildingsId,
  } = useSWR("/api/VendorBuildings/GetAll", (key) => GetAll.user(key));

  const {
    data: dataRoleAdmin,
    error: errRoleAdmin,
    isLoading: isLoadingRoleAdmin,
  } = useSWR("/api/Role/GetAll", (key) => GetAll.user(key));

  const [hasCompanyBoolean, setHasCompanyBoolean] = useState("false");

  const [selectedImage, setSelectedImage] = useState(null);
  const handleChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const handleSubmit = async (values: EmployeeValues) => {
    console.log(values, "values");
    const parsedValues = {
      ...values,
      ProfilImage: selectedImage,
    };

    const res = await useGetResponse(
      CreateEmployees.user("/api/Employess/Create", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
    setSelectedImage(null);
  };

  const handleEdit = async (values: EmployeeValues) => {
    const parsedValues = {
      ...values,
      id: selectedRow.id,
    };

    const res = await useGetResponse(
      EditEmployees.user("/api/Employees/Update", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
  };

  const deleteObject = async (deleteId: string) => {
    const res = await useGetResponse(
      Delete.user(`/api/Employees/Delete`, {
        arg: {
          deleteId,
        },
      }),
      mutate,
      closeModal
    );

    alert(res);
  };

  const handleDelete = () => {
    deleteObject(deleteId);
  };
  const handleClose = () => {
    closeModal();
    setSelectedImage(null);
    setHasCompanyBoolean("false");
  };

  if (
    isLoadingVendorCompany &&
    isLoadingVendorObjects &&
    isLoadingVendorBuildingsId &&
    isLoadingRoleAdmin
  )
    <div>Loading...</div>;

  if (
    errVendorCompany &&
    errVendorObjects &&
    errVendorBuildingsId &&
    errRoleAdmin
  )
    <div>Err</div>;

  const vendorCompanyIds = dataVendorCompany?.data?.map(
    ({ id, companyName }: { id: number; companyName: string }) => ({
      id,
      companyName,
    })
  );

  const vendorObjectsIds = dataVendorObjects?.data?.map(
    ({ id, title }: { id: number; title: string }) => ({
      id,
      title,
    })
  );

  const vendorBuildingsIds = dataVendorBuildingsId?.data?.map(
    ({ id }: { id: number }) => ({
      id,
    })
  );

  const roleAdminIds = dataRoleAdmin?.data?.map(
    ({ id, name }: { id: string; name: string }) => ({
      id,
      name,
    })
  );
  {
    console.log(vendorObjectsIds);
  }

  console.log(selectedRow);
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                  <Dialog.Panel className="w-full h-[80vh] max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl overflow-y-auto">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Add Employee
                      <XCircleIcon
                        onClick={handleClose}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        ProfileImage: "",
                        name: "",
                        surname: "",
                        patrionimyc: "",
                        hasCompany: null,
                        jobPosition: "",
                        vendorCompanyId: null,
                        vendorObjectsId: [],
                        vendorBuildingsId: [],
                        roleId: "",
                        voen: "",
                        email: "",
                        phoneNumber: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      {(formikProps) => (
                        <Form action="">
                          <div className="grid items-center justify-between grid-cols-2 gap-4 mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div>
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

                            <div>
                              <label
                                htmlFor="surname"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Surname
                              </label>
                              <Field
                                name="surname"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="patrionimyc"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Patrionimyc
                              </label>
                              <Field
                                name="patrionimyc"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="username"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Username
                              </label>
                              <Field
                                name="username"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="password"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Password
                              </label>
                              <Field
                                name="password"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="email"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Email
                              </label>
                              <Field
                                name="email"
                                type="email"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="jobPosition"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Job Position
                              </label>
                              <Field
                                name="jobPosition"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="voen"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Voen
                              </label>
                              <Field
                                name="voen"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="phoneNumber"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Phone Number
                              </label>
                              <Field
                                name="phoneNumber"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="hasCompany"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Has Company
                              </label>
                              <Field
                                name="hasCompany"
                                as="select"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  setHasCompanyBoolean(e.target.value);
                                  formikProps.setFieldValue(
                                    "hasCompany",
                                    e.target.value
                                  );
                                  if (e.target.value === "true") {
                                    console.log(
                                      e.target.value === "true",
                                      "bn"
                                    );
                                    // Reset the values of building, company, and object fields
                                    formikProps.setFieldValue(
                                      "vendorCompanyId",
                                      null
                                    );
                                    formikProps.setFieldValue(
                                      "vendorObjectsId",
                                      []
                                    );
                                    formikProps.setFieldValue(
                                      "vendorBuildingsId",
                                      []
                                    );
                                    formikProps.setFieldValue("roleId", "");
                                  }
                                }}
                                required
                              >
                                <option value="" selected disabled>
                                  Select
                                </option>
                                <option value={"true"}>true</option>
                                <option value={"false"}>false</option>
                              </Field>
                            </div>

                            <div>
                              <label
                                htmlFor="ProfileImage"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                ProfileImage
                              </label>

                              <input
                                type="file"
                                id="ProfileImage"
                                name="ProfileImage"
                                accept="ProfileImage/*"
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

                          {hasCompanyBoolean === "true" ? (
                            <div className="grid items-center justify-between grid-cols-2 gap-4 mt-10 font-bold font-inter text-16 leading-30 text-dark">
                              <div>
                                <label
                                  htmlFor="vendorCompanyId"
                                  className="inline-flex items-center "
                                >
                                  Vendor Company
                                </label>
                                <Field
                                  as="select"
                                  name="vendorCompanyId"
                                  id="vendorCompanyId"
                                  className="flex items-center justify-center px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"

                                  // required
                                >
                                  <option value="" selected disabled>
                                    Choose
                                  </option>
                                  {vendorCompanyIds?.map(
                                    ({
                                      id,
                                      companyName,
                                    }: {
                                      id: number;
                                      companyName: string;
                                    }) => (
                                      <option key={id} value={id}>
                                        {companyName}
                                      </option>
                                    )
                                  )}
                                </Field>
                              </div>

                              <div>
                                <label
                                  htmlFor="vendorObjectsId"
                                  className="inline-flex items-center "
                                >
                                  Vendor Objects
                                </label>
                                <Field
                                  as="select"
                                  name="vendorObjectsId"
                                  id="vendorObjectsId"
                                  onChange={handleObjectChange}
                                  value={formData.selectedObjectId}
                                  className="flex items-center justify-center px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  required
                                >
                                  <option value="" selected disabled>
                                    Choose
                                  </option>
                                  {vendorObjectsIds?.map(
                                    ({
                                      id,
                                      title,
                                    }: {
                                      id: number;
                                      title: string;
                                    }) => (
                                      <option key={id} value={id}>
                                        {title}
                                      </option>
                                    )
                                  )}
                                </Field>
                              </div>

                              <div>
                                <label
                                  htmlFor="vendorBuildingsId"
                                  className="inline-flex items-center "
                                >
                                  Vendor Building
                                </label>
                                {/* <Field
                                  as="select"
                                  name="vendorBuildingsId"
                                  id="vendorBuildingsId"
                                  multiple
                                  value={selectedValues}
                                  onChange={handleSelectChange}
                                  className="flex items-center justify-center px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  required
                                >
                                  <option value="" selected disabled>
                                    Choose
                                  </option>
                                  {dataBuildingofObjects?.data?.map(
                                    (item: any) => (
                                      <option key={item.id} value={item.id}>
                                        {item.name}
                                      </option>
                                    )
                                  )}
                                </Field> */}
                                <Multiselect
                                  // isObject={false}
                                  // options={options}
                                  // selectedValues={selectedValues}
                                  // onSelect={handleSelectChange}
                                  // onRemove={handleSelectRemove}
                                  // displayValue="label"
                                  // placeholder="Select options"
                                  // showCheckbox

                                  options={options}
                                  // isObject={false}
                                  onSelect={handleSelectChange}
                                  onRemove={handleSelectRemove}
                                  displayValue="label"
                                  closeIcon="cancel"
                                  placeholder="Select Options"
                                  selectedValues={selectedValues}
                                  className="multiSelectContainer"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="roleId"
                                  className="inline-flex items-center "
                                >
                                  Role Name
                                </label>
                                <Field
                                  as="select"
                                  name="roleId"
                                  id="roleId"
                                  className="flex items-center justify-center px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                  // required
                                >
                                  <option value="" selected disabled>
                                    Choose
                                  </option>
                                  {roleAdminIds?.map(
                                    ({
                                      id,
                                      name,
                                    }: {
                                      id: string;
                                      name: string;
                                    }) => (
                                      <option key={id} value={id}>
                                        {name}
                                      </option>
                                    )
                                  )}
                                </Field>
                              </div>
                            </div>
                          ) : null}

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
                      Edit Employee
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={
                        selectedRow || {
                          ProfileImage: "",
                          name: "",
                          surname: "",
                          patrionimyc: "",
                          hasCompany: null,
                          jobPosition: "",
                          vendorCompanyId: null,
                          vendorObjectsId: [],
                          vendorBuildingsId: [],
                          roleId: "",
                          voen: "",
                          email: "",
                          phoneNumber: "",
                        }
                      }
                      onSubmit={handleEdit}
                    >
                      {(formikProps) => (
                        <Form action="">
                          <div className="grid items-center justify-between grid-cols-2 gap-4 mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div>
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

                            <div>
                              <label
                                htmlFor="surname"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Surname
                              </label>
                              <Field
                                name="surname"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="patrionimyc"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Patrionimyc
                              </label>
                              <Field
                                name="patrionimyc"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="username"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Username
                              </label>
                              <Field
                                name="username"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="password"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Password
                              </label>
                              <Field
                                name="password"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="email"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Email
                              </label>
                              <Field
                                name="email"
                                type="email"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="jobPosition"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Job Position
                              </label>
                              <Field
                                name="jobPosition"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="voen"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Voen
                              </label>
                              <Field
                                name="voen"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="phoneNumber"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Phone Number
                              </label>
                              <Field
                                name="phoneNumber"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="hasCompany"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Has Company
                              </label>
                              <Field
                                name="hasCompany"
                                as="select"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              >
                                <option value="" selected disabled>
                                  Select
                                </option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                              </Field>
                            </div>

                            <div>
                              <label
                                htmlFor="ProfileImage"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                ProfileImage
                              </label>

                              <input
                                type="file"
                                id="ProfileImage"
                                name="ProfileImage"
                                accept="ProfileImage/*"
                                onChange={(event) => {
                                  const file = (
                                    event.currentTarget as HTMLInputElement
                                  ).files?.[0];
                                  formikProps.setFieldValue(
                                    "ProfileImage",
                                    file
                                  );
                                }}
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid items-center justify-between grid-cols-2 gap-4 mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div>
                              <label
                                htmlFor="vendorCompanyId"
                                className="inline-flex items-center "
                              >
                                Vendor Company
                              </label>
                              <Field
                                as="select"
                                name="vendorCompanyId"
                                id="vendorCompanyId"
                                className="flex items-center justify-center px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                required
                              >
                                <option value="" selected disabled>
                                  Choose
                                </option>
                                {vendorCompanyIds?.map(
                                  ({
                                    id,
                                    companyName,
                                  }: {
                                    id: number;
                                    companyName: string;
                                  }) => (
                                    <option key={id} value={id}>
                                      {companyName}
                                    </option>
                                  )
                                )}
                              </Field>
                            </div>

                            <div>
                              <label
                                htmlFor="vendorObjectsId"
                                className="inline-flex items-center "
                              >
                                Vendor Objects
                              </label>
                              <Field
                                as="select"
                                name="vendorObjectsId"
                                id="vendorObjectsId"
                                className="flex items-center justify-center px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                required
                              >
                                <option value="" selected disabled>
                                  Choose
                                </option>
                                {vendorObjectsIds?.map(
                                  ({
                                    id,
                                    title,
                                  }: {
                                    id: number;
                                    title: string;
                                  }) => (
                                    <option key={id} value={id}>
                                      {title}
                                    </option>
                                  )
                                )}
                              </Field>
                            </div>

                            {formikProps.values.hasCompany === "true" ? (
                              <div className="grid items-center justify-between grid-cols-2 gap-4 mt-10 font-bold font-inter text-16 leading-30 text-dark">
                                <div>
                                  <label
                                    htmlFor="vendorCompanyId"
                                    className="inline-flex items-center "
                                  >
                                    Vendor Company
                                  </label>
                                  <Field
                                    as="select"
                                    name="vendorCompanyId"
                                    id="vendorCompanyId"
                                    className="flex items-center justify-center px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                    // required
                                  >
                                    <option value="" selected disabled>
                                      Choose
                                    </option>
                                    {vendorCompanyIds?.map(
                                      ({
                                        id,
                                        companyName,
                                      }: {
                                        id: number;
                                        companyName: string;
                                      }) => (
                                        <option key={id} value={id}>
                                          {companyName}
                                        </option>
                                      )
                                    )}
                                  </Field>
                                </div>

                                <div>
                                  <label
                                    htmlFor="vendorObjectsId"
                                    className="inline-flex items-center "
                                  >
                                    Vendor Objects
                                  </label>
                                  <Field
                                    as="select"
                                    name="vendorObjectsId"
                                    id="vendorObjectsId"
                                    className="flex items-center justify-center px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                    required
                                  >
                                    <option value="" selected disabled>
                                      Choose
                                    </option>
                                    {vendorObjectsIds?.map(
                                      ({
                                        id,
                                        title,
                                      }: {
                                        id: number;
                                        title: string;
                                      }) => (
                                        <option key={id} value={id}>
                                          {title}
                                        </option>
                                      )
                                    )}
                                  </Field>
                                </div>

                                <div>
                                  <label
                                    htmlFor="vendorBuildingsId"
                                    className="inline-flex items-center "
                                  >
                                    Vendor Building
                                  </label>
                                  <Field
                                    as="select"
                                    name="vendorBuildingsId"
                                    id="vendorBuildingsId"
                                    className="flex items-center justify-center px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                    required
                                  >
                                    <option value="" selected disabled>
                                      Choose
                                    </option>
                                    {vendorBuildingsIds?.map(
                                      ({ id }: { id: number }) => (
                                        <option key={id} value={id}>
                                          {id}
                                        </option>
                                      )
                                    )}
                                  </Field>
                                </div>

                                <div>
                                  <label
                                    htmlFor="roleId"
                                    className="inline-flex items-center "
                                  >
                                    Role Name
                                  </label>
                                  <Field
                                    as="select"
                                    name="roleId"
                                    id="roleId"
                                    className="flex items-center justify-center px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                    required
                                  >
                                    <option value="" selected disabled>
                                      Choose
                                    </option>
                                    {roleAdminIds?.map(
                                      ({
                                        id,
                                        name,
                                      }: {
                                        id: string;
                                        name: string;
                                      }) => (
                                        <option key={id} value={id}>
                                          {name}
                                        </option>
                                      )
                                    )}
                                  </Field>
                                </div>
                              </div>
                            ) : null}

                            <div>
                              <label
                                htmlFor="roleId"
                                className="inline-flex items-center "
                              >
                                Role Name
                              </label>
                              <Field
                                as="select"
                                name="roleId"
                                id="roleId"
                                className="flex items-center justify-center px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                required
                              >
                                <option value="" selected disabled>
                                  Choose
                                </option>
                                {roleAdminIds?.map(
                                  ({
                                    id,
                                    name,
                                  }: {
                                    id: string;
                                    name: string;
                                  }) => (
                                    <option key={id} value={id}>
                                      {name}
                                    </option>
                                  )
                                )}
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

export default EmployeesModal;
