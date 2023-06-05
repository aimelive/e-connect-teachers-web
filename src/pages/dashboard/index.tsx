import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom'
export default function Dashboard(){
    const navigate = useNavigate();
    useEffect(() => {
     navigate('/dashboard/schools')
    })
    return (
        <h1>
            Dashboard
        </h1>
    )
}