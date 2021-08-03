import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    wrapper: {
        maxWidth: '100vh'
    },
    main: {
      textAlign: 'center',
      marginBottom: '80px',
      flexDirection: 'column'
    },
    options: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '30px'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    input :{
        width: '100%'
    },
    select: {
        width: '100%',
    },
    switchButton: {
        height: '100%'
    }

  });

  export default useStyles