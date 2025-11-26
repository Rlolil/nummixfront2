import { FaArrowTrendUp } from "react-icons/fa6";
import { IoPeopleOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";

import BodyCard from "../components/BodyCard";
import { useTranslation } from "react-i18next";

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

export default function SalesReports() {
    const { t } = useTranslation();
    return (
        <div className="w-full flex flex-col gap-6 dark:bg-[#001233] dark:text-[#FFFFFF]">
            <div className="flex justify-between items-center gap-2">
                <div>
                    <h2 className="text-2xl font-semibold dark:text-[#FFFFFF]">{t("pages.sales.reports.title")}</h2>
                    <p className="text-zinc-600 dark:text-[#7D8597]">{t("pages.sales.reports.subtitle")}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <select className="select input h-fit py-2 w-full focus:outline-2 focus:outline-zinc-400 placeholder:text-gray-600 rounded-md bg-zinc-100 dark:bg-[#023E7D] dark:text-[#FFFFFF] border-0">
                        <option>{t("pages.sales.reports.filters.range.thisMonth")}</option>
                        <option>{t("pages.sales.reports.filters.range.lastMonth")}</option>
                        <option>{t("pages.sales.reports.filters.range.last3Months")}</option>
                        <option>{t("pages.sales.reports.filters.range.thisYear")}</option>
                        <option>{t("pages.sales.reports.filters.range.lastYear")}</option>
                    </select>
                    <button className="flex items-center gap-2 px-2 py-2 rounded-lg border border-zinc-200 transition-all bg-white hover:bg-zinc-100 dark:bg-[#33415C] dark:border-[#5C677D] dark:text-[#FFFFFF] dark:hover:bg-[#2a3550]">
                        <FiDownload />
                        <p className="text-sm font-semibold whitespace-nowrap">{t("pages.sales.reports.actions.exportExcel")}</p>
                    </button>
                    <button className="flex items-center gap-2 px-2 py-2 rounded-lg border border-zinc-200 transition-all bg-white hover:bg-zinc-100 dark:bg-[#33415C] dark:border-[#5C677D] dark:text-[#FFFFFF] dark:hover:bg-[#2a3550]">
                        <FaRegFileAlt />
                        <p className="text-sm font-semibold whitespace-nowrap">{t("pages.sales.reports.actions.pdfReport")}</p>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="w-full col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-4 border border-zinc-200 p-4 rounded-lg dark:border-[#5C677D] dark:bg-[#33415C]">
                        <div className="bg-blue-100 dark:bg-[#0466CB] p-3 rounded-xl">
                            <FaArrowTrendUp className="size-6 text-blue-500 dark:text-[#FFFFFF]" />
                        </div>
                        <div>
                            <p className="text-2xl -mb-2 dark:text-[#FFFFFF]">₼ 42,400</p>
                            <h3 className="text-sm text-zinc-400 font-semibold mt-2 dark:text-[#7D8597]">{t("pages.sales.reports.tiles.totalSales")}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 border border-zinc-200 p-4 rounded-lg dark:border-[#5C677D] dark:bg-[#33415C]">
                        <div className="bg-green-100 dark:bg-[#22c55e] p-3 rounded-xl">
                            <FaArrowTrendUp className="size-6 text-green-500 dark:text-[#FFFFFF]" />
                        </div>
                        <div>
                            <p className="text-2xl -mb-2 dark:text-[#FFFFFF]">₼ 96,000</p>
                            <h3 className="text-sm text-zinc-400 font-semibold mt-2 dark:text-[#7D8597]">{t("pages.sales.reports.tiles.grossProfit")}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 border border-zinc-200 p-4 rounded-lg dark:border-[#5C677D] dark:bg-[#33415C]">
                        <div className="bg-purple-100 dark:bg-[#7C3AED] p-3 rounded-xl">
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
                                className="lucide lucide-package h-6 w-6 text-purple-600 dark:text-[#FFFFFF]"
                                ariaHidden="true"
                            >
                                <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                                <path d="M12 22V12"></path>
                                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                                <path d="m7.5 4.27 9 5.15"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl -mb-2 dark:text-[#FFFFFF]">3,280</p>
                            <h3 className="text-sm text-zinc-400 font-semibold mt-2 dark:text-[#7D8597]">{t("pages.sales.reports.tiles.productsSold")}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 border border-zinc-200 p-4 rounded-lg dark:border-[#5C677D] dark:bg-[#33415C]">
                        <div className="bg-orange-100 dark:bg-[#F97316] p-3 rounded-xl">
                            <IoPeopleOutline className="size-6 text-orange-500 dark:text-[#FFFFFF]" />
                        </div>
                        <div>
                            <p className="text-2xl -mb-2 dark:text-[#FFFFFF]">26.6%</p>
                            <h3 className="text-sm text-zinc-400 font-semibold mt-2 dark:text-[#7D8597]">{t("pages.sales.reports.tiles.profitMargin")}</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <BodyCard
                        title={null}
                        child={
                            <ResponsiveContainer className="min-h-80" width="100%" height="100%">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
                                    <XAxis dataKey="name" stroke="#64748B" />
                                    <YAxis stroke="#64748B" />
                                    <Tooltip contentStyle={{ backgroundColor: "#33415C", border: "none", color: "#FFFFFF" }} />
                                    <Legend wrapperStyle={{ color: "#FFFFFF" }} />
                                    <Bar dataKey="pv" fill="#3b82f6" activeBar={<Rectangle fill="#93c5fd" stroke="#1d4ed8" />} />
                                    <Bar dataKey="uv" fill="#22c55e" activeBar={<Rectangle fill="#bbf7d0" stroke="#16a34a" />} />
                                </BarChart>
                            </ResponsiveContainer>
                        }
                    />

                    <BodyCard
                        title={null}
                        child={
                            <ResponsiveContainer className="min-h-80" width="100%" height="100%">
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
                                    <XAxis dataKey="name" stroke="#64748B" />
                                    <YAxis stroke="#64748B" />
                                    <Tooltip contentStyle={{ backgroundColor: "#33415C", border: "none", color: "#FFFFFF" }} />
                                    <Legend wrapperStyle={{ color: "#FFFFFF" }} />
                                    <Line type="monotone" dataKey="pv" strokeWidth={3} stroke="#3b82f6" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        }
                    />

                    <BodyCard
                        title={t("pages.sales.reports.tables.topProducts.title")}
                        child={
                            <table className="table text-base border border-zinc-200 dark:border-[#5C677D]">
                                <thead className="font-semibold text-black dark:text-[#FFFFFF]">
                                    <tr>
                                        <th className="text-start p-3 rounded-l-lg">{t("pages.sales.reports.tables.topProducts.columns.product")}</th>
                                        <th className="text-start p-3">{t("pages.sales.reports.tables.topProducts.columns.salesCount")}</th>
                                        <th className="text-start p-3">{t("pages.sales.reports.tables.topProducts.columns.revenue")}</th>
                                    </tr>
                                </thead>
                                <tbody className="dark:text-[#FFFFFF]">
                                    <tr>
                                        <td className="p-3">Product 1</td>
                                        <td className="p-3">100</td>
                                        <td className="p-3">₼1,000</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Product 2</td>
                                        <td className="p-3">200</td>
                                        <td className="p-3">₼2,000</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Product 3</td>
                                        <td className="p-3">300</td>
                                        <td className="p-3">₼3,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    />

                    <BodyCard
                        title={t("pages.sales.reports.tables.topCustomers.title")}
                        child={
                            <table className="table text-base border border-zinc-200 dark:border-[#5C677D]">
                                <thead className="font-semibold text-black dark:text-[#FFFFFF]">
                                    <tr>
                                        <th className="text-start p-3 rounded-l-lg">{t("pages.sales.reports.tables.topCustomers.columns.customer")}</th>
                                        <th className="text-start p-3">{t("pages.sales.reports.tables.topCustomers.columns.orders")}</th>
                                        <th className="text-start p-3">{t("pages.sales.reports.tables.topCustomers.columns.revenue")}</th>
                                    </tr>
                                </thead>
                                <tbody className="dark:text-[#FFFFFF]">
                                    <tr>
                                        <td className="p-3">Customer 1</td>
                                        <td className="p-3">67</td>
                                        <td className="p-3">₼14,000</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Customer 2</td>
                                        <td className="p-3">41</td>
                                        <td className="p-3">₼22,000</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Customer 3</td>
                                        <td className="p-3">21</td>
                                        <td className="p-3">₼39,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    />

                    <div className="sm:col-span-2">
                        <BodyCard
                            title={t("pages.sales.reports.kpi.title")}
                            child={
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 dark:text-[#FFFFFF]">
                                    <div className="flex justify-between items-center">
                                        <p className="text-zinc-500 dark:text-[#7D8597]">{t("pages.sales.reports.kpi.totalRevenue")}:</p> <span>₼100,000</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-zinc-500 dark:text-[#7D8597]">{t("pages.sales.reports.kpi.salesGrowthMoM")}:</p> <span className="text-green-600 dark:text-[#22c55e]">+21.8%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-zinc-500 dark:text-[#7D8597]">{t("pages.sales.reports.kpi.avgOrderValue")}:</p> <span>₼500</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-zinc-500 dark:text-[#7D8597]">{t("pages.sales.reports.kpi.newCustomers")}:</p> <span>50</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-zinc-500 dark:text-[#7D8597]">{t("pages.sales.reports.kpi.profitGrowthMoM")}:</p> <span className="text-green-600 dark:text-[#22c55e]">+27.3%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-zinc-500 dark:text-[#7D8597]">{t("pages.sales.reports.kpi.customerRetention")}:</p> <span>85%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-zinc-500 dark:text-[#7D8597]">{t("pages.sales.reports.kpi.salesConversion")}:</p> <span>4.5%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-zinc-500 dark:text-[#7D8597]">{t("pages.sales.reports.kpi.bestSalesChannel")}:</p> <span>{t("pages.sales.reports.kpi.values.online")}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-zinc-500 dark:text-[#7D8597]">{t("pages.sales.reports.kpi.overduePaymentRate")}:</p> <span className="text-red-500 dark:text-[#FF7F7F]">12.7%</span>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
