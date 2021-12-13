import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import s from './dashboard.module.css';

// Material UI components
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

const MainFile = () => {
    const [data, setData] = useState([]);
    const [navValue, setNavValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const screenW = window.screen.width;

    const fetchPhases = async () => {
        const docRef = doc(db, "userPhases", "Z8XtTNrK2kZhkUQVMQZr");
        const getPhases = await getDoc(docRef);
        getPhases.data().phases.forEach((element, key) => {
            let obj = {
                pv: element,
                name: key*15
            }
            setData(prev => [...prev, obj]);  
        });
        setLoading(false);
    }
    
    useEffect(() => {
        fetchPhases();
    }, [])

    if (loading) {
        return (
            <div className={s.middle}>
                <div className={s.bar1}></div>
                <div className={s.bar2}></div>
                <div className={s.bar3}></div>
                <div className={s.bar4}></div>
                <div className={s.bar5}></div>
                <div className={s.bar6}></div>
                <div className={s.bar7}></div>
                <div className={s.bar8}></div>
            </div>
        )
    } else {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    overflowX: 'hidden'
                }}
            >
                <Paper 
                    elevation={5}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#0047b3',
                        color: 'white',
                        borderRadius: 0,
                    }}
                >
                    <AirlineSeatIndividualSuiteIcon color='white' sx={{margin: '10px', width: '30px', height: '30px'}}/>
                    <h2>Your sleeping cycle</h2>
                </Paper>
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4% 2% 1% 2%'
                    }}
                >
                    <LineChart
                        width={screenW > 450 ? 650 : 450}
                        height={screenW > 450 ? 350 : 250}
                        data={data}
                        margin={{
                            top: 5,
                            right: 60,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="pv"
                            stroke="#0047b3"
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </Paper>
                <Paper
                    sx={{
                        padding: '2% 2% 70px 2%'
                    }}
                >
                    <h3 style={{textAlign: 'center'}}>General tips for you:</h3>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Stick to a sleep <strong>schedule</strong></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Go to bed and get up at the same time every day. Try to limit the difference in your sleep schedule on weeknights and weekends to no more than one hour. Being consistent reinforces your body's sleep-wake cycle.
                                In a 2010 study published in the journal <a href="https://pubmed.ncbi.nlm.nih.gov/20394320/" rel="noreferrer" target="_blank">Sleep</a>, researchers concluded that participants who had stable and predictable routines took less time to fall asleep, had improved sleep quality, and slept more efficiently.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Pay attention to what you <strong>eat and drink</strong></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            Don't go to bed hungry or stuffed. In particular, avoid heavy or large meals within a couple of hours of bedtime. Your discomfort might keep you up.
                            Nicotine, caffeine and alcohol deserve caution, too. The stimulating effects of nicotine and caffeine take hours to wear off and can wreak havoc on quality sleep. And even though alcohol might make you feel sleepy, it can disrupt sleep later in the night.                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>Turn your <strong>alarm clock</strong> away from you.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                When you're having difficulty falling asleep, staring at the clock only makes it worse. "It increases your stress and worry about not falling asleep," Lisa Meltzer, an education scholar for the <a href="https://www.sleepfoundation.org/" rel="noreferrer" target="_blank">National Sleep Foundation</a>, explained to HuffPost. So, she suggests turning your alarm clock away from you. If you can't watch the minutes go by, you'll have a much easier time de-stressing and soothing yourself to sleep.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4a-content"
                            id="panel4a-header"
                        >
                            <Typography>Create a <strong>restful environment</strong></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Create a room that's ideal for sleeping. Often, this means cool, dark and quiet. Exposure to light might make it more challenging to fall asleep. Avoid prolonged use of light-emitting screens just before bedtime. Consider using room-darkening shades, earplugs, a fan or other devices to create an environment that suits your needs.
                                Doing calming activities before bedtime, such as taking a bath or using relaxation techniques, might promote better sleep.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel5a-content"
                            id="panel5a-header"
                        >
                            <Typography>Include <strong>physical activity</strong> in your daily routine</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Regular physical activity can promote better sleep. Avoid being active too close to bedtime, however. Spending time outside every day might be helpful, too.
                                Active people tend to report getting a better night's sleep than those who aren't out and about, according to a 2013 <a href="https://www.sleepfoundation.org/professionals/sleep-americar-polls/2013-exercise-and-sleep" rel="noreferrer" target="_blank">National Sleep Foundation</a> poll.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <BottomNavigation
                        showLabels
                        value={navValue}
                        onChange={(event, newValue) => {
                            setNavValue(newValue);
                        }}
                        sx={{
                            position: 'fixed',
                            bottom: 0,
                            margin: 0,
                            left: 0,
                            width: '100vw',
                            boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                            borderTopLeftRadius: '15px',
                            borderTopRightRadius: '15px',
                        }}
                    >
                        <BottomNavigationAction label="Analysis" icon={<AirlineSeatIndividualSuiteIcon />} />
                        <BottomNavigationAction label="History" icon={<HistoryIcon />} />
                        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
                    </BottomNavigation>
                </Paper>
            </div>
        )
    }

    
}

export default MainFile;