import {  useState, useEffect } from 'react';

const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

const word = 'Hello World!';


function App() {

const [responseData,setResponseData] = useState('');



useEffect(() => {
  // const translation = responseData.reduce(
  //   (obj, item) => Object.assign(obj, { [item.key]: item.value }), {});
    console.log(responseData);

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
        'text': 'Hello World!'
    }],
    responseType: 'json'
}).then(function(response){
    const data = JSON.stringify(response.data, null, 4);
    setResponseData(data);
});


  return (
    <>
      <h1>{word}</h1>
      <h2>{responseData}</h2>
    </>
  );
}

export default App;
