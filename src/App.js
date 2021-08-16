import {  useState, useEffect } from 'react';
import {  Button, Grid, Select, MenuItem, Container, Typography, TextField, CssBaseline} from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import SwapHorizontalCircleOutlinedIcon from '@material-ui/icons/SwapHorizontalCircleOutlined';
import TranslateListItem from './components/TranslateListItem'

import Data from './languageData.json';

import useStyles from './styles';

const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

const App = () => {

  const languages = Object.entries(Data);
  const classes = useStyles();

  const [word,setWord] = useState('');
  const [responseData,setResponseData] = useState();
  const [translatedWord,setTranslatedWord] = useState('');
  const [toLanguage,setToLanguage] = useState('hu');
  const [fromLanguage,setFromLanguage] = useState('en');
  const [translateList,settranslateList] = useState([]);
  const [translateListItem,settranslateListItem] = useState();

  const createListItem = async () => {
    let data = `{"from":"${indexer(fromLanguage)}","to":"${indexer(toLanguage)}","fromText":"${word}","translatedText":"${translatedWord}"}`;
    await settranslateListItem(data);
  }

  

  const indexer = (search) => {
      for (const [key, value] of Object.entries(Data)) {
        if(value === search) {
          return key
        } 
    }
  }

useEffect(() => {
  if(responseData) {
    const obj = JSON.parse(responseData);
    const translation = obj[0].translations[0].text;
    setTranslatedWord(translation);
  }
}, [responseData]);


useEffect(() => {
      if(translateListItem) {
        settranslateList([...translateList , JSON.parse(translateListItem)])
        settranslateListItem(null);
      }
}, [translateListItem,translateList]);

useEffect(() => {
  const data = localStorage.getItem('translation');
  if (data) {
    settranslateList(JSON.parse(data))
  }
},[])

useEffect(() => {
  if(translateList) {
    localStorage.setItem('translation',JSON.stringify(translateList));
  }
},[translateList])

const switchLanguage = () => {
  if(fromLanguage && toLanguage ) {
    let from = fromLanguage;
    let to = toLanguage;
    let translated = translatedWord;
    setFromLanguage(to);
    setToLanguage(from);
    setWord(translated);
  }
}

var subscriptionKey = process.env.REACT_APP_SUBSCRIPTION_KEY;
var endpoint = "https://api.cognitive.microsofttranslator.com";

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
        <Grid  className={classes.options} container spacing={3} 
          direction="row"
          justifyContent="space-around"
          alignItems="center">
          <Grid item xs={12} sm={12} md={5}>
              <Select className={classes.select} labelId="from" variant="outlined" value={fromLanguage ? fromLanguage : 'en'} onChange={(e) => setFromLanguage(e.target.value)}>
                {languages.map((language,index) => (
                  <MenuItem key={index} value={language[1]}>{language[0]}</MenuItem>
                ))}
              </Select>
          </Grid>
          <Grid item xs={4} sm={6} md={2}>
            <CssBaseline />
            <Button className={classes.switchButton}  onClick={switchLanguage}  color="primary" fullWidth><SwapHorizontalCircleOutlinedIcon/></Button>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
              <Select className={classes.select} labelId="to" variant="outlined" value={toLanguage ? toLanguage : 'hu'} onChange={(e) => setToLanguage(e.target.value)}>
              {languages.map((language,index) => (
                 <MenuItem key={index} value={language[1]}>{language[0]}</MenuItem>
              ))}
            </Select>
           </Grid>
        </Grid>
        <Grid  container justifyContent="center" alignItems="center"  spacing={2}>
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
                  <Button variant="contained" color="primary" onClick={createListItem} fullWidth><AddBoxOutlinedIcon /></Button>
              </Grid>
        </Grid>
        <Grid container direction="row"  alignItems="center" spacing={2}>
          {!translateList ?
            <Grid item>
              <Typography> Add translation to the list with the <AddBoxOutlinedIcon  fontSize="small" color="primary"/> Button !</Typography>
            </Grid>   :
            translateList.map((e,index) => 
            <TranslateListItem key={index} translatetext={e.fromText} translatedtext={e.translatedText} from={e.from} to={e.to} translateList={translateList} id={index} settranslateList={settranslateList}/> 
            )
          }
        </Grid>
    </Container>
  );
}

export default App;
