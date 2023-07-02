import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";
type Props = {
  parkingId: any;
};

const Zona = (props: Props) => {
  return (
    <React.Fragment>
      <div className="ml-5">
        <span className="cursor-pointer text-lg font-bold text-primary">
          {" "}
          +Add Zona
        </span>
        <div className="w-1/2  pt-3 px-2 mt-5 hover:bg-slate-200 cursor-pointer">
          <div className="flex items-center justify-between">
          <p className="mt-3 text-lg font-medium">Zona 1</p>
          <div className="w-1/6 flex items-center justify-between">
          <ChevronRightIcon
            className="h-8 w-8 text-gray-400"
            aria-hidden="true"
          />
          <XMarkIcon  className="h-10 w-10 text-gray-400 bg-inherit  hover:bg-slate-300 p-1 cursor-pointer rounded-full"
            aria-hidden="true"/>
          </div>
          </div>
          <hr className="border-t border-gray-300 my-2" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Zona;
