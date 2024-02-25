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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useSignIn } from "../customHooks/useSignIn";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export const LogIn2 = () => {
  const { waiting, error, fetchData } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = data.get("userName")?.toString();
    const password = data.get("password")?.toString();
    console.log(userName, password);
    await fetchData(userName || "", password || "")
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div id="logIn">
      <h2>{"התחבר למערכת"}</h2>
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
                label="User Name"
                name="userName"
                autoComplete="email"
                autoFocus
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {"התחברות"}
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
          <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
            <div>
              {"אין לך חשבון?"}
            </div>
            <Button onClick={() => navigate("/tradingArea/SignUp")}>{"הירשם"}</Button>
          </div>
        </Container>
      </ThemeProvider>

    </div>
  );
};