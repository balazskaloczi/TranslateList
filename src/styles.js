import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    main: {
      textAlign: 'center',
      marginBottom: '120px'
    },
    options: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    inputs :{
        display:'flex',
        justifyContent:'center',
    },
    translateButton: {
        padding: '15.8px'
    }
  });

  export default useStyles