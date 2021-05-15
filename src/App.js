import WNRSCard from './components/card'
import * as Decks from './decks'
import NavBar from './components/navbar'
import { Button, makeStyles, CssBaseline, MobileStepper, Slide } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { useEffect, useState } from 'react';
import { use100vh } from 'react-div-100vh'

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down('sm')]: {
      paddingTop: 400,
      width: 380,
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: 544,
      width: 510,
      fontSize: 14,
    },
  },
  leftNav: {
    width: '30%',
    zIndex: '20',
    position: 'fixed',
    top: 0,
    left: 0,
  },
  rightNav: {
    width: '30%',
    zIndex: '20',
    position: 'fixed',
    top: 0,
    right: 0,
  }
}));

function App(props) {
  const classes = useStyles();
  const [level,     setLevel]     = useState('1');
  const [step,      setStep]      = useState(0);
  const [playDecks, setPlayDecks] = useState(null);
  const [cards,     setCards]     = useState(null);
  const [rotations, setRotations] = useState(Array.from({length: 300}, () => 12 - Math.random() * 24))
  const [transX,    setTransX]    = useState(Array.from({length: 300}, () => 8 - Math.random() * 16))
  const [transY,    setTransY]    = useState(Array.from({length: 300}, () => 12 - Math.random() * 24))

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
    let firstTrue = Object.keys(newPlayDecks).find(i => newPlayDecks[i]) 
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
  
  useEffect(() => {
    let startingDeck = {};
    Object.keys(Decks).forEach(key => startingDeck[key] = false);
    startingDeck.main = true;
    setPlayDecks(startingDeck);
  }, [])

  useEffect(() => {
    if (playDecks == null) return;
    let playCards = []
    let levels = Decks[Object.keys(playDecks).find(i => playDecks[i])].levels
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
      <NavBar level={level} onLevelChange={onLevelChange} changeColor={props.changeColor} playDecks={playDecks} onDeckChange={onDeckChange}/>
      <div onClick={handleBack} style={{height: height}} className={classes.leftNav}/>
      <div onClick={handleNext} style={{height: height}} className={classes.rightNav}/>
      <div className={classes.root} style={{height: height}}>
        {cards[level-1].map((card, idx) => 
          <Slide direction="down" in={idx <= step} mountOnEnter unmountOnExit key={`Card${idx}`}>
            <WNRSCard content={card} className={classes.card}  
              trans={{transform: `rotate(${rotations[idx]}deg) translateX(${transX[idx]}px) translateY(${transY[idx]}px)`}}/>
          </Slide>
        )}
        <MobileStepper steps={maxSteps} position="static" variant="text" activeStep={step} className={classes.stepper}
          nextButton={
            <Button size="small" onClick={handleNext} color='primary' disabled={step === maxSteps - 1}>
              <KeyboardArrowRight />
            </Button> }
          backButton={
            <Button size="small" onClick={handleBack} color='primary' disabled={step === 0}>
              <KeyboardArrowLeft />
            </Button> }
        />
      </div>
    </>
  );
}

export default App;
