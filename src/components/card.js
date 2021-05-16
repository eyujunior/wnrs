import { Card, CardContent, makeStyles, Box } from '@material-ui/core'
import * as Decks from '../decks'
import {forwardRef} from 'react'

const smallSize = [360, 248]
const largeSize = [480, 330]

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: -smallSize[0]/2,
      marginTop: -smallSize[1]/2,
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: -largeSize[0]/2,
      marginTop: -largeSize[1]/2,
    },
  },
  card: {
    ...theme.typography.h6,
    [theme.breakpoints.down('sm')]: {
      width: smallSize[0],
      height: smallSize[1],
    },
    [theme.breakpoints.up('sm')]: {
      width: largeSize[0],
      height: largeSize[1],
      fontSize: largeSize[0]/smallSize[0] * theme.typography.h6.fontSize
    },
    borderRadius: 60,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  normCard: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
  wildCard: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  wildCardHeader:{
    paddingBottom: theme.spacing(2),
  },
  content: {
    flexGrow: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderHeader: {
    textAlign: 'left',
    paddingRight: theme.spacing(3),
    flex: 1,
  },
  reminderContent: {
    textAlign: 'left',
    flex: 3
  },
  footer: {
    padding: '0 !important',
    fontSize: '0.5em',
  },
}))

export default forwardRef( function WNRSCard(props, ref) {
  const classes = useStyles();
  const isWildcard = props.content.startsWith('Wild Card')
  const isReminder = props.content.startsWith('Reminder')
  const question = isWildcard ? props.content.slice(10) : isReminder ? props.content.slice(9) : props.content;
  
  const getDeckName = (() => {
    if (props.decks.length === 1) return Decks[props.decks[0]].edition
    for (let i = 0; i < props.decks.length; i++)
      if ((Decks[props.decks[i]][`level${props.level}`]!== undefined && Decks[props.decks[i]][`level${props.level}`].includes(props.content)) || 
          (Decks[props.decks[i]].finalCard !== undefined && Decks[props.decks[i]].finalCard.includes(props.content)))
        return Decks[props.decks[i]].edition
    return ""
  })()

  return (
    <Box className={classes.root} ref={ref}>
      <Card className={`${classes.card} ${isWildcard || isReminder ? classes.wildCard: classes.normCard}`} 
        variant='outlined' aria-label={props.content} style={props.trans}>
        <CardContent className={classes.content}>
        {isWildcard 
          ? <div className={classes.wildCardHeader}>WildCard</div>
          : null }
        <div className={classes.flexRow}>
          {isReminder
            ? <div className={classes.reminderHeader}>Reminder</div>
            : null }
          <span className={isReminder ? classes.reminderContent : null} style={{whiteSpace: 'pre-line'}}>
            {question}
          </span>
        </div>
        </CardContent>
        <CardContent className={classes.footer}>
          We're Not Really Strangers <br/>
          {getDeckName}
        </CardContent>
      </Card>
    </Box>
  )
})