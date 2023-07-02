import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./layout/Layout";
import Sos from "./pages/Sos/Sos";
import Users from "./pages/Users/Users";
import CustomerDetail from "./pages/CustomerDetail/CustomerDetail";
import Deals from "./pages/Deals/Deals";
import Blog from "./pages/Blog/Blog";
import Notification from "./pages/Notifications/Notifications";
import DealsDetail from "./pages/DealsDetail/DealsDetail";
import Objects from "./pages/Objects/Objects";
import ObjectDetail from "./pages/Objects/ObjectDetail";
import Buildings from "./pages/Buildings/Buildings";
import Apartments from "./pages/Apartments/Apartments";
import ApartmentDetail from "./pages/Apartments/ApartmentDetail";
import Companies from "./pages/Companies/Companies";
import CompanyDetail from "./pages/Companies/CompanyDetail";
import Residents from "./pages/Residents/Residents";
import Employees from "./pages/Employees/Employees";
import EmployeesDetail from "./pages/Employees/EmployeesDetail";
import BuildingDetail from "./pages/Buildings/BuildingDetail";
import ResidentDetail from "./pages/Residents/ResidentDetail";
import VendorRooms from "./pages/VendorRooms/VendorRooms";
import VendorRoomDetail from "./pages/VendorRooms/VendorRoomDetail";
import Transport from "./pages/Transport";
import Settings from "./pages/Settings/Settings";
import OrderType from "./pages/OrderType/OrderType";
import Parking from "./pages/Parking/Parking";
import ParkingDetail from "./pages/Parking/ParkingDetail";
import Accident from "./pages/Accident/Accident";
const App = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden bg-background/90 text-dark">
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/sos"
          element={
            <Layout>
              <Sos />
            </Layout>
          }
        />

        <Route
          path="/control-panel/deals"
          element={
            <Layout>
              <Deals />
            </Layout>
          }
        />
        <Route
          path="/control-panel/deals/:dealId"
          element={
            <Layout>
              <DealsDetail />
            </Layout>
          }
        />

        <Route
          path="/references/users"
          element={
            <Layout>
              <Users />
            </Layout>
          }
        />
        <Route
          path="/references/users/:userId"
          element={
            <Layout>
              <CustomerDetail />
            </Layout>
          }
        />
        <Route
          path="/references/objects"
          element={
            <Layout>
              <Objects />
            </Layout>
          }
        />
        <Route
          path="/references/objects/:objectId"
          element={
            <Layout>
              <ObjectDetail />
            </Layout>
          }
        />
        <Route
          path="/references/buildings"
          element={
            <Layout>
              <Buildings />
            </Layout>
          }
        />
        <Route
          path="/references/buildings/:buildingId"
          element={
            <Layout>
              <BuildingDetail />
            </Layout>
          }
        />
        <Route
          path="/references/apartments"
          element={
            <Layout>
              <Apartments />
            </Layout>
          }
        />
        <Route
          path="/references/apartments/:apartmentId"
          element={
            <Layout>
              <ApartmentDetail />
            </Layout>
          }
        />
        <Route
          path="/references/companies"
          element={
            <Layout>
              <Companies />
            </Layout>
          }
        />
        <Route
          path="/references/companies/:companyId"
          element={
            <Layout>
              <CompanyDetail />
            </Layout>
          }
        />
        <Route
          path="/references/residents"
          element={
            <Layout>
              <Residents />
            </Layout>
          }
        />
        <Route
          path="/references/residents/:residentId"
          element={
            <Layout>
              <ResidentDetail />
            </Layout>
          }
        />
        <Route
          path="/references/vendorRooms"
          element={
            <Layout>
              <VendorRooms />
            </Layout>
          }
        />
        <Route
          path="/references/vendorRooms/:vendorRoomId"
          element={
            <Layout>
              <VendorRoomDetail />
            </Layout>
          }
        />

        <Route
          path="/references/employees"
          element={
            <Layout>
              <Employees />
            </Layout>
          }
        />
        <Route
          path="/references/employees/:employeesId"
          element={
            <Layout>
              <EmployeesDetail />
            </Layout>
          }
        />

        <Route
          path="/references/transport"
          element={
            <Layout>
              <Transport />
            </Layout>
          }
        />

        <Route
          path="/sos/accident"
          element={
            <Layout>
              <Accident />
            </Layout>
          }
        />

        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/notification"
          element={
            <Layout>
              <Notification />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
        <Route
          path="/settings/ordertype"
          element={
            <Layout>
              <OrderType />
            </Layout>
          }
        />
        <Route
          path="/settings/parking"
          element={
            <Layout>
              <Parking />
            </Layout>
          }
        />
        <Route
          path="/settings/parking/:parkingId"
          element={
            <Layout>
              <ParkingDetail />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
