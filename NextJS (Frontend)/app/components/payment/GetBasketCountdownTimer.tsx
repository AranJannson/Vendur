"use client";

import { useEffect, useState } from "react";

export default function GetBasketCountdownTimer() {
    const [age, setAge] = useState("");

    useEffect(() => {
        
        const eventSource = new EventSource("http://localhost:8002/getcookieage", { withCredentials: true });

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.age === "0hr 0m 0s") {
                window.location.reload()
            } else {
                setAge(data.age)
            }
        };

        eventSource.onerror = () => {
            setAge("");
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };

    }, []);


    return (
        <div>{ age } </div>
    );    
}
