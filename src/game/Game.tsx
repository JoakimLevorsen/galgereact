import React, { Component } from "react";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";

interface Props {
    signOut: () => void;
}

export default class Game extends Component<Props> {
    render = () => (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography style={{ flex: 1 }} variant="h6">
                        Galgeleg
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => this.props.signOut()}
                    >
                        Log ud
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
