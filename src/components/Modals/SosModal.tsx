import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const SosModal: React.FC<Props> = ({ isOpen, closeModal }) => {
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
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                  >
                    Düzəliş et
                    <XCircleIcon
                      onClick={closeModal}
                      className="w-6 h-6 cursor-pointer fill-icon"
                    />
                  </Dialog.Title>
                  <div className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                    Həll olundu?
                    <label
                      htmlFor="solution"
                      className="inline-flex relative justify-center items-center cursor-pointer w-[26px] h-[26px]"
                    >
                      <input
                        id="solution"
                        type="checkbox"
                        className="w-6 h-6 transition duration-150 ease-in-out border rounded-md outline-none appearance-none checked:border-0 checked:bg-success"
                      />

                      <CheckIcon className="absolute w-4 h-4 fill-white" />
                    </label>
                  </div>

                  <div className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                    Məlumat
                  </div>
                  <textarea className="mt-5 w-full h-[80px] rounded-lg border-line border flex justify-center items-center px-5 py-1 bg-background">
                    Lorem ipsum dolor sit amet consectetur adisipisicing elit
                  </textarea>

                  <div className="flex items-center justify-between gap-4 mt-10 font-bold font-inter text-16 leading-30 text-dark">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-1/2 px-2 py-4 text-sm font-medium text-red-400 rounded-full outline font-inter"
                    >
                      Sil
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center w-1/2 px-2 py-4 text-sm font-medium text-white border border-transparent rounded-full bg-primary hover:bg-primary-200 focus:outline-none"
                    >
                      Saxla
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default SosModal;
