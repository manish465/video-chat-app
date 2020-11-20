import { makeStyles } from "@material-ui/core";

export default makeStyles({
    userVideo: {
        position: "absolute",
        bottom: "30px",
        right: "30px",
        width: "250px",
        borderRadius: "20px",
    },
    partnerVideo: {
        width: "100%",
        height: "99vh",
        background: "#000",
    },
    callListButton: {
        display: "block",
        margin: "10px auto",
    },
    inCallButtonGroup: {
        position: "absolute",
        bottom: "10%",
        left: "45%",
    },
    incomingCall: {
        margin: "40px",
        padding: "20px",
    },
    button: {
        boxShadow: "3px 3px 4px 0.5px rgba(0,0,0,0.3)",
        backgroundColor: "white",
        padding: "10px 10px",
        borderRadius: "10px",
        marginBottom: "20px",
    },
    container_banner: {
        width: "90%",
        height: "100%",
    },
    container: {
        height: "100vh",
        padding: "40px",
    },
    container_paper: {
        width: "100%",
        height: "270px",
        padding: "60px",
        borderRadius: "20px",
        background: "#ffffff",
    },
    container_paper_button: {
        marginTop: "40px",
    },
    group_chat_create_room: {
        margin: "20px 100px",
        padding: "30px 50px",
    },
    group_chat_create_room_create_button: {
        margin: "20px 0",
    },
    group_chat_available_room: {
        margin: "10px 100px",
        padding: "20px",
    },
    group_chat_available_room_button: {
        margin: "5px 0",
    },
});
