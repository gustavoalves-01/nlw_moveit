import { createContext, useState, ReactNode } from 'react';
import challanges from '../../challenges.json';

interface Challange {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallangesContextData {
    level: number;
    experienceToNextLevel: number;
    currentExperience: number;
    challangesCompleted: number;
    activeChallange: Challange;
    startNewChallange: () => void;
    resetChallange: () => void;
    levelUp: () => void;
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

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallange() {
        const randomChallangeIndex = Math.floor(Math.random() * challanges.length)
        const challange = challanges[randomChallangeIndex];

        setActiveChallange(challange)
    }

    function resetChallange() {
        setActiveChallange(null);
    }

    return (
        <ChallangesContext.Provider value={{
            level,
            experienceToNextLevel,
            currentExperience,
            challangesCompleted,
            activeChallange,
            startNewChallange,
            resetChallange,
            levelUp,
        }}>
            {children}
        </ChallangesContext.Provider>
    )

}