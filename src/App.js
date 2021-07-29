import {  useState, useEffect } from 'react';
import {  Button, Grid, Select, MenuItem, Container, Typography, TextField, CssBaseline,InputLabel} from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import SwapHorizontalCircleOutlinedIcon from '@material-ui/icons/SwapHorizontalCircleOutlined';

import Data from './languageData.json';



import useStyles from './styles';


const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');



const App = () => {
  const languages = Object.entries(Data);
  const classes = useStyles();

  const [word,setWord] = useState('');
  const [responseData,setResponseData] = useState();
  const [translatedWord,setTranslatedWord] = useState();
  const [toLanguage,setToLanguage] = useState();
  const [fromLanguage,setFromLanguage] = useState();

useEffect(() => {
  if(responseData) {
    const obj = JSON.parse(responseData);
    const translation = obj[0].translations[0].text;
    setTranslatedWord(translation);
  }
}, [responseData]);

const switchLanguage= () => {
  if(fromLanguage && toLanguage && word) {
    let from = fromLanguage;
    let to = toLanguage;
    let toBeTranslated = word;
    let translated = translatedWord;
    setFromLanguage(to);
    setToLanguage(from);
    setWord(translated);
    setTranslatedWord(toBeTranslated);
} else {
  setFromLanguage('hu');
  setToLanguage('en');
  setWord(translatedWord);
  setTranslatedWord(word);
  }
}

var subscriptionKey = process.env.REACT_APP_SUBSCRIPTION_KEY;
var endpoint = "https://api.cognitive.microsofttranslator.com";

// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
var location = "westeurope";

axios({
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    params: {
        'api-version': '3.0',
        'from': `${fromLanguage ? fromLanguage : 'en'}`,
        'to': `${toLanguage ? toLanguage : 'hu'}`
    },
    data: [{
        'text': `${word}`
    }],
    responseType: 'json'
}).then(function(response){
    const data = JSON.stringify(response.data);
    setResponseData(data);
});

  return (
    <Container className={classes.wrapper}>
    <CssBaseline />
    <Container>
      <Grid container className={classes.main} justifyContent="center" alignItems="center" flexdirection="column">
        <Typography variant="h3" color="primary">TranslateList</Typography>
        <Typography variant="caption" color="textSecondary">Translate foreign words then add them to a list to memorize them ! </Typography>
      </Grid>
    </Container>
        <Grid  className={classes.options} container spacing={1} 
          direction="row"
          justifyContent="space-around"
          alignItems="center">
          <Grid item xs sm={5}>
              {/* <InputLabel shrink id="from">From</InputLabel> */}
              <Select className={classes.select} labelId="from" variant="outlined" value={fromLanguage ? fromLanguage : 'en'} onChange={(e) => setFromLanguage(e.target.value)}>
                {languages.map((language,index) => (
                  <MenuItem key={index} value={language[1]}>{language[0]}</MenuItem>
                ))}
              </Select>
          </Grid>
          <Grid item xs={3} sm={2}>
            <CssBaseline />
            <Button className={classes.switchButton}  onClick={switchLanguage}variant="outlined" color="primary" fullWidth><SwapHorizontalCircleOutlinedIcon/></Button>
          </Grid>
          <Grid item xs sm={5}>
            {/* <InputLabel shrink id="to">To</InputLabel> */}
              <Select className={classes.select} labelId="to" variant="outlined" value={toLanguage ? toLanguage : 'hu'} onChange={(e) => setToLanguage(e.target.value)}>
              {languages.map((language,index) => (
                 <MenuItem key={index} value={language[1]}>{language[0]}</MenuItem>
              ))}
            </Select>
           </Grid>
        </Grid>
        <Grid  justifyContent="center" alignItems="center" container spacing={2}>
          <Grid  item xs={12} sm={6}>
              <TextField
                  className={classes.input}   
                  multiline rows={7}
                  id="outlined-basic" 
                  variant="outlined"
                  type="text" 
                  value={word} onChange={(e) => setWord(e.target.value)}
                  label="From"
                />
              </Grid>
              <Grid  item xs={12} sm={6}>
                <TextField
                  disabled
                  className={classes.input} 
                  multiline rows={7}
                  id="outlined-basic"
                  variant="outlined"
                  type="text" 
                  label="To"
                  value={translatedWord ? translatedWord : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Button variant="contained" color="primary" fullWidth><AddBoxOutlinedIcon /></Button>
              </Grid>
        </Grid>
    </Container>
  );
}

export default App;
