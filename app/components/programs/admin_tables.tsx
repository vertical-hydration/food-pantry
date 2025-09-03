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
