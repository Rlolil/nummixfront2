import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layout/main";
import Login from "../pages/login";
import Register from "../pages/register";
import ResetPassword from "../pages/resetpassword";
import PrivateRoute from "../provider/privateRoot";
import ResetPasswordVerify from "../pages/resetpasswordverify";
import Muhasibat from "../pages/muhasibat";
import Supplier from "../pages/supllier";
import Settings from "../pages/settings";
import SalesCustomers from "../pages/salescustomers";
import Maliyye from "../pages/maliyye";
import EsasVesaitler from "../pages/esasvesaitler";
import EmekHaqqi from "../pages/emekhaqqi";
import Anbar from "../pages/anbar";
import Ai from "../pages/ai";
import DashboardCards from "../components/muhasibatcomp/dashboard";
import Ledger from "../components/muhasibatcomp/generalledger";
import Transactions from "../components/muhasibatcomp/trasntaction";
import FinancialReports from "../components/muhasibatcomp/financialreports";
import TaxDashboard from "../components/muhasibatcomp/taxreports";
import HRDashboard from "../components/emekhaqqicomp/dashboard";
import Employees from "../components/emekhaqqicomp/employees";
import PayrollManagement from "../components/emekhaqqicomp/payroll";
import Leave from "../components/emekhaqqicomp/leave";
import Attendance from "../components/emekhaqqicomp/attendance/index,";
import Calendar from "../components/emekhaqqicomp/calendar";
import Reports from "../components/emekhaqqicomp/hesabatlar";
import Idarepaneli from "../components/maliyye/IdarePaneli/Idarepaneli";
import Kassa from "../components/maliyye/Kassa&Bank/Kassa";
import Odenisler from "../components/maliyye/Odenisler/Odenisler";
import Budce from "../components/maliyye/Budce/Budce";
import Analitika from "../components/maliyye/Analitika/Analitika";
import Dashboard from "../components/AI/Dashboard/Dashboard";
import MaliyyeAI from "../components/AI/MaliyyeAi/MaliyyeAI";
import Satış from "../components/AI/Satış/Satış";
import Hr from "../components/AI/HR/Hr";
import Vergi from "../components/AI/Vergi/Vergi";
import AnbarAi from "../components/AI/Anbar/AnbarAi";
import EmployeePortal from "../components/emekhaqqicomp/employeeportal";
import AnbarEsasSehife from "../components/anbarcompanents/anbaresassehife";
import Məhsullar from "../components/anbarcompanents/Məhsullar";
import Anbaremeliyyat from "../components/anbarcompanents/anbaremeliyyatlari/esasemeliyyat";
import Anbardn from "../components/anbarcompanents/anbaremeliyyatlari/dn";
import Anbargrn from "../components/anbarcompanents/anbaremeliyyatlari/grn";
import AnbarTransfer from "../components/anbarcompanents/anbaremeliyyatlari/transfer";
import AnbarHistory from "../components/anbarcompanents/anbaremeliyyatlari/tarixçə";
import Inventar from "../components/anbarcompanents/inventar/inventaresas";
import CariQaliqlar from "../components/anbarcompanents/inventar/cariqalıq";
import InventarSayimi from "../components/anbarcompanents/inventar/Inventarsayimi";
import HesabatAnalitika from "../components/anbarcompanents/hesabatlar";
import Sales from "../pages/supllier/pages/Sales";
import ControlPanel from "../pages/supllier/pages/ControlPanel";
import Suppliers from "../pages/supllier/pages/Suppliers";
import Payments from "../pages/supllier/pages/Payments";
import Agreements from "../pages/supllier/pages/Agreements";
import Analytics from "../pages/supllier/pages/Analytics";
import Cart from "../pages/salescustomers/pages/Cart";
import SalesControlPanel from "../pages/salescustomers/pages/ControlPanel";
import Customers from "../pages/salescustomers/pages/Customers";
import SalesReports from "../pages/salescustomers/pages/Reports";
import SalesCustomerSales from "../pages/salescustomers/pages/Sales";
import SalesTransactions from "../pages/salescustomers/pages/Transactions";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/muhasibat",
        element: <Muhasibat />,
        children: [
          {
            path: "/muhasibat/dashboard",
            element: <DashboardCards />,
          },
          {
            path: "/muhasibat/generalledger",
            element: <Ledger />,
          },
          {
            path: "/muhasibat/transactions",
            element: <Transactions />,
          },
          {
            path: "/muhasibat/financialreports",
            element: <FinancialReports />,
          },
          {
            path: "/muhasibat/taxreports",
            element: <TaxDashboard />,
          },
        ],
      },
      {
        path: "/supplier",
        element: <Supplier />,
        children: [
          { index: true, element: <Navigate to="control-panel" replace /> },

          { path: "control-panel", element: <ControlPanel /> },
          { path: "suppliers", element: <Suppliers /> },
          { path: "sales", element: <SalesCustomerSales /> },
          { path: "agreements", element: <Agreements /> },
          { path: "payments", element: <Payments /> },
          { path: "analytics", element: <Analytics /> },
        ],
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/salescustomers",
        element: <SalesCustomers />,
        children: [
          { index: true, element: <Navigate to="control-panel" replace /> },

          { path: "control-panel", element: <SalesControlPanel /> },
          { path: "customers", element: <Customers /> },
          { path: "sales", element: <Sales /> },
          { path: "cart", element: <Cart /> },
          { path: "transactions", element: <SalesTransactions /> },
          { path: "reports", element: <SalesReports /> },
        ],
      },

      {
        path: "/maliyye",
        element: <Maliyye />,
        children: [
          {
            index: true,
            element: <Navigate to="idare-paneli" replace />,
          },
          {
            path: "idare-paneli",
            element: <Idarepaneli />,
          },
          {
            path: "kassa-bank",
            element: <Kassa />,
          },
          {
            path: "odenisler",
            element: <Odenisler />,
          },
          {
            path: "budce-planlamasi",
            element: <Budce />,
          },
          {
            path: "analitika",
            element: <Analitika />,
          },
        ],
      },
      {
        path: "/esasvesaitler",
        element: <EsasVesaitler />,
      },
      {
        path: "/emekhaqqi",
        element: <EmekHaqqi />,
        children: [
          {
            path: "/emekhaqqi/dashboard",
            element: <HRDashboard />,
          },
          {
            path: "/emekhaqqi/employees",
            element: <Employees />,
          },
          {
            path: "/emekhaqqi/payroll",
            element: <PayrollManagement />,
          },
          {
            path: "/emekhaqqi/leave",
            element: <Leave />,
          },
          {
            path: "/emekhaqqi/attendance",
            element: <Attendance />,
          },
          {
            path: "/emekhaqqi/calendar",
            element: <Calendar />,
          },
          {
            path: "/emekhaqqi/reports",
            element: <Reports />,
          },
          {
            path: "/emekhaqqi/employeeportal",
            element: <EmployeePortal />,
          }
        ],
      },
      {
        path: "/anbar",
        element: <Anbar />,
        children: [
          {
            path: "/anbar/dashboard",
            element: <AnbarEsasSehife />
          },
          {
            path: "/anbar/products",
            element: <Məhsullar />
          },
          {
            path: "/anbar/warehouseoperations",
            element: <Anbaremeliyyat />,
            children: [
              { index: true, element: <Navigate to="grn" replace /> },
              { path: "grn", element: <Anbargrn /> },
              { path: "dn", element: <Anbardn /> },
              { path: "transfer", element: <AnbarTransfer /> },
              { path: "history", element: <AnbarHistory /> },

            ]
          },
          {
            path: "/anbar/inventory", element: <Inventar />,
            children: [
              { index: true, element: <Navigate to="currentbalances" replace /> },
              { path: "currentbalances", element: <CariQaliqlar /> },
              { path: "inventorycount", element: <InventarSayimi /> },
            ]
          },
          { path: "/anbar/reports", element: <HesabatAnalitika /> }
        ]
      },
      {
        path: "/ai",
        element: <Ai />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "maliyyeAi",
            element: <MaliyyeAI />,
          },
          {
            path: "satis",
            element: <Satış />,
          },
          {
            path: "anbar",
            element: <AnbarAi />,
          },
          {
            path: "hr",
            element: <Hr />,
          },
          {
            path: "vergi",
            element: <Vergi />,
          },
        ],
      }
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "reset-password-verify",
    element: <ResetPasswordVerify />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
