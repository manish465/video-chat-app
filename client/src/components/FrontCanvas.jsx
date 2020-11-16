import React from "react";
import { Link } from "react-router-dom";

import { Grid, Button, Typography } from "@material-ui/core";

import useStyles from "../styles/style";

import { ReactComponent as FrontBanner } from "../asset/Banner/frontPage.svg";
import { ReactComponent as IdGen } from "../asset/icons/genId.svg";
import { ReactComponent as OneOne } from "../asset/icons/one-one.svg";
import { ReactComponent as GroupConf } from "../asset/icons/groupConf.svg";

const FrontCanvas = ({ userName }) => {
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
                        component={Link}
                        to='/gen-id'
                        style={{
                            background:
                                "linear-gradient(to right, #6dd5ed, #2193b0)",
                        }}
                        className={classes.button}>
                        <IdGen style={{ width: "30px", marginRight: "30px" }} />
                        <Typography variant='h4'>Create a new ID</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        component={Link}
                        disabled={userName === ""}
                        to='/call'
                        className={classes.button}>
                        <OneOne
                            style={{ width: "30px", marginRight: "30px" }}
                        />
                        <Typography variant='h6'>
                            One-on-One video call
                        </Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        disabled={userName === ""}
                        className={classes.button}>
                        <GroupConf
                            style={{ width: "30px", marginRight: "30px" }}
                        />
                        <Typography variant='h6'>
                            Group video conference
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FrontCanvas;
