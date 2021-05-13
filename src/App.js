import WNRSCard from './components/card'
import { levelOne, levelTwo, levelThree, finalCard } from './decks/original'
import NavBar from './components/navbar'
import MUItheme from  './styles/MUItheme'
import { Button, ThemeProvider, makeStyles, CssBaseline, MobileStepper, Slide } from '@material-ui/core'
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
    paddingTop: 400,
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
}), {defaultTheme: MUItheme});

function App() {
  const classes = useStyles();
  const [level, setLevel] = useState('1');
  const [step, setStep] = useState(0);
  const [cards, setCards] = useState(null);
  const [rotations, setRotations] = useState(Array.from({length: 300}, () => 12 - Math.random() * 24))
  const [transX, setTransX] = useState(Array.from({length: 300}, () => 8 - Math.random() * 16))
  const [transY, setTransY] = useState(Array.from({length: 300}, () => 8 - Math.random() * 16))
  //const [showCards, setShowCards] = useState(null)

  var maxSteps = cards == null ? 0 : cards[`lv${level}`].length; 

  const height = use100vh();

  const shuffle = (arr) => {
    let tmp = arr.slice(0);
    for (let i = tmp.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
    }
    return tmp;
  }

  const handleLevelChange = (e) => {
    setLevel(e.currentTarget.value);
    setStep(0);
  }

  const handleNext = () => {
    //setShowCards({...showCards, [`lv${level}`]: showCards[`lv${level}`].fill(!showCards[`lv${level}`][step], step, step+1)});
    //setShowCards({...showCards, [`lv${level}`]: showCards[`lv${level}`].fill(!showCards[`lv${level}`][step+1], step+1, step+2)});
    if (step === cards[`lv${level}`].length-1) return;
    setStep(step + 1);
  }

  const handleBack = () => {
    //setShowCards({...showCards, [`lv${level}`]: !showCards[`lv${level}`][step]});
    //setShowCards({...showCards, [`lv${level}`]: !showCards[`lv${level}`][step-1]});
    if (step === 0) return;
    setStep(step - 1);    
  }
  
  useEffect(() => {
    setCards({
      lv1: shuffle(levelOne),
      lv2: shuffle(levelTwo),
      lv3: shuffle(levelThree),
      lv4: finalCard,
    })
    /*setRotations({
      lv1: Array.from({length: levelOne.length}, () => 15 - Math.random() * 30),
      lv2: Array.from({length: levelTwo.length}, () => 15 - Math.random() * 30),
      lv3: Array.from({length: levelThree.length}, () => 15 - Math.random() * 30),
    })*/
  }, [])

  if (cards === null) return <div/>
  return (
    <ThemeProvider theme={MUItheme}>
      <CssBaseline/>
      <NavBar level={level} handleLevelChange={handleLevelChange}/>
      <div onClick={handleBack} style={{height: height}} className={classes.leftNav}/>
      <div onClick={handleNext} style={{height: height}} className={classes.rightNav}/>
      <div className={classes.root} style={{height: height}}>
        {cards[`lv${level}`].map((card, idx) => 
          <Slide direction="down" in={idx <= step} mountOnEnter unmountOnExit>
            <WNRSCard content={card} className={classes.card} key={`Card${idx}`} trans={{transform: `rotate(${rotations[idx]}deg) translateX(${transX[idx]}px) translateY(${transY[idx]}px)`}}/>
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
    </ThemeProvider>
  );
}

export default App;
