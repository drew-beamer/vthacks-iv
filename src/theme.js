import { createTheme } from "@mui/material/styles";

// color pallete: https://coolors.co/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590


export const theme = createTheme({
    palette: {
        primary: {
            main: "#138A36"
        },
        secondary: {
            main: "#285238"
        }
    },
    typography: {
        fontFamily: "Work Sans",
        button: {
            fontSize: 24,
            fontWeight: 300
        }
    }
})