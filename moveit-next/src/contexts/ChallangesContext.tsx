import { createContext, useState, ReactNode, useEffect } from 'react';
import challanges from '../../challenges.json';

interface Challange {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallangesContextData {
    level: number;
    experienceToNextLevel: number;
    levelUp: () => void;
    currentExperience: number;
    challangesCompleted: number;
    activeChallange: Challange;
    startNewChallange: () => void;
    resetChallange: () => void;
    completeChallenge: () => void;
}

interface ChallangesProviderProps {
    children: ReactNode;
}

export const ChallangesContext = createContext({} as ChallangesContextData);

export function ChallangesProvider({ children }: ChallangesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challangesCompleted, setChallangesCompleted] = useState(0);

    const [activeChallange, setActiveChallange] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallange() {
        const randomChallangeIndex = Math.floor(Math.random() * challanges.length)
        const challange = challanges[randomChallangeIndex];

        setActiveChallange(challange)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challange.amount} xp!`
            })
        }
    }

    function resetChallange() {
        setActiveChallange(null);
    }

    function completeChallenge() {
        if (!activeChallange) {
            return;
        }
        const { amount } = activeChallange;
        let finalExperince = currentExperience + amount;

        if (finalExperince >= experienceToNextLevel) {
            finalExperince = finalExperince - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperince);
        setActiveChallange(null);
        setChallangesCompleted(challangesCompleted + 1);
    }

    return (
        <ChallangesContext.Provider value={{
            level,
            experienceToNextLevel,
            levelUp,
            currentExperience,
            challangesCompleted,
            activeChallange,
            startNewChallange,
            resetChallange,
            completeChallenge,

        }}>
            {children}
        </ChallangesContext.Provider>
    )

}