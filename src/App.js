import { useEffect, useState } from 'react';
import { use100vh } from 'react-div-100vh'
import { makeStyles, CssBaseline, Slide, Backdrop } from '@material-ui/core'
import { KeyboardArrowLeftRounded, KeyboardArrowRightRounded } from '@material-ui/icons'

import * as Decks from './decks'
import { WNRSCard, NavBar, Welcome, Control, InstallPrompt } from './components'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.palette.primary.light,
  },
  button: {
    margin: theme.spacing(1),
  },
  stepper: {
    fontWeight: 700,
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    width: 380,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      paddingTop: 400,
      width: 380,
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: 544,
      width: 510,
      fontSize: 14,
    },
  },
  nav: {
    width: '30%',
    zIndex: '20',
    position: 'fixed',
    top: 0,
    userSelect: 'none',
  },
  leftNav:  { left:  0 },
  rightNav: { right: 0 },
  arrow: {
    [theme.breakpoints.down('xs')]: {
      visibility: 'hidden',
    },
    position: 'fixed',
    top: '50%',
    fontSize: 60,
    zIndex: 19,
    color: theme.palette.primary.light,
  },
  leftArrow: {left: '1%' },
  rightArrow: {right: '1%'},
  backdrop: {
    zIndex: theme.zIndex.tooltip,
  },
  backdropCard: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('xs')]: { width: 360 - theme.spacing(4)},
    [theme.breakpoints.up('sm')]:   { width: 480 - theme.spacing(4)},
  }
}));

function App(props) {
  const classes = useStyles();
  const [level,     setLevel]     = useState('1');
  const [step,      setStep]      = useState(1);
  const [playDecks, setPlayDecks] = useState({...Object.fromEntries(Object.entries(Decks).map(([key, value]) => [key, false])), main: true});
  const [cards,     setCards]     = useState(null);
  const [transform]               = useState({
    rotation: [0, ...Array.from({length: 150}, () => 12 - Math.random() * 24)],
    transX:   [0, ...Array.from({length: 150}, () => 8  - Math.random() * 16)],
    transY:   [0, ...Array.from({length: 150}, () => 12 - Math.random() * 24)],
  })
  const [panels, setPanels] = useState({
    control: 99,
    welcome: true,
    install: false,
  })
  const [enlarge, setEnlarge] = useState(false);

  const height = use100vh();
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
  var maxSteps = cards == null ? 0 : cards[level-1].length; 

  const shuffle = (arr) => {
    let tmp = arr.slice(0);
    for (let i = tmp.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
    }
    return tmp;
  }

  const getFirstTrue = (obj) => {
    return Object.keys(obj).find(i => obj[i]) 
  }

  const getAllTrue = (obj) => {
    let trueArr = [];
    Object.keys(obj).forEach(i => { if (obj[i]) trueArr.push(i)})
    return trueArr;
  }

  const onLevelChange = (e) => {
    setLevel(e.currentTarget.value);
    setStep(1);
  }

  const onDeckChange = (e) => {
    let deck = e.currentTarget.value;
    let disableObj = {}
    Decks[deck].isExpansion
      ? Object.keys(Decks).forEach(key => { if (!Decks[key].isExpansion) disableObj[key] = false })
      : Object.keys(Decks).forEach(key => { if (key !== deck) disableObj[key] = false })
    let newPlayDecks = {...playDecks, [deck]: !playDecks[deck], ...disableObj}
    let firstTrue = getFirstTrue(newPlayDecks)
    if (firstTrue === undefined) {
      newPlayDecks.main = true;
      firstTrue = 'main';
    }
    setPlayDecks(newPlayDecks)
    setLevel('1');
    setStep(1);
    props.changeColor(Decks[firstTrue].color)
  }

  const handleNext = () => {
    if (step === cards[level-1].length) return;
    setStep(step + 1);
  }

  const handleBack = () => {
    if (step === 1) return;
    setStep(step - 1);    
  }

  const toggleWelcomePanel = (startControl) => (e) => {
    e.stopPropagation();
    setPanels({
      ...panels, 
      welcome: !panels.welcome, 
      control: startControl ? 0 : panels.control,
      install: !startControl && !isInstalled ? true : false,
    })
  }
  const toggleInstallPanel = (e, reason) => {
    if (reason === 'clickaway') return;
    setPanels({...panels, install: !panels.install})
  }
  const toggleControlPanel = () => setPanels({
    ...panels, 
    control: panels.control+1, 
    install: !isInstalled && panels.control === 2
  });
  const toggleEnlarge = () => setEnlarge(!enlarge)

  useEffect(() => {
    if (playDecks == null) return;
    let playCards = []
    let levels = Decks[getFirstTrue(playDecks)].levels
    for (let i = 0; i < levels.length; i++) {
      let cards = []
      Object.keys(playDecks).forEach(key => { if (playDecks[key]) {
        let currLevel = Decks[key][`level${i+1}`]
        let finalCard = Decks[key].finalCard
        if (currLevel !== undefined) cards = cards.concat(currLevel)
        else if (finalCard !== undefined) cards = finalCard
      }})
      playCards.push(shuffle(cards))
    }
    setCards(playCards)
  }, [playDecks])

  if (cards === null) return <div/>
  return (
    <>
      <CssBaseline/>
      <NavBar level={level} onLevelChange={onLevelChange} changeColor={props.changeColor} playDecks={playDecks} control={panels.control}
        onDeckChange={onDeckChange} resetControlPanel={() => setPanels({...panels, control: 0})} toggleControlPanel={toggleControlPanel} fsHandle={props.fsHandle}/>

      <div onClick={handleBack} style={{height: `calc(${height}px - env(safe-area-inset-top, 0px)`}} className={`${classes.nav} ${classes.leftNav}`}/>
      <div onClick={handleNext} style={{height: `calc(${height}px - env(safe-area-inset-top, 0px)`}} className={`${classes.nav} ${classes.rightNav}`}/>
      <KeyboardArrowLeftRounded className={`${classes.arrow} ${classes.leftArrow}`} style={step === 1 ? {color: 'rgba(0,0,0,0.26)'}: null}/>
      <KeyboardArrowRightRounded className={`${classes.arrow} ${classes.rightArrow}`} style={step === cards[level-1].length ? {color: 'rgba(0,0,0,0.26)'}: null}/>

      <Welcome       welcome={panels.welcome} toggleWelcomePanel={toggleWelcomePanel}/>
      <InstallPrompt install={panels.install} toggleInstallPanel={toggleInstallPanel} />
      <Control       control={panels.control} toggleControlPanel={toggleControlPanel}/>

      <Backdrop open={enlarge} className={classes.backdrop} onClick={toggleEnlarge}>
        <WNRSCard decks={getAllTrue(playDecks)} level={level} content={cards[level-1][step-1]} contentClass={classes.backdropCard}/>
      </Backdrop>

      <div className={classes.root} style={{height: `calc(${height}px - env(safe-area-inset-top, 0px)`}}>
        {cards[level-1].map((card, idx) => 
          <Slide direction="down" in={idx <= step-1} mountOnEnter unmountOnExit key={`Card${idx}`}>
            <WNRSCard decks={getAllTrue(playDecks)} level={level} content={card} className={classes.card} visibility={enlarge ? 'hidden' : 'visible'}
              trans={{transform: `rotate(${transform.rotation[idx]}deg) translate(${transform.transX[idx]}px, ${transform.transY[idx]}px)`}} toggleEnlarge={toggleEnlarge}/>
          </Slide>
        )}
        <div className={classes.stepper}>
          {Decks[Object.keys(playDecks).find(i => playDecks[i])].levels[level-1]} &nbsp;&nbsp;-&nbsp;&nbsp; {step} / {maxSteps}
        </div>
      </div>
    </>
  );
}

export default App;
