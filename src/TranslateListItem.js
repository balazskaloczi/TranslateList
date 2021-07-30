import React from 'react'
import {  Grid,Typography} from '@material-ui/core';

const TranslateListItem = ({ from, to , translatetext , translatedtext}) => {
    return (
    <>
    <Grid item xs={6} alignItems="center" justifyContent="center">
        <Typography variant="caption">{`From:${from}`}</Typography>
        <Typography variant="body2">{translatetext}</Typography>
    </Grid>
    <Grid item xs={6}>
        <Typography variant="caption" >{`To:${to}`}</Typography>
        <Typography variant="body2" >{translatedtext}</Typography>
    </Grid>
    </>
    )
}

export default TranslateListItem


