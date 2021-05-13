import WNRSCard from './components/card'
import { levelOne, levelTwo, levelThree } from './decks/original'
import NavBar from './components/navbar'
import MUItheme from  './styles/MUItheme'
import { Button, ThemeProvider, makeStyles, CssBaseline, MobileStepper } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'calc(100vh - 64px)',
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
  }
}), {defaultTheme: MUItheme});

function App() {
  const classes = useStyles();
  const [level, setLevel] = useState('1');
  const [step, setStep] = useState(0);
  const [cards, setCards] = useState(null);
  //const [showCards, setShowCards] = useState(null)

  var maxSteps = cards == null ? 0 : cards[`lv${level}`].length; 

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
    setStep(1);
  }

  const handleNext = () => {
    //setShowCards({...showCards, [`lv${level}`]: showCards[`lv${level}`].fill(!showCards[`lv${level}`][step], step, step+1)});
    //setShowCards({...showCards, [`lv${level}`]: showCards[`lv${level}`].fill(!showCards[`lv${level}`][step+1], step+1, step+2)});
    setStep(step + 1);
  }

  const handleBack = () => {
    //setShowCards({...showCards, [`lv${level}`]: !showCards[`lv${level}`][step]});
    //setShowCards({...showCards, [`lv${level}`]: !showCards[`lv${level}`][step-1]});
    setStep(step - 1);    
  }
  
  useEffect(() => {
    setCards({
      lv1: shuffle(levelOne),
      lv2: shuffle(levelTwo),
      lv3: shuffle(levelThree),
    })
    /*setShowCards({
      lv1: new Array(levelOne.length).fill(false),
      lv2: new Array(levelTwo.length).fill(false),
      lv3: new Array(levelThree.length).fill(false),
    })*/
  }, [])

  if (cards === null) return <div/>
  return (
    <ThemeProvider theme={MUItheme}>
      <CssBaseline/>
      <NavBar level={level} handleLevelChange={handleLevelChange}/>
      <div className={classes.root}>
        <>
          <WNRSCard content={cards[`lv${level}`][step]} className={classes.card}/>
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
        </>
      </div>
    </ThemeProvider>
  );
}

export default App;
