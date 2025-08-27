import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import ChangeStatusForm from "./change_status";


type Reservation = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  eventId: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
};


const statusOptions = [
  { id: "pending", title: "Pending" },
  { id: "confirmed", title: "Confirmed" },
  { id: "cancelled", title: "Cancelled" }
]


export const reserveColumns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
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
    id: "menu",
    header: "Menu",
    cell: ({ row }) => {
      const enrollee = row.original;
      return (
        <ChangeStatusForm
          currentStatus={enrollee.status}
          statusOptions={statusOptions}
          id={enrollee.id}
          buttonText="Change Status"
        />
      );
    },
  }
]