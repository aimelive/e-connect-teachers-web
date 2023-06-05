import { useState } from "react"
import TextInput from "../../components/ui/input"
import { Table } from "antd"

export const NewSchool = () => {
    const [, setSchName] = useState<string>('')
    const [, setAddress] = useState<string>('')
    const [, setPrincipal] = useState<string>('')
    const [, setPhone] = useState<string>('')
    const [, setDesc] = useState<string>('')
    return (
        <div className="bg-white  px-10  py-4 rounded-md">
            <h1 className=" font-bold my-2">Add a new school</h1>
            <div>

                <div className="grid grid-cols-2 gap-1 my-1">
                    <TextInput setStateHook={setSchName} label="School name" key="" placeholder="Khan Academy" type="text" withLabel />
                    <TextInput setStateHook={setPrincipal } label="Principal name " key="" placeholder="Dr. John Doe" type="password" withLabel />
                    <TextInput setStateHook={setAddress} label="School's locatoin " key="" placeholder="NM 504 St" type="text" withLabel />
                    <TextInput setStateHook={setDesc} label="Description " key="" placeholder="NM 504 St" type="text" withLabel />
                    <TextInput setStateHook={setPhone} label="Principal's phone " key="" placeholder="+ 0000 000 000" type="text" withLabel />
                </div>
                <button
                    className="rounded-md bg-brand px-5 py-3 mt-2 text-sm font-medium  text-white"
                >
                    Add user
                </button>
            </div>
        </div>

    )
}




const dummyData = new Array(100).fill(
    {

        schName: "Khan academy",
        address: "Kazu Beach, Poguelandia",
        principal: "Buchaman the Great",
        emailAddress: "bucha@ndzhwr.com",

    }
)





const column = [
    {
        title: 'School name',
        dataIndex: 'schName',
        key: 'schNam'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'Principal',
        dataIndex: 'principal',
        key: 'principal'
    },
    {
        title: 'Email address',
        dataIndex: 'emailAddress',
        key: 'emailAddress'
    }
]
export const SchoolsList = () => {
    return (
        <div className="mt-6 px-10 py-6 bg-white rounded-md">
            <h1 className=" font-bold  my-2">Registered Users</h1>
            <Table columns={column} dataSource={dummyData} pagination={{ position: ['bottomRight'], size: "small", pageSize: 6 }} />
        </div>
    )
}

export default function Schools() {
    return (
        <div>
            <NewSchool />
            <SchoolsList />
        </div>
    )
}