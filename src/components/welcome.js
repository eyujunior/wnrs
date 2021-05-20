import { makeStyles, Backdrop } from '@material-ui/core'

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
    width: '80%',
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
    <Backdrop className={classes.backdrop} open={props.openWelcome} onClick={props.toggleWelcomePanel} mountOnEnter unmountOnExit>
      <div className={classes.backdropContent} style={{maxWidth: 500}}>
        <p><u>We're not really strangers</u></p>
        <p>Warning:<br/>Feelings may arise.</p>
        <p>Ready?</p>
        <p className={classes.subtitle}>
          Reminder: Open your heart.<br/><br/>
          Add this application to your home page<br/> to begin a conversation with anyone anytime.
        </p>
      </div>
    </Backdrop>
  )
}