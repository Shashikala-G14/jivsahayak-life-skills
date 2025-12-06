import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserPersona = 'child' | 'woman' | 'man' | 'elder';
export type Language = 'hi' | 'en' | 'ta' | 'bn' | 'te' | 'mr' | 'gu' | 'kn';

export interface UserProfile {
  name: string;
  age?: number;
  persona: UserPersona;
  language: Language;
  goals: string[];
  points: number;
  badges: string[];
  completedModules: string[];
  streak: number;
  level: number;
}

interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isOnboarded: boolean;
  setIsOnboarded: (val: boolean) => void;
}

const defaultUser: UserProfile = {
  name: '',
  persona: 'woman',
  language: 'hi',
  goals: [],
  points: 0,
  badges: [],
  completedModules: [],
  streak: 0,
  level: 1,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [language, setLanguage] = useState<Language>('hi');
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <AppContext.Provider value={{ user, setUser, language, setLanguage, isOnboarded, setIsOnboarded }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const languageLabels: Record<Language, string> = {
  hi: 'हिंदी',
  en: 'English',
  ta: 'தமிழ்',
  bn: 'বাংলা',
  te: 'తెలుగు',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
};

export const personaLabels: Record<UserPersona, { label: string; icon: string; description: string }> = {
  child: { label: 'बच्चे', icon: '👧', description: 'For young learners (5-14 years)' },
  woman: { label: 'महिला', icon: '👩', description: 'Women empowerment & life skills' },
  man: { label: 'पुरुष', icon: '👨', description: 'Career & financial literacy' },
  elder: { label: 'बुजुर्ग', icon: '👴', description: 'Digital literacy & health' },
};

export const translations: Record<Language, Record<string, string>> = {
  hi: {
    welcome: 'जीवसहायक में आपका स्वागत है',
    selectLanguage: 'अपनी भाषा चुनें',
    selectPersona: 'आप कौन हैं?',
    continue: 'आगे बढ़ें',
    startLearning: 'सीखना शुरू करें',
    yourProgress: 'आपकी प्रगति',
    dailyChallenge: 'आज की चुनौती',
    achievements: 'उपलब्धियां',
    modules: 'पाठ्यक्रम',
    askSahayak: 'सहायक से पूछें',
    leaderboard: 'लीडरबोर्ड',
    points: 'अंक',
    streak: 'लगातार दिन',
    level: 'स्तर',
    badges: 'बैज',
    home: 'होम',
    learn: 'सीखें',
    assistant: 'सहायक',
    profile: 'प्रोफाइल',
  },
  en: {
    welcome: 'Welcome to JivSahayak',
    selectLanguage: 'Select Your Language',
    selectPersona: 'Who are you?',
    continue: 'Continue',
    startLearning: 'Start Learning',
    yourProgress: 'Your Progress',
    dailyChallenge: 'Daily Challenge',
    achievements: 'Achievements',
    modules: 'Modules',
    askSahayak: 'Ask Sahayak',
    leaderboard: 'Leaderboard',
    points: 'Points',
    streak: 'Day Streak',
    level: 'Level',
    badges: 'Badges',
    home: 'Home',
    learn: 'Learn',
    assistant: 'Assistant',
    profile: 'Profile',
  },
  ta: {
    welcome: 'ஜீவசஹாயக்கிற்கு வரவேற்கிறோம்',
    selectLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    selectPersona: 'நீங்கள் யார்?',
    continue: 'தொடரவும்',
    startLearning: 'கற்கத் தொடங்குங்கள்',
    yourProgress: 'உங்கள் முன்னேற்றம்',
    dailyChallenge: 'தினசரி சவால்',
    achievements: 'சாதனைகள்',
    modules: 'தொகுதிகள்',
    askSahayak: 'சஹாயக் கேளுங்கள்',
    leaderboard: 'தரவரிசை',
    points: 'புள்ளிகள்',
    streak: 'தொடர் நாட்கள்',
    level: 'நிலை',
    badges: 'பேட்ஜ்கள்',
    home: 'முகப்பு',
    learn: 'கற்றல்',
    assistant: 'உதவியாளர்',
    profile: 'சுயவிவரம்',
  },
  bn: {
    welcome: 'জীবসহায়কে স্বাগতম',
    selectLanguage: 'আপনার ভাষা নির্বাচন করুন',
    selectPersona: 'আপনি কে?',
    continue: 'এগিয়ে যান',
    startLearning: 'শেখা শুরু করুন',
    yourProgress: 'আপনার অগ্রগতি',
    dailyChallenge: 'দৈনিক চ্যালেঞ্জ',
    achievements: 'সাফল্য',
    modules: 'মডিউল',
    askSahayak: 'সহায়ককে জিজ্ঞাসা করুন',
    leaderboard: 'লিডারবোর্ড',
    points: 'পয়েন্ট',
    streak: 'ধারাবাহিক দিন',
    level: 'স্তর',
    badges: 'ব্যাজ',
    home: 'হোম',
    learn: 'শিখুন',
    assistant: 'সহকারী',
    profile: 'প্রোফাইল',
  },
  te: {
    welcome: 'జీవసహాయక్‌కు స్వాగతం',
    selectLanguage: 'మీ భాషను ఎంచుకోండి',
    selectPersona: 'మీరు ఎవరు?',
    continue: 'కొనసాగించు',
    startLearning: 'నేర్చుకోవడం ప్రారంభించండి',
    yourProgress: 'మీ పురోగతి',
    dailyChallenge: 'రోజువారీ ఛాలెంజ్',
    achievements: 'సాధనలు',
    modules: 'మాడ్యూల్స్',
    askSahayak: 'సహాయక్‌ను అడగండి',
    leaderboard: 'లీడర్‌బోర్డ్',
    points: 'పాయింట్లు',
    streak: 'వరుస రోజులు',
    level: 'స్థాయి',
    badges: 'బ్యాడ్జ్‌లు',
    home: 'హోమ్',
    learn: 'నేర్చుకో',
    assistant: 'సహాయకుడు',
    profile: 'ప్రొఫైల్',
  },
  mr: {
    welcome: 'जीवसहायकमध्ये आपले स्वागत आहे',
    selectLanguage: 'तुमची भाषा निवडा',
    selectPersona: 'तुम्ही कोण आहात?',
    continue: 'पुढे जा',
    startLearning: 'शिकायला सुरुवात करा',
    yourProgress: 'तुमची प्रगती',
    dailyChallenge: 'दैनंदिन आव्हान',
    achievements: 'यश',
    modules: 'मॉड्यूल्स',
    askSahayak: 'सहायकाला विचारा',
    leaderboard: 'लीडरबोर्ड',
    points: 'गुण',
    streak: 'सलग दिवस',
    level: 'स्तर',
    badges: 'बॅज',
    home: 'होम',
    learn: 'शिका',
    assistant: 'सहाय्यक',
    profile: 'प्रोफाइल',
  },
  gu: {
    welcome: 'જીવસહાયકમાં આપનું સ્વાગત છે',
    selectLanguage: 'તમારી ભાષા પસંદ કરો',
    selectPersona: 'તમે કોણ છો?',
    continue: 'આગળ વધો',
    startLearning: 'શીખવાનું શરૂ કરો',
    yourProgress: 'તમારી પ્રગતિ',
    dailyChallenge: 'દૈનિક પડકાર',
    achievements: 'સિદ્ધિઓ',
    modules: 'મોડ્યુલ્સ',
    askSahayak: 'સહાયકને પૂછો',
    leaderboard: 'લીડરબોર્ડ',
    points: 'પોઈન્ટ્સ',
    streak: 'સતત દિવસો',
    level: 'સ્તર',
    badges: 'બેજ',
    home: 'હોમ',
    learn: 'શીખો',
    assistant: 'સહાયક',
    profile: 'પ્રોફાઇલ',
  },
  kn: {
    welcome: 'ಜೀವಸಹಾಯಕ್‌ಗೆ ಸ್ವಾಗತ',
    selectLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectPersona: 'ನೀವು ಯಾರು?',
    continue: 'ಮುಂದುವರಿಸಿ',
    startLearning: 'ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ',
    yourProgress: 'ನಿಮ್ಮ ಪ್ರಗತಿ',
    dailyChallenge: 'ದೈನಂದಿನ ಸವಾಲು',
    achievements: 'ಸಾಧನೆಗಳು',
    modules: 'ಮಾಡ್ಯೂಲ್‌ಗಳು',
    askSahayak: 'ಸಹಾಯಕ್ ಅನ್ನು ಕೇಳಿ',
    leaderboard: 'ಲೀಡರ್‌ಬೋರ್ಡ್',
    points: 'ಅಂಕಗಳು',
    streak: 'ಸತತ ದಿನಗಳು',
    level: 'ಮಟ್ಟ',
    badges: 'ಬ್ಯಾಡ್ಜ್‌ಗಳು',
    home: 'ಮುಖಪುಟ',
    learn: 'ಕಲಿಯಿರಿ',
    assistant: 'ಸಹಾಯಕ',
    profile: 'ಪ್ರೊಫೈಲ್',
  },
};
