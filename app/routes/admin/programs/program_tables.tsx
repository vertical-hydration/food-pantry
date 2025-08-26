
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline"
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type Column,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { useState } from "react"
import { Link } from "react-router"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table"



export type Enrollee = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  status: string,
  enrollmentDate: string,
  appliedDate: string,
  image: string,
}


export const enrolleeColumns: ColumnDef<Enrollee>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <button
          className="inline-flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      )
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    enableColumnFilter: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      filterVariant: "select"
    }
  },
  {
    accessorKey: "enrollmentDate",
    header: "Enrollment Date",
    enableColumnFilter: false,
  },
  {
    id: "link",
    header: "Link",
    cell: ({ row }) => {
      const enrollee = row.original;
      return (
        <Link to={`../applications/${enrollee.id}`} className="text-blue-600 hover:underline">
          View
        </Link>
      );
    },
  },
  // {
  //   accessorKey: "appliedDate",
  //   header: "Applied Date",
  // },

]





interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function EnrollmentTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
        <Table className="divide-y divide-gray-100">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {header.isPlaceholder
                      ? null
                      : <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >

                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </>
                    }
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-blue-50 transition-colors"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2 text-sm text-gray-800">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-400">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}





function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue()
  // const { filterVariant } = column.columnDef.meta ?? {}

  return <select
    onChange={e => column.setFilterValue(e.target.value)}
    value={columnFilterValue?.toString()}
  >
    {/* See faceted column filters example for dynamic select options */}
    <option value="">All</option>
    <option value="enrolled">enrolled</option>
    <option value="pending">pending</option>
    <option value="failed">failed</option>
  </select>
}