import { PencilIcon } from "@heroicons/react/24/outline";
import {
  BriefcaseIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import OrderAvatar1 from "../../assets/Image.png";
import OrderAvatar2 from "../../assets/Image-1.png";
import OrderAvatar3 from "../../assets/Image-2.png";
import useSWR from "swr";
import { GetAll } from "../../api";
import { Link } from "react-router-dom";

const Dashboard = () => {
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

  const fakeOrder = [
    {
      title: "Usta xidməti",
      fullname: "Nurlan Garash",
      status: "icrada",
      time: "30 Dek, 09:00",
      img: "",
    },
    {
      title: "Usta xidməti",
      fullname: "Rustam Aziziov",
      status: "baxılır",
      time: "30 Dek, 08:00",
      img: OrderAvatar1,
    },
    {
      title: "Usta xidməti",
      fullname: "Kanan İdayatov",
      status: "tamamlandı",
      time: "28 Dek, 09:00",
      img: OrderAvatar2,
    },
    {
      title: "Usta xidməti",
      fullname: "Nihad Rasulzada",
      status: "tamamlandı",
      time: "17 Dek, 09:00",
      img: OrderAvatar3,
    },
  ];

  const {
    data: orderData,
    error: orderError,
    isLoading: orderLoading,
  } = useSWR("/api/OrderAdmin/GetAll", GetAll.user, {
    revalidateIfStale: true,
  });

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR("/api/Users/GetAllForAdmin", GetAll.user, {
    revalidateIfStale: true,
  });

  const {
    data: accidentData,
    error: accidentError,
    isLoading: accidentLoading,
  } = useSWR("api/OrderAdmin/GetAccidentOrders", GetAll.user, {
    revalidateIfStale: true,
  });

  if (orderLoading && userLoading && accidentLoading) {
    return <div>Loading</div>;
  }

  if (accidentError && userError && orderError) {
    return <div>Error</div>;
  }
  const orderLength = orderData?.data?.length;
  const lastOrder = orderData?.data?.slice(-4);
  const userLength = userData?.data?.length;
  const lastUser = userData?.data?.slice(-3);
  const accidents = accidentData?.data;

  return (
    <div className="relative flex gap-6 p-6 bg-transparent">
      <div className="flex w-4/6 gap-6">
        <div className="w-full max-w-xs space-y-6 ">
          <div className="bg-primary h-[400px] text-sm rounded-xl p-6 flex flex-col gap-6 relative overflow-hidden">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold text-white">ABC MTK</h2>
              <p className="w-2.5 h-2.5 bg-white rounded-full"></p>
            </div>

            <div className="flex gap-3">
              <div className="rounded-full w-11 h-11 bg-backgroundSecond"></div>

              <div className="space-y-1">
                <p className="font-bold text-white">ABC YK</p>
                <p className="text-gray-50">Babək prospekti, 123</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-50">Appointment Date</p>
              <p className="font-bold text-white">Nov 18 2021, 17:00</p>
            </div>

            <div className="space-y-2">
              <p className="text-gray-50">Room Area</p>
              <p className="font-bold text-white uppercase">
                100 m <sup>2</sup>
              </p>
            </div>

            <div className=" flex items-center justify-center w-[300px] h-[300px] absolute top-2/4 left-1/4 bg-gradient-to-b from-white/25 to-white/0 rounded-full ">
              <button className="flex items-center justify-center px-10 py-3 mb-4 mr-4 font-medium bg-white rounded-full w-fit text-dark">
                Aktiv et
              </button>
            </div>
          </div>
          <div className="w-full space-y-6">
            <StatusBox length={userLength} type="USER" />
            <StatusBox length={orderLength} type="ORDER" />
          </div>
        </div>
        <div className="w-full space-y-6">
          <div className="w-full h-[400px] bg-white p-6 border rounded-xl border-line">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">Sonuncu sifarişlər</h2>
              <Link
                to={"/control-panel/deals"}
                className="text-sm text-primary"
              >
                Hamsina bax
              </Link>
            </div>

            <div className="flex flex-col justify-between h-full mt-6 pb-14">
              {Array.isArray(lastOrder) &&
                lastOrder?.map((item: any) => (
                  <div className="flex w-full gap-4" key={item?.id}>
                    <div className="flex-1">
                      <p className="font-bold">{item?.orderTypeName}</p>
                      <p className="text-sm text-icon">
                        {item?.orderSourceName}
                      </p>
                    </div>
                    <div className="flex flex-col text-sm">
                      <p className="font-bold text-end">
                        {item?.orderClassName}
                      </p>
                      <p className="text-sm text-icon">
                        {new Date(item?.actualDeadline)
                          .toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .split("/")
                          .reverse()
                          .join("-")}
                      </p>
                    </div>
                  </div>
                ))}
              {/* {fakeOrder.map(({ img, title, fullname, status, time }) => (
                <div className="flex w-full gap-4">
                  {img ? (
                    <img
                      className="object-cover w-12 h-12 rounded-full bg-icon"
                      src={img}
                      alt={title}
                    />
                  ) : (
                    <div className="object-cover w-12 h-12 rounded-full bg-icon"></div>
                  )}
                  <div className="flex-1">
                    <p className="font-bold">{title}</p>
                    <p className="text-sm text-icon">{fullname}</p>
                  </div>
                  <div className="flex flex-col text-sm">
                    <p className="font-bold text-end">{status}</p>
                    <p className="text-sm text-icon">{time}</p>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
          <div className="w-full h-[343px]  bg-white border divide-y divide-icon/25 rounded-xl border-line">
            <div className="flex items-center justify-between p-6">
              <h2 className="font-bold">İcazə verilmişlər</h2>
              <span className="px-5 py-2.5 rounded-full bg-primary/10 text-primary uppercase text-xs font-medium">
                Hamsina bax
              </span>
            </div>

            <div></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-2/6 gap-6 p-6 rounded-xl bg-backgroundSecond">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Sakinlər</h2>
          <Link to={"/references/users"} className="text-sm text-primary">
            Hamsina bax
          </Link>
        </div>
        <div className="grid gap-4">
          {/* <div className="flex w-full gap-4">
            <div className="rounded-full w-11 h-11 bg-icon"></div>
            <div className="flex-1">
              <p>Nurlan Garash</p>
              <p>orgnu@icloud.com</p>
            </div>
            <PencilIcon className="w-5" />
          </div> */}
          {Array.isArray(lastUser) &&
            lastUser?.map((item: any) => (
              <div key={item?.id} className="flex w-full gap-4">
                <div className="rounded-full w-11 h-11 bg-icon"></div>
                <div className="flex-1">
                  <p>
                    {item?.name} {item?.surname}
                  </p>
                  <p>{item?.email}</p>
                </div>

                {/* <PencilIcon className="w-5" /> */}
              </div>
            ))}
        </div>

        <div className="w-full h-full p-2">
          <div className="w-full h-full bg-white rounded-xl">
            <div className="flex items-center justify-between p-6">
              <h2 className="text-lg font-bold">SOS bildirişləri</h2>
              <span className="text-sm text-primary">Hamsina bax</span>
              {/* {accidents} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBox = ({
  type,
  length,
}: {
  type: "USER" | "ORDER";
  length: number;
}) => {
  const getDetail = () => {
    switch (type) {
      case "USER":
        return {
          title: "Sakinlər",
          count: length,
          icon: <UsersIcon className="w-8 h-8 fill-success" />,
        };

      case "ORDER":
        return {
          title: "Sifarişlər",
          count: length,
          icon: <BriefcaseIcon className="w-8 h-8 fill-error" />,
        };

      default:
        return {
          title: "",
          count: 0,
          icon: "",
        };
    }
  };

  const { title, count, icon } = getDetail();

  return (
    <div className="w-full h-40 max-w-sm bg-white border rounded-xl border-line">
      <div className="flex justify-between h-full p-6 py-10">
        <div className="flex flex-col justify-between">
          <p className="text-lg font-medium">{title}</p>
          <span className="text-5xl font-semibold">{count}</span>
        </div>
        <div
          className={`p-6 my-auto rounded-full bg-gradient-to-b ${
            type === "USER"
              ? "from-success via-success/5 to-success/5"
              : "from-error via-error/5 to-error/5"
          } `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
