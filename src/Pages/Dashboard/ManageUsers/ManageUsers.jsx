import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user: currentUser } = useAuth();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    console.log(currentUser)

    // Make User Admin
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                const data = res.data;
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    // Make User Agent
    const handleMakeAgent = (user) => {
        axiosSecure.patch(`/users/agent/${user._id}`)
            .then(res => {
                const data = res.data;
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Agent now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDeleteUser = (user) => {
        console.log(user)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        const data = res.data;
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <div className=" border border-amber-600 p-4 w-fit flex gap-3 rounded mx-auto my-10">
                <h2 className="text-4xl border-r-2 border-amber-600 pr-3">Users</h2>
                <p className="text-4xl font-bold text-amber-700">{users.length}</p>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Change Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 'admin' ? 'Admin'
                                                    : user.role === 'agent' ? 'Agent'
                                                        : 'User'

                                            }

                                        </td>
                                        <td>
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className={`border p-1 rounded-md text-sm font-medium hover:scale-95 transform transition-transform duration-300 shadow 
                                                    ${currentUser.email === user.email ?
                                                            'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-200 text-red-600'}`}
                                                    disabled={currentUser.email === user.email}
                                                >
                                                    Admin
                                                </button>

                                                <button
                                                    onClick={() => handleMakeAgent(user)}
                                                    className={`border p-1 rounded-md text-sm font-medium hover:scale-95 transform transition-transform duration-300 shadow 
                                                    ${currentUser.email === user.email ?
                                                            'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-200 text-red-600'}`}
                                                    disabled={currentUser.email === user.email}
                                                >
                                                    Agent
                                                </button>
                                            </div>
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className={`btn text-xl 
                                                ${currentUser.email === user.email ?
                                                        'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white'}`}
                                                disabled={currentUser.email === user.email}
                                            >
                                                <MdDelete />
                                            </button>
                                        </td>

                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;