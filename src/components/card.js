import { Card, CardContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
    height: 230,
    borderRadius: 60,
    margin: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    ...theme.typography.h6,
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
    fontSize: '0.6rem',
  },
}))

export default function WNRSCard(props) {
  const classes = useStyles();
  const isWildcard = props.content.startsWith('Wild Card')
  const isReminder = props.content.startsWith('Reminder')
  const question = isWildcard ? props.content.slice(10) : isReminder ? props.content.slice(9) : props.content;

  return (
    <Card className={`${classes.root} ${isWildcard || isReminder ? classes.wildCard: classes.normCard}`} variant='outlined' aria-label={props.content}>
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
        <div className={isReminder ? classes.reminderContent : null}>
          {question}
        </div>
      </div>
      </CardContent>
      <CardContent className={classes.footer}>
        We're Not Really Strangers
      </CardContent>
    </Card>
  )
}