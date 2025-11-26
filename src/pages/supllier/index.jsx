import { NavLink, Outlet, useLocation } from "react-router";
import { useTranslation } from "react-i18next";

function Supplier() {
  const { t } = useTranslation();
  const location = useLocation();

  const tabs = [
    { label: t("pages.supplier.tabs.controlPanel"), path: "control-panel" },
    { label: t("pages.supplier.tabs.suppliers"), path: "suppliers" },
    { label: t("pages.supplier.tabs.sales"), path: "sales" },
    { label: t("pages.supplier.tabs.agreements"), path: "agreements" },
    { label: t("pages.supplier.tabs.payments"), path: "payments" },
    { label: t("pages.supplier.tabs.analytics"), path: "analytics" },
  ];

  return (
    <div className="sm:ml-[100px] sm:mt-[20px] max-w-[1320px] mt-[100px] ml-0 px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-6">
      
      <div className="flex gap-4 border-b pb-2">
        {tabs.map((tab, index) => (
          <NavLink
            key={index}
            to={tab.path}
            className={({ isActive }) =>
                `w-full flex-1 py-2 text-center rounded-md text-sm font-medium transition-colors duration-200 border 
                ${
                  isActive
                    ? "bg-[#0466CB] text-white border-[#0466CB] dark:bg-[#0453A4] dark:border-[#023E7D]"
                    : "border-[#33415C] text-[#001233] bg-whit dark:border-[#979DAC] dark:text-white dark:bg-[#002855] dark:hover:bg-[#023E7D]"
                }`
              }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
}

export default Supplier;
