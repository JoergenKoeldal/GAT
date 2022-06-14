import React, { useEffect, useState } from "react";
import { getDepartments } from "../apiService";
import Spinner from "../util/spinner";

export default function Statistics() {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = () => {
            getDepartments().then((res) => setDepartments(res));
        };
        fetchDepartments();
    }, []);

    return (
        <div className="border-2 border-gray-200 bg-gray-50 rounded p-2 mt-2">
            <h1 className="text-3xl font-bold">Statistik</h1>
            <h2 className="text-2xl">
                Afdelinger
            </h2>
            {
                departments.length > 0 
                ?
                departments.map((d) => (
                    <div key={d.departmentId} className="my-2">
                        <h4 className="text-xl">
                            {d.name}
                        </h4>
                        <a
                            className="text-blue-300"
                            href={`https://jnapi.azurewebsites.net/api/Pdf?departmentId=${d.departmentId}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Generer PDF
                        </a>
                    </div>
                ))
                :
                <Spinner />
            }
        </div>
    );
}
