import { Button, Toolbar, AppBar, Typography, makeStyles, Menu, MenuItem, IconButton, Backdrop, Divider } from '@material-ui/core'
import { InfoRounded, HelpOutlineRounded, GitHub, HomeRounded, VideogameAssetRounded } from '@material-ui/icons';
import { useEffect, useState } from 'react'
import * as gameplay from '../decks/instruction'
import * as metadata from '../components/metadata'
import * as Decks from '../decks'

const useStyles = makeStyles((theme) => ({
  appBar: {
    paddingTop: 'env(safe-area-inset-top)',
    zIndex: '40',
  },
  option: {
    margin: theme.spacing(0, 1),
    color: theme.palette.primary.contrastText,
  },
  title: {
    flexGrow: 1,
  },
  button: {
    width: '100%',
  },
  levelMenu: {
    width: 200,
  },
  deckMenu:{
    maxHeight: '95vh',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
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
    width: '85%',
    maxWidth: 500,
  },
  infoButton: {
    color: theme.palette.primary.light,
    marginRight: -10,
    marginLeft: theme.spacing(0.5),
    padding: theme.spacing(0.8),
  },
  paragraph: {
    textAlign: 'left',
    textTransform: 'none',
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
  linkButton: {
    color: theme.palette.primary.contrastText,
  }
}))

export default function NavBar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(null);
  const [openHelp, setOpenHelp] = useState(false);
  const [deckAnchorEl, setDeckAnchorEl] = useState(null);
  const [levelAnchorEl, setLevelAnchorEl] = useState(null);

  const levels = Decks[Object.keys(props.playDecks).find(i => props.playDecks[i])].levels

  const handleLevelClick = (event) => setLevelAnchorEl(event.currentTarget);
  const handleLevelClose = () => setLevelAnchorEl(null);

  const handleDeckClick = (event) => setDeckAnchorEl(event.currentTarget);
  const handleDeckClose = () => setDeckAnchorEl(null);

  const handleToggle = (key) => setOpen({...open, [key]: !open[key]})

  const handleToggleHelp = () => setOpenHelp(!openHelp);

  const onGithub = () => window.open("https://github.com/jonathan-lph/wnrs")
  const onWNRS = () => window.open("https://werenotreallystrangers.com")

  useEffect(() => {
    let obj = {};
    Object.keys(Decks).forEach(key => obj[key] = false);
    setOpen(obj);
  }, [])

  if (open == null) return <div/>
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>WNRS</Typography>

        <Button className={classes.option} variant='outlined' onClick={handleLevelClick} 
          disabled={levels.length === 1}>
          {levels[props.level-1].startsWith('Level') ? levels[props.level-1].slice(0, 7) : levels[props.level-1]}
        </Button>
        <Menu anchorEl={levelAnchorEl} keepMounted open={Boolean(levelAnchorEl)} onClose={handleLevelClose} classes={{paper: classes.levelMenu}}>
          {levels.map((levelDesc, idx) => 
            <MenuItem onClick={handleLevelClose} key={`level-${idx}`}>
              <Button value={`${idx+1}`} className={classes.button} color='primary'
                variant={props.level === `${idx+1}` ? 'contained' : 'outlined'} 
                onClick={props.onLevelChange}>
                {levelDesc}
              </Button>
            </MenuItem>
          )}
        </Menu>

        <Button className={classes.option} variant='outlined' onClick={handleDeckClick}>Deck</Button>
        <Menu anchorEl={deckAnchorEl} keepMounted open={Boolean(deckAnchorEl)} onClose={handleDeckClose} classes={{paper: classes.deckMenu}}>
          {Object.keys(Decks).map((key, idx) => 
            <MenuItem key={`deck-${idx}`}>
              <Button value={key} className={classes.button} color='primary'
                variant={props.playDecks[key] ? 'contained' : 'outlined'} 
                onClick={props.onDeckChange}>
                {Decks[key].menu}
              </Button>
              <IconButton onClick={() => handleToggle(key)} className={classes.infoButton}>
                <InfoRounded />
              </IconButton>
              <Backdrop className={classes.backdrop} open={open[key]} onClick={() => handleToggle(key)} mountOnEnter unmountOnExit>
                <div className={classes.info}>
                  <p><u>{Decks[key].name}</u></p>
                  <Divider variant='middle'/>
                  <p>{Decks[key].backDesc !== undefined ? Decks[key].backDesc.join('\n\n') : Decks[key].menu}</p>
                  <p className={classes.subtitle}>For: {Decks[key].suggestedPlayer}</p>
                  <Divider variant='middle'/>
                  {Decks[key].instruction !== undefined 
                    ? <p className={classes.paragraph}>{Decks[key].instruction.join('\n\n')}</p>
                    : null}
                </div>
              </Backdrop>
            </MenuItem>
          )}
        </Menu>

        <IconButton onClick={handleToggleHelp}>
          <HelpOutlineRounded className={classes.linkButton}/>
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
              <IconButton className={classes.linkButton} onClick={onWNRS}><HomeRounded/></IconButton>
              <IconButton className={classes.linkButton} onClick={onGithub} ><GitHub/></IconButton>
              <IconButton className={classes.linkButton} onClick={props.handleToggleControl}><VideogameAssetRounded /></IconButton>
            </div>
            <div className={`${classes.row} ${classes.subtitle}`}>
              {metadata.copyright}s<br/>
              Developed by {metadata.developer} - {metadata.version}
            </div>
            <div className={classes.subtitle}>{metadata.contact}</div>
          </div>
        </Backdrop>
      </Toolbar>
    </AppBar>
  )
}