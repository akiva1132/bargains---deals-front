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
    const { waiting, error, setError, fetchData } = useAddCar();
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
        const urls = await handleUpload()
        handleValidation();
        if (isValid) {
            setError("")
            console.log(urls);
            console.log(data);
            const manufacturer = data.get("manufacturer")?.toString();
            const name = data.get("name")?.toString();
            const model = Number(data.get("model"));
            const km = Number(data.get("km"));
            const hand = Number(data.get("hand"));
            const test = data.get("test")?.toString();
            const note = data.get("note")?.toString();
            console.log(manufacturer, name, model, km, urls[0]);
            if (manufacturer && name && model && km && hand && test && urls[0]) {
                fetchData(manufacturer, name, model, km, hand, test, note || "", urls)
            }
            //   navigate("/")
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
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="model"
                                label="שנה"
                                name="model"
                                autoComplete="model"
                                autoFocus
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
                                autoFocus
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
                                autoFocus
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
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="note"
                                label="הערות נוספות"
                                name="note"
                                autoComplete="note"
                                autoFocus
                            />
                            <div>
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
