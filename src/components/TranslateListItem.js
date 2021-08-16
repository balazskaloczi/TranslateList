import React from 'react'
import { Grid,Typography,Button } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import useStyles from './styles';

const TranslateListItem = ({ from, to , translatetext , translatedtext , translateList, id, settranslateList}) => {

    const classes = useStyles();

    const deleteItem = (item, id) => {
        settranslateList(translateList.filter(item => translateList.indexOf(item) !== id))
     }

    return (
    <>
    <Grid item xs={5} >
        <Typography variant="caption">{`From:${from}`}</Typography>
        <Typography variant="body1">{translatetext}</Typography>
    </Grid>
    <Grid item xs={5}>
        <Typography variant="caption" >{`To:${to}`}</Typography>
        <Typography variant="body1" >{translatedtext}</Typography>
    </Grid>
    <Grid item xs={2} className={classes.buttonWrapper}>
        <Button >
         <RemoveCircleOutlineIcon color="primary" onClick={(e) => deleteItem(e,id)}/> 
        </Button>
    </Grid>
    </>
    )
}

export default TranslateListItem


