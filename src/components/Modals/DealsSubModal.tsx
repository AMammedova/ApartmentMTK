import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { GetAll } from "../../api";
import useSWR, { mutate } from "swr";

type Props = {
  isOpenSub: boolean;
  closeModalSub: () => void;
  setEmployee: any;
};


const DealsSubModal: React.FC<Props> = ({ isOpenSub, closeModalSub,setEmployee }) => {
  const {
    data: dataEmployee,
    error: errorEmployee,
    isLoading: isLoadingEmployee,
  } = useSWR("/api/Employees/GetAll", (key) => GetAll.user(key));
 
  return (
    <Fragment>
      <Transition appear show={isOpenSub} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalSub}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between font-bold font-inter text-[20px] leading-30 text-dark"
                  >
                    İcraçı
                    <XCircleIcon
                      onClick={closeModalSub}
                      className="w-6 h-6 cursor-pointer fill-icon"
                    />
                  </Dialog.Title>
                  <div className="flex flex-col">
                    {dataEmployee?.data?.map((item: any) => (
                      <div
                        key={item.id}
                        className="mt-4 flex items-center justify-between"
                      >
                        <div className="flex justify-between items-start w-full">
                       
                          <div className="w-[20%]">
                            <img className=" rounded-lg object-cover object-center" src={item.image} alt="" />
                          </div>
                          <div className=" w-[70%] flex flex-col items-start justify-start">
                            <p className="font-bold font-inter text-[16px] leading-30 text-dark">
                              {item.fullName}
                            </p>
                            <p className="font-medium font-inter text-[14px] leading-30 text-icon text-start">
                              {item.jobPosition}
                            </p>
                          </div>
                        </div>
                        <div className="w-1/2 flex justify-end items-center" onClick={()=>{setEmployee(item);closeModalSub()}}>
                          <ArrowRightIcon className="w-6 h-6 cursor-pointer fill-primary text-primary " />
                        </div>
                      </div>
                    ))}
                    {/* <p className="mt-4 font-medium font-inter text-[16px] leading-30 text-primary text-center cursor-pointer">
                      Daha çox
                    </p> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default DealsSubModal;
