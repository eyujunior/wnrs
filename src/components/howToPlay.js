import { useState } from 'react'
import { makeStyles, IconButton, Backdrop } from '@material-ui/core'
import { GitHub, HomeRounded, VideogameAssetRounded, HelpOutlineRounded } from '@material-ui/icons';
import * as gameplay from '../decks/instruction'
import * as metadata from './metadata'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.tooltip,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    ...theme.typography.h6,
    whiteSpace: 'pre-line',
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '80%',
    maxWidth: 500,
  },
  paragraph: {
    textAlign: 'left',
    textTransform: 'none',
    fontWeight: 400,
    fontSize: theme.typography.h6.fontSize - 1,
    flexGrow: 5,
  },
  subtitle: {
    marginTop: 0,
    fontWeight: 400,
    textTransform: 'none',
    whiteSpace: 'pre-line',
    fontSize: '0.8em'
  },
  infoLevel: {
    marginRight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    flex: '0 0 100px'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
  },
  iconButton: {
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
  }
}))

export default function HowToPlay (props) {
  const classes = useStyles()
  const [openHelp, setOpenHelp] = useState(false);
  
  const handleToggleHelp = () => setOpenHelp(!openHelp);

  const onGithub = () => window.open("https://github.com/jonathan-lph/wnrs")
  const onWNRS = () => window.open("https://werenotreallystrangers.com")
  
  return (
    <>
      <IconButton onClick={handleToggleHelp} className={classes.iconButton}>
        <HelpOutlineRounded/>
      </IconButton>
      <Backdrop className={classes.backdrop} open={openHelp} onClick={handleToggleHelp} mountOnEnter unmountOnExit>
        <div className={classes.info}>
          <p><u>How to Play</u></p>
          <p>Pick a card. Read it out loud to your partner(s) and listen to their answer.</p>
          <div className={classes.row}>
            <div className={classes.infoLevel}>Level 1<br/>Perception</div>
            <div className={classes.paragraph}>{gameplay.levelOne}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.infoLevel}>Level 2<br/>Connection</div>
            <div className={classes.paragraph}>{gameplay.levelTwo}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.infoLevel}>Level 3<br/>Reflection</div>
            <div className={classes.paragraph}>{gameplay.levelThree}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.infoLevel}>Wildcard</div>
            <div className={classes.paragraph}>{gameplay.wildcards}</div>
          </div>
          <div className={classes.row}>
            <IconButton className={classes.iconButton} onClick={onWNRS}><HomeRounded/></IconButton>
            <IconButton className={classes.iconButton} onClick={onGithub} ><GitHub/></IconButton>
            <IconButton className={classes.iconButton} onClick={props.toggleControlPanel}><VideogameAssetRounded /></IconButton>
          </div>
          <div className={`${classes.row} ${classes.subtitle}`}>
            {metadata.copyright}<br/>
            Developed by {metadata.developer} - {metadata.version}
          </div>
          <div className={classes.subtitle}>{metadata.contact}</div>
        </div>
      </Backdrop>
    </>
  )
}