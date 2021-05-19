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
    
    [theme.breakpoints.down('sm')]: {
      width: smallSize[0],
      height: smallSize[1],
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
      width: largeSize[0],
      height: largeSize[1],
      padding: theme.spacing(1.5),
      fontSize: largeSize[0]/smallSize[0] * theme.typography.h6.fontSize
    },
    borderRadius: 55,
    ...theme.typography.h6,
    textTransform: 'uppercase',
    textAlign: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  normCard: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.secondary.main,
  },
  wildCard: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  wildCardHeader:{
    paddingBottom: theme.spacing(2),
  },
  content: {
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      top: smallSize[1]/2,
      left: smallSize[0]/2,
    },
    [theme.breakpoints.up('sm')]: {
      top: largeSize[1]/2,
      left: largeSize[0]/2,
    },
    transform: 'translateX(-50%) translateY(-50%)',
    width: `calc(100% - ${theme.spacing(4)}px)`,
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
    paddingRight: theme.spacing(4),
  },
  reminderContent: {
    textAlign: 'left',
  },
  footer: {
    padding: `${theme.spacing(0.5, 0)} !important`,
    fontSize: '0.6em',
  },
  footerEdition:{
    padding: '0 !important',
    fontSize: '0.45em',   
  }
}))

export default forwardRef( function WNRSCard(props, ref) {
  const classes = useStyles();
  const isWildcard = props.content.startsWith('Wild Card')
  const isReminder = props.content.startsWith('Reminder')
  const question = isWildcard ? props.content.slice(10) : isReminder ? props.content.slice(9) : props.content;
  
  const getDeck = (() => {
    if (props.decks.length === 1) return Decks[props.decks[0]]
    for (let i = 0; i < props.decks.length; i++)
      if ((Decks[props.decks[i]][`level${props.level}`]!== undefined && Decks[props.decks[i]][`level${props.level}`].includes(props.content)) || 
          (Decks[props.decks[i]].finalCard !== undefined && Decks[props.decks[i]].finalCard.includes(props.content)))
        return Decks[props.decks[i]]
    return ""
  })()

  return (
    <Box className={classes.root} ref={ref}>
      <Card className={`${classes.card} ${isWildcard || isReminder ? classes.wildCard: classes.normCard}`} 
        variant='outlined' aria-label={props.content} style={props.trans}>
        <div className={classes.content}>
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
        </div>
        <CardContent className={classes.footer}>
          We're Not Really Strangers{getDeck.crossover !== undefined ? `\xa0\xa0 X \xa0\xa0${getDeck.crossover}` : null}<br/>
        </CardContent>
        <CardContent className={classes.footerEdition} >
          {getDeck.edition !== undefined ? getDeck.edition : null}
        </CardContent>
      </Card>
    </Box>
  )
})