import {useNavigate} from "react-router-dom";
import {useMeContext} from "@/pages/header";
import React from "react";
import {useGetProfiles} from "@/api/profile";
import {columns} from "./columns"
import {DataTable} from "./data-table";

export function Profiles() {
    const me = useMeContext();
    const navigate = useNavigate();
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const {data, error} = useGetProfiles({params: {page: pagination.pageIndex, size: pagination.pageSize}});
    React.useEffect(() => {
        if (!me.authorities.some(auth => auth.authority === "ROLE_ADMIN")) {
            navigate("/");
        }
    }, [me, navigate])
    if (data) {
        return <>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data.content} totalPages={data.page.totalPages}
                           pagination={pagination}
                           setPagination={setPagination}/>
            </div>
        </>
    }
    if (error) {
        return <>error</>
    }
    return <>Loading</>
}