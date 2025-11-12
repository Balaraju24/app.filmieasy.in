import { useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Download } from "lucide-react";

export default function PaymentDashboard() {
  const summary = [
    { label: "Total Amount", value: "₹9000", color: "bg-blue-500" },
    { label: "Amount Paid", value: "₹5000", color: "bg-green-500" },
    { label: "Pending Amount", value: "₹4000", color: "bg-red-500" },
    { label: "Over Paid", value: "₹00", color: "bg-gray-500" },
  ];

  const data = useMemo(
    () => [
      {
        date: "Jan 15, 2024",
        crew: { name: "Varun Dhawan", dept: "Department" },
        method: "Online",
        amount: "₹4000",
        status: "Paid",
      },
      {
        date: "Jan 15, 2024",
        crew: { name: "Varun Dhawan", dept: "Department" },
        method: "Online",
        amount: "₹4000",
        status: "Paid",
      },
      {
        date: "Jan 15, 2024",
        crew: { name: "Varun Dhawan", dept: "Department" },
        method: "Online",
        amount: "₹4000",
        status: "Paid",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        header: "Payment Date",
        accessorKey: "date",
      },
      {
        header: "Crew",
        cell: ({ row }: any) => (
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              alt=""
              className="w-6 h-6 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{row.original.crew.name}</p>
              <p className="text-xs text-gray-400">{row.original.crew.dept}</p>
            </div>
          </div>
        ),
      },
      {
        header: "Payment Method",
        accessorKey: "method",
      },
      {
        header: "Amount",
        accessorKey: "amount",
      },
      {
        header: "Status",
        cell: ({ row }: any) => (
          <span className="bg-green-900/40 text-green-400 text-xs px-2 py-1 rounded-full">
            ● {row.original.status}
          </span>
        ),
      },
      {
        header: "Actions",
        cell: () => (
          <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition">
            <Download size={14} /> Download Receipt
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="text-gray-100  p-5 rounded-lg space-y-4">
      <div className="lg:w-[85%] mx-auto justify-content-center flex">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-[100%]">
            {summary.map((item, i) => (
            <div
                key={i}
                className="relative bg-[#1a1a1a] rounded-md p-3 text-center"
    >
    <div
        className={`${item.color} absolute left-0 top-[17.5%] h-[65%] w-[4px] rounded-md`}
    ></div>

               <div className="flex gap-2 items-center justify-between">
                 <p className="text-sm mb-0 font-normal text-gray-400">{item.label}</p>
                <p className="text-lg font-medium">{item.value}</p>
               </div>
            </div>
            ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#DCDCDC33] text-gray-300">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#DCDCDC33] transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}