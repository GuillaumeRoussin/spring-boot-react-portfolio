import {ColumnDef} from "@tanstack/react-table";
import {ProfileResponse} from "@/api/profile";

export const columns: ColumnDef<ProfileResponse>[] = [
    {
        accessorKey: "maxRating",
        header: "Max Rating",
    },
    {
        accessorKey: "profilePublic",
        header: "Profile Public",
    },
    {
        accessorKey: "preferredClimbingType",
        header: "Preferred Climbing Type",
    },
]