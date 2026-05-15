import React from 'react';

export const VOTING_DEADLINE = new Date("2026-04-24T23:59:59").getTime(); 

export const VALID_WSA_NAMES = [
  "Test User", 
  "Acao Wpabbd", "Acub Krisyen", "Agcito Connery", "Aguada Ralph", "Albenda Blence Karylle", 
  "Alejandra Xhaina Jewelle", "Alfeche Aries Dwight", "Alin Shella mae", "Alonzo Ken Lester", 
  "Amahoy Jea", "Amba Mary Grace", "Amen Aida", "Amigo Dizel Ann", "Ampo Airon", "Andujar AJ Joy", 
  "Angeles Jeffrey", "Aniñon Analyn", "Antigua Andrea Gail", "Antonio Shaniah Marianne", 
  "Arce Franz Nicolette", "Asequia Nicole", "Asoy Isaac Charles", "Auguis Rio", "Bacasmot Dan Mar", 
  "Bacus Elaiza", "Baillo Clark Jasper", "Balibagon Hanna", "Bartolome Ron Jayde", 
  "Baslote Xenia Franchette", "Batuigas Crisha May", "Baylin Rosemarie", "Bejiga Rodel", 
  "Bonayog Kathleen Rose", "Bongga Shyra", "Brady Mary Vin Grace", "Buntag Juemhare", 
  "Buslon Al James", "Buslon John Michael", "Cabalin Jhorlan", "Cabisay Carille", "Cablinda Philip", 
  "Caipang Rejie", "Calzo Nicole", "Cananea Karol Joren", "Cang Eduardo", "Canios Lizamae", 
  "Casimsiman Joy", "Chavit Alju", "Cloma Kristine Jane", "Condino Jennifer", "Copas Charles", 
  "Cornelio Judiel", "Cortes Kerbie", "Cuadra Kaye", "Daaca Adrianne Kyle", "Daang Erica", 
  "Dagaraga Fhebie Ann", "Dahilan Jezreel", "Dahilan Ara Nessa", "Daigdigan Keith William", 
  "Dajao Antony Dave", "Dalura Joross", "De la rita Mackenzie Paul", "Delenia Sharmylle", 
  "Delicano Mary Jane", "Deloso Lindon", "Dompol Rizha Kaiya", "Doysabas Jay Michael", 
  "Echavez Jaymar", "Elarmo Miyan Grace", "Elemento Roselmarie", "Ellevera Ma.Rita Reyvin", 
  "Embornas Sherry Ann", "Enot Rubelyn", "Enoy Rocel", "Escolania Ethel Dianne", 
  "Fabre Christian Dale", "Flores Victor Rey", "Fuentes Georffel", "Gaan Arnold", "Gaballo Rheva Mae", 
  "Gaballo Reyna Liz", "Gabe Graige Russel", "Galanta James", "Galinada Vunch", "Gallardo Ivan Mae", 
  "Garcesa Francis Dave", "Gawahan Franceen Mae", "Go Charmel Joy", "Gorgonio Machaila", 
  "Guibone Joey", "Hermonsada Renjeluv", "Igar James Clinton", "Jabonga Jane Nino", 
  "Jacutin Joshua James", "Jandayan Aron", "Jovita Joanna Ruby", "Lagria Edwin", "Lapeciros Rj Emon", 
  "Limen Ken Cymon", "Lingatong Princess Sai", "Llemit Michelle Nikko Jay", "Lominog Jabber", 
  "Lomongo Jaycel", "Lomunsod Gerilyn", "Lumimot Mary Grace", "Macaranas Serge Daniel", 
  "Madronero Angelica", "Mainit Ivy Grace", "Malon Sam", "Mangangarig Ahmad", "Marbella Thea Norren", 
  "Matood Zedrick", "Melid Arwin", "Merinillo Jane", "Minguez Jerry Alej", "Mission Marielle", 
  "Montalbo Rezza Zane", "Moreno Joel", "Nacua Ashley Nicole", "Nacua Alyssa Ryka", "Nadela Noel Jr.", 
  "Nambatac Earl Heart", "Naypa Edrian", "Neri Ian Cesar", "Neri Geimin Ace", "Obatay Jubert", 
  "Obenza Jerald", "Ocate Katrice", "Odal Rachel Mae", "Pabillaran Joevan", "Paclar Marie Cris", 
  "Padeño Kentjay", "Pagongpong Orlando Jr.", "Paguia Diane Verneth", "Pahilangco Joana", 
  "Pajo Faith hope love", "Palac Juvy Ann", "Pantojas Mackever Jay", "Pantonial Daniela", 
  "Pasa Clark Jefferson", "Patulina Mae-ann", "Payot Andrew", "Pecolados Xylum Clint", 
  "Pendong Ramel", "Peros Flory Fe", "Prandas Jolina", "Pundag Johaifha", "Quibedo Bea Francine", 
  "Quimada Mary June", "Quinto Gabriel", "Quinto Kix", "Rama Maximilian Paul", "Ramos Maricar", 
  "Raot-Raot Melbourne", "Ratunil Rusty", "Regodos Alexa", "Reloba Gwyneth", "Requino Carl Eldred", 
  "Reyes Paulo", "Reyes John Lorence", "Romero Rhean Klent", "Roque Raphael Joshua", 
  "Sabal Cyrell james", "Sabuero Berry More", "Sacabin Aldrian", "Salan Jerald Mico", "Salon Eliza Marie", 
  "Salva Shairen", "Sangcopan Analisa", "Secula Eliza Micca Mae", "Secula Justin", "Serran Alice", 
  "Severino Ashley", "Severino Armier", "Simodlan Lysa", "Sinodlay Alexander", "Sio Apple Mae", 
  "Somablay Junrick", "Sombilon Mikaela Saszya", "Suelo Gabriel James", "Tabla Andrea Mae", 
  "Tacbobo Jonnabeth", "Taculod Bethuben", "Taculod Benz Carl", "Tagarda Trixia", "Tayab Mark Eldelou", 
  "Tecson Khert John", "Tiplohod Jeniffer", "Togonon Kesha Claire", "Torrejos Anthony James", 
  "Via Jeff Laurence", "Villaflor Lyncy", "Villahermosa Sherlyn", "Villarta Alvin", 
  "Villarta Jean Antonette", "Vingno Archie", "Yamit Leonora", "Yañez Jennabel", "Yu Almer Jr.", 
  "Zambrano Aaron Kent", "Zamora Joshua", "Zarate Rachelle Jane",
  
  "Amodia Ronel", "Balquin Alyssa Jane", "Barbero Keira", "Barro Ivan Angel", "Candelario Denzel", 
  "Daven Glen Paulo", "Degala Daniel Laurenc", "Del Rosario Jairean Mae", "Escora Jhel Mark", 
  "Felisilda Ejay", "Galagala Ray Hycinth", "Gamos Jeahan", "Gargar Archem", "Henerol Henry James", 
  "Labarro Sydney", "Lindawan Justin", "Lopena Andrei", "Madelo Caryl Joy", "Mosquito Grace Anne", 
  "Navos Sweety Gen", "Octubre Bernalyne", "Olaer Marianne", "Ortiz Ronabelle", "Paham Windy", 
  "Pasquito Cecille", "Reyes Luigi Carl", "Sabay Delight Marie"
];

export const themeData = [
  {
    id: 'onepiece',
    title: 'Grand Line',
    factions: [
      { name: 'Straw Hat Fleet', style: 'Unorthodox Offense', icon: '/images/strawhat-logo.jpg' },
      { name: 'Whitebeard Commanders', style: 'Absolute Power', icon: '/images/whitebeard-logo.jpg' },
      { name: 'Red Hair Crew', style: 'Elite Fundamentals', icon: '/images/redhair-logo.jpg' }
    ]
  }
];