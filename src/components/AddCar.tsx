import { useState } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    LinearProgress,
    TextField,
} from "@mui/material";
import { useAddCar } from "../customHooks/useAddCar";
import axios from "axios";



const defaultTheme = createTheme();

export const AddCar = () => {
    const { waiting, error, setError, fetchData, setWaiting } = useAddCar();
    const [files, setFiles] = useState<File[]>([]);
    const [isValid, setIsValid] = useState<boolean>(true);

    const handleValidation = () => {
        setIsValid(true);
        const requiredFields = ["manufacturer", "name", "model"];
        requiredFields.forEach(field => {
            const elements = document.getElementById(field) as any
            const value = elements?.value;
            if (!value || value.trim() === "" || files[0] === undefined) {
                setIsValid(false);
            }
        });
    };

    const handleSubmit = async (event: {
        preventDefault: () => void;
        currentTarget: HTMLFormElement | undefined;
    }) => {
        const data = new FormData(event.currentTarget || undefined);
        event.preventDefault();
        setError("")
        setWaiting(true)
        const urls = await handleUpload()
        console.log(urls);

        handleValidation();
        if (isValid) {
            const manufacturer = data.get("manufacturer")?.toString() || "";
            const name = data.get("name")?.toString() || "";
            const model = Number(data.get("model")) || 0;
            const km = Number(data.get("km")) || 0;
            const price = Number(data.get("price")) || 0;
            const hand = Number(data.get("hand")) || 0;
            const test = data.get("test")?.toString() || "";
            const note = data.get("note")?.toString() || "";
            const advertiser = "65aea0acc441c41c37188519"
            fetchData(manufacturer, name, model, km, hand, test, note, urls, price, advertiser)
        }
        else {
            setError("יש למלא את כל השדות ולצרף תמונה אחת לפחות")
            console.log("notvalod");
        }
    };

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFiles([...files, selectedFile]);
        }
    };

    const handleUpload = async () => {
        const uploadedUrls: string[] = [];
        if (files.length > 0) {
            try {
                await Promise.all(files.map(async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/upload`, formData);
                    uploadedUrls.push(response.data);
                }));
            } catch (error) {
                console.error('Error uploading files:', error);
                if (error instanceof Error) setError(error.message)
                return [];
            }
        } else {
            console.error('No files selected');
            return [];
        }
        return uploadedUrls;
    }


    return (
        <div id="logIn">
            <h2>{"פרסום מודעה חדשה"}</h2>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="manufacturer"
                                label="יצרן"
                                name="manufacturer"
                                autoComplete="manufacturer"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="שם דגם"
                                name="name"
                                autoComplete="name"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="model"
                                label="שנה"
                                name="model"
                                autoComplete="model"
                                type="number"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="km"
                                label='ק"מ'
                                name="km"
                                autoComplete="km"
                                type="number"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="price"
                                label='מחיר'
                                name="price"
                                autoComplete="price"
                                type="number"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="hand"
                                label="יד"
                                name="hand"
                                autoComplete="hand"
                                type="number"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="test"
                                label="טסט עד"
                                name="test"
                                autoComplete="test"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="note"
                                label="הערות נוספות"
                                name="note"
                                autoComplete="note"
                            />
                            <div>
                                <input type="file" onChange={handleFileChange} />
                                <input type="file" onChange={handleFileChange} />
                                <input type="file" onChange={handleFileChange} />
                                <input type="file" onChange={handleFileChange} />
                                <input type="file" onChange={handleFileChange} />
                                <input type="file" onChange={handleFileChange} />
                            </div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleValidation}
                            >
                                {"שלח"}
                            </Button>
                        </Box>
                        {error ? (
                            <p>{error}</p>
                        ) : (
                            waiting && (
                                <Box sx={{ width: "100%" }}>
                                    <LinearProgress />
                                </Box>
                            )
                        )}
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
};
