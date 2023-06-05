import { FC } from "react"

interface TableProps {
    data: {}[] | null
}

const Table: FC<TableProps> = ({ data }) => {
    const heads = Object.entries(data![0])
    console.log(heads);

    return (
        <table>

        </table>
    )
}

export default Table