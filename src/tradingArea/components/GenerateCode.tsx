import { Button } from "@mui/material"
import axios from "axios";
import { useState } from "react";




export const GenerateCode = () => {
    const [code, setCode] = useState<string | null>(null);


    const handleGenerate = async () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BASE_URL}/auction/generateCode/`,
            headers: {
                'Authorization': localStorage.getItem("token2"),
                'Content-Type': 'application/json'
            },
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCode(JSON.stringify(response.data))
            })
            .catch((error) => {
                setCode(error.response.data.error)
                console.error('Error fetching data:', error)
            });

    }
    return (
        <div id="logIn">
            {"צור סיסמא זמנית לחיבור משתמש חדש"}
            <div style={{ display: "flex" }}>
                {!code && <Button onClick={() => handleGenerate()}>{"לחץ כאן לקבלת קוד"}</Button>}
                {code && <div>{`הקוד הוא  ${code}`}</div>}
            </div>
        </div>

    )
}