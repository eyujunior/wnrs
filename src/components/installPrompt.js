import { makeStyles, Snackbar, Slide } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { AddToHomeScreenRounded} from '@material-ui/icons';

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
    textAlign: 'center',
    alignItems: 'center',
    width: '80%',
    maxWidth: 500,
  },
  subtitle: {
    fontWeight: 400,
    textTransform: 'none',
    fontSize: '0.9em'
  },
}));

export default function Welcome(props) {
  const classes = useStyles();
  return (
    <Snackbar open={props.install} autoHideDuration={6000} onClose={props.toggleInstallPanel}
      TransitionComponent={Slide}>
      <Alert icon={<AddToHomeScreenRounded/>} elevation={6} severity="info" onClose={props.toggleInstallPanel} >
        <AlertTitle>Install to connect with people anytime, anywhere.</AlertTitle>
        <span className={classes.subtitle}><b>iOS:</b> Open in Safari &gt; Share &gt; Add to Home Screen</span> <br/>
        <span className={classes.subtitle}><b>Android:</b> Open in Chrome &gt; Menu &gt; Add to homescreen</span>
      </Alert>
    </Snackbar>
  )
}