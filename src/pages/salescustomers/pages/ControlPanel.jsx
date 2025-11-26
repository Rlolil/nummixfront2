import { FiDollarSign } from "react-icons/fi";
import { MdPeopleOutline } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineRise } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Pie, PieChart } from "recharts";
import HeadCard from "../components/HeadCard";
import BodyCard from "../components/BodyCard";
import { useTranslation } from "react-i18next";

const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const dataPie = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
];

const RADIAN = Math.PI / 180;
const COLORS = ["#0466CB", "#0453A4", "#023E7D", "#001845"];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
        <text x={x} y={y} fill="#FFFFFF" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
            {`${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
    );
};

export default function SalesControlPanel() {
    const { t } = useTranslation();
    return (
        <div className="w-full flex flex-col gap-6 bg-white dark:bg-[#001233]">
            <div>
                <h2 className="text-2xl font-semibold text-[#001233] dark:text-white">{t('pages.sales.controlPanel.title')}</h2>
                <p className="text-zinc-600 dark:text-[#7D8597]">{t('pages.sales.controlPanel.subtitle')}</p>
            </div>
            <div className="flex flex-col gap-6">
                <div className="w-full col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <HeadCard
                        title={t('pages.sales.controlPanel.cards.monthlySales.title')}
                        amount={<div className="text-2xl text-[#001233] dark:text-white">₼ 67,000</div>}
                        greenText="+12.5%"
                        description={t('pages.sales.controlPanel.cards.monthlySales.desc')}
                        icon={<FiDollarSign className="text-[#0466CB] dark:text-[#0466CB]" />}
                    />
                    <HeadCard
                        title={t('pages.sales.controlPanel.cards.activeCustomers.title')}
                        amount={<div className="text-2xl text-[#001233] dark:text-white">248</div>}
                        greenText="+23"
                        description={t('pages.sales.controlPanel.cards.activeCustomers.desc')}
                        icon={<MdPeopleOutline className="text-[#0453A4] dark:text-[#0453A4]" />}
                    />
                    <HeadCard
                        title={t('pages.sales.controlPanel.cards.salesCount.title')}
                        amount={<div className="text-2xl text-[#001233] dark:text-white">1,250</div>}
                        greenText={null}
                        description={t('pages.sales.controlPanel.cards.salesCount.desc')}
                        icon={<IoCartOutline className="text-[#023E7D] dark:text-[#023E7D]" />}
                    />
                    <HeadCard
                        title={t('pages.sales.controlPanel.cards.profit.title')}
                        amount={<div className="text-2xl text-[#001233] dark:text-white">₼ 21,000</div>}
                        greenText={null}
                        description={t('pages.sales.controlPanel.cards.profit.desc')}
                        icon={<AiOutlineRise className="text-[#0466CB] dark:text-[#0466CB]" />}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <BodyCard
                        title={<div className="text-[#001233] dark:text-white">{t('pages.sales.controlPanel.charts.salesDynamics')}</div>}
                        child={
                            <ResponsiveContainer className="min-h-80" width="100%" height="100%">
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#979DAC" className="dark:stroke-[#33415C]" />
                                    <XAxis dataKey="name" stroke="#001233" className="dark:stroke-white" />
                                    <YAxis stroke="#001233" className="dark:stroke-white" />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="pv" stroke="#0466CB" strokeWidth={3} activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="uv" stroke="#0453A4" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        }
                    />
                    <BodyCard
                        title={<div className="text-[#001233] dark:text-white">{t('pages.sales.controlPanel.charts.productDistribution')}</div>}
                        child={
                            <ResponsiveContainer className="min-h-80" width="100%" height="100%">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={dataPie}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={110}
                                        fill="#0466CB"
                                        strokeWidth={3}
                                        dataKey="value"
                                    >
                                        {dataPie.map((entry, index) => (
                                            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        }
                    />
                    <BodyCard
                        title={<div className="text-[#001233] dark:text-white">{t('pages.sales.controlPanel.topCustomers.title')}</div>}
                        child={
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center bg-zinc-100 dark:bg-[#33415C] p-3 rounded-lg">
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-[#001233] dark:text-white">ABC Şirkəti</h3>
                                        <p className="text-sm text-zinc-700 dark:text-[#7D8597]">₼45,000</p>
                                    </div>
                                    <span className="font-semibold text-xs badge badge-success">Active</span>
                                </div>
                                <div className="flex justify-between items-center bg-zinc-100 dark:bg-[#33415C] p-3 rounded-lg">
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-[#001233] dark:text-white">ABC Şirkəti</h3>
                                        <p className="text-sm text-zinc-700 dark:text-[#7D8597]">₼45,000</p>
                                    </div>
                                    <span className="font-semibold text-xs badge badge-success">Active</span>
                                </div>
                            </div>
                        }
                    />
                    <BodyCard
                        title={
                            <div className="flex gap-2 items-center text-[#001233] dark:text-white">
                                <RiErrorWarningLine className="text-red-500" />
                                <p>{t('pages.sales.controlPanel.overduePayments')}</p>
                            </div>
                        }
                        child={
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center outline-red-200 outline-2 bg-red-50 dark:bg-[#023E7D] p-3 rounded-lg">
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-[#001233] dark:text-white">DEF Holding</h3>
                                        <p className="text-sm text-zinc-700 dark:text-[#7D8597]">Overdue 15 days</p>
                                    </div>
                                    <p className="text-red-500">₼5,400</p>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
