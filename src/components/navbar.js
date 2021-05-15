import { Button, Toolbar, AppBar, Typography, makeStyles, Menu, MenuItem } from '@material-ui/core'
import { useState } from 'react'

const availDecks = require('../decks')

const useStyles = makeStyles((theme) => ({
  appBar: {
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
}))

export default function NavBar(props) {
  const classes = useStyles();
  const [deckAnchorEl, setDeckAnchorEl] = useState(null);
  const [levelAnchorEl, setLevelAnchorEl] = useState(null);

  const levels = availDecks[Object.keys(props.playDecks).find(i => props.playDecks[i])].levels

  const handleLevelClick = (event) => setLevelAnchorEl(event.currentTarget);
  const handleLevelClose = () => setLevelAnchorEl(null);

  const handleDeckClick = (event) => setDeckAnchorEl(event.currentTarget);
  const handleDeckClose = () => setDeckAnchorEl(null);

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>WNRS</Typography>
        <Button className={classes.option} variant='outlined' onClick={handleDeckClick}>Deck</Button>
        <Menu anchorEl={deckAnchorEl} keepMounted open={Boolean(deckAnchorEl)} onClose={handleDeckClose}>
          {Object.keys(availDecks).map((key, idx) => 
            <MenuItem key={`deck-${idx}`}>
              <Button value={key} className={classes.button} color='primary'
                variant={props.playDecks[key] ? 'contained' : 'outlined'} 
                onClick={props.onDeckChange}>
                {availDecks[key].menu}
              </Button>
            </MenuItem>
          )}
        </Menu>
        <Button className={classes.option} variant='outlined' onClick={handleLevelClick} disabled={levels.length === 1} style={{width: 170}}>{levels[props.level-1]}</Button>
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
      </Toolbar>
    </AppBar>
  )
}