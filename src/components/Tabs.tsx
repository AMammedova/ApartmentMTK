import { Tab } from "@headlessui/react";
import React from "react";

export interface ITabs {
  id: number;
  name: string;
  component: React.ReactElement;
}

const Tabs = ({ tabs }: { tabs: ITabs[] }) => {
  return (
    <Tab.Group>
      <Tab.List className="flex justify-between gap-1 p-1 mb-5 rounded-xl">
        {tabs?.map(({ id, name }) => (
          <Tab
            key={id}
            className={({ selected }) =>
              "rounded-lg w-full py-2.5 text-sm font-medium leading-5 text-primary ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2 " +
              (selected ? "bg-white shadow" : "text-blue-10")
            }
          >
            {name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs?.map(({ id, component }) => (
          <Tab.Panel key={id}>{component}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;
