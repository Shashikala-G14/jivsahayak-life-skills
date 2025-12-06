import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  Languages,
  Sparkles,
  User,
  Bot
} from 'lucide-react';
import { useAppContext, translations, languageLabels, Language } from '@/context/AppContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SahayakAssistant: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useAppContext();
  const t = translations[language];
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: getGreeting(language),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  function getGreeting(lang: Language): string {
    const greetings: Record<Language, string> = {
      hi: 'नमस्ते! मैं सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं? आप मुझसे बैंकिंग, सरकारी योजनाओं, या किसी भी जीवन कौशल के बारे में पूछ सकते हैं।',
      en: "Hello! I'm Sahayak, your AI assistant. How can I help you today? You can ask me about banking, government schemes, life skills, or any other questions.",
      ta: 'வணக்கம்! நான் சஹாயக். நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
      bn: 'নমস্কার! আমি সহায়ক। আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
      te: 'నమస్కారం! నేను సహాయక్. నేను మీకు ఎలా సహాయం చేయగలను?',
      mr: 'नमस्कार! मी सहायक आहे. मी तुम्हाला कशी मदत करू शकतो?',
      gu: 'નમસ્તે! હું સહાયક છું. હું તમને કેવી રીતે મદદ કરી શકું?',
      kn: 'ನಮಸ್ಕಾರ! ನಾನು ಸಹಾಯಕ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    };
    return greetings[lang];
  }

  const sampleResponses: Record<string, Record<Language, string>> = {
    bank: {
      hi: 'बैंक खाता खोलने के लिए आपको ये चीजें चाहिए:\n\n1. 📋 आधार कार्ड\n2. 📷 2 पासपोर्ट साइज फोटो\n3. 📝 पता प्रमाण\n\nअपने नजदीकी बैंक शाखा में जाएं और खाता खोलने का फॉर्म भरें। प्रधानमंत्री जन धन योजना के तहत आप मुफ्त में खाता खोल सकते हैं!',
      en: 'To open a bank account, you need:\n\n1. 📋 Aadhaar Card\n2. 📷 2 passport-size photos\n3. 📝 Address proof\n\nVisit your nearest bank branch and fill the account opening form. Under PM Jan Dhan Yojana, you can open an account for free!',
      ta: 'வங்கிக் கணக்கைத் திறக்க, உங்களுக்கு தேவை:\n\n1. 📋 ஆதார் அட்டை\n2. 📷 2 பாஸ்போர்ட் புகைப்படங்கள்\n3. 📝 முகவரி ஆதாரம்',
      bn: 'ব্যাংক অ্যাকাউন্ট খুলতে আপনার প্রয়োজন:\n\n1. 📋 আধার কার্ড\n2. 📷 2টি পাসপোর্ট সাইজ ছবি\n3. 📝 ঠিকানার প্রমাণ',
      te: 'బ్యాంక్ ఖాతా తెరవడానికి మీకు అవసరం:\n\n1. 📋 ఆధార్ కార్డ్\n2. 📷 2 పాస్‌పోర్ట్ సైజ్ ఫోటోలు\n3. 📝 అడ్రస్ ప్రూఫ్',
      mr: 'बँक खाते उघडण्यासाठी तुम्हाला हवे:\n\n1. 📋 आधार कार्ड\n2. 📷 2 पासपोर्ट फोटो\n3. 📝 पत्ता पुरावा',
      gu: 'બેંક ખાતું ખોલવા માટે તમને જોઈએ:\n\n1. 📋 આધાર કાર્ડ\n2. 📷 2 પાસપોર્ટ ફોટો\n3. 📝 સરનામાનો પુરાવો',
      kn: 'ಬ್ಯಾಂಕ್ ಖಾತೆ ತೆರೆಯಲು ನಿಮಗೆ ಬೇಕು:\n\n1. 📋 ಆಧಾರ್ ಕಾರ್ಡ್\n2. 📷 2 ಪಾಸ್‌ಪೋರ್ಟ್ ಫೋಟೋಗಳು\n3. 📝 ವಿಳಾಸ ಪ್ರಮಾಣ',
    },
    upi: {
      hi: 'UPI से पैसे भेजने के लिए:\n\n1. 📱 Google Pay, PhonePe या Paytm डाउनलोड करें\n2. 🔗 अपना बैंक अकाउंट लिंक करें\n3. 🔐 UPI PIN बनाएं\n4. 📲 फोन नंबर या QR कोड से पैसे भेजें\n\nध्यान रखें: अपना PIN किसी को न बताएं!',
      en: 'To send money via UPI:\n\n1. 📱 Download Google Pay, PhonePe or Paytm\n2. 🔗 Link your bank account\n3. 🔐 Create UPI PIN\n4. 📲 Send money using phone number or QR code\n\nRemember: Never share your PIN with anyone!',
      ta: 'UPI மூலம் பணம் அனுப்ப:\n\n1. 📱 Google Pay, PhonePe அல்லது Paytm பதிவிறக்கவும்\n2. 🔗 உங்கள் வங்கிக் கணக்கை இணைக்கவும்\n3. 🔐 UPI PIN உருவாக்கவும்',
      bn: 'UPI দিয়ে টাকা পাঠাতে:\n\n1. 📱 Google Pay, PhonePe বা Paytm ডাউনলোড করুন\n2. 🔗 আপনার ব্যাংক অ্যাকাউন্ট লিঙ্ক করুন\n3. 🔐 UPI PIN তৈরি করুন',
      te: 'UPI ద్వారా డబ్బు పంపడానికి:\n\n1. 📱 Google Pay, PhonePe లేదా Paytm డౌన్‌లోడ్ చేయండి\n2. 🔗 మీ బ్యాంక్ ఖాతాను లింక్ చేయండి\n3. 🔐 UPI PIN సృష్టించండి',
      mr: 'UPI ने पैसे पाठवण्यासाठी:\n\n1. 📱 Google Pay, PhonePe किंवा Paytm डाउनलोड करा\n2. 🔗 तुमचे बँक खाते लिंक करा\n3. 🔐 UPI PIN बनवा',
      gu: 'UPI થી પૈસા મોકલવા માટે:\n\n1. 📱 Google Pay, PhonePe અથવા Paytm ડાઉનલોડ કરો\n2. 🔗 તમારું બેંક ખાતું લિંક કરો\n3. 🔐 UPI PIN બનાવો',
      kn: 'UPI ಮೂಲಕ ಹಣ ಕಳುಹಿಸಲು:\n\n1. 📱 Google Pay, PhonePe ಅಥವಾ Paytm ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ\n2. 🔗 ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ಲಿಂಕ್ ಮಾಡಿ\n3. 🔐 UPI PIN ರಚಿಸಿ',
    },
    scheme: {
      hi: 'महिलाओं के लिए सरकारी योजनाएं:\n\n🌟 **उज्ज्वला योजना** - मुफ्त LPG कनेक्शन\n💰 **सुकन्या समृद्धि** - बेटी के लिए बचत\n🏠 **आवास योजना** - सस्ते घर\n👩‍💼 **मुद्रा लोन** - व्यापार के लिए लोन\n\nअधिक जानकारी के लिए अपने ग्राम पंचायत से संपर्क करें।',
      en: 'Government schemes for women:\n\n🌟 **Ujjwala Yojana** - Free LPG connection\n💰 **Sukanya Samriddhi** - Savings for daughter\n🏠 **Awas Yojana** - Affordable housing\n👩‍💼 **Mudra Loan** - Business loans\n\nContact your Gram Panchayat for more information.',
      ta: 'பெண்களுக்கான அரசு திட்டங்கள்:\n\n🌟 **உஜ்வலா யோஜனா** - இலவச LPG இணைப்பு\n💰 **சுகன்யா சம்ரிதி** - மகளுக்கான சேமிப்பு',
      bn: 'মহিলাদের জন্য সরকারি প্রকল্প:\n\n🌟 **উজ্জ্বলা যোজনা** - বিনামূল্যে LPG সংযোগ\n💰 **সুকন্যা সমৃদ্ধি** - মেয়ের জন্য সঞ্চয়',
      te: 'మహిళల కోసం ప్రభుత్వ పథకాలు:\n\n🌟 **ఉజ్వల యోజన** - ఉచిత LPG కనెక్షన్\n💰 **సుకన్య సమృద్ధి** - కుమార్తె కోసం పొదుపు',
      mr: 'महिलांसाठी सरकारी योजना:\n\n🌟 **उज्ज्वला योजना** - मोफत LPG कनेक्शन\n💰 **सुकन्या समृद्धी** - मुलीसाठी बचत',
      gu: 'મહિલાઓ માટે સરકારી યોજનાઓ:\n\n🌟 **ઉજ્જવલા યોજના** - મફત LPG કનેક્શન\n💰 **સુકન્યા સમૃદ્ધિ** - દીકરી માટે બચત',
      kn: 'ಮಹಿಳೆಯರಿಗೆ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು:\n\n🌟 **ಉಜ್ವಲಾ ಯೋಜನೆ** - ಉಚಿತ LPG ಸಂಪರ್ಕ\n💰 **ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ** - ಮಗಳಿಗೆ ಉಳಿತಾಯ',
    },
  };

  const getResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('bank') || lowerMsg.includes('खाता') || lowerMsg.includes('account')) {
      return sampleResponses.bank[language];
    }
    if (lowerMsg.includes('upi') || lowerMsg.includes('पैस') || lowerMsg.includes('money') || lowerMsg.includes('send')) {
      return sampleResponses.upi[language];
    }
    if (lowerMsg.includes('scheme') || lowerMsg.includes('योजना') || lowerMsg.includes('government') || lowerMsg.includes('सरकार')) {
      return sampleResponses.scheme[language];
    }

    const defaultResponses: Record<Language, string> = {
      hi: 'मैं आपकी मदद करने के लिए यहां हूं! आप मुझसे बैंक खाता, UPI, सरकारी योजनाओं, या जीवन कौशल के बारे में पूछ सकते हैं।',
      en: "I'm here to help! You can ask me about bank accounts, UPI payments, government schemes, or life skills.",
      ta: 'நான் உங்களுக்கு உதவ இங்கே இருக்கிறேன்! வங்கிக் கணக்குகள், UPI, அரசு திட்டங்கள் பற்றி கேளுங்கள்.',
      bn: 'আমি সাহায্য করতে এখানে আছি! ব্যাংক অ্যাকাউন্ট, UPI, সরকারি প্রকল্প সম্পর্কে জিজ্ঞাসা করুন।',
      te: 'నేను సహాయం చేయడానికి ఇక్కడ ఉన్నాను! బ్యాంక్ ఖాతాలు, UPI, ప్రభుత్వ పథకాల గురించి అడగండి.',
      mr: 'मी मदत करण्यासाठी येथे आहे! बँक खाते, UPI, सरकारी योजनांबद्दल विचारा.',
      gu: 'હું મદદ કરવા માટે અહીં છું! બેંક ખાતા, UPI, સરકારી યોજનાઓ વિશે પૂછો.',
      kn: 'ನಾನು ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ! ಬ್ಯಾಂಕ್ ಖಾತೆಗಳು, UPI, ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ.',
    };
    return defaultResponses[language];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice input
      setTimeout(() => {
        setInput('How do I open a bank account?');
        setIsListening(false);
      }, 2000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickQuestions = [
    { emoji: '🏦', text: 'Bank account' },
    { emoji: '📱', text: 'UPI payments' },
    { emoji: '📋', text: 'Government schemes' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="hero-gradient px-4 py-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="glass" 
            size="icon" 
            onClick={() => navigate('/demo/dashboard')}
            className="bg-white/20 text-white hover:bg-white/30"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Sahayak AI</h1>
              <p className="text-xs text-white/70">Your personal assistant</p>
            </div>
          </div>
          <Button 
            variant="glass" 
            size="icon"
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="bg-white/20 text-white hover:bg-white/30"
          >
            <Languages className="w-5 h-5" />
          </Button>
        </div>

        {/* Language Menu */}
        {showLanguageMenu && (
          <Card className="absolute right-4 top-16 z-50 p-2 shadow-elevated">
            {Object.entries(languageLabels).map(([code, label]) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code as Language);
                  setShowLanguageMenu(false);
                }}
                className={`w-full px-4 py-2 text-left rounded-lg hover:bg-muted ${
                  language === code ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                {label}
              </button>
            ))}
          </Card>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 ${
                message.role === 'user'
                  ? 'hero-gradient text-white rounded-br-md'
                  : 'bg-muted rounded-bl-md'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.role === 'assistant' && (
                  <Sparkles className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                )}
                <p className="whitespace-pre-line text-sm md:text-base">{message.content}</p>
              </div>
              {message.role === 'assistant' && (
                <button className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                  <Volume2 className="w-3 h-3" />
                  Listen
                </button>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md p-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 py-2">
          <p className="text-sm text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickQuestions.map((q, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => setInput(q.text)}
                className="flex-shrink-0"
              >
                {q.emoji} {q.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-center gap-2">
          <Button
            variant={isListening ? 'default' : 'outline'}
            size="icon"
            onClick={toggleListening}
            className={isListening ? 'animate-pulse' : ''}
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type or speak your question..."
            className="flex-1 h-12"
          />
          <Button variant="hero" size="icon" onClick={handleSend} disabled={!input.trim()}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SahayakAssistant;
