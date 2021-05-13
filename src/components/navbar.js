import { Button, Toolbar, AppBar, Typography, makeStyles, Menu, MenuItem } from '@material-ui/core'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  levelButton: {
    color: theme.palette.primary.contrastText,
  },
  title: {
    flexGrow: 1,
  },
  button: {
    width: '100%',
  }
}))

export default function NavBar({level, handleLevelChange}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>WNRS</Typography>
        <Button className={classes.levelButton} variant='outlined' onClick={handleClick}> Level </Button>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            <Button value='1' className={classes.button} color='primary' variant={level === '1' ? 'contained' : 'outlined'} onClick={handleLevelChange}>Level 1 Perception</Button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Button value='2' className={classes.button} color='primary' variant={level === '2' ? 'contained' : 'outlined'} onClick={handleLevelChange}>Level 2 Connection</Button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Button value='3' className={classes.button} color='primary' variant={level === '3' ? 'contained' : 'outlined'} onClick={handleLevelChange}>Level 3 Reflection</Button>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}