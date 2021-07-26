import {  useState, useEffect } from 'react';
import {  Button, Grid, Select, InputLabel, MenuItem, Container, Typography, TextField, CssBaseline } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

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


useEffect(()=> {
  console.log(fromLanguage);
  console.log(toLanguage);
}, [fromLanguage,toLanguage])


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
        'from': `${fromLanguage ? fromLanguage : 'en'}`,
        'to': `${toLanguage ? toLanguage : 'it'}`
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
    <Container fixed className={classes.main}>
      <div>
        <Typography variant="h1" color="primary">TranslateList</Typography>
        <Typography variant="subtitle2" color="primary">Translate foreign words then add them to a list to memorize them ! </Typography>
      </div>
    </Container>
    <form >
        <Container className={classes.container}>
            <Container className={classes.inputs}>
                <TextField
                className={classes.input}   
                multiline rows={7}
                 id="outlined-basic" 
                 variant="outlined"
                    type="text" 
                    value={word} onChange={(e) => setWord(e.target.value)}
                    label="From"
                    />
                <TextField
                className={classes.input} 
                 multiline rows={7}
                  id="outlined-basic"
                   variant="outlined"
                     type="text" 
                     label="To"
                     value={translatedWord ? translatedWord : ''}
                     />
                <Button variant="contained" color="primary"><AddBoxOutlinedIcon /></Button>
            </Container>
            <Container className={classes.options} spacing={6}>
              <Select variant="outlined" value={fromLanguage ? fromLanguage : 'en'} onChange={(e) => setFromLanguage(e.target.value)}>
                {languages.map((language,index) => (
                  <MenuItem key={index} value={language[1]}>{language[0]}</MenuItem>
                ))}
              </Select>
              <Select variant="outlined" value={toLanguage ? toLanguage : 'it'} onChange={(e) => setToLanguage(e.target.value)}>
                {languages.map((language,index) => (
                  <MenuItem key={index} value={language[1]}>{language[0]}</MenuItem>
                ))}
              </Select>
              <Button className={classes.translateButton} variant="contained" color="primary" >Translate</Button>
            </Container>
        </Container>
      </form>
    </Container>
  );
}

export default App;
