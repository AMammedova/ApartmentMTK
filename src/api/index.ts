import axios from "axios";
import { EmployeeValues } from "../components/Modals/EmployeesModal";
import { TransportValues } from "../components/Modals/TransportModal";
import { string } from "prop-types";

const baseUrl = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
});

const admin = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

const company = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "multipart/form-data",
  },
});

export const LoginApi = {
  user: async (
    path: string,
    { arg }: { arg: { username: string; password: string } }
  ) => {
    const { data } = await instance.post(path, arg);

    return data;
  },
};

export const LoginApprove = {
  user: async (
    path: string,
    { arg }: { arg: { username: string; smsCode: string } }
  ) => {
    const { data } = await instance.post(path, arg);
    return data;
  },
};

export const RegisterUser = {
  user: async (
    path: string,
    {
      name,
      surname,
      patrionimyc,
      email,
      phoneNumber,
      roleName,
      customerStatusId,
      propertyTypeId,
      proportion,
      apartmentId,
    }: {
      name: string;
      surname: string;
      patrionimyc: string;
      email: string;
      phoneNumber: string;
      roleName: string | null;
      customerStatusId: number;
      propertyTypeId: number;
      proportion: string;
      apartmentId: number;
    }
  ) => {
    const { data } = await admin.post(
      path,
      {
        name: name,
        surname: surname,
        patrionimyc: patrionimyc,
        email: email,
        phoneNumber: phoneNumber,
        roleName: roleName,
        customerStatusId: customerStatusId,
        propertyTypeId: propertyTypeId,
        proportion: proportion,
        apartmentId: apartmentId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      }
    );
    return data;
  },
};

export const GetAll = {
  user: async (path: string) => {
    const { data } = await admin.get(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const CreateDeal = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: FormData;
    }
  ) => {
    const { data } = await company.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const Delete = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        deleteId: any;
      };
    }
  ) => {
    const { data } = await admin.delete(`${path}/${arg.deleteId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
export const DeleteUser = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        deleteId: number;
      };
    }
  ) => {
    console.log(arg, "argg");
    const { data } = await admin.delete(`${path}/${arg.deleteId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
export const EditDeal = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: FormData;
    }
  ) => {
    const { data } = await company.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const GetbyId = {
  user: async (path: string, { arg }: { arg: string }) => {
    const { data } = await admin.get(`${path}/${arg}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const EditUser = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        id: number;
        name: string;
        surname: string;
        patrionimyc: string;
        email: string;
        phoneNumber: string;
        propertyTypeId: number;
        customerStatusId: number;
        proportion: string;
      };
    }
  ) => {
    const { data } = await admin.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const EditObjects = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        id: number;
        title: string;
        address: string;
        regionId: number;
      };
    }
  ) => {
    const { data } = await admin.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const AddObjects = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        title: string;
        address: string;
        regionId: number;
      };
    }
  ) => {
    const { data } = await admin.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const CreateApartment = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        vendorBuildingId: number;
        apartmentNo: string;
        entranceNo: string;
        area: number;
        floorNo: number;
      };
    }
  ) => {
    const { data } = await admin.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const EditApartment = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        id: number;
        vendorBuildingId: number;
        apartmentNo: string;
        entranceNo: string;
        area: number;
        floorNo: number;
      };
    }
  ) => {
    const { data } = await admin.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const CreateCompany = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: FormData;
    }
  ) => {
    const { data } = await company.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const EditCompany = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: FormData;
    }
  ) => {
    const { data } = await company.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const CreateBuilding = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: FormData;
    }
  ) => {
    const { data } = await company.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const CreateResident = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: FormData;
    }
  ) => {
    const { data } = await company.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const CreateEmployees = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: EmployeeValues;
    }
  ) => {
    const { data } = await company.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
export const EditEmployees = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: EmployeeValues;
    }
  ) => {
    const { data } = await company.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const DeleteEmployees = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: string;
    }
  ) => {
    const { data } = await admin.delete(`${path}/${arg}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const CreateTransport = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: TransportValues & { EmployeeOrUserId?: string } & {
        vendorCompanyId?: string;
      };
    }
  ) => {
    const { data } = await admin.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });

    return data;
  },
};
export const UpdateTransport = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: TransportValues & { EmployeeOrUserId?: string };
    }
  ) => {
    const { data } = await admin.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });

    return data;
  },
};

export const EditResidents = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: FormData;
    }
  ) => {
    const { data } = await company.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const EditBuilding = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: FormData;
    }
  ) => {
    const { data } = await company.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export interface IVendorRoomArgs {
  name: string;
  vendorCompanyId?: string;
  regionId: number;
  area?: string;
  floor?: string;
  vendorRoomTypeId: number;
  isRentAviable: boolean;
  rentPrice: number;
}

export const AddVendorRooms = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        name: string;
        // vendorCompanyId: null;
        vendorBuildingId: number;
        floor:string;
        area:string;
        regionId: number;
        vendorRoomTypeId: number;
        isRentAviable: boolean;
        rentPrice: number;
      };
    }
  ) => {
    const { data } = await admin.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
export const EditVendorRoom = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        id: number;
        name: string;
        // vendorCompanyId: number;
        vendorBuildingId: number;
        floor:string;
        area:string;
        regionId: number;
        vendorRoomTypeId: number;
        isRentAviable: boolean;
        rentPrice: number;
      };
    }
  ) => {
    const { data } = await admin.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const AddRentRooms = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        startDate: string;
        endDate: string;
        description: string;
        companyTenantId: number;
        name: string;
        vendorRoomId: number;
      };
    }
  ) => {
    const { data } = await admin.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
export const EditRentRoom = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        id: number;
        startDate: string;
        endDate: string;
        description: string;
        companyTenantId: number;
        name: string;
        vendorRoomId: number;
      };
    }
  ) => {
    const { data } = await admin.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
export const AddOrderType = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        name: string;
        paymentType: boolean;
        prepaymentType: number;
        priceType: number;
        fromPrice?: number;
        toPrice?: number;
        stable?: number;
      };
    }
  ) => {
    const { data } = await admin.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const EditOrderType = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        id: number;
        name: string;
        paymentType: boolean;
        prepaymentType: number;
        priceType: number;
        fromPrice?: number;
        toPrice?: number;
        stable?: number;
      };
    }
  ) => {
    const { data } = await admin.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
