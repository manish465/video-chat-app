import React from "react";
import { Link } from "react-router-dom";

import { Grid, Button, Typography, makeStyles } from "@material-ui/core";

import { ReactComponent as FrontBanner } from "../asset/Banner/frontPage.svg";
import { ReactComponent as IdGen } from "../asset/icons/genId.svg";
import { ReactComponent as OneOne } from "../asset/icons/one-one.svg";
import { ReactComponent as GroupConf } from "../asset/icons/groupConf.svg";

const useStyles = makeStyles({
    button: {
        boxShadow: "3px 3px 4px 0.5px rgba(0,0,0,0.3)",
        backgroundColor: "white",
        padding: "10px 10px",
        borderRadius: "10px",
        marginBottom: "20px",
    },
});

const FrontCanvas = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            direction='row'
            justify='space-around'
            alignItems='center'>
            <Grid item>
                <FrontBanner style={{ height: "550px", width: "550px" }} />
            </Grid>
            <Grid>
                <Grid item>
                    <Button
                        style={{
                            background:
                                "linear-gradient(to right, #6dd5ed, #2193b0)",
                        }}
                        className={classes.button}>
                        <IdGen style={{ width: "30px", marginRight: "30px" }} />
                        <Typography variant='h7'>Create a new ID</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        component={Link}
                        to='/call'
                        className={classes.button}>
                        <OneOne
                            style={{ width: "30px", marginRight: "30px" }}
                        />
                        <Typography variant='h7'>
                            One-on-One video call
                        </Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button className={classes.button}>
                        <GroupConf
                            style={{ width: "30px", marginRight: "30px" }}
                        />
                        <Typography variant='h7'>
                            Group video conference
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FrontCanvas;
