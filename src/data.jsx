import React from 'react';

export const VOTING_DEADLINE = new Date("2026-04-24T23:59:59").getTime(); 

export const VALID_WSA_NAMES = [
  "Test User", "Acao Wpabbd", "Acub Krisyen", "Agcito Connery", "Aguada Ian", "Aguada Ralph", "Aguilar Jessie", 
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
  "Paragoso April Jane", "Paraiso Leah", "Pasa Clark Jefferson", "Patiluna Mae-ann", "Payot Andrew", 
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
  "Zambrano Aaron Kent", "Zamora Joshua", "Zarate Rachelle Jane", "Aluba Marle", "Amodia Ronel", 
  "Ampo Airon", "Baldo Melton", "Balquin Alyssa Jane", "Barbero Keira", "Barro Ivan Angel", 
  "Baslot Nelyn", "Bolonos Jevelene", "Candelario Denzel", "Deparine Jasmine", "Devala Glen Paulo", 
  "Degen Daniel Laurenc", "Del Rosario Jairean Mae", "Escora Jhel Mark", "Felisilda Ejay", 
  "Galagala Ray Hycinth", "Gamos Jeahan", "Gargar Archem", "Henerol Henry James", "Labarro Sydney", 
  "Lindawan Justin", "Lopena Andrei", "Madelo Caryl Joy", "Madelo Andrei Joshua", "Mosquito Grace Anne", 
  "Navos Sweety Gen", "Octubre Bernalyne", "Olaer Marianne", "Ortiz Ronabelle", "Paham Windy", 
  "Pasquito Cecille", "Reyes Luigi Carl", "Sabana Mary Rose", "Sabay Delight Marie"
];

export const TEXTURES = {
  baseConcrete: 'https://images.unsplash.com/photo-1531685250784-afb3487a098f?q=80&w=1000&auto=format&fit=crop',
  winnerSparks: 'https://images.unsplash.com/photo-1533035353720-98d1a1b181a1?q=80&w=1000&auto=format&fit=crop',
  loserCracks: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1000&auto=format&fit=crop'
};

export const themeData = [
  {
    id: 'avatar',
    title: 'Pandora',
    subtitle: 'The Avatar Theme',
    accent: 'emerald',
    hex: '#10b981', 
    glowHex: '#34d399', 
    image: '/images/10.jpg', 
    characterAsset: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=400&auto=format&fit=crop&mark=transparent', 
    description: 'Awaken to a world pulsing with life. The Avatar Theme transforms the arena into a breath-taking bioluminescent sanctuary. Here, success isn\'t just about speed or strength—it\'s about forging an unbreakable bond with your teammates and the land itself, channelling the collective spirit of Pandora to dominate with fluid grace and relentless energy.',
    factions: [
      { name: 'Omaticaya Clan', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-md"><path d="M12 2C7 10 2 18 2 22C7 20 12 18 17 20C22 22 17 10 12 2Z"/><path d="M12 2C11 5 10 8 9 9C10 10 11 13 12 16C13 16 16 10 19 9C16 8 13 5 12 2Z" opacity="0.3"/></svg>, style: 'Forest Masters', desc: 'Descendants of the great forest, channelling an intricate dance of evasion and vertical dominance. They leverage the forest\'s flow, deliver unpredictable strikes from above, and dominate with unparalleled leaping agility.' },
      { name: 'Metkayina Clan', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full drop-shadow-md"><path d="M2 14C5 12 8 16 12 14C16 12 19 16 22 14M2 18C5 16 8 20 12 18C16 16 19 20 22 18" strokeLinecap="round"/></svg>, style: 'Reef Riders', desc: 'Forged in the limitless ocean, as relentless and adaptable as the tide. Their coordinated defense forms an impenetrable reef, channelling the sea\'s quiet strength and endless endurance to overwhelm any opponent.' },
      { name: 'Tayrangi Clan', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-md"><path d="M12 2C15 8 22 10 12 18C2 10 9 8 12 2Z"/><path d="M12 2C11 5 8 8 5 9C8 10 11 13 12 16C13 16 16 10 19 9C16 8 13 5 12 2Z" opacity="0.3"/></svg>, style: 'Eastern Sea Riders', desc: 'Guardians of the eastern seas, traversing the arena with breathless urgency, channelling the wind\'s power and the ocean\'s expanse. Expect Fast-breaks as devastatingly powerful as a crashing wave.' }
    ]
  },
  {
    id: 'onepiece',
    title: 'Grand Line',
    subtitle: 'The Pirate Theme',
    accent: 'red',
    hex: '#ef4444', 
    glowHex: '#f87171', 
    image: '/images/9.jpg', 
    characterAsset: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?q=80&w=400&auto=format&fit=crop&mark=transparent', 
    description: 'Hoist the sails and prepare to conquer the Grand Line! This Pirate Theme isn\'t just a competition; it\'s a daring voyage fueled by unyielding dreams and boundless freedom. In this arena, willpower is currency and passion is power. Rally your crew, embrace risk, and navigate every treacherous challenge to claim the ultimate treasure: victory.',
    factions: [
      { name: 'Straw Hat Fleet', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-md"><path d="M12 2C8.7 2 6 4.7 6 8C6 11.3 8.7 14 12 14C15.3 14 18 11.3 18 8C18 4.7 15.3 2 12 2ZM10 10C10 9.4 9.4 9 9 9C8.6 9 8 9.4 8 10C8 10.6 8.6 11 9 11C9.4 11 10 10.6 10 10ZM16 10C16 9.4 15.4 9 15 9C14.6 9 14 9.4 14 10C14 10.6 14.6 11 15 11C15.4 11 16 10.6 16 10Z"/><path d="M12 2H10V5H14V2H12Z"/></svg>, style: 'Unorthodox Offense', desc: 'Underdogs driven by an insatiable hunger for freedom and an unbreakable bond, thriving in the most desperate moments. Their playstyle is chaotic, passionate, and powered by pure, resolute willpower.' },
      { name: 'Whitebeard Commanders', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-md"><path d="M12 2C11 2 10 3 10 4V16C10 17 11 18 12 18C13 18 14 17 14 16V4C14 3 13 2 12 2Z"/><path d="M6 10C5 10 4 11 4 12V18C4 19 5 20 6 20H18C19 20 20 19 20 18V12C20 11 19 10 18 10H6Z"/><path d="M12 22H10V20H14V22H12Z" opacity="0.3"/></svg>, style: 'Absolute Power', desc: 'Forged in the legendary battles of the past, they are resolute bastions of loyalty and crushing power. Expect calculated, devastating strikes and an unbreakable defense that holds every line.' },
      { name: 'Red Hair Crew', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-full h-full drop-shadow-md"><path d="M4 6L8 18M12 6L16 18M20 6L16 18" strokeLinecap="round"/></svg>, style: 'Elite Fundamentals', desc: 'Commanders of the arena with an intimidating presence, built on elite fundamentals and Relentless Stamina. They dictate the pace of every play with unwavering precision and zero compromise.' }
    ]
  },
  {
    id: 'bleach',
    title: 'Soul Society',
    subtitle: 'The Shinigami Theme',
    accent: 'purple',
    hex: '#a855f7', 
    glowHex: '#c084fc', 
    image: '/images/12.jpg', 
    characterAsset: 'https://images.unsplash.com/photo-1618331835717-801e976710b8?q=80&w=400&auto=format&fit=crop&mark=transparent', 
    description: 'Unleash your inner strength and prepare for battle! The Shinigami Theme brings tactical precision, focused spiritual pressure, and disciplined execution to the court. Every move is calculated, every strike decisive. Master your Zanpakuto\'s spirit, forge an unbreakable strategy with your squad, and purge the opposition with elegant, razor-sharp efficiency.',
    factions: [
      { name: 'Squad 11', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-md"><path d="M12 2C9 2 6 4 6 7C6 10 9 12 12 12C15 12 18 10 18 7C18 4 15 2 12 2ZM10 8C10 7.4 9.4 7 9 7C8.6 7 8 7.4 8 8C8 8.6 8.6 9 9 9C9.4 9 10 8.6 10 8ZM16 8C16 7.4 15.4 7 15 7C14.6 7 14 7.4 14 8C14 8.6 14.6 9 15 9C15.4 9 16 8.6 16 8Z"/><path d="M12 14C10 14 8 15 8 16H16C16 15 14 14 12 14ZM12 18C11 18 10 19 10 20H14C14 19 13 18 12 18Z"/><path d="M12 18C11 18 10 19 10 20H14C14 19 13 18 12 18Z" opacity="0.3"/></svg>, style: 'Brute Force', desc: 'Embodying raw, unadulterated battle aggression, they reject complex tactics in favor of overwhelming physical offense. Seek only to crush opponents through sheer, unrelenting force and battle-lust.' },
      { name: 'Squad 2', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-md"><path d="M12 2L8 10H16L12 2Z"/><path d="M11 10V20H13V10H11Z"/><path d="M10 20H14V22H10V20Z" opacity="0.3"/></svg>, style: 'Stealth & Speed', desc: 'Undisputed masters of speed, channelling lightning-fast transitions and unpredictable steals before opponents even realize the game has begun. Expect fast-breaks executed with breath-taking swiftness.' },
      { name: 'Squad 6', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-md"><path d="M12 2C10 6 6 10 2 12C6 14 10 18 12 22C14 18 18 14 22 12C18 10 14 6 12 2Z"/><path d="M12 2C11 5 8 8 5 9C8 10 11 13 12 16C13 16 16 10 19 9C16 8 13 5 12 2Z" opacity="0.5"/></svg>, style: 'Noble Discipline', desc: 'Upholders of noble tradition and strict discipline, executing complex set plays with unwavering tactical precision. Coordinated efficiency channelling generations of strategic brilliance to dominate without comprise.' }
    ]
  },
  {
    id: 'percy',
    title: 'Olympus',
    subtitle: 'The Demigod Theme',
    accent: 'yellow',
    hex: '#eab308', 
    glowHex: '#facc15', 
    image: '/images/11.jpg', 
    characterAsset: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=400&auto=format&fit=crop&mark=transparent', 
    description: 'Claim your divine heritage and ascend to glory! The Demigod Theme radiates with mythic athleticism and epic rivalries. In this arena, you aren\'t just competing; you are channelling the powers of ancient gods. Command the track and court with elemental forces, leverage divine agility, and engrave your name in the stars through unforgettable, superhuman performances.',
    factions: [
      { name: 'Cabin of Zeus', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-md"><polygon points="12 2 4 14 11 14 10 22 18 10 11 10 12 2"/><polygon points="12 4 6 12 11 12 10 20 16 10 11 10 12 4" opacity="0.5"/></svg>, style: 'Explosive Speed', desc: 'Dominators of the arena, channelling the raw power of thunder and lightning with explosive sprints and high-flying acrobatics. Fast-breaks decisive and crackling with divine energy.' },
      { name: 'Cabin of Poseidon', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full drop-shadow-md"><path d="M4 8C4 10 8 12 12 12C16 12 20 10 20 8M12 2V22M8 4V10M16 4V10M10 22H14" strokeLinecap="round" strokeLinejoin="round"/></svg>, style: 'Fluid Adaptability', desc: 'Fluid and adaptable, seamlessly shifting between offense and defense like the boundless, unpredictable tide. Coordinated strategy as constant and overwhelming as a force of nature.' },
      { name: 'Cabin of Ares', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-md"><path d="M12 2C8 2 5 5 5 9C5 13 8 16 12 16C16 16 19 13 19 9C19 5 16 2 12 2ZM10 12C10 11.4 9.4 11 9 11C8.6 11 8 11.4 8 12C8 12.6 8.6 13 9 13C9.4 13 10 12.6 10 12ZM16 12C16 11.4 15.4 11 15 11C14.6 11 14 11.4 14 12C14 12.6 14.6 13 15 13C15.4 13 16 12.6 16 12Z"/><path d="M12 18H10V22H14V18H12Z"/><path d="M12 18H10V22H14V18H12Z" opacity="0.3"/></svg>, style: 'Physical Intimidation', desc: 'Forged in battle, the arena\'s imposing enforcers. Relying on overwhelming physical dominance, constant crushing force, and unrelenting will to dominate the court without compromise.' }
    ]
  }
];