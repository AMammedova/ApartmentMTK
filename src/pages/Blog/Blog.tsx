import { TrashIcon } from "@heroicons/react/24/outline";
import SearchInput from "../../components/SearchInput";
import cover from "../../../public/Cover.png";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import AddBlogModal from "../../components/Modals/AddBlogModal";
const Blog = () => {
  const fakeNewsData = [
    {
      title: "Xəbər başlığı",
      date: "15 Dek, 09:00",
      seen: "500 baxış",
    },
    {
      title: "Xəbər başlığı",
      date: "15 Dek, 09:00",
      seen: "500 baxış",
    },
    {
      title: "Xəbər başlığı",
      date: "15 Dek, 09:00",
      seen: "500 baxış",
    },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const openModal = (): void => {
    setIsOpen(true);
  };
  return (
    <div className="relative flex gap-6">
      <AddBlogModal isOpen={isOpen} closeModal={closeModal} />
      <div className="flex flex-col flex-1 w-full gap-6">
        <div className="flex justify-between">
          <div className="max-w-[400px] h-full rounded-lg flex text-icon border border-line w-full px-5 py-2.5 items-center bg-backgroundSecond">
            <p>Xəbərin adı</p>
          </div>

          <div className="p-4 border rounded-full border-line">
            <TrashIcon className="w-5 text-icon" />
          </div>
        </div>

        <div className="relative">
          <img
            src={cover}
            className="object-cover max-h-[350px] w-full h-full rounded-xl aspect-video"
            alt="cover"
          />
          <button className="px-5 py-3.5 rounded-full bg-primary text-white text-sm font-medium absolute bottom-5 right-5">
            Şəkli dəyiş{" "}
          </button>
        </div>

        <div className="px-5 py-2.5 text-icon bg-backgroundSecond border border-line rounded-xl">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
            sunt molestias! Eligendi, magni quas similique, ad dignissimos
            delectus blanditiis porro voluptate et quisquam expedita voluptates
            nobis, laudantium dicta harum omnis.
          </p>
        </div>

        <button className="px-5 py-3.5 mx-auto rounded-full bg-primary text-white text-sm font-medium bottom-5 right-5">
          Dəyişikləri yadda saxla
        </button>
      </div>
      <div className="w-2/6 px-6 rounded-xl bg-backgroundSecond">
        <div className="flex justify-between py-6">
          <p className="text-lg font-bold">Xəbərlər & Elanlar</p>

          <button
            onClick={openModal}
            className="p-2.5 border rounded-full cursor-pointer bg-primary"
          >
            <PlusIcon className="w-3.5 text-white" />
          </button>
        </div>

        <div className="grid gap-1">
          {fakeNewsData.map(({ title, date, seen }) => (
            <div className="flex gap-4 py-2">
              <div className="w-11 h-11 bg-[#D6E1E6]"></div>
              <div>
                <p className="text-[#526477] text-base font-bold">{title}</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-icon">{date}</span> •{" "}
                  <span className="text-sm font-icon">{seen}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
