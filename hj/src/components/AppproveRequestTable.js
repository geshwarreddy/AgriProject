import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
const ApprovalRequests = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const userRole = useSelector(state => state.user?.role) || localStorage.getItem("user").role;
    console.log("userRole",useSelector(state => state.user?.role));
    useEffect(() => {
        console.log("1",userRole);
        if (userRole === "admin") {
            fetch(`http://localhost:3001/api/pending-approvals?role=${userRole}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((data) =>{ 
                    console.log(data);
                    setPendingUsers(data);
                })
                .catch((error) => console.error("Error fetching approvals:", error));
        }
    }, [userRole]);

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/admin/approve-volunteer/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: userRole }),
            });
            if (response.ok) {
                setPendingUsers(pendingUsers.filter(user => user._id !== id));
            }
        } catch (error) {
            console.error("Error approving user:", error);
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/reject/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: userRole }),
            });
            if (response.ok) {
                setPendingUsers(pendingUsers.filter(user => user._id !== id));
            }
        } catch (error) {
            console.error("Error rejecting user:", error);
        }
    };

    return (
        <div>
            <h2>Pending Approval Requests</h2>
            {userRole !== "admin" ? (
                <p  className="ledger-table-heading">You are not authorized to view this page.</p>
            ) : (
                <table border="1" className="ledger-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingUsers.map(user => (
                            <tr key={user._id}>
                                <td>{user.firstname} {user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleApprove(user._id)}>Approve</button>
                                    <button onClick={() => handleReject(user._id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>

    );
};

export default ApprovalRequests;
