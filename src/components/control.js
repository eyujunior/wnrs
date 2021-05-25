import { makeStyles, Backdrop } from '@material-ui/core'
import { ArrowUpwardRounded, KeyboardArrowLeftRounded, KeyboardArrowRightRounded } from '@material-ui/icons'

const smallSize = [360, 248]
const largeSize = [480, 330]

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

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
    alignItems: 'center',
    ...theme.typography.h6,
    whiteSpace: 'pre-line',
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '80%',
  },
  fixedTooltip: {
    paddingTop: theme.spacing(2),
    alignItems: 'center',
    alignSelf: 'flex-start',
    position: 'fixed',
    width: 250,
  },
  level: {
    [theme.breakpoints.down('xs')]: { paddingTop: 'calc(56px + env(safe-area-inset-top, 0px))', right: 89 },
    [theme.breakpoints.up('sm')]:   { paddingTop: 'calc(64px + env(safe-area-inset-top, 0px))', right: 97 },
  },
  decks: {
    [theme.breakpoints.down('xs')]: { paddingTop: 'calc(56px + env(safe-area-inset-top, 0px))', right: 6 },
    [theme.breakpoints.up('sm')]:   { paddingTop: 'calc(64px + env(safe-area-inset-top, 64px))', right: 14 },
  },
  opacity: {
    backgroundColor: (() => {
      let rgb = hexToRgb(theme.palette.primary.main);
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85)`
    })(),
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: (() => {
      let rgb = hexToRgb(theme.palette.primary.main);
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`
    })(),
    borderRadius: 55,
    [theme.breakpoints.down('sm')]: {
      width: smallSize[0],
      height: smallSize[1],
    },
    [theme.breakpoints.up('sm')]: {
      width: largeSize[0],
      height: largeSize[1],
    },
  },
  leftRow: {
    display: 'flex',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  rightRow: {
    display: 'flex',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  title: {
    width: 250,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '0.8em',
    textTransform: 'none',
    margin: 0,
  }
}));

export default function Control(props) {
  const classes = useStyles();

  return (
    <Backdrop className={`${classes.backdrop} ${classes.opacity}`} open={props.controlPanel < 3} onClick={props.toggleControlPanel} mountOnEnter unmountOnExit>
      {props.controlPanel === 0
      ? <div className={classes.backdropContent}>
          <div className={classes.leftRow}>
            <KeyboardArrowLeftRounded fontSize="large"/>
            <p style={{textAlign: 'left'}}>Tap left<br/>for the previous card</p>
          </div>
          <div variant="outlined" className={classes.card}>Click the card<br/>to enlarge</div>
          <div className={classes.rightRow}>
            <p style={{textAlign: 'right'}}>Tap right<br/>for the next card</p>
            <KeyboardArrowRightRounded fontSize="large"/>
          </div>
        </div>
      : null }
      {props.controlPanel === 1
      ? <div className={`${classes.backdropContent} ${classes.fixedTooltip} ${classes.level}`}>
        <ArrowUpwardRounded/>
        <p className={classes.title}>Change level here</p>
        <p className={`${classes.title} ${classes.subtitle}`}>Whenever you feel comfortable,<br/> move on to the next level.</p>
        </div>
      : null}
      {props.controlPanel === 2 || props.controlPanel === 3
      ? <div className={`${classes.backdropContent} ${classes.fixedTooltip} ${classes.decks}`}>
          <ArrowUpwardRounded/>
          <p className={classes.title}>Change deck here</p>
          <p className={`${classes.title} ${classes.subtitle}`}>Some decks are best used when added<br/> to the original WNRS card game.</p>
        </div>
      : null} 
    </Backdrop>
  )
}