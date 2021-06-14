import { makeStyles, Backdrop } from '@material-ui/core'
import { AddToHomeScreenRounded } from '@material-ui/icons';

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
    fontSize: '0.8em'
  },
}));

export default function Welcome(props) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={props.openInstall} onClick={props.toggleInstallPanel} mountOnEnter unmountOnExit>
      <div className={classes.backdropContent}>
        <AddToHomeScreenRounded style={{fontSize: '5em'}}/>
        <p>Add this app to your home screen<br/>to connect with people<br/>anytime, anywhere.</p>
        <p className={classes.subtitle}><b>IOS:</b><br/> {"Open in Safari > Share > Add to Home Screen"}</p>
        <p className={classes.subtitle}><b>Android:</b><br/> {"Open in Chrome > Menu > Add to homescreen"}</p>
        <p className={classes.subtitle}>Click anywhere to continue...</p>
      </div>
    </Backdrop>
  )
}