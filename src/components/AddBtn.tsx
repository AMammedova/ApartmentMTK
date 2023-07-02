import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";

type Props = {
  modal: JSX.Element;
  openModal: () => void;
  setProcess: React.Dispatch<React.SetStateAction<string>>;
};

const AddBtn = ({ modal, openModal, setProcess }: Props) => {
  return (
    <Menu>
      <Menu.Button
        className={`relative flex items-center border-primary justify-between gap-2 px-4 py-2 bg-primary border  rounded-full text-white`}
        onClick={() => {
          openModal();
          setProcess("Add");
        }}
      >
        Əlavə et
        <PlusIcon className="w-5 h-5 stroke-white" />
      </Menu.Button>
      {modal}
    </Menu>
  );
};

export default AddBtn;
