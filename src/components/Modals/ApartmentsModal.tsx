import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { CreateApartment } from "../../api";
import { Delete } from "../../api";
import { GetAll } from "../../api";
import { EditApartment } from "../../api";
import { GetbyId } from "../../api";
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
  vendorBuildingId: string;
  apartmentNo: string;
  entranceNo: string;
  area: number;
  floorNo: string;
};

const ApartmentsModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [selectedBuildingId, setSelectedBuildingId] = useState("");
//   const [selectedObjectId, setSelectedObjectId] = useState("");
//   const [floorNumbers, setFloorNumbers] = useState(0);
//   const [entrance, setEntrance] = useState(0);

  
//   const {
//     data: dataBuilding,
//     error: errorBuilding,
//     isLoading: isLoadingBuilding,
//   } = useSWR("/api/VendorBuildings/GetAll", (key) => GetAll.user(key));
//   const {
//     data: dataObjects,
//     error: errorObjects,
//     isLoading: isLoadingObjects,
//   } = useSWR("/api/VendorObjects/GetAll", (key) => GetAll.user(key));
//   const {
//     data: dataBuildingofObjects,
//     error: errorBuildingofObject,
//     isLoading: isLoadingBuildingofObject,
//   } = useSWR(`/api/VendorBuildings/GetAllByObjectId?objectId=${selectedObjectId}`, (key) => GetAll.user(key));
  
// const handleObjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//   setFloorNumbers(0);
//       setEntrance(0);
//   const objectId = e.target.value;
//   setSelectedObjectId(objectId);
// }

// useEffect(() => {
//   if (selectedRow) {
//     setSelectedObjectId(dataObjects?.data?.find(
//       (item: any) =>
//         item.title === selectedRow?.objectName
//     )?.id )
//     setSelectedBuildingId(selectedRow.vendorBuildingId);
//     setFloorNumbers(selectedRow.buildingFloor);
//     setEntrance(selectedRow.buildingEntrance);
//   } else {
//     setSelectedObjectId("");
//     setSelectedBuildingId("");
//     setFloorNumbers(0);
//     setEntrance(0);
//   }
// }, [selectedRow]);
//   const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
//     const buildingId = e.target.value;
//     setSelectedBuildingId(buildingId);
 
//     const selectedBuilding =dataBuildingofObjects?.data?.find(
//       (item: any) => item.id === parseInt(buildingId)
//     );
//     if (selectedBuilding) {
//       setFloorNumbers(selectedBuilding?.floor);
//       setEntrance(selectedBuilding?.entrance);
//     } else {
//       setFloorNumbers(0);
//       setEntrance(0);
//     }

//   };
  


//   const handleSubmit = async (values: Values) => {
//     setIsButtonDisabled(true);
//     const parsedValues = {
//       ...values,
//       vendorBuildingId: parseInt(selectedBuildingId),
//       floorNo: parseInt(values.floorNo),
//     };
//     const res = await useGetResponse(
//       CreateApartment.user("/api/VendorApartment/Create", {
//         arg: parsedValues,
//       }),
//       mutate,
//       closeModal
//     );
//     alert(res);
//     setSelectedObjectId("");
//     setSelectedBuildingId("");
//     setFloorNumbers(0);
//     setEntrance(0);
//     setIsButtonDisabled(false);
//   };

//   const handleEdit = async (values: Values) => {
//     setIsButtonDisabled(true);
//     const parsedValues = {
//       ...values,
//       vendorBuildingId: parseInt(selectedBuildingId),
//       floorNo: parseInt(values.floorNo),
//       id: selectedRow.id,
//     };

//     const res = await useGetResponse(
//       EditApartment.user("/api/VendorApartment/Update", {
//         arg: parsedValues,
//       }),
//       mutate,
//       closeModal
//     );

//     alert(res);
//     setSelectedObjectId("");
//     setSelectedBuildingId("");
//     setFloorNumbers(0);
//     setEntrance(0);
//     setIsButtonDisabled(false);
   
//   };

//   const deleteObject = async (deleteId: any) => {
//     const res = await useGetResponse(
//       Delete.user("/api/VendorApartment/Delete", {
//         arg: { deleteId },
//       }),
//       mutate,
//       closeModal
//     );

//     alert(res);
//   };

//   const handleDelete = () => {
//     deleteObject(deleteId);
//   };
//   const handleCloseModal = () => {
//     setSelectedObjectId("");
//     setSelectedBuildingId("");
//     setFloorNumbers(0);
//     setEntrance(0);
    
//     closeModal();
//   };

const [formData, setFormData] = useState({
  selectedBuildingId: "",
  selectedObjectId: "",
  floorNumbers: 0,
  entrance: 0,
});



const {
  data: dataObjects,
  error: errorObjects,
  isLoading: isLoadingObjects,
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

const handleObjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const objectId = e.target.value;
  setFormData((prevFormData) => ({
    ...prevFormData,
    selectedObjectId: objectId,
    floorNumbers: 0,
    entrance: 0,
  }));
};

useEffect(() => {
  if (selectedRow) {
    const selectedObject = dataObjects?.data?.find(
      (item: any) => item.title === selectedRow?.objectName
    );
    const selectedBuildingId = selectedRow.vendorBuildingId;
    const floorNumbers = selectedRow.buildingFloor;
    const entrance = selectedRow.buildingEntrance;

    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedObjectId: selectedObject?.id || "",
      selectedBuildingId,
      floorNumbers,
      entrance,
    }));
  } else {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedObjectId: "",
      selectedBuildingId: "",
      floorNumbers: 0,
      entrance: 0,
    }));
  }
}, [selectedRow]);

const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const buildingId = e.target.value;
  setFormData((prevFormData) => ({
    ...prevFormData,
    selectedBuildingId: buildingId,
    
  }));

  const selectedBuilding = dataBuildingofObjects?.data?.find(
    (item: any) => item.id === parseInt(buildingId)
  );

  if (selectedBuilding) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      floorNumbers: selectedBuilding.floor,
      entrance: selectedBuilding.entrance,
    }));
  } else {
    setFormData((prevFormData) => ({
      ...prevFormData,
      floorNumbers: 0,
      entrance: 0,
    }));
  }
};

const handleSubmit = async (values: Values) => {
  setIsButtonDisabled(true);

  const parsedValues = {
    ...values,
    vendorBuildingId: parseInt(formData.selectedBuildingId),
    floorNo: parseInt(values.floorNo),
  };

  const res = await useGetResponse(
    CreateApartment.user("/api/VendorApartment/Create", {
      arg: parsedValues,
    }),
    mutate,
    closeModal
  );

  alert(res);

  setFormData({
    selectedBuildingId: "",
    selectedObjectId: "",
    floorNumbers: 0,
    entrance: 0,
  });

  setIsButtonDisabled(false);
};

const handleEdit = async (values: Values) => {
  setIsButtonDisabled(true);

  const parsedValues = {
    ...values,
    vendorBuildingId: parseInt(formData.selectedBuildingId),
    floorNo: parseInt(values.floorNo),
    id: selectedRow.id,
  };

  const res = await useGetResponse(
    EditApartment.user("/api/VendorApartment/Update", {
      arg: parsedValues,
    }),
    mutate,
    closeModal
  );

  alert(res);

  setFormData({
    selectedBuildingId: "",
    selectedObjectId: "",
    floorNumbers: 0,
    entrance: 0,
  });

  setIsButtonDisabled(false);
};

const deleteObject = async (deleteId: any) => {
  const res = await useGetResponse(
    Delete.user("/api/VendorApartment/Delete", {
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

const handleCloseModal = () => {
  setFormData({
    selectedBuildingId: "",
    selectedObjectId: "",
    floorNumbers: 0,
    entrance: 0,
  });

  closeModal();
};

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
                  <Dialog.Panel className="w-full max-w-[40em] p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Add Apartment
                      <XCircleIcon
                        onClick={handleCloseModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        vendorBuildingId: "",
                        apartmentNo: "",
                        entranceNo: "",
                        area: -1,
                        floorNo: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                        <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="vendorObjectId"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Object Name
                            </label>
                            <Field
                              as="select"
                              id="vendorObjectId"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                              name="vendorBuildingId"
                              onChange={handleObjectChange}
                              value={formData.selectedObjectId}
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataObjects?.data.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.title}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="vendorBuildingId"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Building Name
                            </label>
                            <Field
                              as="select"
                              id="vendorBuildingId"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                              name="vendorBuildingId"
                              onChange={handleBuildingChange}
                              value={formData.selectedBuildingId}
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataBuildingofObjects?.data?.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Field>
                          </div>
                        
                       
                        </div>

                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="entranceNo"
                              className="inline-flex items-center justify-start w-1/2"
                            >
                              Entrance No
                            </label>
                            <div className="relative flex items-center justify-between">
                              <Field
                                as="select"
                                id="entranceNo"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                name="entranceNo"
                                required
                              >
                                <option value="-1">Choose</option>
                                {formData.entrance &&
                                  Array.from(
                                    { length: formData.entrance },
                                    (_, index) => (
                                      <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                      </option>
                                    )
                                  )}
                              </Field>
                            </div>
                          </div>

                          <div className="w-[48%]">
                            <label
                              htmlFor="area"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Area
                            </label>
                            <Field
                              type="number"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                              name="area"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="floorNo"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Floor No
                            </label>
                            <div className="relative flex items-center justify-between">
                              <Field
                                as="select"
                                id="floorNo"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                name="floorNo"
                                required
                              >
                                <option value="-1">Choose</option>
                                {formData.floorNumbers &&
                                  Array.from(
                                    { length: formData.floorNumbers },
                                    (_, index) => (
                                      <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                      </option>
                                    )
                                  )}
                              </Field>
                            </div>
                          </div>
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="apartmentNo"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Apartment No
                            </label>
                            <Field
                              type="text"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                              name="apartmentNo"
                              required
                            />
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
                    </Formik>
                  </Dialog.Panel>
                ) : process === "Edit" ? (
                  <Dialog.Panel className="w-full max-w-[40em] p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Edit Apartment
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        vendorBuildingId:
                          dataBuildingofObjects?.data?.find(
                            (item: any) =>
                              item.name === selectedRow?.buildingName
                          )?.id || "",
                        apartmentNo: selectedRow?.apartmentNo || "",
                        entranceNo: selectedRow?.entranceNo || "",
                        area: selectedRow?.area || -1,
                        floorNo: selectedRow?.floorNo || "",
                      }}
                      onSubmit={handleEdit}
                    >
                      {(props) => (
                        <Form>
                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="vendorObjectId"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Object Name
                            </label>
                            <Field
                              as="select"
                              id="vendorObjectId"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                              name="vendorBuildingId"
                              onChange={handleObjectChange}
                              value={formData.selectedObjectId}
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataObjects?.data.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.title}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="vendorBuildingId"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Building Name
                            </label>
                            <Field
                              as="select"
                              id="vendorBuildingId"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                              name="vendorBuildingId"
                              onChange={handleBuildingChange}
                              value={formData.selectedBuildingId}
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataBuildingofObjects?.data?.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Field>
                          </div>
                          
                          </div>

                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="entranceNo"
                                className="inline-flex items-center justify-start w-1/2"
                              >
                                Entrance No
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  as="select"
                                  id="entranceNo"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                  name="entranceNo"
                                  required
                                >
                                  <option value="-1">Choose</option>
                                  {formData.entrance &&
                                    Array.from(
                                      { length: formData.entrance },
                                      (_, index) => (
                                        <option
                                          key={index + 1}
                                          value={index + 1}
                                        >
                                          {index + 1}
                                        </option>
                                      )
                                    )}
                                </Field>
                              </div>
                            </div>

                            <div className="w-[48%]">
                              <label
                                htmlFor="area"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Area
                              </label>
                              <Field
                                type="number"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="area"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                            <div className="w-[48%]">
                              <label
                                htmlFor="floorNo"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Floor No
                              </label>
                              <div className="relative flex items-center justify-between">
                                <Field
                                  as="select"
                                  id="floorNo"
                                  className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                                  name="floorNo"
                                  required
                                >
                                  <option value="-1">Choose</option>
                                  {formData.floorNumbers &&
                                    Array.from(
                                      { length: formData.floorNumbers },
                                      (_, index) => (
                                        <option
                                          key={index + 1}
                                          value={index + 1}
                                        >
                                          {index + 1}
                                        </option>
                                      )
                                    )}
                                </Field>
                              </div>
                            </div>
                            <div className="w-[48%]">
                              {" "}
                              <label
                                htmlFor="apartmentNo"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Apartment No
                              </label>
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="apartmentNo"
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

export default ApartmentsModal;
