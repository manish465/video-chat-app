import { createMuiTheme } from "@material-ui/core";

const lightTheme = createMuiTheme({
    palette: {
        background: { default: "#EBEDF9" },
        primary: { main: "#67D0E8" },
        secondary: { main: "#ff0000" },
        text: { main: "#e63939" },
    },
});

const darkTheme = createMuiTheme({
    palette: {
        background: { default: "#424451" },
        primary: { main: "#67D0E8" },
        text: { main: "#707070" },
    },
});

export default { lightTheme, darkTheme };
