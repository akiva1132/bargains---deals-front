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

const defaultTheme = createTheme();

export const AddCar = () => {
    const { waiting, error, token } = useAddCar();
    const handleSubmit = async (event: {
        preventDefault: () => void;
        currentTarget: HTMLFormElement | undefined;
    }) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const manufacturer = data.get("manufacturer")?.toString();
        const name = data.get("name")?.toString();
        const model = data.get("model")?.toString();
        const km = data.get("km")?.toString();
        const note = data.get("note")?.toString();
        console.log(manufacturer, name, model, km, note);
        // await fetchData(userName || "", password || "")
        if (token) {
            localStorage.setItem("token", token)
            location.reload();
        }
    };


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
                                id="note"
                                label="הערות נוספות"
                                name="note"
                                autoComplete="note"
                                autoFocus
                            />
                            {/* <InputFileUpload /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
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