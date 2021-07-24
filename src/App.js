import {  useState, useEffect } from 'react';
import {  Button, Grid, Select, InputLabel, MenuItem, Container, Typography, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './styles';


const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');



const App = () => {
  const classes = useStyles();

  const [word,setWord] = useState('');
  const [responseData,setResponseData] = useState();
  const [translatedWord,setTranslatedWord] = useState();


useEffect(() => {

  if(responseData) {
    const obj = JSON.parse(responseData);
    const translation = obj[0].translations[0].text;
    setTranslatedWord(translation);
  }

  

}, [responseData]);

var subscriptionKey = "8e32e7b441f74185a2630cd229ed91f7";
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
        'from': 'en',
        'to': 'de'
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
    <>
    <Container fixed className={classes.main}>
      <div>
        <Typography variant="h1" color="primary">TranslateList</Typography>
        <Typography variant="subtitle2" color="primary">Translate foreign words and add them to a list to memorize them ! </Typography>
      </div>
    </Container>
    <form >
        <Container className={classes.container}>
              <InputLabel id="caption">Translate Something</InputLabel>
                <TextField id="outlined-basic" variant="outlined"  labelId="caption" type="text" value={word} onChange={(e) => setWord(e.target.value)}/>
                <TextField id="outlined-basic" variant="outlined"  type="text" value={translatedWord ? translatedWord : 'Translate something !'}/>
                <Button variant="contained" color="primary">{AddIcon}</Button>
              <Typography variant="subtitle1"  color="textPrimary" display="block"></Typography>
            <div className={classes.options} spacing={6}>
              <InputLabel id="fromLanguage">From</InputLabel>
              <Select value={'English'} labelId="fromLanguage">
                <MenuItem value={'English'}>English</MenuItem>
              </Select>
              <InputLabel id="toLanguage">To</InputLabel>
              <Select  value={'German'} labelId="toLanguage">
                <MenuItem value={'German'}>German</MenuItem>
              </Select>
              <Button variant="contained" color="primary" >Translate</Button>
            </div>
        </Container>
      </form>
    </>
  );
}

export default App;
