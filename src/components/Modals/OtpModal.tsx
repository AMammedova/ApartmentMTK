import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { redirect, useNavigate } from "react-router-dom";
import { LoginApprove } from "../../api";
import useSWR from "swr";
import { useRef } from "react";
import useSWRMutation from "swr/mutation";
import jwt_decode from "jwt-decode";

type Props = {
  isOpen: boolean;
  username: string;
  closeModal: () => void;
};
interface DecodedToken {
  [key: string]: string;
  // Add any other properties you expect in the decoded token
}
const OtpModal: React.FC<Props> = ({ isOpen, closeModal, username }) => {
  const [smsCode, setSmscode] = useState<string>("");
  // const { data, error, isLoading } = useSWR(
  //   isLogged ? "/api/AccountAdmin/LoginApproveAdmin" : null,
  //   (key) => LoginApprove.user(key, { username, smsCode })
  // );

  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/AccountAdmin/LoginApproveAdmin",
    LoginApprove.user
  );

  const nav = useNavigate();

  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);
  const input4Ref = useRef<HTMLInputElement>(null);
  const input5Ref = useRef<HTMLInputElement>(null);
  const input6Ref = useRef<HTMLInputElement>(null);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    if (val.length === event.currentTarget.maxLength) {
      // Set the focus on the next input field
      switch (event.currentTarget.name) {
        case "input1":
          input2Ref.current?.focus();
          break;
        case "input2":
          input3Ref.current?.focus();
          break;
        case "input3":
          input4Ref.current?.focus();
          break;
        case "input4":
          input5Ref.current?.focus();
          break;
        case "input5":
          input6Ref.current?.focus();
          break;
        default:
          break;
      }
    }
  };

  const handleSmscode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const newSmscode = smsCode + val;
    if (val === "") {
      const updatedSmsCode = smsCode.slice(0, -1);
      setSmscode(updatedSmsCode);
    } else {
      setSmscode(newSmscode);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trigger({ username, smsCode });
    console.log(data?.data?.token, "tokennn");
  };
  useEffect(() => {
    if (data?.statusCode === 201) {
      const token = data.data.token;
      const decoded = jwt_decode(token) as DecodedToken;
      const role = decoded[Object.keys(decoded)[3]];
      console.log(role, "role");
      localStorage.setItem("user-token", data?.data?.token);
      localStorage.setItem("role", role);
      nav("/dashboard");
    } else if (error) {
      console.log(error, "eroor");
    }
  }, [data]);

  return (
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
              <Dialog.Panel className="w-full bg-cover bg-center h-[90vh] backdrop-filter backdrop-blur-lg  p-6 overflow-hidden text-left align-middle transition-all transform  shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="w-[80%] flex items-center justify-end"
                >
                  <XCircleIcon
                    onClick={closeModal}
                    className="w-[60px] h-[60px] cursor-pointer fill-slate-50"
                  />
                </Dialog.Title>
                <div className="relative flex flex-col justify-center py-12 overflow-hidden">
                  <div className="relative w-full max-w-lg px-6 pt-10 mx-auto bg-white shadow-xl pb-9 rounded-2xl">
                    <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
                      <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <div className="text-3xl font-semibold">
                          <p>Verification</p>
                        </div>
                      </div>

                      <div>
                        <form action="" method="post" onSubmit={handleSubmit}>
                          <div className="flex flex-col space-y-16">
                            <div className="flex flex-row items-center justify-between w-full mx-auto">
                              <div className="w-16 h-16 ">
                                <input
                                  onChange={handleSmscode}
                                  className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-primary hover:appearance-none"
                                  type="text"
                                  maxLength={1}
                                  onKeyUp={handleKeyUp}
                                  ref={input1Ref}
                                  name="input1"
                                />
                              </div>
                              <div className="w-16 h-16 ">
                                <input
                                  onChange={handleSmscode}
                                  className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-primary hover:appearance-none"
                                  type="text"
                                  maxLength={1}
                                  onKeyUp={handleKeyUp}
                                  ref={input2Ref}
                                  name="input2"
                                />
                              </div>
                              <div className="w-16 h-16 ">
                                <input
                                  onChange={handleSmscode}
                                  className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-primary"
                                  type="text"
                                  maxLength={1}
                                  onKeyUp={handleKeyUp}
                                  ref={input3Ref}
                                  name="input3"
                                />
                              </div>
                              <div className="w-16 h-16 ">
                                <input
                                  onChange={handleSmscode}
                                  className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-primary"
                                  type="text"
                                  maxLength={1}
                                  onKeyUp={handleKeyUp}
                                  ref={input4Ref}
                                  name="input4"
                                />
                              </div>
                              <div className="w-16 h-16 ">
                                <input
                                  onChange={handleSmscode}
                                  className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-primary"
                                  type="text"
                                  maxLength={1}
                                  onKeyUp={handleKeyUp}
                                  ref={input5Ref}
                                  name="input5"
                                />
                              </div>
                              <div className="w-16 h-16 ">
                                <input
                                  onChange={handleSmscode}
                                  className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-primary"
                                  type="text"
                                  maxLength={1}
                                  onKeyUp={handleKeyUp}
                                  ref={input6Ref}
                                  name="input6"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col space-y-5">
                              <div>
                                <button
                                  type="submit"
                                  disabled={isMutating}
                                  className="flex flex-row items-center justify-center w-full py-5 text-sm text-center text-white border shadow-sm outline-none rounded-xl bg-border-none bg-primary"
                                >
                                  Verify Account
                                </button>
                              </div>

                              <div className="flex flex-row items-center justify-center space-x-1 text-sm font-medium text-center text-gray-500">
                                <p>Didn't recieve code?</p>{" "}
                                <a
                                  className="flex flex-row items-center text-blue-600"
                                  href="http://"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Resend
                                </a>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OtpModal;
