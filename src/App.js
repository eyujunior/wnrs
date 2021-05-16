import WNRSCard from './components/card'
import * as Decks from './decks'
import NavBar from './components/navbar'
import { makeStyles, CssBaseline, MobileStepper, Slide, Backdrop } from '@material-ui/core'
import { KeyboardArrowLeftRounded, KeyboardArrowRightRounded, ArrowUpwardRounded } from '@material-ui/icons'
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { use100vh } from 'react-div-100vh'

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const useStyles = makeStyles((theme) => ({
  safeArea: {
    color: theme.palette.primary.main,
  },
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
  stepper: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    width: 380,
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
    margin: '0 0 -30 -30',
    color: theme.palette.primary.light,
  },
  leftArrow: {left: '1%' },
  rightArrow: {right: '1%'},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(2),
  },
  backdropContent:{
    display: 'flex',
    flexDirection: 'column',
    ...theme.typography.h6,
    whiteSpace: 'pre-line',
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '80%',
  },
  level: {
    paddingTop: theme.spacing(2),
    alignItems: 'center',
    alignSelf: 'flex-start',
    position: 'fixed',
    width: 'auto',
    [theme.breakpoints.down('xs')]: { paddingTop: 56, right: 103 },
    [theme.breakpoints.up('sm')]:   { paddingTop: 64, right: 111 },
  },
  decks: {
    paddingTop: theme.spacing(2),
    alignItems: 'center',
    alignSelf: 'flex-start',
    position: 'fixed',
    width: 'auto',
    [theme.breakpoints.down('xs')]: { paddingTop: 56, right: 13 },
    [theme.breakpoints.up('sm')]:   { paddingTop: 64, right: 21 },
  },
  subtitle: {
    fontWeight: 400,
    textTransform: 'none',
    fontSize: '0.8em'
  },
  opacity: {
    backgroundColor: (() => {
      let rgb = hexToRgb(theme.palette.primary.main);
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85)`
    })(),
  }
}));

function App(props) {
  const classes = useStyles();
  const [level,     setLevel]     = useState('1');
  const [step,      setStep]      = useState(0);
  const [playDecks, setPlayDecks] = useState(null);
  const [cards,     setCards]     = useState(null);
  const [rotations]               = useState(Array.from({length: 300}, () => 12 - Math.random() * 24))
  const [transX]                  = useState(Array.from({length: 300}, () => 8 - Math.random() * 16))
  const [transY]                  = useState(Array.from({length: 300}, () => 12 - Math.random() * 24))
  const [controlPanel, setControlPanel] = useState(99);
  const [openWelcome, setOpenWelcome] = useState(true);

  const height = use100vh();
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
    setStep(0);
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
    setStep(0);
    props.changeColor(Decks[firstTrue].color)
  }

  const handleNext = () => {
    if (step === cards[level-1].length-1) return;
    setStep(step + 1);
  }

  const handleBack = () => {
    if (step === 0) return;
    setStep(step - 1);    
  }

  const handleToggleWelcome = () => {setOpenWelcome(!openWelcome); setControlPanel(0);}
  const handleToggleControl = () => setControlPanel(controlPanel+1);

  const initDeck = () => {
    let startingDeck = {};
    Object.keys(Decks).forEach(key => startingDeck[key] = false);
    startingDeck.main = true;
    setPlayDecks(startingDeck);
  }

  useEffect(() => {
    initDeck()
  }, [])

  useEffect(() => {
    if (controlPanel === 0){
      initDeck()
      setLevel('1')
    }
  }, [controlPanel])

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
    <SafeAreaView edges={['top']} className={classes.safeArea}>
      <CssBaseline/>
      <NavBar level={level} onLevelChange={onLevelChange} changeColor={props.changeColor} playDecks={playDecks} onDeckChange={onDeckChange} handleToggleControl={() => setControlPanel(0)}/>
      <div onClick={handleBack} style={{height: height}} className={`${classes.nav} ${classes.leftNav}`}/>
      <div onClick={handleNext} style={{height: height}} className={`${classes.nav} ${classes.rightNav}`}/>
      <KeyboardArrowLeftRounded className={`${classes.arrow} ${classes.leftArrow}`} style={step === 0 ? {color: 'rgba(0,0,0,0.26)'}: null}/>
      <KeyboardArrowRightRounded className={`${classes.arrow} ${classes.rightArrow}`} style={step === cards[level-1].length-1 ? {color: 'rgba(0,0,0,0.26)'}: null}/>
      <div className={classes.root} style={{height: height}}>
        {cards[level-1].map((card, idx) => 
          <Slide direction="down" in={idx <= step} mountOnEnter unmountOnExit key={`Card${idx}`}>
            <WNRSCard decks={getAllTrue(playDecks)} level={level} content={card} className={classes.card}  
              trans={{transform: `rotate(${rotations[idx]}deg) translateX(${transX[idx]}px) translateY(${transY[idx]}px)`}}/>
          </Slide>
        )}
        <MobileStepper steps={maxSteps} position="static" variant="text" activeStep={step} className={classes.stepper}/>
      </div>
      <Backdrop className={classes.backdrop} open={openWelcome} onClick={handleToggleWelcome} mountOnEnter unmountOnExit>
        <div className={classes.backdropContent} style={{maxWidth: 500}}>
          <p><u>We're not really strangers</u></p>
          <p>Warning:<br/>Feelings may arise.</p>
          <p>Ready?</p>
          <p className={classes.subtitle}>Reminder: Open your heart.<br/><br/>Add this application to your home page<br/> to begin a conversation with anyone anytime.</p>
        </div>
      </Backdrop>
      <Backdrop className={`${classes.backdrop} ${classes.opacity}`} open={controlPanel < 3} onClick={handleToggleControl} mountOnEnter unmountOnExit>
        {controlPanel === 0
          ? <div className={classes.backdropContent}>
              <p style={{textAlign: 'left'}}>Click on left side<br/>of the screen<br/>for the previous card.</p>
              <p style={{textAlign: 'right'}}>Click on right side<br/>of the screen<br/>for the next card.</p>
            </div>
          : null }
        {controlPanel === 1
          ? <div className={`${classes.backdropContent} ${classes.level}`}>
              <ArrowUpwardRounded/>
              <p style={{width: 180}}>Whenever you feel comfortable, change level here.</p>
            </div>
          : null}
        {controlPanel === 2 || controlPanel === 3
          ? <div className={`${classes.backdropContent} ${classes.decks}`}>
              <ArrowUpwardRounded/>
              <p style={{width: 180}}>Change deck here. Some decks are best used when added to the original WNRS card game.</p>
            </div>
          : null} 
      </Backdrop>
    </SafeAreaView>
  );
}

export default App;
