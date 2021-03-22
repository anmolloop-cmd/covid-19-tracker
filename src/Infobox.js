import React from 'react'
import {Card,CardContent, Typography} from '@material-ui/core';
function Infobox({title,cases,total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox_title" color="textPrimary">
                <h2>{title}</h2>
                </Typography>
                <Typography className="infoBox_cases" color="textSecondary">
                    <h3>{cases}</h3>
                </Typography>
                <Typography className="infoBox_cases" color="textSecondary">
                    <h3>{total}</h3>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox;
