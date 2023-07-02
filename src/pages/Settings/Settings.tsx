import React, { Fragment, useState } from "react";
import Tables, { IHeaders } from "../../components/Table/Tables";
import SearchInput from "../../components/SearchInput";
import Filter from "../../components/Filter";
import SosModal from "../../components/Modals/SosModal";

const Settings = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  const headers: IHeaders[] = [
    {
      id: 1,
      title: "Tarix",
    },
    {
      id: 2,
      title: "Bildiriş başlığı",
    },
    {
      id: 3,
      title: "Kontent",
    },
  ];

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <p className="font-bold font-inter text-16 leading-30 text-dark">
          Ümumi: 23 bildiriş
        </p>{" "}
        <div className="flex gap-4">
          <SearchInput />
          <Filter />
        </div>
      </div>
      {/* <Tables
        openModal={openModal}
        modal={<SosModal isOpen={isOpen} closeModal={closeModal} />}
        headers={headers}
      /> */}
    </Fragment>
  );
};

export default Settings;
