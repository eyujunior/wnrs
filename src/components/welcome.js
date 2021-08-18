import { makeStyles, Backdrop, Button } from '@material-ui/core' 
import { VideogameAssetRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(2),
  },
  backdropContent:{
    display: 'flex',
    flexDirection: 'column',
    ...theme.typography.h6,
    whiteSpace: 'pre-line',
    textTransform: 'uppercase',
    alignItems: 'center',
    textAlign: 'center',
    width: '80%',
  },
  button: {
    width: 200,
    ...theme.typography.h6,
    color: theme.palette.primary.contrastText,
    marginTop: theme.spacing(2),
  },
  paragraph: {
    fontWeight: 400,
    textTransform: 'none',
    fontSize: '0.8em'
  },
  warning: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(2, 2),
  }
}));

export default function Welcome(props) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={props.welcome} onClick={props.toggleWelcomePanel(false)} mountOnEnter unmountOnExit>
      <div className={classes.backdropContent} style={{maxWidth: 500}}>
        <p><u>We're not really strangers</u></p>
        <p>Warning:<br/>Feelings may arise.</p>
        <p>Ready?</p>
        <br/>
        <Button className={classes.button} size="large" variant="outlined" onClick={props.toggleWelcomePanel(true)}>
          Show control &nbsp; <VideogameAssetRounded/>
        </Button>
        <p className={classes.paragraph}>or click anywhere to continue...</p>
      </div>
    </Backdrop>
  )
}