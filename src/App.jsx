import React, { useState, useEffect, useRef } from 'react';

// --- FIREBASE GLOBAL DATABASE IMPORTS ---
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";

// ==========================================
// YOUR FIREBASE CONFIGURATION
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyBgpwc7GJPMb-tFkN3Y1RoownbKyqjksRY",
  authDomain: "sports-fest2026theme.firebaseapp.com",
  projectId: "sports-fest2026theme",
  storageBucket: "sports-fest2026theme.firebasestorage.app",
  messagingSenderId: "398258077321",
  appId: "1:398258077321:web:e643fff6986b03d6c29058",
  measurementId: "G-NR5ZV0DMND"
};

// Initialize the Database Connection
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// THE WSA MASTER ALLOWLIST (NAMES)
// ==========================================
const VALID_WSA_NAMES = [
  "Test User", 
  "Acao Wpabbd", "Acub Krisyen", "Agcito Connery", "Aguada Ian", "Aguada Ralph", "Aguilar Jessie", 
  "Albenda Blence Karylle", "Alejandra Xhaina Jewelle", "Alfeche Aries Dwight", "Alin Shella mae", 
  "Alonzo Ken Lester", "Amahoy Jea", "Amba Mary Grace", "Amen Aida", "Amigo Dizel Ann", 
  "Añana Kristine Cassandra", "Andujar AJ Joy", "Angeles Jeffrey", "Aniñon Analyn", 
  "Antigua Andrea Gail", "Antonio Shaniah Marianne", "Apepe Andrea", "Arce Franz Nicolette", 
  "Asequia Nicole", "Asoy Isaac Charles", "Auguis Rio", "Bacasmot Dan Mar", "Bacud Sebastian", 
  "Bacus Elaiza", "Baillo Clark Jasper", "Balibagon Hanna", "Barrera Rheland", "Barren Bulnes", 
  "Bartolome Ron Jayde", "Baslote Xenia Franchette", "Bastatas Jasmine Chloe", "Batuigas Crisha May", 
  "Baylin Rosemarie", "Bejiga Rodel", "Bonayog Kathleen Rose", "Bongga Shyra", "Brady Mary Vin Grace", 
  "Budiongan Kyle", "Buntag Juemhare", "Buslon John Michael", "Buslon Al James", "Butalina Nice", 
  "Cabalin Jhorlan", "Cabisay Carille", "Cablinda Philip", "Caipang Rejie", "Calzo Nicole", 
  "Cananea Karol Joren", "Cang Maria socorro", "Cang Eduardo", "Canios Lizamae", "Casimsiman Joy", 
  "Cauyon Jogel", "Celiz Wilclar", "Chavit Alju", "Circulado Ryan", "Cloma Kristine Jane", 
  "Condino Jennifer", "Copas Charles", "Cornelio Judiel", "Cortes Kerbie", "Cuadra Kaye", 
  "Daaca Adrianne Kyle", "Daang Erica", "Dagaraga Fhebie Ann", "Dahilan Jezreel", "Dahilan Ara Nessa", 
  "Daigdigan Keith William", "Dalura Joross", "Daray Zyan Mich", "Dayadaya Maria Ashley", 
  "De la rita Mackenzie Paul", "Dajao Dave", "De Veyra Abigail Rhea", "Delenia Sharmylle", 
  "Delicano Mary Jane", "Deloso Lindon", "Dominguito Alfrancis", "Dompol Rizha Kaiya", 
  "Doysabas Jay Michael", "Echavez Jaymar", "Elarmo Miyan Grace", "Elemento Roselmarie", 
  "Ellevera Ma.Rita Reyvin", "Eluna Sheetal Pamela", "Emano Randy jr.", "Embornas Sherry Ann", 
  "Enot Rubelyn", "Enoy Rocel", "Escolania Ethel Dianne", "Fabre Christian Dale", "Flores John Steven", 
  "Flores Gerald Mark", "Flores Victor Rey", "Fuentes Georffel", "Gaan Arnold", "Gaballo Rheva Mae", 
  "Gaballo Reyna Liz", "Gabe Graige Russel", "Galanta James", "Galinada Vunch", "Gallardo Ivan Mae", 
  "Gallega Barnie", "Garcesa Francis Dave", "Gawahan Franceen Mae", "Go Charmel Joy", "Gondo Anton Jay", 
  "Gorgonio Machaila", "Guibone Joey", "Hermonsada Renjeluv", "Igar James Clinton", "Ihong Aicelyn", 
  "Ita-oc Rey Jhon", "Jabonga Jane Nino", "Jacutin Joshua James", "Jandayan Aron", "Jovita Joanna Ruby", 
  "Kilat Ma Jennica", "Labadan Katherine", "Lagria Edwin", "Lapeciros Rj Emon", "Laranio Welfredo", 
  "Laro Dimple", "Laudato Merry Cris", "Limen Ken Cymon", "Lingatong Princess Sai", 
  "Llemit Michelle Nikko Jay", "Lomongo Jaycel", "Lominog Jabber", "Lomunsod Gerilyn", "Lumatab John Paul", 
  "Lumimot Mary Grace", "Macalong Xiomara", "Macaranas Serge Daniel", "Maderal MC Andrie", 
  "Madronero Angelica", "Maglangit Loise Anthonie", "Mainit Ivy Grace", "Malon Sam", "Mangangarig Ahmad", 
  "Manlangit Raph", "Marbella Thea Norren", "Matood Zedrick", "Melid Arwin", "Merinillo Jane", 
  "Mier Jhanrry", "Minguez Jerry Alej", "Mission Marielle", "Mondero Anisa", "Montalbo Rezza Zane", 
  "Montañez Cyrel Kate", "Moreno Joel", "Nacua Ashley Nicole", "Nacua Alyssa Ryka", "Nadela Noel Jr.", 
  "Nambatac Earl Heart", "Naranja Mae", "Navarro Edward", "Naypa Edrian", "Neri Geimin Ace", 
  "Neri Ian Cesar", "Obatay Jubert", "Obenza Jerald", "Obsioma Rizza Mae", "Ocate Katrice", 
  "Odal Rachel Mae", "Oniana Irine Lou", "Pabayo Hannah Jean", "Pabillaran Joevan", "Paclar Marie Cris", 
  "Padeño Kentjay", "Pagongpong Orlando Jr.", "Paguia Diane Verneth", "Pahilangco Joana", 
  "Pajo Faith hope love", "Palac Juvy Ann", "Palac Sarah Mae", "Pantojas Mackever Jay", "Pantonial Daniela", 
  "Paragoso April Jane", "Paraiso Leah", "Pasa Clark Jefferson", "Patulina Mae-ann", "Payot Andrew", 
  "Pecolados Xylum Clint", "Pendong Ramel", "Perales Mark Kiven", "Peros Flory Fe", "Pingol Bjorn Jovani", 
  "Prandas Jolina", "Pulgo Shella Mae", "Pundag Johaifha", "Quibedo Bea Francine", "Quimada Mary June", 
  "Quinto Kix", "Quinto Gabriel", "Rama Maximilian Paul", "Ramos Maricar", "Raot-Raot Melbourne", 
  "Ratunil Rusty", "Regodos Alexa", "Reloba Gwyneth", "Requino Carl Eldred", "Reyes Paulo", 
  "Reyes John Lorence", "Romero Rhean Klent", "Roque Raphael Joshua", "Sabal Cyrell james", "Sabido Daryle", 
  "Sabuero Berry More", "Sacabin Aldrian", "Sagubay Arniel", "Salan Jerald Mico", "Salinasal Ma. Lourdes", 
  "Salon Eliza Marie", "Salva Shairen", "Salvoro Nicole", "Sangcopan Analisa", "Secula Justin", 
  "Secula Eliza Micca Mae", "Serran Alice", "Severino Ashley", "Severino Armier", "Simodlan Lysa", 
  "Sio Apple Mae", "Sinodlay Alexander", "Somablay Junrick", "Sombilon Mikaela Saszya", "Suelo Gabriel James", 
  "Tabla Andrea Mae", "Tacbobo Jonnabeth", "Taculod Bethuben", "Taculod Benz Carl", "Tagarda Trixia", 
  "Togonon Kesha Claire", "Tano Russel Jeff", "Tayab Mark Eldelou", "Tecson Khert John", "Templa Paul Lordy", 
  "Tilos Emmanuel John", "Tiplohod Jeniffer", "Torrejos Anthony James", "Velez Princess Dawn", 
  "Via Jeff Laurence", "Villadores Dave", "Villaflor Lyncy", "Villahermosa Sherlyn", "Villarta Alvin", 
  "Villarta Jean Antonette", "Vingno Archie", "Yamit Leonora", "Yañez Jennabel", "Yu Almer Jr.", 
  "Zambrano Aaron Kent", "Zamora Joshua", "Zarate Rachelle Jane"
];

const themeData = [
  {
    id: 'avatar',
    title: 'Pandora',
    subtitle: 'The Avatar Theme',
    accent: 'emerald',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500',
    bgClass: 'bg-emerald-500',
    image: '/images/10.jpg', 
    description: 'Awaken to a world pulsing with life. The Avatar Theme transforms the arena into a breath-taking bioluminescent sanctuary. Here, success isn\'t just about speed or strength—it\'s about forging an unbreakable bond with your teammates and the land itself, channelling the collective spirit of Pandora to dominate with fluid grace and relentless energy.',
    factions: [
      { name: 'Omaticaya Clan', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C7 10 2 18 2 22C7 20 12 18 17 20C22 22 17 10 12 2Z"/><path d="M12 2C11 5 10 8 9 9C10 10 11 13 12 16C13 13 14 10 15 9C14 8 13 5 12 2Z" opacity="0.3"/></svg>, style: 'Forest Masters', desc: 'Descendants of the great forest, channelling an intricate dance of evasion and vertical dominance. They leverage the forest\'s flow, deliver unpredictable strikes from above, and dominate with unparalleled leaping agility.' },
      { name: 'Metkayina Clan', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 drop-shadow-md"><path d="M2 14C5 12 8 16 12 14C16 12 19 16 22 14M2 18C5 16 8 20 12 18C16 16 19 20 22 18" strokeLinecap="round"/></svg>, style: 'Reef Riders', desc: 'Forged in the limitless ocean, as relentless and adaptable as the tide. Their coordinated defense forms an impenetrable reef, channelling the sea\'s quiet strength and endless endurance to overwhelm any opponent.' },
      { name: 'Tayrangi Clan', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C15 8 22 10 12 18C2 10 9 8 12 2Z"/><path d="M12 2C11 5 8 8 5 9C8 10 11 13 12 16C13 13 16 10 19 9C16 8 13 5 12 2Z" opacity="0.3"/></svg>, style: 'Eastern Sea Riders', desc: 'Guardians of the eastern seas, traversing the arena with breathless urgency, channelling the wind\'s power and the ocean\'s expanse. Expect Fast-breaks as devastatingly powerful as a crashing wave.' }
    ]
  },
  {
    id: 'onepiece',
    title: 'Grand Line',
    subtitle: 'The Pirate Theme',
    accent: 'red',
    textClass: 'text-red-400',
    borderClass: 'border-red-500',
    bgClass: 'bg-red-500',
    image: '/images/9.jpg', 
    description: 'Hoist the sails and prepare to conquer the Grand Line! This Pirate Theme isn\'t just a competition; it\'s a daring voyage fueled by unyielding dreams and boundless freedom. In this arena, willpower is currency and passion is power. Rally your crew, embrace risk, and navigate every treacherous challenge to claim the ultimate treasure: victory.',
    factions: [
      { name: 'Straw Hat Fleet', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C8.7 2 6 4.7 6 8C6 11.3 8.7 14 12 14C15.3 14 18 11.3 18 8C18 4.7 15.3 2 12 2ZM10 10C10 9.4 9.4 9 9 9C8.6 9 8 9.4 8 10C8 10.6 8.6 11 9 11C9.4 11 10 10.6 10 10ZM16 10C16 9.4 15.4 9 15 9C14.6 9 14 9.4 14 10C14 10.6 14.6 11 15 11C15.4 11 16 10.6 16 10Z"/><path d="M12 2H10V5H14V2H12Z"/></svg>, style: 'Unorthodox Offense', desc: 'Underdogs driven by an insatiable hunger for freedom and an unbreakable bond, thriving in the most desperate moments. Their playstyle is chaotic, passionate, and powered by pure, resolute willpower.' },
      { name: 'Whitebeard Commanders', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C11 2 10 3 10 4V16C10 17 11 18 12 18C13 18 14 17 14 16V4C14 3 13 2 12 2Z"/><path d="M6 10C5 10 4 11 4 12V18C4 19 5 20 6 20H18C19 20 20 19 20 18V12C20 11 19 10 18 10H6Z"/><path d="M12 22H10V20H14V22H12Z" opacity="0.3"/></svg>, style: 'Absolute Power', desc: 'Forged in the legendary battles of the past, they are resolute bastions of loyalty and crushing power. Expect calculated, devastating strikes and an unbreakable defense that holds every line.' },
      { name: 'Red Hair Crew', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-8 h-8 drop-shadow-md"><path d="M4 6L8 18M12 6L16 18M20 6L16 18" strokeLinecap="round"/></svg>, style: 'Elite Fundamentals', desc: 'Commanders of the arena with an intimidating presence, built on elite fundamentals and Relentless Stamina. They dictate the pace of every play with unwavering precision and zero compromise.' }
    ]
  },
  {
    id: 'bleach',
    title: 'Soul Society',
    subtitle: 'The Shinigami Theme',
    accent: 'purple',
    textClass: 'text-purple-400',
    borderClass: 'border-purple-500',
    bgClass: 'bg-purple-500',
    image: '/images/12.jpg', 
    description: 'Unleash your inner strength and prepare for battle! The Shinigami Theme brings tactical precision, focused spiritual pressure, and disciplined execution to the court. Every move is calculated, every strike decisive. Master your Zanpakuto\'s spirit, forge an unbreakable strategy with your squad, and purge the opposition with elegant, razor-sharp efficiency.',
    factions: [
      { name: 'Squad 11', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C9 2 6 4 6 7C6 10 9 12 12 12C15 12 18 10 18 7C18 4 15 2 12 2ZM10 8C10 7.4 9.4 7 9 7C8.6 7 8 7.4 8 8C8 8.6 8.6 9 9 9C9.4 9 10 8.6 10 8ZM16 8C16 7.4 15.4 7 15 7C14.6 7 14 7.4 14 8C14 8.6 14.6 9 15 9C15.4 9 16 8.6 16 8Z"/><path d="M12 14C10 14 8 15 8 16H16C16 15 14 14 12 14ZM12 18C11 18 10 19 10 20H14C14 19 13 18 12 18Z"/><path d="M12 18C11 18 10 19 10 20H14C14 19 13 18 12 18Z" opacity="0.3"/></svg>, style: 'Brute Force', desc: 'Embodying raw, unadulterated battle aggression, they reject complex tactics in favor of overwhelming physical offense. Seek only to crush opponents through sheer, unrelenting force and battle-lust.' },
      { name: 'Squad 2', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2L8 10H16L12 2Z"/><path d="M11 10V20H13V10H11Z"/><path d="M10 20H14V22H10V20Z" opacity="0.3"/></svg>, style: 'Stealth & Speed', desc: 'Undisputed masters of speed, channelling lightning-fast transitions and unpredictable steals before opponents even realize the game has begun. Expect fast-breaks executed with breath-taking swiftness.' },
      { name: 'Squad 6', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C10 6 6 10 2 12C6 14 10 18 12 22C14 18 18 14 22 12C18 10 14 6 12 2Z"/><path d="M12 2C11 5 8 8 5 9C8 10 11 13 12 16C13 13 16 10 19 9C16 8 13 5 12 2Z" opacity="0.5"/></svg>, style: 'Noble Discipline', desc: 'Upholders of noble tradition and strict discipline, executing complex set plays with unwavering tactical precision. Coordinated efficiency channelling generations of strategic brilliance to dominate without comprise.' }
    ]
  },
  {
    id: 'percy',
    title: 'Olympus',
    subtitle: 'The Demigod Theme',
    accent: 'yellow',
    textClass: 'text-yellow-400',
    borderClass: 'border-yellow-500',
    bgClass: 'bg-yellow-500',
    image: '/images/11.jpg', 
    description: 'Claim your divine heritage and ascend to glory! The Demigod Theme radiates with mythic athleticism and epic rivalries. In this arena, you aren\'t just competing; you are channelling the powers of ancient gods. Command the track and court with elemental forces, leverage divine agility, and engrave your name in the stars through unforgettable, superhuman performances.',
    factions: [
      { name: 'Cabin of Zeus', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><polygon points="12 2 4 14 11 14 10 22 18 10 11 10 12 2"/><polygon points="12 4 6 12 11 12 10 20 16 10 11 10 12 4" opacity="0.5"/></svg>, style: 'Explosive Speed', desc: 'Dominators of the arena, channelling the raw power of thunder and lightning with explosive sprints and high-flying acrobatics. Fast-breaks decisive and crackling with divine energy.' },
      { name: 'Cabin of Poseidon', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 drop-shadow-md"><path d="M4 8C4 10 8 12 12 12C16 12 20 10 20 8M12 2V22M8 4V10M16 4V10M10 22H14" strokeLinecap="round" strokeLinejoin="round"/></svg>, style: 'Fluid Adaptability', desc: 'Fluid and adaptable, seamlessly shifting between offense and defense like the boundless, unpredictable tide. Coordinated strategy as constant and overwhelming as a force of nature.' },
      { name: 'Cabin of Ares', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C8 2 5 5 5 9C5 13 8 16 12 16C16 16 19 13 19 9C19 5 16 2 12 2ZM10 12C10 11.4 9.4 11 9 11C8.6 11 8 11.4 8 12C8 12.6 8.6 13 9 13C9.4 13 10 12.6 10 12ZM16 12C16 11.4 15.4 11 15 11C14.6 11 14 11.4 14 12C14 12.6 14.6 13 15 13C15.4 13 16 12.6 16 12Z"/><path d="M12 18H10V22H14V18H12Z"/><path d="M12 18H10V22H14V18H12Z" opacity="0.3"/></svg>, style: 'Physical Intimidation', desc: 'Forged in battle, the arena\'s imposing enforcers. Relying on overwhelming physical dominance, constant crushing force, and unrelenting will to dominate the court without compromise.' }
    ]
  }
];

// THE GLOBAL DEADLINE (April 24, 2026, 11:59:59 PM)
const VOTING_DEADLINE = new Date("2026-04-24T23:59:59").getTime();

export default function App() {
  const [deviceType, setDeviceType] = useState('DESKTOP');
  
  // STATE ROUTER: 'home' | 'login' | 'voting' | 'results'
  const [currentView, setCurrentView] = useState('home');
  const [activeRealm, setActiveRealm] = useState(null);
  
  const [user, setUser] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [portalTheme, setPortalTheme] = useState(null);
  const [portalPhase, setPortalPhase] = useState('idle');

  const [voteStatus, setVoteStatus] = useState('idle');
  const [chargingRealmId, setChargingRealmId] = useState(null);
  const [selectedRealm, setSelectedRealm] = useState(null);
  const [chargeProgress, setChargeProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false); 
  
  // NEW TIMER AND RESULTS STATE
  const [isVotingOpen, setIsVotingOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [finalResults, setFinalResults] = useState(null);
  const [totalVotesCast, setTotalVotesCast] = useState(0);
  
  const requestRef = useRef();
  const chargeValue = useRef(0);

  // --- INIT EFFECT: Timer & Local Storage ---
  useEffect(() => {
    // Check Local Storage
    const savedUser = localStorage.getItem('wsaVoter');
    if (savedUser) setUser(JSON.parse(savedUser));

    // Device Check
    const checkDevice = () => {
      setDeviceType(window.innerWidth < 768 ? 'MOBILE' : 'DESKTOP');
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    // Global Countdown Timer
    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = VOTING_DEADLINE - now;

      if (distance <= 0) {
        clearInterval(timerInterval);
        setIsVotingOpen(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsVotingOpen(true);
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => {
      window.removeEventListener('resize', checkDevice);
      clearInterval(timerInterval);
    };
  }, []);

  const scrollToSelection = () => {
    document.getElementById('selection-grid').scrollIntoView({ behavior: 'smooth' });
  };

  const triggerPortal = (targetRealm, themeId) => {
    setPortalTheme(themeId);
    setPortalPhase('entering');
    setTimeout(() => {
      setActiveRealm(targetRealm);
      setPortalPhase('exiting');
      setTimeout(() => {
        setPortalTheme(null);
        setPortalPhase('idle');
      }, 700); 
    }, 700); 
  };

  // --- FETCH FIREBASE DATA FOR RESULTS ---
  const fetchFinalResults = async () => {
    setIsSyncing(true);
    setCurrentView('results');
    window.scrollTo(0,0);
    
    try {
      const querySnapshot = await getDocs(collection(db, "wsa_votes"));
      let tallies = { avatar: 0, onepiece: 0, bleach: 0, percy: 0 };
      let total = 0;
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (tallies[data.realmId] !== undefined) {
          tallies[data.realmId]++;
          total++;
        }
      });
      
      setFinalResults(tallies);
      setTotalVotesCast(total);
    } catch (error) {
      console.error("Failed to fetch final results: ", error);
      alert("Error connecting to Global Database.");
    } finally {
      setIsSyncing(false);
    }
  };

  // ROUTER CONTROLLER FOR MAIN BUTTON
  const handleMainCTA = () => {
    if (!isVotingOpen) {
      fetchFinalResults(); // If closed, fetch and show results
      return;
    }
    if (!user) {
      setCurrentView('login');
    } else {
      setupVotingView(user);
    }
    window.scrollTo(0,0);
  };

  const setupVotingView = (currentUser) => {
    setCurrentView('voting');
    if (currentUser.votedRealm) {
      const votedTheme = themeData.find(t => t.id === currentUser.votedRealm);
      setSelectedRealm(votedTheme);
      setVoteStatus('secured');
    } else {
      setVoteStatus('idle');
      setChargingRealmId(null);
      setSelectedRealm(null);
      setChargeProgress(0);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!isVotingOpen) return; // Failsafe
    
    const enteredName = nameInput.trim();

    if (enteredName.length < 2) {
      setLoginError("Please enter your full name.");
      return;
    }

    const isValid = VALID_WSA_NAMES.some(
      (name) => name.toLowerCase() === enteredName.toLowerCase()
    );

    if (!isValid) {
      setLoginError("ACCESS DENIED: Unrecognized WSA Member. Check spelling and format.");
      return;
    }

    const exactName = VALID_WSA_NAMES.find(
      (name) => name.toLowerCase() === enteredName.toLowerCase()
    );

    const newUser = {
      name: exactName,
      votedRealm: null
    };
    
    setUser(newUser);
    localStorage.setItem('wsaVoter', JSON.stringify(newUser));
    setLoginError('');
    setupVotingView(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('wsaVoter');
    setCurrentView('home');
    setNameInput('');
  };

  const startCharge = (theme) => {
    if (voteStatus !== 'idle' || user?.votedRealm || !isVotingOpen) return;
    
    setChargingRealmId(theme.id);
    chargeValue.current = 0;
    
    const animate = () => {
      chargeValue.current += 1.5;
      if (chargeValue.current >= 100) {
        setChargeProgress(100);
        setSelectedRealm(theme);
        setChargingRealmId(null);
        setVoteStatus('confirming');
      } else {
        setChargeProgress(chargeValue.current);
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    requestRef.current = requestAnimationFrame(animate);
  };

  const stopCharge = () => {
    if (voteStatus !== 'idle') return;
    cancelAnimationFrame(requestRef.current);
    setChargeProgress(0);
    setChargingRealmId(null);
    chargeValue.current = 0;
  };

  const confirmVote = async () => {
    setIsSyncing(true); 
    const updatedUser = { ...user, votedRealm: selectedRealm.id };
    
    try {
      await setDoc(doc(db, "wsa_votes", updatedUser.name), {
        name: updatedUser.name,
        realmId: selectedRealm.id,
        realmName: selectedRealm.title,
        timestamp: new Date().toISOString()
      });

      setUser(updatedUser);
      localStorage.setItem('wsaVoter', JSON.stringify(updatedUser));
      setVoteStatus('secured');
      
    } catch (error) {
      console.error("Error writing to Firebase: ", error);
      alert("System Error: Could not connect to WSA Global Database.");
      setVoteStatus('idle'); 
    } finally {
      setIsSyncing(false);
    }
  };

  const cancelVote = () => {
    setVoteStatus('idle');
    setSelectedRealm(null);
    setChargeProgress(0);
  };

  // ==========================================
  // HUD COMPONENT
  // ==========================================
  const renderHUD = () => (
    <>
      <div className={`fixed top-0 inset-x-0 h-1 z-50 animate-pulse transition-all duration-700 ease-in-out ${isVotingOpen ? 'bg-linear-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0' : 'bg-linear-to-r from-red-500/0 via-red-500/50 to-red-500/0'}`}></div>
      <div className="fixed top-0 w-full z-50 flex justify-between items-start px-4 md:px-8 py-3 pointer-events-none transition-all duration-700 ease-in-out">
        <div className="flex flex-col gap-1">
          <span className={`text-[10px] md:text-xs font-black tracking-widest uppercase drop-shadow-[0_0_5px_rgba(59,130,246,0.8)] ${isVotingOpen ? 'text-blue-400' : 'text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]'}`}>
            WSA // {isVotingOpen ? 'SECURE.NET' : 'LOCKDOWN'}
          </span>
          <span className="text-[7px] md:text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isVotingOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
            {deviceType} UPLINK {isVotingOpen ? 'ESTABLISHED' : 'TERMINATED'}
          </span>
        </div>
        {user && (
          <button 
            onClick={handleLogout} 
            className="pointer-events-auto flex items-center gap-2 text-[9px] font-bold tracking-[0.3em] uppercase text-red-400 hover:text-red-300 hover:bg-red-950/30 px-3 py-1.5 rounded-sm border border-red-900/50 backdrop-blur-md transition-all duration-300 ease-in-out cursor-pointer"
          >
            <span>Sign Out</span>
            <span className="font-mono text-slate-300">[{user.name.split(' ')[0]}]</span>
          </button>
        )}
      </div>
    </>
  );

  // ==========================================
  // PAGE 4: THE OFFICIAL RESULTS DASHBOARD
  // ==========================================
  if (currentView === 'results') {
    // Sort themes by votes to find the winner
    const sortedThemes = finalResults 
      ? [...themeData].sort((a, b) => finalResults[b.id] - finalResults[a.id])
      : themeData;

    return (
      <div className="bg-slate-950 text-slate-50 font-sans min-h-screen flex flex-col items-center py-20 px-6 relative overflow-x-hidden selection:bg-blue-500/30">
        
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%)] bg-size-[100%_4px] z-0 opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.1),transparent_70%)] z-0 pointer-events-none"></div>
        
        {renderHUD()}

        <button 
          onClick={() => setCurrentView('home')}
          className="absolute top-16 left-4 md:top-20 md:left-8 z-50 text-slate-400 hover:text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 border-l-2 border-slate-700 hover:border-slate-400 bg-slate-900/50 transition-all duration-300 ease-in-out cursor-pointer"
        >
          ← Return to Main
        </button>

        <div className="relative z-10 w-full max-w-4xl mt-10 animate-in slide-in-from-bottom-10 fade-in duration-1000 ease-out">
          <div className="text-center mb-16">
            <p className="text-red-500 font-mono text-[10px] uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-sm animate-pulse"></span> VOTING CLOSED
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-xl">
              Official Results
            </h2>
            <p className="text-slate-400 text-xs uppercase tracking-[0.3em] font-mono">
              Total Valid Signatures: <span className="text-white font-bold">{totalVotesCast}</span>
            </p>
          </div>

          {isSyncing || !finalResults ? (
             <div className="flex flex-col items-center justify-center py-20">
               <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .loading-ring { animation: spin 1s linear infinite; }`}</style>
               <div className={`w-12 h-12 border-4 border-slate-800 border-t-red-500 rounded-full loading-ring`}></div>
               <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mt-6 animate-pulse font-mono">Decrypting Global Database...</p>
             </div>
          ) : (
            <div className="space-y-8">
              {sortedThemes.map((theme, index) => {
                const votes = finalResults[theme.id] || 0;
                const percentage = totalVotesCast > 0 ? Math.round((votes / totalVotesCast) * 100) : 0;
                const isWinner = index === 0 && votes > 0;

                return (
                  <div key={theme.id} className={`bg-slate-900/80 backdrop-blur-md border border-slate-800 p-6 md:p-8 relative overflow-hidden transition-transform duration-700 hover:scale-[1.02] ${isWinner ? `border-l-4 ${theme.borderClass} shadow-[0_0_40px_rgba(0,0,0,0.8)]` : ''}`}>
                    
                    {/* Background Texture image slightly visible */}
                    <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none grayscale mix-blend-screen">
                       <img src={theme.image} alt="" className="w-full h-full object-cover mask-image-[linear-gradient(to_left,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]"/>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
                      <div>
                        {isWinner && <p className="text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-1 animate-pulse flex items-center gap-2">★ Undisputed Victor</p>}
                        <h3 className={`text-3xl font-black uppercase tracking-tight ${theme.textClass}`}>
                          {theme.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-4xl font-black text-white tracking-tighter">{votes}</span>
                        <span className="text-slate-400 text-xs ml-2 uppercase tracking-widest">Votes</span>
                      </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="relative w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className={`absolute top-0 left-0 h-full ${theme.bgClass} transition-all duration-1500 ease-out`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-mono">Network Share</p>
                      <p className="text-white font-black font-mono">{percentage}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE 3: THE LOGIN TERMINAL (Locked if Voting is Closed)
  // ==========================================
  if (currentView === 'login') {
    return (
      <div className="bg-slate-950 bg-[url('/images/bg-desk.png')] bg-cover bg-center bg-fixed text-slate-50 font-sans min-h-screen flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%)] bg-size-[100%_4px] z-0 opacity-20"></div>
        <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none transition-opacity duration-700 ease-in-out"></div>
        
        {renderHUD()}

        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border-y-2 border-slate-700 p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/50 transition-all duration-700 ease-in-out"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500/50 transition-all duration-700 ease-in-out"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500/50 transition-all duration-700 ease-in-out"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500/50 transition-all duration-700 ease-in-out"></div>

          <button 
            onClick={() => setCurrentView('home')}
            className="absolute -top-12 left-0 text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ease-in-out cursor-pointer flex items-center gap-2"
          >
            <span>←</span> Abort Sequence
          </button>

          <div className="text-center mt-2 mb-10 relative transition-all duration-700 ease-in-out">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Terminal Access</h2>
            <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest">Identity Verification</p>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500/50 blur-sm rounded-full"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <div className="flex items-baseline justify-between mb-2 pl-1 pr-1 transition-all duration-700 ease-in-out">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-300">Target Identity</label>
                <span className="text-[9px] font-bold text-blue-400/80 uppercase tracking-widest font-mono">Format: (Surname) (Given Name)</span>
              </div>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Ex: Dela Cruz Juan"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-none px-4 py-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-all duration-500 ease-in-out uppercase tracking-wider"
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 group-focus-within:w-full transition-all duration-500 ease-out"></div>
              </div>
            </div>

            {loginError && (
              <div className="bg-red-950/50 border-l-4 border-red-500 py-3 px-4 flex items-start gap-3 animate-in fade-in duration-300 ease-in-out">
                <span className="text-red-500 text-sm mt-0.5">⚠</span>
                <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold font-mono leading-relaxed">
                  {loginError}
                </p>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] py-5 shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 ease-in-out active:scale-[0.98] cursor-pointer border border-blue-400/50"
            >
              Initiate Handshake
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE 2: THE DEDICATED VOTING TERMINAL
  // ==========================================
  if (currentView === 'voting') {
    return (
      <div className="bg-slate-950 text-slate-50 font-sans min-h-screen flex flex-col items-center justify-center relative overflow-hidden selection:bg-blue-500/30 p-6">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%)] bg-size-[100%_4px] z-0 opacity-20"></div>
        <div className={`absolute top-0 left-0 w-full h-full opacity-15 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-current via-slate-950 to-slate-950 pointer-events-none transition-colors duration-700 ease-in-out ${selectedRealm ? selectedRealm.textClass : 'text-blue-500'}`}></div>

        {renderHUD()}

        <style>{`
          @keyframes intenseShake { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 25% { transform: translate(2px, 2px) rotate(1deg); } 50% { transform: translate(-2px, -2px) rotate(-1deg); } 75% { transform: translate(-2px, 2px) rotate(1deg); } }
          .charge-shake { animation: intenseShake 0.1s infinite; }
          @keyframes stamp { 0% { transform: scale(5); opacity: 0; } 50% { transform: scale(1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
          .vote-stamp { animation: stamp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
          @keyframes spin { 100% { transform: rotate(360deg); } }
          .loading-ring { animation: spin 1s linear infinite; }
        `}</style>

        {voteStatus === 'idle' && (
          <div className="absolute top-16 left-4 md:top-20 md:left-8 z-50 animate-in fade-in duration-700 ease-out">
            <button 
              onClick={() => setCurrentView('home')}
              className="text-slate-400 hover:text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 border-l-2 border-slate-700 hover:border-slate-400 bg-slate-900/50 transition-all duration-300 ease-in-out cursor-pointer"
            >
              ← Terminate Session
            </button>
          </div>
        )}

        {voteStatus === 'idle' && (
          <div className="w-full max-w-5xl flex flex-col items-center mt-20 md:mt-0 z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="text-center mb-10 transition-all duration-700 ease-in-out">
              <div className="inline-flex items-center justify-center gap-3 bg-blue-950/30 border border-blue-500/30 px-6 py-2 mb-6 rounded-full">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <p className="text-blue-400 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] m-0 leading-none">
                  Identity Lock: {user?.name}
                </p>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] mb-2">
                Declare Allegiance
              </h2>
              <p className="text-slate-400 uppercase tracking-[0.2em] text-[10px] md:text-xs">
                Press and hold a sector to initiate energy transfer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {themeData.map((theme) => {
                const isChargingThisCard = chargingRealmId === theme.id;
                return (
                  <div 
                    key={theme.id}
                    onMouseDown={() => startCharge(theme)}
                    onMouseUp={stopCharge}
                    onMouseLeave={stopCharge}
                    onTouchStart={() => startCharge(theme)}
                    onTouchEnd={stopCharge}
                    className={`group relative h-48 md:h-64 rounded-none overflow-hidden select-none touch-none cursor-crosshair bg-slate-900 transition-all duration-500 ease-in-out 
                      border-t border-x border-slate-800 border-b-4 ${theme.borderClass}/50 group-hover:border-b-4 hover:${theme.borderClass} 
                      ${isChargingThisCard ? 'charge-shake scale-[1.02] border-white/80' : ''}`}
                  >
                    <img 
                      src={theme.image} 
                      alt={theme.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${isChargingThisCard ? 'grayscale-0 opacity-100 scale-110' : 'grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105'}`}
                    />
                    <div 
                      className={`absolute bottom-0 left-0 w-full transition-all duration-75 ease-linear ${theme.bgClass} opacity-70`}
                      style={{ height: isChargingThisCard ? `${chargeProgress}%` : '0%' }}
                    ></div>
                    <div className={`absolute inset-0 transition-colors duration-700 ease-in-out ${isChargingThisCard ? 'bg-transparent' : 'bg-slate-950/60 group-hover:bg-slate-950/20'}`}></div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center drop-shadow-2xl z-10 pointer-events-none">
                      <h3 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 transition-colors duration-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] ${isChargingThisCard ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {theme.title}
                      </h3>
                      {!isChargingThisCard ? (
                        <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 border border-current bg-slate-950/50 backdrop-blur-sm ${theme.textClass} opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out translate-y-2 group-hover:translate-y-0`}>
                          Hold to Pledge
                        </span>
                      ) : (
                        <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white mt-2 animate-pulse drop-shadow-lg bg-black/50 px-4 py-1 rounded-sm">
                          Transferring {Math.floor(chargeProgress)}%
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {voteStatus === 'confirming' && selectedRealm && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 backdrop-blur-md z-50 animate-in fade-in zoom-in-95 duration-500 ease-out p-6">
            <div className={`max-w-2xl w-full bg-slate-900 border-y-2 ${selectedRealm.borderClass} p-8 md:p-12 text-center shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden transition-all duration-700 ease-in-out`}>
              <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/2 transition-colors duration-700 ${selectedRealm.bgClass}`}></div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 relative z-10 drop-shadow-md">
                Final Protocol
              </h2>
              
              <div className="text-slate-300 text-sm md:text-base leading-relaxed mb-12 space-y-6 relative z-10 text-justify md:text-center px-4">
                <p>
                  Identity <span className="text-white font-black font-mono tracking-widest bg-black/50 px-2 py-0.5">{user.name.toUpperCase()}</span>, the network awaits your command. You stand at the precipice, about to permanently bind your data signature to the <span className={`font-black ${selectedRealm.textClass}`}>{selectedRealm.title}</span> sector.
                </p>
                <p className="text-red-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                  Warning: This action is irreversible. The network does not forgive errors.
                </p>
              </div>

              {isSyncing ? (
                <div className="flex flex-col items-center justify-center py-6 relative z-10 animate-in fade-in duration-300">
                  <div className={`w-12 h-12 border-4 border-slate-800 border-t-current rounded-full loading-ring ${selectedRealm.textClass}`}></div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mt-6 animate-pulse font-mono">Writing to Global Database...</p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
                  <button 
                    onClick={cancelVote}
                    className="w-full md:w-auto px-6 py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    Abort Connection
                  </button>
                  <button 
                    onClick={confirmVote}
                    className={`w-full md:w-auto px-8 py-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-950 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-[0_0_30px_rgba(currentColor,0.4)] ${selectedRealm.bgClass} cursor-pointer border border-white/30`}
                  >
                    Execute Command
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {voteStatus === 'secured' && selectedRealm && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-sm z-60 animate-in fade-in duration-700 ease-out">
            <div className={`vote-stamp border-4 md:border-8 border-current p-6 md:p-12 text-center ${selectedRealm.textClass} drop-shadow-[0_0_50px_rgba(currentColor,0.4)] -rotate-12 bg-slate-950/80 transition-all duration-700 ease-in-out`}>
              <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">Vote</h1>
              <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">Secured</h1>
            </div>
            
            <div className="mt-20 text-center flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700 delay-300 ease-out">
              <div className="bg-black/50 border border-slate-800 px-6 py-4 mb-8 transition-all duration-700">
                <p className="text-white text-xs md:text-sm font-mono tracking-widest uppercase mb-3">
                  Identity <span className="text-blue-400">{user.name}</span>
                </p>
                <p className="text-slate-400 text-[10px] md:text-xs font-mono tracking-widest uppercase">
                  Assigned Sector: <span className={selectedRealm.textClass}>{selectedRealm.title}</span>
                </p>
              </div>
              <p className="text-emerald-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-12 drop-shadow-md flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                Global Database Synced
              </p>
              <button 
                onClick={() => {
                  setCurrentView('home');
                  triggerPortal(null, selectedRealm.id);
                }}
                className="text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] px-8 py-4 border border-slate-800 hover:border-slate-500 bg-slate-950 transition-all duration-500 ease-in-out cursor-pointer"
              >
                Return to Directory
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // PAGE 1: THE MAIN DASHBOARD & REALM SELECTOR
  // ==========================================
  return (
    <div className="bg-slate-950 bg-[url('/images/bg-desk.png')] bg-cover bg-center bg-fixed text-slate-50 font-sans selection:bg-blue-500/30 min-h-screen relative animate-in fade-in duration-700 ease-in-out">
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%)] bg-size-[100%_4px] z-0 opacity-10"></div>

      <style>{`
        @keyframes rippleExpand { 0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0; } 10% { transform: translate(-50%, -50%) scale(0.1); opacity: 1; } 60% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(2.0); opacity: 0; } }
        .pandora-ripple { position: absolute; top: 50%; left: 50%; width: 200vw; height: 200vw; animation: rippleExpand 1s ease-in-out forwards; transform-origin: center center; mix-blend-mode: screen; }

        @keyframes waveWipe { 0% { transform: translateX(-100%); opacity: 1; } 40% { transform: translateX(0%); opacity: 1; } 60% { transform: translateX(0%); opacity: 1; } 100% { transform: translateX(100%); opacity: 1; } }
        .onepiece-wipe { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; animation: waveWipe 1s ease-in-out forwards; mix-blend-mode: screen; }

        @keyframes gateSlamLeft { 0% { transform: translateX(100%); } 40% { transform: translateX(0%); } 100% { transform: translateX(0%); } }
        @keyframes gateSlamRight { 0% { transform: translateX(-100%); } 40% { transform: translateX(0%); } 100% { transform: translateX(0%); } }
        .bleach-gate { position: absolute; height: 100%; width: 50%; object-fit: cover; mix-blend-mode: screen; }
        .bleach-left  { left: 0;  animation: gateSlamLeft 1s ease-in-out forwards; }
        .bleach-right { right: 0; animation: gateSlamRight 1s ease-in-out forwards; }

        @keyframes lightningFlash { 0% { opacity: 0; } 10% { opacity: 1; } 20% { opacity: 1; } 30% { opacity: 0.2; } 40% { opacity: 1; } 100% { opacity: 0; } }
        .percy-flash-bg { position: absolute; inset: 0; background: #fffbeb; animation: lightningFlash 1s ease-out forwards; }
        .percy-flash-image { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(2); width: 100%; object-fit: cover; animation: lightningFlash 1s ease-out forwards; mix-blend-mode: screen; }
      `}</style>

      {renderHUD()}

      <div className={`fixed inset-0 z-100 flex items-center justify-center overflow-hidden transition-opacity duration-700 ease-in-out ${portalPhase !== 'idle' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        {portalTheme === 'avatar' && <img src="/images/pandora-portal.jpg" alt="Pandora Transition" className="pandora-ripple" />}
        {portalTheme === 'onepiece' && <img src="/images/onepiece-portal.jpg" alt="One Piece Transition" className="onepiece-wipe" />}
        {portalTheme === 'bleach' && (
          <div className="absolute inset-0 flex h-full w-full">
            <img src="/images/bleach-portal.jpg" alt="Bleach Gate Left" className="bleach-gate bleach-left" />
            <img src="/images/bleach-portal.jpg" alt="Bleach Gate Right" className="bleach-gate bleach-right" />
          </div>
        )}
        {portalTheme === 'percy' && (
          <>
            <div className="percy-flash-bg"></div>
            <img src="/images/percy-portal.jpg" alt="Lightning Transition" className="percy-flash-image" />
          </>
        )}
      </div>

      <div className="fixed inset-0 bg-black/70 pointer-events-none z-0 transition-opacity duration-700 ease-in-out"></div>

      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 pb-20">
        
        {/* NEW LIVE TIMER HUD */}
        {isVotingOpen ? (
          <div className="mb-10 px-8 py-4 bg-slate-900/80 border border-slate-700 backdrop-blur-xl shadow-2xl relative overflow-hidden animate-in fade-in duration-1000">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-purple-500 to-blue-500"></div>
            <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] mb-2 font-mono">
              Network Closure In:
            </p>
            <div className="flex gap-4 md:gap-6 justify-center items-center font-black text-white text-2xl md:text-4xl tracking-tighter">
              <div className="flex flex-col"><span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">{String(timeLeft.days).padStart(2, '0')}</span><span className="text-[8px] md:text-[10px] text-slate-500 tracking-[0.2em] font-normal mt-1 uppercase">Days</span></div><span className="text-slate-600 mb-4">:</span>
              <div className="flex flex-col"><span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-[8px] md:text-[10px] text-slate-500 tracking-[0.2em] font-normal mt-1 uppercase">Hrs</span></div><span className="text-slate-600 mb-4">:</span>
              <div className="flex flex-col"><span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-[8px] md:text-[10px] text-slate-500 tracking-[0.2em] font-normal mt-1 uppercase">Min</span></div><span className="text-slate-600 mb-4">:</span>
              <div className="flex flex-col"><span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-[8px] md:text-[10px] text-slate-500 tracking-[0.2em] font-normal mt-1 uppercase">Sec</span></div>
            </div>
          </div>
        ) : (
          <div className="mb-10 px-8 py-4 bg-red-950/40 border border-red-900 backdrop-blur-xl shadow-2xl relative overflow-hidden animate-in fade-in duration-1000">
             <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
             <p className="text-red-400 font-bold uppercase tracking-[0.4em] text-sm md:text-base font-mono flex items-center justify-center gap-3">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> VOTING CLOSED
             </p>
          </div>
        )}

        <div className="flex items-center justify-center gap-10 md:gap-16 mb-8 md:mb-12 w-full max-w-md md:max-w-lg mx-auto">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.3)] bg-black z-10 shrink-0 transition-transform duration-700 ease-in-out hover:scale-105">
            <img src="/images/cu-logo.jpg" alt="CU Logo" className="w-full h-full object-contain mix-blend-screen p-1 md:p-2" />
          </div>
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.3)] bg-black z-10 shrink-0 transition-transform duration-700 ease-in-out hover:scale-105">
            <img src="/images/wsa-logo.jpg" alt="WSA Logo" className="w-full h-full object-contain mix-blend-screen p-1 md:p-2" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 border-y-2 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-700 ease-in-out hover:border-slate-500">
          
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[70px] md:text-[140px] font-black uppercase tracking-tighter pointer-events-none -rotate-12 whitespace-nowrap transition-all duration-1000 ease-in-out ${isVotingOpen ? 'text-white/5' : 'text-red-500/5'}`}>
            {isVotingOpen ? 'VOTING LIVE' : 'RESULTS'}
          </div>

          <p className="text-blue-400 font-mono text-[9px] md:text-[10px] uppercase tracking-widest mb-4 relative z-10 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-blue-400/50 block transition-all duration-500 ease-in-out"></span>
            Working Scholars Association
            <span className="w-8 h-px bg-blue-400/50 block transition-all duration-500 ease-in-out"></span>
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white drop-shadow-[0_5px_15px_rgba(0,0,0,1)] mb-6 md:mb-8 relative z-10 transition-all duration-700 ease-in-out">
            Sports Fest 2026
          </h1>
          
          <div className="space-y-6 text-slate-300 text-sm md:text-base font-medium leading-relaxed mb-12 relative z-10 text-justify md:text-center px-2">
            <p className="transition-opacity duration-700 ease-in-out">
              What's up, Working Scholars? It's that time of the year again. We know you've been grinding hard in your classes and balancing your shifts, but it is almost time to trade the textbooks for sneakers. This year, Sports Fest isn't going to be just another intramural event—we are entirely reinventing the arena.
            </p>
            <p className="transition-opacity duration-700 ease-in-out delay-100">
              We are bringing the greatest fictional universes straight to the CU campus. We have narrowed it down to four legendary worlds, but we are leaving the final decision up to you. Will we be mastering the wilds of Pandora, sailing the treacherous Grand Line, wielding our Zanpakutos, or claiming our godly heritage at Camp Half-Blood?
            </p>
            
            {isVotingOpen ? (
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-5 md:p-6 text-center shadow-inner relative overflow-hidden transition-all duration-500 ease-in-out hover:bg-emerald-900/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 transition-all duration-500 ease-in-out"></div>
                <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-500">
                  The time has come to choose your battlefield. Review the official faction breakdowns below and decide where your allegiance lies. The official voting portal is now strictly online and awaiting your command.
                </p>
              </div>
            ) : (
              <div className="bg-red-950/40 border border-red-500/30 p-5 md:p-6 text-center shadow-inner relative overflow-hidden transition-all duration-500 ease-in-out">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500 transition-all duration-500 ease-in-out"></div>
                <p className="text-red-400 font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-500">
                  The voting period has officially concluded. The Global Database has been locked. The final victor has been decided by the Working Scholars Association.
                </p>
              </div>
            )}
          </div>

          <button onClick={scrollToSelection} className="group flex flex-col items-center justify-center gap-3 mx-auto text-slate-500 hover:text-blue-400 transition-all duration-500 ease-in-out cursor-pointer relative z-10">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold font-mono transition-colors duration-500">Access Directory</span>
            <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:border-blue-400 transition-all duration-500 ease-in-out animate-bounce">↓</div>
          </button>
        </div>
      </section>

      <section id="selection-grid" className="relative z-10 min-h-screen py-16 md:py-24 px-4 md:px-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl">
          
          {!activeRealm ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out mt-10 md:mt-0">
              <div className="text-center mb-12 md:mb-20 transition-all duration-700 ease-in-out">
                <p className="text-blue-500 font-mono text-[10px] uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-sm animate-pulse"></span> System Database
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">The Four Realms</h2>
                <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-[0.2em]">Select sector to view classified Faction Intel</p>
              </div>

              <div className="flex flex-col md:flex-row w-full h-auto md:h-150 gap-4 md:gap-6">
                {themeData.map((theme) => (
                  <div 
                    key={theme.id} 
                    onClick={() => triggerPortal(theme, theme.id)} 
                    className={`group relative flex-1 min-h-75 md:min-h-0 md:hover:flex-3 transition-[flex] duration-700 ease-in-out overflow-hidden bg-slate-950 cursor-pointer border-y border-slate-800 hover:border-y-2 hover:${theme.borderClass}`}
                  >
                    <img 
                      src={theme.image} 
                      alt={theme.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out scale-105 md:scale-100 md:group-hover:scale-105 opacity-80 md:opacity-40 md:group-hover:opacity-100 grayscale-0 md:grayscale md:group-hover:grayscale-0"
                    />
                    
                    <div className={`absolute bottom-0 left-0 w-full h-1 ${theme.bgClass} opacity-50 group-hover:opacity-100 transition-opacity duration-500 ease-in-out`}></div>

                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_60%)] transition-opacity duration-700 ease-in-out"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                      <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter w-max drop-shadow-[0_2px_10px_rgba(0,0,0,1)] transition-all duration-500 ease-in-out">
                        {theme.title}
                      </h2>
                      <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                        <div className="overflow-hidden">
                          <div className="pt-3 w-70 md:w-87.5">
                            <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${theme.textClass} mb-4 font-mono transition-all duration-500`}>
                              // {theme.subtitle}
                            </p>
                            <p className="text-[11px] md:text-sm text-slate-300 leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-in-out delay-150 drop-shadow-lg">
                              {theme.description}
                            </p>
                            <div className={`mt-6 inline-block px-5 py-2 border border-current text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold ${theme.textClass} bg-slate-950/80 backdrop-blur-sm group-hover:bg-current group-hover:text-slate-950 transition-colors duration-500 ease-in-out`}>
                              Access Factions →
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-20 md:mt-32 text-center pb-10">
                {isVotingOpen ? (
                  <div className="inline-block p-0.5 rounded-full bg-linear-to-r from-emerald-500 via-blue-500 to-purple-500 animate-pulse transition-all duration-700">
                    <button 
                      onClick={handleMainCTA}
                      className="block bg-slate-950 px-8 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] md:text-xs text-white hover:bg-slate-900 transition-colors duration-300 ease-in-out shadow-2xl cursor-pointer"
                    >
                      Access Official Voting Terminal
                    </button>
                  </div>
                ) : (
                  <div className="inline-block p-0.5 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-700">
                    <button 
                      onClick={handleMainCTA}
                      className="block bg-slate-950 px-10 py-5 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs text-red-400 hover:bg-red-950 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
                    >
                      View Official Results
                    </button>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out mt-10 md:mt-0 pb-20">
              <div className="flex flex-col items-center text-center mb-16 relative transition-all duration-700 ease-in-out">
                <button 
                  onClick={() => triggerPortal(null, activeRealm.id)} 
                  className="absolute top-0 left-0 text-slate-400 hover:text-white transition-all duration-300 ease-in-out text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 border-l-2 border-slate-700 hover:border-slate-400 bg-slate-900/50 cursor-pointer"
                >
                  ← Return
                </button>
                
                <p className={`text-[10px] uppercase tracking-[0.4em] font-bold font-mono ${activeRealm.textClass} mb-4 mt-12 md:mt-0 flex items-center gap-2 transition-colors duration-500`}>
                  <span className={`w-2 h-2 ${activeRealm.bgClass} rounded-sm`}></span> Sector Intel
                </p>
                <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-xl transition-all duration-500">
                  {activeRealm.title}
                </h2>
                <div className="max-w-3xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 backdrop-blur-xl relative transition-all duration-500 ease-in-out">
                  <div className={`absolute top-0 left-0 w-full h-1 ${activeRealm.bgClass} transition-colors duration-500`}></div>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed text-justify md:text-center transition-colors duration-500">
                    {activeRealm.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {activeRealm.factions.map((faction, idx) => (
                  <div key={idx} className={`bg-slate-900/80 backdrop-blur-md p-8 border-y border-slate-800 hover:${activeRealm.borderClass} transition-all duration-500 ease-in-out group relative overflow-hidden`}>
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-current opacity-5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 transition-colors duration-500 ${activeRealm.textClass}`}></div>
                    <div className={`w-16 h-16 rounded-none flex items-center justify-center mb-8 relative z-10 border border-slate-700 bg-slate-950 shadow-[0_0_30px_rgba(currentColor,0.1)] group-hover:scale-110 transition-all duration-700 ease-out ${activeRealm.textClass}`}>
                      {faction.icon}
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 relative z-10 transition-colors duration-500">
                      {faction.name}
                    </h3>
                    <p className={`text-[9px] font-bold uppercase tracking-[0.2em] font-mono ${activeRealm.textClass} mb-6 relative z-10 bg-black/30 inline-block px-2 py-1 transition-colors duration-500`}>
                      Tactic: {faction.style}
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed relative z-10 transition-colors duration-500">
                      {faction.desc}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-24 text-center">
                {isVotingOpen ? (
                  <button 
                    onClick={handleOpenVoting}
                    className={`inline-block border border-current px-10 py-5 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs cursor-pointer transition-all duration-500 ease-in-out hover:bg-current hover:text-slate-950 hover:scale-105 shadow-[0_0_30px_rgba(currentColor,0.2)] bg-slate-950/80 backdrop-blur-sm ${activeRealm.textClass}`}
                  >
                    Proceed to Voting Terminal →
                  </button>
                ) : (
                  <p className="text-red-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                    Voting is officially closed. Return to main menu to view results.
                  </p>
                )}
              </div>

            </div>
          )}
        </div>
      </section>
      
    </div>
  );
}