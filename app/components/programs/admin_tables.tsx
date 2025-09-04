import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";

type ProgramRow = {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive" | "archived";
};

export const programsIndexColumns: ColumnDef<ProgramRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <Link to={`/admin/programs/${row.original.id}`}>
        Link
      </Link>;
    },
  }
];
type StatusType = "submitted" | "accepted" | "waitlist" | "declined";

export type Applicant = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  status: StatusType,
  enrollmentDate: Date | null,
  appliedDate: Date,
}


export const enrolleeColumns: ColumnDef<Applicant>[] = [
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
    cell: ({ row }) => {
      const enrollmentDate = row.original.enrollmentDate;
      return (
        <span>
          {enrollmentDate ? enrollmentDate.toDateString() : "Not Enrolled"}
        </span>
      );
    },
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

];

export const applicationsColumns: ColumnDef<Applicant>[] = [
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

]

