import { Card, CardContent, makeStyles, Box } from '@material-ui/core'
import {forwardRef} from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
    height: 230,
    borderRadius: 60,
    //margin: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    ...theme.typography.h6,
    textTransform: 'uppercase',
    textAlign: 'center',
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginLeft: -180,
    marginTop: -115,
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
    fontSize: '0.6rem',
  },
}))

export default forwardRef( function WNRSCard(props, ref) {
  const classes = useStyles();
  const isWildcard = props.content.startsWith('Wild Card')
  const isReminder = props.content.startsWith('Reminder')
  const question = isWildcard ? props.content.slice(10) : isReminder ? props.content.slice(9) : props.content;

  return (
    <Box className={classes.root} ref={ref}>
    <Card className={`${classes.root} ${isWildcard || isReminder ? classes.wildCard: classes.normCard}`} variant='outlined' aria-label={props.content} style={props.trans}>
      <CardContent className={classes.content}>
      {isWildcard 
        ? <div className={classes.wildCardHeader}>
            Wild Card
          </div>
        : null }
      <div className={classes.flexRow}>
        {isReminder
          ? <div className={classes.reminderHeader}>
              Reminder
            </div>
          : null }
        <span className={isReminder ? classes.reminderContent : null} style={{whiteSpace: 'pre-line'}}>
          {question}
        </span>
      </div>
      </CardContent>
      <CardContent className={classes.footer}>
        We're Not Really Strangers
      </CardContent>
    </Card>
    </Box>
  )
})