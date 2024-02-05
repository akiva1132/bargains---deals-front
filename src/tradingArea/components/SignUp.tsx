import { useState } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    IconButton,
    InputAdornment,
    LinearProgress,
    TextField,
} from "@mui/material";
import axios from "axios";
import { useSignUp } from '../customHooks/useSignUp';
import { Visibility, VisibilityOff } from '@mui/icons-material';




const defaultTheme = createTheme();

export const SignUp = () => {
    const { waiting, error, setError, fetchData, setWaiting } = useSignUp();
    const [files, setFiles] = useState<File[]>([]);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState(false);




    const handleValidation = () => {
        setIsValid(true);
        const requiredFields = ["userName", "password", "firstName", ];
        requiredFields.forEach(field => {
            console.log(field);
            
            const elements = document.getElementById(field) as any
            const value = elements?.value;
            if (!value || value.trim() === "") {
                setIsValid(false);
            }
        });
    };
    

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
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
            const userName = data.get("userName")?.toString() || "";
            const password = data.get("password")?.toString() || "";
            const firstName = data.get("firstName")?.toString() || ""
            const lastName = data.get("lastName")?.toString() || "";
            const phone = Number(data.get("phone")) || 0;
            const profileImage = "" //data.get("note")?.toString() || "";
            fetchData(userName, password, firstName, lastName, phone, profileImage)
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
            <h2>{"הרשמה למערכת"}</h2>
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
                                id="userName"
                                label="כתובת מייל"
                                name="userName"
                                autoComplete="userName"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="שם פרטי"
                                name="firstName"
                                autoComplete="firstName"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="שם משפחה"
                                name="lastName"
                                autoComplete="lastName"
                                type="text"
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" onClick={handleClickShowPassword}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div>
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
