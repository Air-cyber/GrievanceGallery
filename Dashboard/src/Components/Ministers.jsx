import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Ministers = () => {
    const [ministers, setMinisters] = useState([]);
    const { isAuthenticated } = useContext(Context);
    useEffect(() => {
        const fetchMinisters = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/user/minister",
                    { withCredentials: true }
                );
                setMinisters(data.ministers);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchMinisters();
    }, []);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }
    return (
        <section className="page doctors">
            <h1>MINISTERS</h1>
            <div className="banner">
                {ministers && ministers.length > 0 ? (
                    ministers.map((element) => {
                        return (
                            <div className="card">
                                <img
                                    src={element.ministerAvatar && element.ministerAvatar.url}
                                    alt="minister avatar"
                                />
                                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                                <div className="details">
                                    <p>
                                        Email: <span>{element.email}</span>
                                    </p>
                                    <p>
                                        Phone: <span>{element.phone}</span>
                                    </p>
                                    <p>
                                        DOB: <span>{element.dob.substring(0, 10)}</span>
                                    </p>
                                    <p>
                                        Department: <span>{element.ministerDepartment}</span>
                                    </p>
                                    <p>
                                        NIC: <span>{element.nic}</span>
                                    </p>
                                    <p>
                                        Gender: <span>{element.gender}</span>
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h1>No Registered Ministers Found!</h1>
                )}
            </div>
        </section>
    );
};

export default Ministers;
