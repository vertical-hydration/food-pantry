import type { ColumnDef } from "@tanstack/react-table";


type Reservation = {
  id: string,
  userId: string,
  firstName: string,
  lastName: string,
  eventId: string,
  status: "pending" | "confirmed" | "cancelled",
  createdAt: Date,
  updatedAt: Date,
}



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
]