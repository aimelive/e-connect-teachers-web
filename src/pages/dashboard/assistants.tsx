import { FC, useState } from "react"
import { Drawer, Popconfirm } from 'antd'

export const NewSchool = () => {
    const [userData, setUserData] = useState({
        name: '', address: '',
        description: '', principal_name: '', principal_phone: ''
    })
    return (
        <div>
            <h1 className=" font-bold px-10 my-2">Add a new user</h1>
            <div className="bg-white p-10 rounded-md">
                <div className="grid md:grid-cols-2 sm:gap-1  ">

                    <div className="flex flex-col my-1">
                        <label htmlFor="schoolName">User names<sup className="text-red-500">*</sup></label>
                        <input
                            autoComplete='off'
                            type="text"
                            className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
                            placeholder="St John Academy"
                            onChange={(e) => setUserData({ ...userData, name: e.target.value.trim() })}
                        />
                    </div>
                    <div className="flex flex-col my-1">
                        <label htmlFor="schoolName">User role<sup className="text-red-500">*</sup></label>
                        <select
                            autoComplete='off'
                            className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
                            placeholder="St John Academy"
                            onChange={(e) => setUserData({ ...userData, name: e.target.value.trim() })}
                        >
                            <option>ADMIN</option>
                            <option>TEACHER</option>
                            <option>USER</option>
                        </select>
                    </div>
                    <div className="flex flex-col my-1">
                        <label htmlFor="address">Nationality<sup className="text-red-500">*</sup></label>
                        <input
                            autoComplete='off'
                            type="text"
                            className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
                            placeholder="Poguelandia, 223"
                            onChange={(e) => setUserData({ ...userData, address: e.target.value.trim() })}
                        />
                    </div>
                    <div className="flex flex-col my-1">
                        <label htmlFor="principalName">Address<sup className="text-red-500">*</sup></label>
                        <input
                            autoComplete='off'
                            type="text"
                            className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
                            placeholder="Dr. John Doe"
                            onChange={(e) => setUserData({ ...userData, principal_name: e.target.value.trim() })}
                        />
                    </div>
                    <div className="flex flex-col my-1">
                        <label htmlFor="phoneNumber">Telephone number<sup className="text-red-500">*</sup></label>
                        <input
                            autoComplete='off'
                            type="tel"
                            className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
                            placeholder="+ 222 333 444"
                            onChange={(e) => setUserData({ ...userData, principal_phone: e.target.value.trim() })}
                        />
                    </div>
                    <div className="flex flex-col my-1">
                        <label htmlFor="phoneNumber">Email<sup className="text-red-500">*</sup></label>
                        <input
                            autoComplete='off'
                            type="email"
                            className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
                            placeholder="+ 222 333 444"
                            onChange={(e) => setUserData({ ...userData, principal_phone: e.target.value.trim() })}
                        />
                    </div>
                    <div className="flex flex-col my-1">
                        <label htmlFor="phoneNumber">Password<sup className="text-red-500">*</sup></label>
                        <input
                            autoComplete='off'
                            type="password"
                            className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
                            placeholder="+ 222 333 444"
                            onChange={(e) => setUserData({ ...userData, principal_phone: e.target.value.trim() })}
                        />
                    </div>

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


const UpdateSchoolForm: FC<{ school: any | null }> = ({ school }) => {
    const [schoolData, setSchoolData] = useState(school)
    return (
        <div className="grid md:grid-cols-1 sm:gap-1  ">

            <div className="flex flex-col my-3">
                <label htmlFor="address">Address<sup className="text-red-500">*</sup></label>
                <input
                    autoComplete='off'
                    type="text"
                    className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
                    placeholder="Poguelandia, 223"
                    onChange={(e) => setSchoolData({ ...schoolData, address: e.target.value.trim() })}
                />
            </div>
            <div className="flex flex-col my-3">
                <label htmlFor="principalName">Principal name<sup className="text-red-500">*</sup></label>
                <input
                    autoComplete='off'
                    type="text"
                    className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
                    placeholder="Dr. John Doe"
                    onChange={(e) => setSchoolData({ ...schoolData, principal_name: e.target.value.trim() })}
                />
            </div>
            <div className="flex flex-col my-3">
                <label htmlFor="phoneNumber">Phone number<sup className="text-red-500">*</sup></label>
                <input
                    autoComplete='off'
                    type="text"
                    className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
                    placeholder="+ 222 333 444"
                    onChange={(e) => setSchoolData({ ...schoolData, principal_phone: e.target.value.trim() })}
                />
            </div>

            <button
                className="rounded-md bg-brand px-5 py-3 mt-2 text-sm font-medium  text-white"
            >
                Save changes
            </button>

        </div>
    )

}

const dummyData = new Array(10).fill(
    {

        schoolName: "St. Joseph's School",
        address: "Kathmandu",
        principalName: "Mr. John Doe",
        phoneNumber: "9841234567",
    }
)


export const SchoolsList = () => {
    const [openDetails, setOpenDetails] = useState<{ open: boolean, school: any | null }>({ open: false, school: null })
    return (
        <div>
            <h1 className=" font-bold px-10 my-2">Registered schools</h1>
            <div className="bg-white px-10 rounded-md">
                <table className="w-full  my-3 text-sm" >
                    <thead>
                        <th className="font-medium py-6 text-left">School name</th>
                        <th className="font-medium py-6 text-left">Address</th>
                        <th className="font-medium py-6 text-left">Principal name</th>
                        <th className="font-medium py-6 text-left">Phone number</th>
                        <th className="font-medium py-6 text-left">Actions</th>
                    </thead>
                    <tbody>
                        {dummyData.map((school, index) => {
                            const [open, setOpen] = useState(false)
                            const handleOk = () => {
                                console.log('Yabyemeye')
                                setOpen(false)
                            }
                            const [confirmLoading, _handleConfirmLoading] = useState(false)

                            const handleCancel = () => {
                                setOpen(false)
                                console.log('yabyanze')
                            }
                            return (
                                <>
                                    <tr key={index} className={` text-left ${index % 2 == 0 ? "bg-gray-50" : "bg-white"}  hover:opacity-70 rounded-md`} >
                                        <td className="py-2 text-left">{school.schoolName} </td>
                                        <td className="py-2 text-left">{school.address} </td>
                                        <td className="py-2 text-left">{school.principalName}</td>
                                        <td className="py-2 text-left">{"+" + school.phoneNumber}</td>
                                        <td className="flex gap-10 items-center">
                                            <button className="w-6 h-6 " onClick={(e) => { e.stopPropagation(); setOpenDetails({ open: true, school }) }}><img src="/icons/edit.svg" /></button>
                                            <Popconfirm
                                                title="Delete this school ?"
                                                description="Are you sure want to delete this school ?"
                                                open={open}
                                                onConfirm={handleOk}
                                                okButtonProps={{ loading: confirmLoading }}
                                                onCancel={handleCancel}
                                                >
                                                <button onClick={() => setOpen(true)}><img src="/icons/delete.svg" /></button>
                                            </Popconfirm>
                                        </td>
                                        {/* <td className="py-4 text-left">{ school.description }</td> */}
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
                <Drawer open={openDetails.open} placement={'right'} closable={true} onClose={() => setOpenDetails({ open: false, school: null })} title="Editing">
                    <h1 className="font-bold font-lg">Editing {openDetails.school && openDetails.school.schoolName}</h1>
                    <UpdateSchoolForm school={openDetails.school} />
                </Drawer>
            </div>
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