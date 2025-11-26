import "../../utils/i18n/i18n.js";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { safeNavigate } from "../../utils/navigation"; // safeNavigate validates internal routes to prevent open redirects

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const pages = [
    { title: t("pages.accounting.title"), path: "/muhasibat/dashboard" },
    { title: t("pages.finance.title"), path: "/maliyye" },
    { title: t("pages.sales.title"), path: "/salescustomers" },
    { title: t("pages.supplier.title"), path: "/supplier" },
    { title: t("pages.warehouse.title"), path: "/anbar/dashboard" },
    { title: t("pages.assets.title"), path: "/esasvesaitler" },
    { title: t("pages.hr.title"), path: "/emekhaqqi/dashboard" },
    { title: t("pages.ai.title"), path: "/ai" },
    { title: t("pages.settings.title"), path: "/settings" },
    { title: "General Ledger", path: "/muhasibat/generalledger" },
    { title: "Transactions", path: "/muhasibat/transactions" },
    { title: "Financial Reports", path: "/muhasibat/financialreports" },
    { title: "Tax Reports", path: "/muhasibat/taxreports" },
  ];

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const filtered = pages.filter((page) =>
      page.title && page.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query, t]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  const handleNavigate = (path) => {
    // Use safeNavigate to ensure only internal paths (starting with '/') are allowed
    safeNavigate(navigate, path);
    setShowResults(false);
    setQuery("");
  };

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <div className="p-[19px] w-full border-b sm:block hidden bg-white dark:bg-[#002855] border-gray-200 pr-[80px]">
      <div className="flex items-center justify-between">
        <div className="relative ml-[100px]" ref={searchRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            value={query}
            onChange={handleSearch}
            onFocus={() => setShowResults(true)}
            className="flex h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#001845] dark:text-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80 pl-10"
            placeholder={t("search_placeholder", { ns: 'translation' })}
          />
          {showResults && results.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-[#001845] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigate(result.path)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#023E7D] cursor-pointer text-sm text-gray-700 dark:text-gray-200"
                >
                  {result.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher compact />
          <div>
            <button className="relative  dark:hover:bg-[#002147] hover:bg-gray-100 p-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bell h-5 w-5"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs"></span>
            </button>
          </div>
          <div>
            <button className="relative dark:hover:bg-[#002147] dark:text-white hover:bg-gray-100 p-3 font-bold text-black rounded-full">
              <span className="flex size-full items-center justify-center">
                {t("header.initials", { ns: 'translation' })}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;