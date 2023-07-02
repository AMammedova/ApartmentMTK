import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const AddBlogModal: React.FC<Props> = ({ isOpen, closeModal }) => {
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
                <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                  >
                    Xəbər, elan əlavə et
                    <XCircleIcon
                      onClick={closeModal}
                      className="w-6 h-6 cursor-pointer fill-icon"
                    />
                  </Dialog.Title>
                  <form action="">
                    <div className="grid gap-4 font-bold">
                      <div className="mt-6">
                        <label
                          htmlFor="solution"
                          className="inline-flex items-center w-1/2 justify-star"
                        >
                          Şəkil
                        </label>
                        <input
                          type="button"
                          disabled
                          value={"Əlavə et"}
                          className="flex items-center justify-center px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex items-center w-1/2 justify-star"
                        >
                          Başlıq
                        </label>
                        <input
                          type="text"
                          className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex items-center w-full justify-star"
                        >
                          Kontent
                        </label>
                        <textarea
                          rows={8}
                          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque justo metus, lacinia ac lorem vitae, efficitur porttitor nulla. Curabitur ac facilisis felis, ac accumsan eros. Duis maximus arcu dolor, vel tristique urna bibendum at. Curabitur odio ante, tristique eu quam eget, auctor ornare erat. Vestibulum condimentum, metus eget eleifend scelerisque, elit elit porttitor purus, pellentesque laoreet nisi arcu vitae nulla. Nulla a lobortis lorem."
                          className="flex items-center justify-center w-full px-5 py-2 mt-3 text-sm font-medium placeholder-gray-400 border rounded-lg border-line bg-background focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end w-full mt-10 font-bold font-inter text-16 leading-30 text-dark">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium font-inter"
                        onClick={closeModal}
                      >
                        İmtina et
                      </button>
                      <button
                        type="submit"
                        className="flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-white border border-transparent rounded-full bg-primary hover:bg-primary-200 focus:outline-none"
                      >
                        Əlavə et
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default AddBlogModal;
