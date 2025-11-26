import React, { useState } from "react";
import ExcelJS from "exceljs";
import { FiUpload } from "react-icons/fi";
import { HiClipboardList } from "react-icons/hi";
import Inventarnav from "../inventarnav";
import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';


export default function Inventar() {
    const { t } = useTranslation();
    const [inventoryStats, setInventoryStats] = useState({
        totalProducts: 4,
        totalValue: 5530.2,
        counted: 0,
        difference: 0,
    });

    const [inventoryData, setInventoryData] = useState([]);
    const [newInvOpen, setNewInvOpen] = useState(false);

    // Cədvəl faylını yükləmə
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

            const reader = new FileReader();
            reader.onload = async (evt) => {
                try {
                    // Use ExcelJS to parse the uploaded file instead of the vulnerable xlsx package
                    const arrayBuffer = evt.target.result;
                    const workbook = new ExcelJS.Workbook();
                    await workbook.xlsx.load(arrayBuffer);
                    const worksheet = workbook.worksheets[0];
                    const rows = [];
                    let headers = [];
                    worksheet.eachRow((row, rowNumber) => {
                        const values = row.values || [];
                        // ExcelJS row.values is 1-based: values[1] is first cell
                        if (rowNumber === 1) {
                            headers = values.slice(1).map((v) => (v === undefined || v === null ? "" : String(v).trim()));
                        } else {
                            const obj = {};
                            headers.forEach((h, i) => {
                                obj[h || `col_${i + 1}`] = values[i + 1] ?? "";
                            });
                            rows.push(obj);
                        }
                    });
                    setInventoryData(rows);
                } catch (err) {
                    console.error("Error parsing uploaded spreadsheet:", err);
                }
            };
            reader.readAsArrayBuffer(file);
    };

    return (
        <div className="p-6 space-y-8 bg-[#FFFFFF]  dark:bg-[#001233] text-[#001233] dark:text-white" >

            {/* Başlıq */}

            <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
                <div>
                    <h1 className="text-2xl font-bold  dark:text-white text-[#023E7D]">{t('pages.warehouse.inventory.control.title')}</h1>
                    <p className="text-[#7D8597] text-sm">
                        {t('pages.warehouse.inventory.control.subtitle')}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-4">


                    <div className="flex items-center gap-2">
                        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded border border-[#979DAC] bg-[#FFFFFF] dark:bg-[#001233]  dark:text-white dark:hover:bg-[#002244] text-[#023E7D] hover:bg-[#F5F8FF]">
                            <FiUpload /> {t('pages.warehouse.inventory.control.uploadSheet')}
                            <input
                                type="file"
                                accept=".xlsx,.csv"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>

                        <button onClick={() => setNewInvOpen(true)} className="px-4 py-2 flex items-center gap-1 rounded bg-[#0466CB] hover:bg-[#0453A4] text-white">
                            <HiClipboardList className="blok" />
                            {t('pages.warehouse.inventory.control.newInventory')}
                        </button>
                    </div>
                </div>

            </div>

            {/* Statistik kartlar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#FFIFFFF] dark:bg-[#001233] dark:hover:bg-[#002244]  border border-[#33415C] rounded-2xl p-4 shadow-sm hover:bg-[#F5F8FF] transition-colors">
                    <h3 className="text-sm dark:text-white text-[#5C677D] mb-1">{t('pages.warehouse.inventory.cards.totalProducts')}</h3>
                    <p className="text-2xl font-semibold dark:text-white text-[#023E7D]">{inventoryStats.totalProducts}</p>
                    <span className="text-xs dark:text-white text-[#7D8597]">{t('pages.warehouse.inventory.cards.skuCount')}</span>
                </div>

                <div className="bg-[#FFFFFF] dark:bg-[#001233] dark:hover:bg-[#002244]  border border-[#33415C] rounded-2xl p-4 shadow-sm hover:bg-[#F5F8FF] transition-colors">
                    <h3 className="text-sm dark:text-white text-[#5C677D] mb-1">{t('pages.warehouse.inventory.cards.totalValue')}</h3>
                    <p className="text-2xl font-semibold dark:text-white text-[#023E7D]">
                        ₼{inventoryStats.totalValue.toLocaleString("az-Latn-AZ")}
                    </p>
                    <span className="text-xs dark:text-white">{t('pages.warehouse.inventory.cards.systemBalance')}</span>
                </div>

                <div className="bg-[#FFFFFF] dark:bg-[#001233] dark:hover:bg-[#002244]  border border-[#33415C] rounded-2xl p-4 shadow-sm hover:bg-[#F5F8FF] transition-colors">
                    <h3 className="text-sm dark:text-white text-[#5C677D] mb-1">{t('pages.warehouse.inventory.cards.countStatus')}</h3>
                    <p className="text-2xl font-semibold dark:text-white text-[#023E7D]">
                        {inventoryStats.counted} / {inventoryStats.totalProducts}
                    </p>
                    <span className="text-xs dark:text-white">{t('pages.warehouse.inventory.cards.countedProducts')}</span>
                </div>

                <div className="bg-[#FFFFFF] dark:bg-[#001233] dark:hover:bg-[#002244]  border border-[#33415C] rounded-2xl p-4 shadow-sm hover:bg-[#F5F8FF] transition-colors">
                    <h3 className="text-sm dark:text-white text-[#5C677D] mb-1">{t('pages.warehouse.inventory.cards.difference')}</h3>
                    <p className="text-2xl font-semibold dark:text-white text-[#023E7D]">{inventoryStats.difference}</p>
                    <span className="text-xs dark:text-white">{t('pages.warehouse.inventory.cards.countDifference')}</span>
                </div>
            </div>


            {/* Yüklənmiş cədvəl */}
            {inventoryData.length > 0 && (
                <div className="mt-6 bg-[#FFFFFF] dark:bg-[#001233] border dark:text-white border-[#33415C] rounded-2xl p-4 overflow-x-auto">
                    <h3 className="text-md font-semibold dark:text-white text-[#023E7D] mb-3">{t('pages.warehouse.inventory.control.uploadedSheet')}</h3>
                    <table className="w-full text-sm border-collapse border-[#979DAC]">
                        <thead>
                            <tr className="bg-[#F5F8FF] dark:bg-[#001233] text-[#5C677D] dark:text-white">
                                {Object.keys(inventoryData[0]).map((key) => (
                                    <th key={key} className="border-b border-[#979DAC] py-2 px-3 text-left">
                                        {key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryData.map((row, i) => (
                                <tr key={i} className="hover:bg-[#F5F8FF]">
                                    {Object.values(row).map((val, j) => (
                                        <td key={j} className="border-b border-[#979DAC] py-2 px-3">
                                            {val}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Inventarnav />
            <Outlet context={{ setInventoryStats, newInvOpen, setNewInvOpen }} />


        </div>
    );
}
