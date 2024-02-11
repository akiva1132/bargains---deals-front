import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Box,
  LinearProgress
} from "@mui/material";
import { useState } from "react";
import { useSignUp } from "../customHooks/useSignUp";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signUpSchema } from "../validationSchema";
import axios from "axios";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [urlFile, setUrlFile] = useState<string | null>(null);
  const [modeButton, setModeButton] = useState<boolean>(true);
  const { waiting, error, fetchData, setError, setWaiting } = useSignUp()

  const handleFileChange = (e: any) => {
    setModeButton(false)
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log(selectedFile);
      uploadFile(selectedFile)
        .then(url => { setUrlFile(url), setModeButton(true) })
        .catch(a => console.log(a))
      console.log("url: ", urlFile);
    }
  };
  const uploadFile = async (selectedFile: File) => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/upload`, formData);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error
    }
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (user: any) => {
    const { username, password, fullname, phone } = user;
    setError("")
    setWaiting(true)
    fetchData(
      username,
      password,
      phone,
      fullname,
      urlFile || "",
    )
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("username")}
          label="כתובת מייל"
          fullWidth
          margin="normal"
          error={!!errors.username}
          helperText={errors?.username?.message}
          InputLabelProps={{
            style: { textAlign: 'right' }
          }}
        />
        <TextField
          {...register("fullname")}
          label="שם מלא/שם מגרש"
          fullWidth
          margin="normal"
          error={!!errors.username}
          helperText={errors?.username?.message}
          InputLabelProps={{
            style: { textAlign: 'right' }
          }}
        />
        <TextField
          {...register("phone")}
          label="טלפון"
          fullWidth
          margin="normal"
          error={!!errors.username}
          helperText={errors?.username?.message}
          InputLabelProps={{
            style: { textAlign: 'right' }
          }}
        />
        <TextField
          {...register("password")}
          label="סיסמא"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors?.password?.message}
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
        <TextField
          {...register("confirmPassword")}
          label="אימות סיסמא"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleClickShowConfirmPassword}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div>
          <Button variant="outlined" component="label">
            {file ? file.name : "העלאת תמונה (אופציונלי)"}
            <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
          </Button>
        </div>
        {error
        ? error && <p>{error}</p>
        : waiting && (
          <Box sx={{ width: "100%", marginTop:"20px"}}>
            <LinearProgress />
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            width: "100%",
            mt: 2,
            backgroundColor: modeButton ? 'primary.main' : 'grey.300',
          }}
          disabled={!modeButton}
        >
          Sign up
        </Button>
      </form>
    </Container>
  );
}
