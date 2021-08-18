import { Button, Toolbar, AppBar, Typography, makeStyles, Menu, MenuItem, IconButton, Backdrop, Divider, Dialog, Drawer, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core'
import { InfoRounded, MoreVertRounded, GitHub, HomeRounded, VideogameAssetRounded, HelpOutlineRounded, Reddit, LocalCafeRounded } from '@material-ui/icons';
import { useState } from 'react'
import * as metadata from './metadata'
import HowToPlay from './howToPlay'
import * as Decks from '../decks'
import * as DecksCat from '../decks/categories'

const useStyles = makeStyles((theme) => ({
  appBar: {
    paddingTop: 'env(safe-area-inset-top)',
    zIndex: '40',
  },
  option: {
    margin: theme.spacing(0, 1),
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.contrastText
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
    padding: theme.spacing(0, 0),
    maxHeight: '85vh',
  },
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
  infoButton: {
    color: theme.palette.primary.light,
    marginRight: -10,
    marginLeft: theme.spacing(0.5),
    padding: theme.spacing(0.8),
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
  },
  list: {
    width: '230px',
    paddingTop: 'env(safe-area-inset-top)',
  },
  listText: {
    fontSize: '0.85rem',
    fontWeight: 700, 
    textTransform: 'uppercase',
  },
  listSubheader: {
    lineHeight: '30px',
    paddingTop: theme.spacing(1),
    borderRadius: theme.spacing(0.5, 0.5, 0, 0)
  },

  controlTitle: {
    fontSize: theme.typography.fontSize,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  controlSubtitle: {
    fontSize: theme.typography.fontSize * 0.8,
    textTransform: 'none',
    textAlign: 'center',
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main
  },
  tooltipArrow: {
    color: theme.palette.common.white,
  }
}))

/*function isMobile() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent) ) return true;
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return true;
  return false;
}*/

export default function NavBar(props) {
  const classes = useStyles();
  const [openInfo, setOpenInfo] = useState(Object.fromEntries(Object.entries(Decks).map(([key, value]) => [key, false])));
  const [deckAnchorEl, setDeckAnchorEl] = useState(null);
  const [levelAnchorEl, setLevelAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openHelp, setOpenHelp] = useState({
    howToPlay: false,
    control: false,
  })

  const levels = Decks[Object.keys(props.playDecks).find(i => props.playDecks[i])].levels

  const handleLevelClick = (event) => setLevelAnchorEl(event.currentTarget);
  const handleLevelClose = () => setLevelAnchorEl(null);

  const handleDeckClick = (event) => setDeckAnchorEl(event.currentTarget);
  const handleDeckClose = () => setDeckAnchorEl(null);

  const handleToggle = (key) => () => setOpenInfo({...openInfo, [key]: !openInfo[key]})

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>WNRS</Typography>

        <Tooltip arrow open={props.control === 1} classes={{tooltip: classes.tooltip, arrow: classes.tooltipArrow}} title={
          <>
          <p className={classes.controlTitle}>Change level here</p>
          <p className={classes.controlSubtitle}>Whenever you feel comfortable,<br/> move on to the next level.</p>
          </>
        }>
          <Button id="level-button" className={classes.option} variant='contained' onClick={handleLevelClick} disabled={levels.length === 1}>
            Level
          </Button>
        </Tooltip>
        <Menu keepMounted 
          anchorEl={levelAnchorEl} getContentAnchorEl={null}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}     
          transformOrigin={{vertical: 'top', horizontal: 'center'}}
          open={Boolean(levelAnchorEl)} onClose={handleLevelClose} classes={{paper: classes.levelMenu}}>
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

        <Tooltip arrow open={props.control === 2} classes={{tooltip: classes.tooltip, arrow: classes.tooltipArrow}} title={
          <>
          <p className={classes.controlTitle}>Change deck here</p>
          <p className={classes.controlSubtitle}>Some decks are best used when<br/> added to the original deck.</p>
          </>
        }>
          <Button id="deck-button" className={classes.option} variant='contained' onClick={handleDeckClick}>Deck</Button>
        </Tooltip>
        <Dialog open={Boolean(deckAnchorEl)} disablePortal scroll='paper' onClose={handleDeckClose} classes={{paper: classes.deckMenu}}>
          {Object.entries(DecksCat).map(([k, v]) => 
          <List subheader={<ListSubheader className={classes.listSubheader} component='div'>{v.displayName}</ListSubheader>}>
            {Object.keys(v.decks).map((key, idx) =>
            <ListItem key={`deck-${idx}`}>
              <Button value={key} className={classes.button} color='primary'
                variant={props.playDecks[key] ? 'contained' : 'outlined'} 
                onClick={props.onDeckChange}>
                {Decks[key].menu}
              </Button>
              <IconButton onClick={handleToggle(key)} className={classes.infoButton}>
                <InfoRounded />
              </IconButton>
            </ListItem>
            )}
          </List>
          )}
        </Dialog>
        {Object.keys(Decks).map((key, idx) => 
          <Backdrop className={classes.backdrop} open={openInfo[key]} onClick={handleToggle(key)} mountOnEnter unmountOnExit key={`deckDesc-${idx}`}
           style={{backgroundColor: Decks[key].color.primary.main, color: Decks[key].color.primary.contrastText}}>
            <div className={classes.info}>
              <p><u>{Decks[key].name}</u></p>
              <Divider variant='middle'/>
              <p>{Decks[key].backDesc !== undefined ? Decks[key].backDesc.join('\n\n') : Decks[key].menu}</p>
              <p className={classes.subtitle}>For: {Decks[key].suggestedPlayer}{Decks[key].isExpansion ? " | Best with Main deck" : null}</p>
              <Divider variant='middle'/>
              {Decks[key].instruction !== undefined 
                ? <p className={classes.paragraph}>{Decks[key].instruction.join('\n\n')}</p>
                : null}
            </div>
          </Backdrop>
        )}

        <IconButton onClick={toggleDrawer} className={classes.iconButton} aria-label="More">
          <MoreVertRounded/>
        </IconButton>
        <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer} onClick={toggleDrawer}>
          <List className={classes.list} subheader={<ListSubheader>Help</ListSubheader>}>
            <ListItem button onClick={() => setOpenHelp({...openHelp, howToPlay: true})}>
              <ListItemIcon><HelpOutlineRounded/></ListItemIcon>
              <ListItemText disableTypography className={classes.listText}>How to play</ListItemText>
            </ListItem>
            <ListItem button onClick={props.resetControlPanel}>
              <ListItemIcon><VideogameAssetRounded/></ListItemIcon>
              <ListItemText disableTypography className={classes.listText}>Controls</ListItemText>
            </ListItem>
            {/*!(window.matchMedia('(display-mode: standalone)').matches || isMobile()) && 
              <ListItem button onClick={props.fsHandle.active ? props.fsHandle.exit : props.fsHandle.enter}>
                <ListItemIcon>{props.fsHandle.active ? <FullscreenExitRounded/> : <FullscreenRounded/>}</ListItemIcon>
                <ListItemText disableTypography className={classes.listText}>{props.fsHandle.active ? "Exit" : "Enter"} Fullscreen</ListItemText>
              </ListItem>
            */}
          </List>
          <Divider/>
          <List subheader={<ListSubheader>Links</ListSubheader>}>
            <ListItem button onClick={() => window.open("https://werenotreallystrangers.com")}>
              <ListItemIcon><HomeRounded/></ListItemIcon>
              <ListItemText>Official WNRS</ListItemText>
            </ListItem>
            <ListItem button onClick={() => window.open("https://github.com/jonathan-lph/wnrs")}>
              <ListItemIcon><GitHub/></ListItemIcon>
              <ListItemText>GitHub</ListItemText>
            </ListItem>
            <ListItem button onClick={() => window.open("https://www.reddit.com/r/cardgames/comments/nf47ps/were_not_really_strangers_online")}>
              <ListItemIcon><Reddit/></ListItemIcon>
              <ListItemText>Reddit</ListItemText>
            </ListItem>
          </List>
          <List style={{marginTop: 'auto'}}>
            <ListItem button onClick={() => window.open("https://www.paypal.me/jonathanlph")}>
              <ListItemIcon><LocalCafeRounded/></ListItemIcon>
              <ListItemText>Tip Jar :)</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText disableTypography>
              {metadata.copyright}<br/>
              Developed by {metadata.developer} - {metadata.version}<br/>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>

        <HowToPlay open={openHelp.howToPlay} toggleOpen={() => setOpenHelp({...openHelp, howToPlay: !openHelp.howToPlay})}/>

      </Toolbar>
    </AppBar>
  )
}