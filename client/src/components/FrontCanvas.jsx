import React from "react";

import { Grid, Button } from "@material-ui/core";

import { ReactComponent as FrontBanner } from "../asset/Banner/frontPage.svg";
import { ReactComponent as IdGen } from "../asset/icons/genId.svg";
import { ReactComponent as OneOne } from "../asset/icons/one-one.svg";
import { ReactComponent as GroupConf } from "../asset/icons/groupConf.svg";

const FrontCanvas = () => {
    return (
        <Grid container alignItems='center' justify='space-around'>
            <Grid item>
                <FrontBanner style={{ height: "200px" }} />
            </Grid>
        </Grid>
    );
};

export default FrontCanvas;
