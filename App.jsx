import { useState, useCallback } from "react";

// ─── MERK & KLEUREN ──────────────────────────────────────────────────────────
const C = {
  clay:"#C1440E", clayD:"#962E06", clayDp:"#6B1E02", clayL:"#FAE8E0", clayM:"#E8693A",
  earth:"#8B5E3C", sand:"#F2D9C0", earthL:"#F5EDE4",
  green:"#2E7D32", greenL:"#E8F5E9",
  white:"#FFFFFF", bg:"#F5F0EA",
  g900:"#1C1008", g800:"#2E1E10", g700:"#4A3020", g500:"#7A6050", g300:"#C8B8A8", g100:"#F2EDE8", g50:"#FAF7F4",
  red:"#C0392B", redL:"#FFF0EE",
  amber:"#D97706", amberL:"#FFF8EE",
  blue:"#1565C0", blueL:"#E3F2FD",
};

// ─── TEAM ATTESTEN — 93 medewerkers uit Excel ────────────────────────────────
const TA=[
  {id:0,nm:"Rachid Akdim",av:"RA",fn:"Zifter",rl:"medewerker",at:[{n:"Vrachtwagen",v:"01/10/2029",s:"ok"},{n:"Wiellader",v:"01/10/2029",s:"ok"},{n:"Wieldumper",v:"01/10/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:1,nm:"Ceyhan Arbil",av:"CA",fn:"Onderhoudselectricien",rl:"medewerker",at:[{n:"Hoogtewerker",v:"28/09/2028",s:"ok"},{n:"Vorkheftruck",v:"28/09/2028",s:"ok"},{n:"BA4",v:"24/10/2028",s:"ok"},{n:"BA5",v:"25/10/2028",s:"ok"}]},
  {id:2,nm:"Dominique Audin",av:"DA",fn:"Operator allround",rl:"medewerker",at:[{n:"Vorkheftruck",v:"28/11/2023",s:"verlopen"},{n:"Vrachtwagen",v:"28/11/2028",s:"ok"},{n:"Wiellader",v:"28/11/2028",s:"ok"},{n:"BA4",v:"14/01/2027",s:"ok"},{n:"Toolbox Steenzaagmachine",v:"12/07/2021",s:"verlopen"},{n:"EHBO",v:"07/04/2024",s:"verlopen"}]},
  {id:3,nm:"Kris Augusteyns",av:"KA",fn:"Sterhoek",rl:"medewerker",at:[{n:"Bobcat",v:"09/07/2029",s:"ok"},{n:"Wiellader",v:"08/07/2029",s:"ok"},{n:"Wieldumper",v:"08/07/2029",s:"ok"},{n:"doser",v:"09/07/2029",s:"ok"},{n:"hydraulische kraan",v:"08/07/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"06/03/2028",s:"ok"},{n:"EHBO",v:"01/03/2024",s:"verlopen"}]},
  {id:4,nm:"Bart Blijweert",av:"BB",fn:"Operator allround",rl:"medewerker",at:[{n:"Vorkheftruck",v:"23/01/2024",s:"verlopen"},{n:"Wiellader",v:"23/01/2024",s:"verlopen"},{n:"BA4",v:"12/09/2021",s:"verlopen"}]},
  {id:5,nm:"Abdel-hak Charai",av:"AC",fn:"Ploegbaas productie",rl:"leidinggevende",at:[{n:"Vorkheftruck",v:"17/01/2029",s:"ok"},{n:"Wiellader",v:"17/01/2029",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"BA5",v:"23/04/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"27/10/2024",s:"verlopen"}]},
  {id:6,nm:"Abid Bouzambou",av:"AB",fn:"Fieldcoach operations",rl:"leidinggevende",at:[{n:"Vorkheftruck",v:"23/01/2024",s:"verlopen"},{n:"Wiellader",v:"23/01/2024",s:"verlopen"},{n:"BA4",v:"14/01/2027",s:"ok"},{n:"BA5",v:"13/01/2027",s:"ok"},{n:"Toolbox Steenzaagmachine",v:"08/07/2021",s:"verlopen"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"24/04/2024",s:"verlopen"}]},
  {id:7,nm:"Alejandro Compas",av:"AC",fn:"Zifter",rl:"medewerker",at:[{n:"Vrachtwagen",v:"20/10/2028",s:"ok"},{n:"Wiellader",v:"20/10/2028",s:"ok"},{n:"Wieldumper",v:"17/06/2030",s:"ok"},{n:"BA4",v:"12/06/2030",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:8,nm:"Marc Caluwe",av:"MC",fn:"Medewerker cleaning",rl:"medewerker",at:[{n:"Vorkheftruck",v:"12/01/2026",s:"verlopen"},{n:"doser",v:"12/01/2021",s:"verlopen"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:9,nm:"Walter Cant",av:"WC",fn:"Medewerker cleaning",rl:"medewerker",at:[{n:"Vorkheftruck",v:"25/01/2024",s:"verlopen"},{n:"Toolbox Steenzaagmachine",v:"07/07/2021",s:"verlopen"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:10,nm:"Andy Van Osselaer",av:"AV",fn:"Operator allround",rl:"medewerker",at:[{n:"Vorkheftruck",v:"31/05/2029",s:"ok"},{n:"Vrachtwagen",v:"16/06/2028",s:"ok"},{n:"Wiellader",v:"12/07/2028",s:"ok"},{n:"Wieldumper",v:"31/05/2029",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:11,nm:"Ayad Tatar Aziz",av:"AT",fn:"Operator allround",rl:"medewerker",at:[{n:"Wiellader",v:"13/09/2029",s:"ok"},{n:"BA4",v:"12/06/2030",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:12,nm:"Bert Verbraeken",av:"BV",fn:"Fieldcoach operations",rl:"leidinggevende",at:[{n:"Hoogtewerker",v:"11/12/2028",s:"ok"},{n:"Vorkheftruck",v:"11/12/2028",s:"ok"},{n:"Vrachtwagen",v:"11/12/2028",s:"ok"},{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Wiellader",v:"11/12/2028",s:"ok"},{n:"Overslagkraan",v:"11/12/2028",s:"ok"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"BA4",v:"11/01/2027",s:"ok"},{n:"BA5",v:"23/04/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"07/04/2024",s:"verlopen"}]},
  {id:13,nm:"Frederic Colman",av:"FC",fn:"",rl:"medewerker",at:[{n:"hydraulische kraan",v:"12/09/2016",s:"verlopen"},{n:"BA4",v:"13/06/2030",s:"ok"}]},
  {id:14,nm:"Billal Rajib",av:"BR",fn:"Zifter",rl:"medewerker",at:[{n:"Vrachtwagen",v:"28/01/2027",s:"ok"},{n:"Wiellader",v:"20/11/2030",s:"ok"},{n:"BA4",v:"14/01/2027",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:15,nm:"Franck connor",av:"FC",fn:"",rl:"medewerker",at:[{n:"BA4",v:"13/06/2030",s:"ok"}]},
  {id:16,nm:"Romario De Backer",av:"RD",fn:"Sterhoek",rl:"medewerker",at:[{n:"Bobcat",v:"09/07/2029",s:"ok"},{n:"Wiellader",v:"08/07/2029",s:"ok"},{n:"Overslagkraan",v:"08/09/2027",s:"ok"},{n:"Wieldumper",v:"08/07/2029",s:"ok"},{n:"doser",v:"09/07/2029",s:"ok"},{n:"hydraulische kraan",v:"08/07/2029",s:"ok"},{n:"EHBO",v:"01/05/2024",s:"verlopen"}]},
  {id:17,nm:"Petrus De Block",av:"PD",fn:"Onderhoudsmecanicien",rl:"medewerker",at:[{n:"Vorkheftruck",v:"25/01/2024",s:"verlopen"},{n:"BA4",v:"03/01/2029",s:"ok"}]},
  {id:18,nm:"Dany Smet",av:"DS",fn:"Onderhoudsmecanicien",rl:"medewerker",at:[{n:"Vorkheftruck",v:"23/01/2024",s:"verlopen"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:19,nm:"David Boeckling",av:"DB",fn:"Operator allround",rl:"medewerker",at:[{n:"Hoogtewerker",v:"16/01/2029",s:"ok"},{n:"Vorkheftruck",v:"16/01/2029",s:"ok"},{n:"Vrachtwagen",v:"16/01/2029",s:"ok"},{n:"Wiellader",v:"16/01/2029",s:"ok"},{n:"Wieldumper",v:"16/01/2029",s:"ok"},{n:"BA4",v:"14/01/2027",s:"ok"},{n:"BA5",v:"23/04/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:20,nm:"Kenny De Groot",av:"KD",fn:"Operator allround",rl:"medewerker",at:[{n:"Vrachtwagen",v:"20/08/2029",s:"ok"},{n:"Wieldumper",v:"20/08/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:21,nm:"Mario De Jonghe",av:"MD",fn:"Medewerker Groeve",rl:"medewerker",at:[{n:"Vorkheftruck",v:"14/12/2028",s:"ok"},{n:"Wiellader",v:"15/05/2029",s:"ok"},{n:"Overslagkraan",v:"14/12/2028",s:"ok"},{n:"Wieldumper",v:"15/05/2029",s:"ok"},{n:"hydraulische kraan",v:"08/07/2029",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:22,nm:"Guido De Keersmaeker",av:"GD",fn:"Medewerker belading",rl:"medewerker",at:[{n:"Hoogtewerker",v:"12/10/2028",s:"ok"},{n:"Vrachtwagen",v:"12/10/2028",s:"ok"},{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Wiellader",v:"04/01/2028",s:"ok"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"BA4",v:"13/06/2030",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"24/04/2024",s:"verlopen"}]},
  {id:23,nm:"Franky Vermeulen",av:"FV",fn:"Onderhoudsmecanicien",rl:"medewerker",at:[{n:"Hoogtewerker",v:"08/10/2028",s:"ok"},{n:"Vorkheftruck",v:"08/10/2028",s:"ok"},{n:"BA4",v:"09/05/2027",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"22/09/2024",s:"verlopen"}]},
  {id:24,nm:"Johny De Maeyer",av:"JD",fn:"Medewerker belading",rl:"medewerker",at:[{n:"Hoogtewerker",v:"03/09/2024",s:"verlopen"},{n:"Vrachtwagen",v:"03/09/2024",s:"verlopen"},{n:"Overslagkraan",v:"08/09/2027",s:"ok"}]},
  {id:25,nm:"Mario De Wilde",av:"MD",fn:"Medewerker belading",rl:"medewerker",at:[{n:"Hoogtewerker",v:"14/05/2029",s:"ok"},{n:"Vorkheftruck",v:"14/05/2029",s:"ok"},{n:"Vrachtwagen",v:"16/10/2028",s:"ok"},{n:"Wiellader",v:"16/10/2028",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"09/08/2024",s:"verlopen"}]},
  {id:26,nm:"Geert Cleys",av:"GC",fn:"Onderhoudsmecanicien",rl:"medewerker",at:[{n:"Hoogtewerker",v:"24/03/2030",s:"ok"},{n:"Vorkheftruck",v:"24/03/2030",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"BA5",v:"06/01/2031",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:27,nm:"Hamid Diba",av:"HD",fn:"Zifter",rl:"medewerker",at:[{n:"Vorkheftruck",v:"31/05/2029",s:"ok"},{n:"Vrachtwagen",v:"12/04/2028",s:"ok"},{n:"Wiellader",v:"26/04/2028",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"BA5",v:"06/01/2031",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:28,nm:"Jean-Pierre De Keersmaeker",av:"JD",fn:"Operator allround",rl:"medewerker",at:[{n:"Hoogtewerker",v:"14/05/2029",s:"ok"},{n:"Vorkheftruck",v:"09/01/2029",s:"ok"},{n:"Vrachtwagen",v:"11/09/2028",s:"ok"},{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Wiellader",v:"09/01/2029",s:"ok"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"BA4",v:"11/01/2027",s:"ok"},{n:"Toolbox Steenzaagmachine",v:"02/08/2021",s:"verlopen"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"24/04/2024",s:"verlopen"}]},
  {id:29,nm:"Johan Vercruyssen",av:"JV",fn:"Onderhoudsmecanicien",rl:"medewerker",at:[{n:"Hoogtewerker",v:"14/03/2029",s:"ok"},{n:"Roterende verreiker",v:"15/09/2030",s:"ok"},{n:"Vorkheftruck",v:"24/03/2030",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:30,nm:"Johnny Felix",av:"JF",fn:"Ploegbaas productie",rl:"leidinggevende",at:[{n:"Hoogtewerker",v:"16/01/2029",s:"ok"},{n:"Vorkheftruck",v:"16/01/2029",s:"ok"},{n:"Vrachtwagen",v:"16/01/2029",s:"ok"},{n:"Wiellader",v:"16/01/2029",s:"ok"},{n:"Wieldumper",v:"16/01/2029",s:"ok"},{n:"BA4",v:"14/01/2027",s:"ok"},{n:"BA5",v:"04/05/2027",s:"ok"},{n:"Toolbox Steenzaagmachine",v:"06/07/2021",s:"verlopen"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:31,nm:"Yousef Haij Assaf",av:"YH",fn:"Operator allround",rl:"medewerker",at:[{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Wiellader",v:"06/03/2020",s:"verlopen"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"BA4",v:"13/06/2030",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:32,nm:"Arthur Henkie",av:"AH",fn:"Sterhoek_allround",rl:"medewerker",at:[{n:"Overslagkraan",v:"08/09/2027",s:"ok"},{n:"Wieldumper",v:"14/03/2029",s:"ok"},{n:"Asbest-Eenvoudige handelingen",v:"09/09/2023",s:"verlopen"},{n:"EHBO",v:"01/03/2024",s:"verlopen"}]},
  {id:33,nm:"Glenn Hens",av:"GH",fn:"Sterhoek_allround",rl:"medewerker",at:[{n:"Bobcat",v:"09/07/2029",s:"ok"},{n:"Wiellader",v:"08/07/2029",s:"ok"},{n:"Overslagkraan",v:"08/09/2027",s:"ok"},{n:"Wieldumper",v:"08/07/2029",s:"ok"},{n:"doser",v:"09/07/2029",s:"ok"},{n:"hydraulische kraan",v:"08/07/2029",s:"ok"},{n:"Asbest-Eenvoudige handelingen",v:"09/09/2023",s:"verlopen"}]},
  {id:34,nm:"Kenny Hens",av:"KH",fn:"Operator allround",rl:"medewerker",at:[{n:"Vorkheftruck",v:"25/01/2029",s:"ok"},{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Wiellader",v:"25/01/2029",s:"ok"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"BA4",v:"14/01/2027",s:"ok"},{n:"BA5",v:"04/05/2027",s:"ok"},{n:"Toolbox Steenzaagmachine",v:"18/05/2022",s:"verlopen"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:35,nm:"Jurgen De Grave",av:"JD",fn:"Onderhoudselectricien",rl:"medewerker",at:[{n:"Hoogtewerker",v:"13/09/2028",s:"ok"},{n:"Vorkheftruck",v:"13/09/2028",s:"ok"},{n:"BA4",v:"09/05/2027",s:"ok"},{n:"BA5",v:"14/06/2027",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"07/04/2024",s:"verlopen"}]},
  {id:36,nm:"Irmgart Hooftman",av:"IH",fn:"Expeditie",rl:"medewerker",at:[{n:"EHBO",v:"24/04/2024",s:"verlopen"}]},
  {id:37,nm:"Kjel Ivens",av:"KI",fn:"Onderhoudsmecanicien",rl:"medewerker",at:[{n:"Hoogtewerker",v:"25/01/2024",s:"verlopen"},{n:"Vorkheftruck",v:"25/01/2024",s:"verlopen"},{n:"BA4",v:"09/05/2027",s:"ok"}]},
  {id:38,nm:"Abdelouahhab Jerroudi",av:"AJ",fn:"Medewerker Groeve",rl:"medewerker",at:[{n:"Hoogtewerker",v:"15/05/2029",s:"ok"},{n:"Vorkheftruck",v:"20/09/2029",s:"ok"},{n:"Wiellader",v:"15/05/2029",s:"ok"},{n:"Wieldumper",v:"15/05/2029",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:39,nm:"Mehdi Jerroudi",av:"MJ",fn:"Medewerker Groeve",rl:"medewerker",at:[{n:"Vorkheftruck",v:"20/09/2029",s:"ok"},{n:"Bobcat",v:"28/03/2029",s:"ok"},{n:"Wiellader",v:"15/05/2029",s:"ok"},{n:"Wieldumper",v:"15/05/2029",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:40,nm:"Tom Marcelis",av:"TM",fn:"Medewerker rollend materieel",rl:"medewerker",at:[{n:"Hoogtewerker",v:"11/12/2028",s:"ok"},{n:"Vorkheftruck",v:"11/12/2028",s:"ok"},{n:"Vrachtwagen",v:"11/12/2028",s:"ok"},{n:"Bobcat",v:"11/12/2028",s:"ok"},{n:"Wiellader",v:"11/12/2028",s:"ok"},{n:"Overslagkraan",v:"08/09/2027",s:"ok"},{n:"Wieldumper",v:"11/12/2028",s:"ok"},{n:"BA4",v:"09/05/2027",s:"ok"},{n:"BA5",v:"12/08/2027",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:41,nm:"Kawar Musa Ali",av:"KM",fn:"Operator allround",rl:"medewerker",at:[{n:"Vorkheftruck",v:"17/01/2029",s:"ok"},{n:"Wiellader",v:"17/01/2029",s:"ok"},{n:"BA4",v:"09/05/2027",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:42,nm:"Stefan Onghena",av:"SO",fn:"Medewerker Belading",rl:"medewerker",at:[{n:"Wieldumper",v:"18/03/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:43,nm:"Kayne Capon",av:"KC",fn:"Zifter",rl:"medewerker",at:[{n:"Vrachtwagen",v:"18/08/2028",s:"ok"},{n:"Wiellader",v:"07/11/2028",s:"ok"},{n:"Wieldumper",v:"07/11/2028",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:44,nm:"Jarno Paternoster",av:"JP",fn:"Opzak",rl:"medewerker",at:[{n:"Vorkheftruck",v:"23/02/2028",s:"ok"},{n:"Wiellader",v:"23/02/2028",s:"ok"},{n:"Wieldumper",v:"18/03/2029",s:"ok"}]},
  {id:45,nm:"Kenny Vercauteren",av:"KV",fn:"Ploegbaas productie",rl:"leidinggevende",at:[{n:"Vorkheftruck",v:"25/01/2029",s:"ok"},{n:"Vrachtwagen",v:"25/01/2029",s:"ok"},{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Wiellader",v:"25/01/2029",s:"ok"},{n:"Overslagkraan",v:"23/01/2029",s:"ok"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"BA4",v:"14/01/2027",s:"ok"},{n:"BA5",v:"23/04/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"01/06/2024",s:"verlopen"}]},
  {id:46,nm:"Mario Pelgrims",av:"MP",fn:"Sterhoek",rl:"medewerker",at:[{n:"Bobcat",v:"09/07/2029",s:"ok"},{n:"Wiellader",v:"08/07/2029",s:"ok"},{n:"Wieldumper",v:"08/07/2029",s:"ok"},{n:"doser",v:"09/07/2029",s:"ok"},{n:"hydraulische kraan",v:"08/07/2029",s:"ok"}]},
  {id:47,nm:"Johan Praet",av:"JP",fn:"Sterhoek",rl:"medewerker",at:[{n:"Bobcat",v:"09/07/2029",s:"ok"},{n:"Wiellader",v:"08/07/2029",s:"ok"},{n:"Wieldumper",v:"08/07/2029",s:"ok"},{n:"doser",v:"09/07/2029",s:"ok"},{n:"hydraulische kraan",v:"08/07/2029",s:"ok"},{n:"EHBO",v:"01/05/2024",s:"verlopen"}]},
  {id:48,nm:"Khalil Shekri",av:"KS",fn:"Operator allround",rl:"medewerker",at:[{n:"Wiellader",v:"03/07/2029",s:"ok"},{n:"BA4",v:"12/06/2030",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:49,nm:"Gert Rotthier",av:"GR",fn:"Verantwoordelijke rollend materieel",rl:"medewerker",at:[{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"07/04/2024",s:"verlopen"}]},
  {id:50,nm:"Boris Saman",av:"BS",fn:"Medewerker Labo",rl:"medewerker",at:[{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:51,nm:"Joost Schillemans",av:"JS",fn:"Sterhoek",rl:"medewerker",at:[{n:"Bobcat",v:"09/07/2029",s:"ok"},{n:"Wiellader",v:"08/07/2029",s:"ok"},{n:"Wieldumper",v:"08/07/2029",s:"ok"},{n:"doser",v:"09/07/2029",s:"ok"},{n:"hydraulische kraan",v:"08/07/2029",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"}]},
  {id:52,nm:"Martine Schols",av:"MS",fn:"Medewerker cleaning",rl:"medewerker",at:[{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:53,nm:"Guy Seghers",av:"GS",fn:"Operator allround",rl:"medewerker",at:[{n:"Vorkheftruck",v:"24/01/2029",s:"ok"},{n:"Vrachtwagen",v:"24/01/2029",s:"ok"},{n:"Wiellader",v:"24/01/2029",s:"ok"},{n:"Wieldumper",v:"24/01/2029",s:"ok"},{n:"BA4",v:"11/01/2027",s:"ok"},{n:"Toolbox Steenzaagmachine",v:"02/08/2021",s:"verlopen"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:54,nm:"Kovan Tondeleir",av:"KT",fn:"Ploegbaas productie",rl:"leidinggevende",at:[{n:"Hoogtewerker",v:"16/01/2029",s:"ok"},{n:"Vorkheftruck",v:"16/01/2029",s:"ok"},{n:"Vrachtwagen",v:"16/01/2029",s:"ok"},{n:"Wiellader",v:"16/01/2029",s:"ok"},{n:"Wieldumper",v:"16/01/2029",s:"ok"},{n:"BA4",v:"14/01/2027",s:"ok"},{n:"BA5",v:"14/06/2027",s:"ok"},{n:"Toolbox Steenzaagmachine",v:"04/08/2021",s:"verlopen"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"27/10/2024",s:"verlopen"}]},
  {id:55,nm:"Kristof Desmedt",av:"KD",fn:"Onderhoudselectricien",rl:"medewerker",at:[{n:"Hoogtewerker",v:"24/01/2030",s:"ok"},{n:"Vorkheftruck",v:"24/01/2030",s:"ok"},{n:"BA5",v:"06/01/2031",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:56,nm:"Jonathan Smeets",av:"JS",fn:"Medewerker belading",rl:"medewerker",at:[{n:"Vorkheftruck",v:"12/10/2028",s:"ok"},{n:"Vrachtwagen",v:"12/10/2028",s:"ok"},{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Wiellader",v:"12/10/2028",s:"ok"},{n:"Overslagkraan",v:"08/09/2027",s:"ok"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:57,nm:"Luis Gonzalez",av:"LG",fn:"Onderhoudsmecanicien",rl:"medewerker",at:[{n:"Hoogtewerker",v:"19/06/2025",s:"verlopen"},{n:"Vorkheftruck",v:"06/07/2025",s:"verlopen"}]},
  {id:58,nm:"Lucien Smet",av:"LS",fn:"Medewerker belading",rl:"medewerker",at:[{n:"Hoogtewerker",v:"16/12/2028",s:"ok"},{n:"Vorkheftruck",v:"16/12/2028",s:"ok"},{n:"Vrachtwagen",v:"16/12/2028",s:"ok"},{n:"Wiellader",v:"16/12/2028",s:"ok"},{n:"Overslagkraan",v:"08/09/2027",s:"ok"},{n:"Toolbox Steenzaagmachine",v:"18/05/2022",s:"verlopen"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"07/04/2024",s:"verlopen"}]},
  {id:59,nm:"Yves Spillemaeckers",av:"YS",fn:"Fieldcoach groeve",rl:"leidinggevende",at:[{n:"Vorkheftruck",v:"14/12/2028",s:"ok"},{n:"Bobcat",v:"09/07/2029",s:"ok"},{n:"Wiellader",v:"08/07/2029",s:"ok"},{n:"Overslagkraan",v:"14/12/2028",s:"ok"},{n:"Wieldumper",v:"08/07/2029",s:"ok"},{n:"doser",v:"09/07/2029",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"Asbest-Eenvoudige handelingen",v:"09/09/2023",s:"verlopen"}]},
  {id:60,nm:"Kasper Tassent",av:"KT",fn:"Medewerker Labo",rl:"medewerker",at:[{n:"Vorkheftruck",v:"22/05/2025",s:"verlopen"}]},
  {id:61,nm:"Malakzai Ziaullah",av:"MZ",fn:"Operator allround",rl:"medewerker",at:[{n:"Vorkheftruck",v:"20/09/2029",s:"ok"},{n:"Vrachtwagen",v:"04/02/2030",s:"ok"},{n:"Wiellader",v:"13/09/2029",s:"ok"},{n:"Wieldumper",v:"04/02/2030",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:62,nm:"Maneebut Thanechot",av:"MT",fn:"Operator allround",rl:"medewerker",at:[{n:"Wiellader",v:"02/04/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:63,nm:"Mohamed Fattah",av:"MF",fn:"Operator allround",rl:"medewerker",at:[{n:"Vorkheftruck",v:"10/01/2029",s:"ok"},{n:"Wiellader",v:"10/01/2029",s:"ok"},{n:"BA4",v:"11/01/2027",s:"ok"},{n:"BA5",v:"06/01/2031",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:64,nm:"Zahir Topcu",av:"ZT",fn:"Operator allround",rl:"medewerker",at:[{n:"Wiellader",v:"20/03/2028",s:"ok"}]},
  {id:65,nm:"Sandra Van Grootel",av:"SV",fn:"Adm. Bediende Sterhoek",rl:"medewerker",at:[{n:"EHBO",v:"01/05/2024",s:"verlopen"}]},
  {id:66,nm:"Nicholas Hermans",av:"NH",fn:"Operator allround",rl:"medewerker",at:[{n:"Vorkheftruck",v:"09/01/2029",s:"ok"},{n:"Wiellader",v:"09/01/2029",s:"ok"},{n:"BA4",v:"11/01/2027",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:67,nm:"Nickolay Brodelet",av:"NB",fn:"Operator allround",rl:"medewerker",at:[{n:"Vorkheftruck",v:"09/01/2029",s:"ok"},{n:"Vrachtwagen",v:"18/01/2029",s:"ok"},{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Wiellader",v:"09/01/2029",s:"ok"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"BA4",v:"11/01/2027",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"24/04/2024",s:"verlopen"}]},
  {id:68,nm:"Filip Van Landeghem",av:"FV",fn:"Medewerker Groeve",rl:"medewerker",at:[{n:"Hoogtewerker",v:"15/05/2029",s:"ok"},{n:"Vorkheftruck",v:"25/01/2024",s:"verlopen"},{n:"Wiellader",v:"15/05/2029",s:"ok"},{n:"Wieldumper",v:"15/05/2029",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:69,nm:"Jasper Van der Meiren",av:"JV",fn:"",rl:"medewerker",at:[{n:"Roterende verreiker",v:"15/09/2030",s:"ok"}]},
  {id:70,nm:"Pascal Van Roeyen",av:"PV",fn:"Operator allround",rl:"medewerker",at:[{n:"Roterende verreiker",v:"15/09/2030",s:"ok"},{n:"Vorkheftruck",v:"10/01/2029",s:"ok"},{n:"Vrachtwagen",v:"12/10/2028",s:"ok"},{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Wiellader",v:"10/01/2029",s:"ok"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"BA4",v:"11/01/2027",s:"ok"},{n:"BA5",v:"23/04/2029",s:"ok"},{n:"Toolbox Steenzaagmachine",v:"07/07/2021",s:"verlopen"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:71,nm:"Alain Van Raemdonck",av:"AV",fn:"Medewerker belading",rl:"medewerker",at:[{n:"Vorkheftruck",v:"15/10/2028",s:"ok"},{n:"Vrachtwagen",v:"15/10/2028",s:"ok"},{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Overslagkraan",v:"08/09/2027",s:"ok"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:72,nm:"Kurt Van Raemdonck",av:"KV",fn:"Sterhoek_allround",rl:"medewerker",at:[{n:"Wieldumper",v:"14/03/2029",s:"ok"},{n:"Asbest-Eenvoudige handelingen",v:"09/09/2023",s:"verlopen"}]},
  {id:73,nm:"Peter Van Raemdonck",av:"PV",fn:"Sterhoek",rl:"medewerker",at:[{n:"Wiellader",v:"08/07/2029",s:"ok"},{n:"Wieldumper",v:"08/07/2029",s:"ok"},{n:"hydraulische kraan",v:"08/07/2029",s:"ok"},{n:"Asbest-Eenvoudige handelingen",v:"09/09/2023",s:"verlopen"},{n:"EHBO",v:"01/05/2024",s:"verlopen"}]},
  {id:74,nm:"Hans Vanuytsel",av:"HV",fn:"Sterhoek_allround",rl:"medewerker",at:[{n:"Hoogtewerker",v:"28/01/2024",s:"verlopen"},{n:"Vorkheftruck",v:"28/01/2024",s:"verlopen"},{n:"Bobcat",v:"09/07/2029",s:"ok"},{n:"Wiellader",v:"08/07/2029",s:"ok"},{n:"Overslagkraan",v:"08/09/2027",s:"ok"},{n:"Wieldumper",v:"08/07/2029",s:"ok"},{n:"doser",v:"09/07/2029",s:"ok"},{n:"hydraulische kraan",v:"08/07/2029",s:"ok"},{n:"Asbest-Eenvoudige handelingen",v:"09/09/2023",s:"verlopen"}]},
  {id:75,nm:"Senne Penneman",av:"SP",fn:"Onderhoudsmecanicien",rl:"medewerker",at:[{n:"Hoogtewerker",v:"19/02/2031",s:"ok"},{n:"Vorkheftruck",v:"03/12/2025",s:"verlopen"}]},
  {id:76,nm:"Sonny Pagnon",av:"SP",fn:"Operator allround",rl:"medewerker",at:[{n:"Vorkheftruck",v:"10/01/2029",s:"ok"},{n:"Vrachtwagen",v:"12/10/2028",s:"ok"},{n:"Wiellader",v:"10/01/2029",s:"ok"},{n:"BA4",v:"11/01/2027",s:"ok"},{n:"BA5",v:"06/01/2031",s:"ok"},{n:"Toolbox Steenzaagmachine",v:"18/10/2022",s:"verlopen"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:77,nm:"Stef Paternoster",av:"SP",fn:"Opzak",rl:"medewerker",at:[{n:"Hoogtewerker",v:"19/02/2031",s:"ok"},{n:"Roterende verreiker",v:"15/09/2030",s:"ok"},{n:"Vorkheftruck",v:"05/10/2027",s:"ok"},{n:"Vrachtwagen",v:"22/04/2030",s:"ok"},{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Wiellader",v:"18/10/2027",s:"ok"},{n:"Overslagkraan",v:"20/01/2031",s:"ok"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"01/06/2024",s:"verlopen"}]},
  {id:78,nm:"Steven Van Kersschaver",av:"SV",fn:"Verantwoordelijke onderhoud",rl:"medewerker",at:[{n:"BA4",v:"09/05/2027",s:"ok"},{n:"BA5",v:"14/06/2027",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"22/09/2024",s:"verlopen"}]},
  {id:79,nm:"Pauwel Vergauwen",av:"PV",fn:"Ploegbaas Belading",rl:"leidinggevende",at:[{n:"Vorkheftruck",v:"25/01/2029",s:"ok"},{n:"Vrachtwagen",v:"25/01/2029",s:"ok"},{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Wiellader",v:"25/01/2029",s:"ok"},{n:"Overslagkraan",v:"23/01/2029",s:"ok"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:80,nm:"Tom Vercauteren",av:"TV",fn:"Onderhoudselectricien",rl:"medewerker",at:[{n:"Hoogtewerker",v:"29/03/2028",s:"ok"},{n:"Roterende verreiker",v:"15/09/2030",s:"ok"},{n:"Vorkheftruck",v:"29/03/2028",s:"ok"},{n:"BA4",v:"09/05/2027",s:"ok"},{n:"BA5",v:"12/08/2027",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:81,nm:"Dries Vernimmen",av:"DV",fn:"Project Ingenieur Sterhoek",rl:"medewerker",at:[{n:"Asbest-Eenvoudige handelingen",v:"09/09/2023",s:"verlopen"},{n:"EHBO",v:"07/04/2024",s:"verlopen"}]},
  {id:82,nm:"Nele Vervynckt",av:"NV",fn:"Verantwoordelijke Labo",rl:"medewerker",at:[{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"EHBO",v:"24/04/2024",s:"verlopen"}]},
  {id:83,nm:"Tony Van Heue",av:"TV",fn:"Zifter",rl:"medewerker",at:[{n:"Vorkheftruck",v:"24/01/2029",s:"ok"},{n:"Vrachtwagen",v:"24/01/2029",s:"ok"},{n:"Bobcat",v:"04/01/2028",s:"ok"},{n:"Wiellader",v:"24/01/2029",s:"ok"},{n:"Wieldumper",v:"04/01/2028",s:"ok"},{n:"BA4",v:"09/05/2027",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:84,nm:"Wesley De Cock",av:"WD",fn:"Onderhoudsmecanicien",rl:"medewerker",at:[{n:"Hoogtewerker",v:"23/05/2028",s:"ok"},{n:"Vorkheftruck",v:"07/11/2027",s:"ok"},{n:"BA4",v:"03/01/2029",s:"ok"},{n:"BA5",v:"06/01/2031",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"},{n:"VCA",v:"24/02/2025",s:"verlopen"}]},
  {id:85,nm:"Zirivan Shukri",av:"ZS",fn:"Operator allround",rl:"medewerker",at:[{n:"Vorkheftruck",v:"17/01/2029",s:"ok"},{n:"Wiellader",v:"17/01/2029",s:"ok"},{n:"BA4",v:"14/01/2027",s:"ok"},{n:"toolbox Interne transportmiddelen",v:"02/02/2030",s:"ok"}]},
  {id:86,nm:"Legende",av:"L",fn:"Vrij dringend opleiding inplannen",rl:"medewerker",at:[]},
  {id:87,nm:"Opleidingen inplannen: Op 02/01/2024 zal ik via het sectorfonds een opleiding BA4 inplannen voor diegene die dit nog niet hebben.",av:"OI",fn:"",rl:"medewerker",at:[]},
  {id:88,nm:"David, Pascal, Abdel en Kenny Vercauteren Mentoropleiding:",av:"DP",fn:"1 en 28/09, telkens vanaf 8u op het hoofdkantoor",rl:"medewerker",at:[]},
  {id:89,nm:"Die van eenvoudige asbesthandelingen staat ingepland op donderdag 04/01/2024",av:"DV",fn:"",rl:"medewerker",at:[]},
  {id:90,nm:"logistieke opleidingen starten op 21/08 en de laatste dag is 13/10.",av:"LO",fn:"",rl:"medewerker",at:[]},
  {id:91,nm:"EHBO: maart 2024 gaat iedereen nog een opfrissingscursus krijgen, zodat iedereen dezelfde geldigheidsdatum heeft.",av:"EM",fn:"",rl:"medewerker",at:[]},
  {id:92,nm:"In elke ploeg moet een nijverheidshelper zitten - dit moet nog bekeken worden.",av:"IE",fn:"",rl:"medewerker",at:[]}
];

// ─── EHBO-HULPVERLENERS (F-NP-011, v1, 17/03/2025) ──────────────────────────
const EHBO = [
  {nm:"Abdel-hak Charai",    zone:"Productie",         tel:"",av:"AC"},
  {nm:"Abid Bouzambou",      zone:"Productie",         tel:"",av:"AB"},
  {nm:"Dominique Audin",     zone:"Productie",         tel:"",av:"DA"},
  {nm:"Jean-Pierre De Keersmaeker", zone:"Productie",  tel:"",av:"JK"},
  {nm:"Kenny Vercauteren",   zone:"Productie",         tel:"",av:"KV"},
  {nm:"Kovan Tondeleir",     zone:"Productie",         tel:"",av:"KT"},
  {nm:"Guido De Keersmaeker",zone:"Zeefgebouw",        tel:"",av:"GK"},
  {nm:"Lucien Smet",         zone:"Zeefgebouw",        tel:"",av:"LS"},
  {nm:"Mario De Wilde",      zone:"Zeefgebouw",        tel:"",av:"MW"},
  {nm:"Nickolay Brodelet",   zone:"Zeefgebouw",        tel:"",av:"NB"},
  {nm:"Bert Verbraecken",    zone:"Hoofdbureau",       tel:"",av:"BV"},
  {nm:"Dries Vernimmen",     zone:"Hoofdbureau",       tel:"",av:"DV"},
  {nm:"Gert Rotthier",       zone:"Hoofdbureau",       tel:"03/614.37.30",av:"GR"},
  {nm:"Irmgart Hooftman",    zone:"Hoofdbureau",       tel:"",av:"IH"},
  {nm:"Franky Vermeulen",    zone:"Atelier/Onderhoud", tel:"",av:"FV"},
  {nm:"Jurgen De Grave",     zone:"Atelier/Onderhoud", tel:"",av:"JG"},
  {nm:"Nele Vervynckt",      zone:"Labo",              tel:"",av:"NV"},
  {nm:"Stef Paternoster",    zone:"Opzak/Magazijn",    tel:"",av:"SP"},
];

// ─── VERTROUWENSPERSONEN ─────────────────────────────────────────────────────
const VP = [
  {nm:"Gert Rotthier",      org:"Argex",           tel:"03/614.37.30", email:"gert.rotthier@argex.be",         av:"GR"},
  {nm:"Jort Melis",         org:"HYE",             tel:"03/250.13.95", email:"jort.melis@hye.be",               av:"JM"},
  {nm:"Liesbeth De Vylder", org:"Navitec",         tel:"03/614.37.48", email:"liesbeth@navitec.be",             av:"LD"},
  {nm:"Marc Van Laeken",    org:"Pylonen De Kerf", tel:"03/614.37.83", email:"marc.vanlaeken@pylonendekerf.be", av:"ML"},
  {nm:"Nikki Vande Voorde", org:"HYE",             tel:"03/614.38.90", email:"nikki.vandevoorde@hye.be",        av:"NV"},
  {nm:"Liantis (extern)",   org:"Liantis",         tel:"078 150 200",  email:"psy@liantis.be",                  av:"LI"},
];

// ─── NOODSCENARIO'S ──────────────────────────────────────────────────────────
const NS = [
  {id:"brand_dag", ico:"🔥", lbl:"Brand (kantooruren)", kleur:"#C0392B", bg:"#FFF0EE", stappen:[
    {nr:1,ico:"📞",tit:"Meld aan meldpunt",       txt:"Bel 03/250.15.15 (receptie) of druk brandmeldknop in. Verwittig ook receptie na indrukken knop."},
    {nr:2,ico:"👥",tit:"Kernfuncties verwittigen",txt:"Receptie activeert signaal. Interventieploeg, EHBO en evacuatieverantwoordelijken worden verwittigd."},
    {nr:3,ico:"🧯",tit:"Eerste bluspoging",       txt:"Interventieploeg probeert brand te doven — enkel indien veilig, altijd met min. 2 personen."},
    {nr:4,ico:"🚒",tit:"Bel 112",                 txt:"Brandweer + politie + ambulance. Aangeduide persoon wacht op aan poort met interventiedossier."},
    {nr:5,ico:"🚪",tit:"Evacueer",                txt:"Via aangeduide routes. Sluit ramen/deuren. Evacueer haaks op de windrichting. Lift VERBODEN."},
    {nr:6,ico:"📍",tit:"Verzamelplaats",          txt:"Parking bedienden (overzijde straat). Evacuatieverantwoordelijken controleren lokalen, rapporteren afwezigen."},
    {nr:7,ico:"🚫",tit:"Niet terugkeren",         txt:"Enkel na veiligverklaring hulpdiensten + goedkeuring directie. Alle werkvergunningen opnieuw uitgeven."},
  ]},
  {id:"brand_nacht", ico:"🌙", lbl:"Brand (na kantooruren)", kleur:"#922B21", bg:"#FDEDEC", stappen:[
    {nr:1,ico:"📞",tit:"Meld aan ploegbaas",      txt:"Bel ploegbaas: 0473/77.99.86. Die verwittigt plantmanager en activeert noodplan."},
    {nr:2,ico:"🚒",tit:"Bel 112",                 txt:"Direct 112 bellen bij brand. Niet wachten op interne bevestiging."},
    {nr:3,ico:"🧯",tit:"Eerste bluspoging",       txt:"Interventieploeg — enkel indien veilig, altijd met 2 personen. Nooit alleen."},
    {nr:4,ico:"📍",tit:"Evacueer en verzamel",    txt:"Verzamelplaats: parking bedienden. Afchecken aan- en afwezigen. Contact met plantmanager."},
    {nr:5,ico:"🚫",tit:"Niet terugkeren",         txt:"Enkel na brandweerverklaring + goedkeuring crisiscentrum."},
  ]},
  {id:"arbeidsongeval", ico:"🚑", lbl:"Ernstig arbeidsongeval", kleur:"#C0392B", bg:"#FFF0EE", stappen:[
    {nr:1,ico:"🔒",tit:"Beveilig de omgeving",    txt:"Zone veiligstellen. Installaties stilleggen. Geen extra slachtoffers."},
    {nr:2,ico:"🩺",tit:"Eerste hulp",             txt:"EHBO'er ter plaatse. Slachtoffer NIET bewegen. EHBO-post in onderhoudsloods."},
    {nr:3,ico:"📞",tit:"Bel 112 + intern",        txt:"Bij ernstig letsel: 112 (MUG). Intern: 03/250.15.15. Naam, locatie, toestand doorgeven."},
    {nr:4,ico:"📢",tit:"Verwittig leidinggevende",txt:"Ploegbaas + plantmanager + preventieadviseur. CMT wordt samengeroepen."},
    {nr:5,ico:"🔍",tit:"Bewaar situatie",         txt:"NIETS verplaatsen tot TWW-onderzoek klaar is."},
    {nr:6,ico:"📋",tit:"Registreer",              txt:"Aangifte verzekeraar + TWW + EDPB. Registreer in EHBO-logboek."},
  ]},
  {id:"diesellek", ico:"🛢", lbl:"Diesellek", kleur:"#784212", bg:"#FEF9E7", stappen:[
    {nr:1,ico:"📞",tit:"Meld onmiddellijk",       txt:"Bel 03/250.15.15 (kantooruren) of ploegbaas buiten kantooruren."},
    {nr:2,ico:"🚫",tit:"Geen vonken",             txt:"Diesel is brandbaar. Geen elektriciteit in/uitschakelen. Geen open vuur."},
    {nr:3,ico:"🧹",tit:"Begrens het lek",         txt:"Absorptieworsten (socks) als barrière. Absorberende doeken op het lek. Spill-kit aanwezig op site."},
    {nr:4,ico:"🌊",tit:"Voorkom milieupollutie", txt:"Diesel mag niet in riool/bodem. Bij groot lek: riolering afsluiten met ballonafsluiters."},
    {nr:5,ico:"📋",tit:"Opruiming & nazorg",     txt:"Milieucoördinator registreert. Spill-kit aanvullen. Rapport aan brandweer + inspectie + IDPBW."},
  ]},
  {id:"gaslek", ico:"💨", lbl:"Gasgeur / Gaslek", kleur:"#1A5276", bg:"#EBF5FB", stappen:[
    {nr:1,ico:"🚫",tit:"Stop alles",             txt:"Alle machines uit. GEEN elektrische schakelaars aanraken. Gaslekken zijn explosief."},
    {nr:2,ico:"🫁",tit:"Verlaat de zone",        txt:"Zone onmiddellijk verlaten. Mond/neus bedekken. Haaks op windrichting evacueren."},
    {nr:3,ico:"📞",tit:"Meld en alarmeer",       txt:"Bel 03/250.15.15 of 0497/51.50.95. Plant Manager verwittigt directie + hulpdiensten."},
    {nr:4,ico:"🌬️",tit:"Ventileer na vrijgave", txt:"Na veiligverklaring: ventilatie aanzetten. Zone pas herbetreden na meting IDPBW."},
  ]},
  {id:"stof_atex", ico:"🌫️", lbl:"Stofwolk / ATEX", kleur:"#78909C", bg:"#ECEFF1", stappen:[
    {nr:1,ico:"🚫",tit:"Stop alle activiteiten",txt:"Alle machines uit. Elektriciteit uit. Stofwolken zijn explosief (ATEX)."},
    {nr:2,ico:"🫁",tit:"Verlaat de zone",       txt:"Stofwolk verlaten. Mond/neus bedekken. Haaks op windrichting."},
    {nr:3,ico:"📵",tit:"Geen vonken",           txt:"Stofwolken zijn explosief. Geen schakelaars. Geen GSM in de zone."},
    {nr:4,ico:"📞",tit:"Bel 112 en intern",     txt:"Hulpdiensten via 112. Intern: 03/250.15.15 of 0497/51.50.95."},
  ]},
  {id:"straling", ico:"☢️", lbl:"Ioniserende straling", kleur:"#6C3483", bg:"#F5EEF8", stappen:[
    {nr:1,ico:"🚫",tit:"Niet aanraken",         txt:"Geen contact met bron. Blijf op min. 1m. Kettingafbakening NIET verplaatsen."},
    {nr:2,ico:"📏",tit:"Bakenen zone af",       txt:"Zone 20m afbakenen (ketting, lint, kegels). Toegang verbieden."},
    {nr:3,ico:"📞",tit:"Bel IDFC",             txt:"Johny Bultheel (hoofd IDFC) · Nele Vervynckt · Bert Verbraecken. AV Controlatom: 02/674.51.20."},
    {nr:4,ico:"🏛",tit:"Verwittig FANC",       txt:"Bij risico boven wettelijke limieten: IDFC meldt aan FANC (02/289.21.11)."},
    {nr:5,ico:"👷",tit:"Enkel opgeleid personeel",txt:"IDFC meet stralingsniveaus. Zone pas vrij na meting en vrijgave door IDFC."},
  ]},
  {id:"noodweer", ico:"⛈️", lbl:"Noodweer", kleur:"#1F618D", bg:"#EBF5FB", stappen:[
    {nr:1,ico:"📡",tit:"Volg weersalarmen",     txt:"Via KMI. Receptie/ploegbaas meldt aan Plant Manager en IDPBW."},
    {nr:2,ico:"🏠",tit:"Preventieve maatregelen",txt:"Storm: ramen/deuren sluiten, binnen blijven. Gladheid: strooiplan. Wateroverlast: zandzakken."},
    {nr:3,ico:"🚗",tit:"Transport beperken",   txt:"Intern transport tijdelijk stilleggen. Snelheidsbeperkingen. Trager rijden verplichten."},
    {nr:4,ico:"✅",tit:"Heropstart",           txt:"Terrein en gebouwen pas herbetreden na controle en vrijgave IDPBW."},
  ]},
  {id:"milieu", ico:"🌿", lbl:"Milieuincident", kleur:"#1E8449", bg:"#EAFAF1", stappen:[
    {nr:1,ico:"📞",tit:"Meld onmiddellijk",     txt:"Bel Plant Manager + ploegbaas/preventieadviseur. Via receptie of meldkamer."},
    {nr:2,ico:"🧹",tit:"Begrens het lek",       txt:"Absorptieworsten plaatsen. Vloeistof mag niet in riool/bodem."},
    {nr:3,ico:"🌊",tit:"Bij groot lek",        txt:"Riolering afsluiten met ballonafsluiters. Interventieteam. Omgevingsinspectie verwittigen."},
    {nr:4,ico:"📋",tit:"Registreer",           txt:"Milieucoördinator registreert. Corrigerende maatregelen. Evaluatie CPBW-vergadering."},
  ]},
  {id:"bom", ico:"⚠️", lbl:"Bommelding / Terreur", kleur:"#212121", bg:"#FAFAFA", stappen:[
    {nr:1,ico:"📞",tit:"Hou melder aan de praat",txt:"Max. info verzamelen: locatie, tijdstip, manier. Noteer tijdstip + kernwoorden."},
    {nr:2,ico:"📝",tit:"Noteer alle info",      txt:"Schrijf zichtbaar telefoonnummer op. Stem, accent, achtergrondgeluiden, geslacht."},
    {nr:3,ico:"📢",tit:"Meld aan Operations Manager",txt:"Onmiddellijk aan Operations Manager + Managing Director. CMT samengeroepen."},
    {nr:4,ico:"🚔",tit:"Verwittig politie",     txt:"CMT verwittigt altijd minimaal de politie. Zij beslissen over verdere acties."},
    {nr:5,ico:"🚪",tit:"Evacueer indien beslist",txt:"CMT beslist over activatie alarm. Bij verdacht pakket: NIET aanraken."},
  ]},
];

// ─── CPBW VERSLAGEN ──────────────────────────────────────────────────────────
const CPBW = [
  {id:1, datum:"12 februari 2026", titel:"CPBW vergadering — 12/02/2026", aanwezig:"J. Bultheel, N. Snoeck (HR), G. Eggermont, W. Bolsens (OH) · Werknemers: P. Van Roeyen, N. Brodelet, J. De Graeve, J. Boonen, S. De Maeyer · PA: B. Verbraecken",
   punten:[
    "Goedkeuring verslag vorige vergadering",
    "GPP en JAP 2026 — herziening na overname door Heidelberg",
    "Maandverslagen IDPBW: veiligheidsverslagen, sitebezoeken, CE-audit, Kiwa-audit, opleiding kraan",
    "Veiligheidsincidenten januari: kraan sociaal gebouw (29/01 — stempels niet gebruikt), weggeroeste schuif Dano (03/02), trap losgereden (05/02), arbeidsongeval knie/schouder Dano (07/02 — werkverlet)",
    "Statistieken 2026: frequentiegraad 0, ernstgraad 0 (doelstelling fg 28,5 / eg 0,4)",
    "Uitgevoerde acties jan: hoogspanning (03/02), densiteitsmeting (21/01), metaaldetector over band 41 (20/01)",
    "Geplande acties feb: kleivoorbereiding (stekers), oveninstallatie (trap herstellen), koolinstallatie (aardingshaspels houtstof)",
    "Toolbox januari: veilig werken met perslucht en hydraulische leidingen — 5 anderstaligen extra begeleid",
    "STAVAZA verhuis atelier: risicoanalyse opgesteld, offertes aangevraagd (dak, trap, bureaus, poort, sanitair)",
    "Aangepast werk na arbeidsongeval: procedure besproken — enkel na medische beoordeling, niet opgelegd",
    "Plafond kelders Dano: inspectie gepland na betonincident",
  ]},
  {id:2, datum:"22 januari 2026", titel:"CPBW vergadering — 22/01/2026", aanwezig:"J. Bultheel, N. Snoeck (HR), G. Eggermont · Werknemers: P. Van Roeyen, N. Brodelet, J. De Graeve · PA: B. Verbraecken (W. Bolsens verontschuldigd)",
   punten:[
    "Goedkeuring verslag vorige vergadering",
    "GPP en JAP 2026 — herziening door overname Heidelberg",
    "Maandverslagen IDPBW: onthaal nieuwe medewerkers, veiligheidsoverleg, interne audit, JAP-GPP, verkeersplan",
    "Veiligheidsincidenten: Dano trap (20/11 — trapleuning geplaatst), Kade kraanbak 2 bouten losgedraaid (15/12)",
    "Statistieken 2025: frequentiegraad 22,57, ernstgraad 0,34, 30 verloren kalenderdagen",
    "Uitgevoerde acties (groot): keertrommel afscherming 22,5u, bordes D.O. 27u, hijsmateriaal keuring 40u (223u totaal)",
    "Toolbox december: lassen & lasogen · Toolbox januari: melden van ongevallen",
    "Nieuwe punten: verhuis atelier (asbest, veiligheid, asfaltdak, nieuwe poort, sanitair vernieuwd)",
    "Kleistock fase 1 (nu) + fase 2 (volgend jaar) — betonblokken dubbele rij",
    "Waterprobleem site: hoofdleiding afgesloten door ondergrondse kruising Sterhoek — intussen hersteld",
    "Douchestangen sociaal gebouw: wordt ingepland",
  ]},
];

// ─── TOOLBOXEN ───────────────────────────────────────────────────────────────
const TB = [
  {id:1,ti:"Veiligheid op de Argex site — introductie",du:"20 min",ca:"Algemeen",vp:true,
   inhoud:["Argex-site overzicht: gevaarlijke zones en signalisatie","PBM's verplicht per zone","Groeve, ovens en machines — de 3 grote risico's","LMRA: STOP–THINK–GO vóór elke risicovolle taak","Stofblootstelling: gevaren en bescherming (silicose)","Melden van incidenten via Argex Safety app"]},
  {id:2,ti:"Kwartsstof & ademhalingsbescherming",du:"20 min",ca:"Gezondheid",vp:true,
   inhoud:["Kwarts = siliciumdioxide — deeltjes < 0,0007mm dringen diep in de longen","Silicose: chronisch (20j+), versneld (5-15j), acuut — ONOMKEERBAAR","Grenswaarde kwartsstof: 0,1 mg/m³ — zagen/frezen/slijpen = 200x teveel!","P3/FFP3-stofmasker VERPLICHT in alle stofzones","Collectieve aanpak: ontstoffingsinstallaties, afzuiging, sproeien"]},
  {id:3,ti:"Valbescherming — werken op hoogte",du:"20 min",ca:"Veiligheid",vp:true,
   inhoud:["Valbeveiliging verplicht vanaf 2m vrije valhoogte","Bestaat uit: ankerpunt + vanglijn + schokdemper + valharnas","Visuele controle vóór gebruik — keuringskleur tag controleren","Correct dragen: beenbanden + schouderbanden + ring in midden","Harnas jaarlijks + na elke val keuren door externe dienst"]},
  {id:4,ti:"Heffen en aanslaan van lasten",du:"20 min",ca:"Machines",vp:true,
   inhoud:["Aanslaan = bevoegd persoon (opgeleid, ≥18 jaar, medisch geschikt)","Kleurencodering colsonbandjes: Lente=GROEN, Zomer=GEEL, Herfst=BLAUW, Winter=WIT","Hoek α tussen lengen max. 60° — absoluut nooit >120°","Nooit beschadigd, geknoopt, verroest of zelfgemaakt materiaal","NOOIT onder een opgehangen last lopen"]},
  {id:5,ti:"Gehoorbescherming",du:"15 min",ca:"Gezondheid",vp:true,
   inhoud:["Gehoorverlies is NIET herstelbaar","Aanbevolen vanaf 80 dB — VERPLICHT vanaf 85 dB","Zones: brekers, zeefinstallaties, dieselmotoren, compressoren, ventilatoren","Oordoppen correct inbrengen: nat maken, oprollen, oor omhoog trekken","Otoplastieken (persoonlijk gevormd) geven betere bescherming"]},
  {id:6,ti:"Veilig gebruik handgereedschappen",du:"15 min",ca:"Machines",vp:true,
   inhoud:["Gebruik gereedschap enkel waarvoor bedoeld — controleer vóór gebruik","Hamers: gave gladde steel, geborgd in kop, geen bramen","Moersleutels: correct passend, nooit vulplaatjes, nooit steel verlengen","Schroevendraaiers: nooit als beitel — werkstuk niet vasthouden bij aandraaien","Vijlen: altijd stevig heft — beitels: koppen regelmatig ontbramen"]},
  {id:7,ti:"Ioniserende straling — densiteitsmeter",du:"15 min",ca:"Procesinstallaties",vp:true,
   inhoud:["Densiteitsmeter = gammastraling. 15 µSv/u contact, <0,5 µSv/u op 1m","Afscherming + Verblijftijd minimaliseren + Afstand maximaliseren","Op 30cm: max 1000u/jaar — op 10cm: max 25u/jaar","NOOIT handen onder meetopstelling — gebruik steeds steker","Bij schade: zone 20m afsluiten + IDFC bellen + AV Controlatom 02/674.51.20"]},
  {id:8,ti:"LMRA — STOP THINK GO",du:"15 min",ca:"Preventie",vp:true,
   inhoud:["STOP: Ken je taak en de aanwezige risico's","THINK: Werkvergunning, PBM's, nooduitgangen, brandblussers, LOTOTO","THINK: Struikelrisico's, gevaarlijke stoffen, valgevaar","GO: Kan ik veilig werken? JA → start. NEEN → stop en meld","'Als het niet veilig kan, dan doen we het niet!' — H2O Group"]},
  {id:9,ti:"Evacuatie & brandblussers",du:"15 min",ca:"Noodplan",vp:true,
   inhoud:["Evacuatiesignaal: gastoeters op de site — ken de locatie","Bij evacuatie: onmiddellijk naar parking bedienden (overzijde straat)","Poederblussers (vaste stoffen/vloeistoffen/gassen) + CO₂-blussers (vloeistoffen/gassen)","Bluspoging enkel bij KLEINE brand + ALTIJD met 2 personen","Gebruikte brandblusser ONMIDDELLIJK melden voor hervulling"]},
  {id:10,ti:"Heftruck & intern transport",du:"15 min",ca:"Transport",vp:true,
   inhoud:["Vorken 10-15cm boven de grond — max 15 km/u op de site","Claxon bij bochten, blinde zones en deuropeningen","Oogcontact met voetgangers vóór doorrijden — voetgangers ALTIJD voorrang","NOOIT personen op vorken, paletten of voorzetstukken vervoeren","GSM of oortjes tijdens rijden: VERBODEN"]},
  {id:11,ti:"Bezoekers & aannemers",du:"15 min",ca:"Aannemers",vp:false,
   inhoud:["Aanmelden verplicht bij receptie (03/250.15.15) vóór betreden site","Bezoekers: enkel onder begeleiding, PBM's verplicht in productiezone","Aannemers: dagelijkse registratie bij werken >1 dag","Externe chauffeurs: aanmelden bij aankomst, geen toegang productiezone alleen"]},
];

// ─── PROCEDURES / VIK'S ──────────────────────────────────────────────────────
const PR = [
  {id:1,ca:"Procedure",ti:"Werken in en rondom de groeve",tg:["Groeve","Val","Instorting","Talud"],
   desc:"Veiligheidsregels voor werkzaamheden in en rondom de groeve voor kleiwinning op de site Burcht.",
   kp:["Voer altijd een LMRA uit vóór de start van werkzaamheden in de groeve","Bewaar voldoende afstand tot het talud — risico op instorting","Gebruik enkel goedgekeurde rijroutes voor voertuigen (wielladers, dumpers)","Valharnas verplicht bij werken nabij hoogteverschillen","Meld instabiliteit (verzakking, scheuren) onmiddellijk aan leidinggevende"],
   vb:["Werken in de groeve zonder LMRA","Roken in of rondom de groeve"],
   pb:["Veiligheidshelm","Veiligheidsschoenen S3","Fluovest","Werkhandschoenen","FFP3-stofmasker"]},
  {id:2,ca:"Procedure",ti:"Ovens & droogtrommels — hoge temperaturen",tg:["Oven","Droogtrommel","Warmte","Brand","LOTO"],
   desc:"Procedure voor veilig werken rond de draaiovens en droogtrommels.",
   kp:["LOTOTO verplicht bij elk onderhoud — nooit werken aan een draaiende installatie","Bord 'werken aan machine' plaatsen en zone afbakenen","Minimum veilige afstand tot hete oppervlakken — aanraking verboden","Noodstopknop kennen en kunnen bereiken vóór start"],
   vb:["Werken aan oven zonder LOTOTO","Oven betreden zonder hittebestendige PBM's"],
   pb:["Hittebestendige handschoenen","Veiligheidsbril/gelaatsscherm","Veiligheidsschoenen S3","Helm","Vlam vertragende kledij"]},
  {id:3,ca:"Procedure",ti:"LMRA — Laatste Minuut Risico Analyse",tg:["LMRA","STOP","THINK","GO","Vóór de start"],
   desc:"Voer een LMRA uit vóór elke taak met risico. STOP – THINK – GO. 'Als het niet veilig kan, dan doen we het niet!'",
   kp:["STOP: Ken je taak en de aanwezige risico's vóór de start","THINK: Controleer werkvergunning, PBM's, nooduitgangen, brandblussers","THINK: LOTOTO toegepast? Struikel-/glijrisico's gekend?","GO: Kan ik veilig werken? JA → starten. NEEN → stop en meld","Bij gewijzigde omstandigheden tijdens het werk: opnieuw LMRA"],
   vb:["Starten zonder LMRA bij risicovolle werkzaamheden","Doorgaan bij twijfel over veiligheid"],
   pb:["Afhankelijk van taak — zie VIK of procedure"]},
  {id:4,ca:"VIK",ti:"VIK-P-OD-04 — Kuiswerken bruinkool (ATEX)",tg:["Bruinkool","ATEX","Explosie","Rookverbod"],
   desc:"Kuisen van de omgeving van de bruinkoolinstallatie. ATEX-zone: rookverbod en speciale maatregelen verplicht. Dagelijks.",
   risicos:["Explosiegevaar (ATEX) — bruinkoolstof is brandbaar en explosief","Brandgevaar bij stofophoping op warme oppervlakken","Stootgevaar en struikelgevaar"],
   stappen:["ATEX-check vóór start: zijn er vonken, open vuur of warmtebronnen?","Leidinggevende verwittigen vóór de start","Enkel ATEX-stofzuiger of natte reiniging — GEEN perslucht","Stofophoping wegwerken: begin bij warme zones en rond silo's","Las-/snijwerken in buurt? Werkvergunning + ATEX-check verplicht"],
   vb:["Roken in of rondom de bruinkoolzone","Perslucht gebruiken om bruinkoolstof weg te blazen"],
   pb:["Veiligheidshelm","Veiligheidsschoenen S3","Veiligheidsbril","FFP3-stofmasker","ATEX-kledij"]},
  {id:5,ca:"VIK",ti:"VIK-P-KO-01 — Vrijmaken densiteitsmeter",tg:["Densiteitsmeter","Ioniserende straling","Koelkelder","Radioactief"],
   desc:"Veilig verwijderen van puin bij ioniserende bron in koelkelder. Enkel bevoegde personen. VIK-P-KO-01 v2 (29/03/2017).",
   risicos:["Ioniserende straling (gammastraling)","Stootgevaar bij afdalen trap","Stofvorming"],
   stappen:["Enkel bevoegde personen mogen de densiteitsmeter benaderen","Afbakeningskettingen NOOIT verplaatsen","Verblijftijd beperken — gebruik steker, handen NOOIT onder meetopstelling","Argex naast de trechter opkuisen en terugscheppen","Vergrendelingssleutel teruggeven aan ploegverantwoordelijke","Bij schade: STOP — zone 20m afsluiten — IDFC bellen — AV Controlatom 02/674.51.20"],
   vb:["Handen onder de meetopstelling brengen","Bron openen of demonteren zonder toestemming"],
   pb:["Veiligheidshelm","Veiligheidsschoenen S3","Werkhandschoenen","FFP3-stofmasker"]},
  {id:6,ca:"VIK",ti:"VIK-P-OV-04 — Lossen houtstof (ATEX-docking)",tg:["Houtstof","ATEX","Docking","Explosie"],
   desc:"Veilig werken met de docking voor lossen van houtstof. Enkel bevoegden. LOTOTO verplicht bij onderhoud. Argex Burcht.",
   risicos:["Explosiegevaar (ATEX) — houtstof ontplofbare atmosfeer","Automatisch startende machine — beknelling","Stofblootstelling"],
   stappen:["ATEX-check vóór start: geen vonken, open vuur of warmtebronnen","Enkel bevoegden mogen de docking bedienen","Opgelet: automatisch startende machine — niemand in gevaarzone","Binnenkant machine: enkel na LOTOTO — nooit tijdens werking","Bij langdurige stilstand rolluik sluiten"],
   vb:["Binnenkant machine betreden zonder LOTOTO","Roken in houtstofzone","Perslucht gebruiken"],
   pb:["Veiligheidshelm","FFP3-stofmasker","Werkhandschoenen","ATEX-kledij","Fluovest"]},
  {id:7,ca:"VIK",ti:"VIK-P-ZG-02 — Brokstukken/IJzer uit silo",tg:["Silo","IJzer","Hoogte","Besloten ruimte"],
   desc:"Brokstukken of ijzer uit silo verwijderen voor correcte werking volumemeter. Bij voorkeur uitbesteden.",
   risicos:["Valgevaar in silo (besloten ruimte)","Stootgevaar","Stofvorming (kristallijn silica)"],
   stappen:["Bij voorkeur uitbesteden aan gespecialiseerde firma","Eigen personeel enkel bij extreme omstandigheden na grondig vooroverleg","Altijd met minimum 3 personen — geen toegang voor onbevoegden","Alle noodstoppen vergrendelen. Valharnas + buddy-check vóór betreden silo","IJzerresten apart leggen"],
   vb:["Werken in silo met minder dan 3 personen","Silo betreden zonder valbeveiliging"],
   pb:["Veiligheidshelm","Werkhandschoenen","FFP3-stofmasker","Valharnas met vanglijn","Veiligheidsschoenen S3"]},
  {id:8,ca:"VIK",ti:"VIK-P-KAD-03 — Bobcat/wiellader kaai",tg:["Bobcat","Wiellader","Kaai","Transport"],
   desc:"Veilig bedienen van bobcat/wiellader op de kaai. Enkel gekwalificeerd personeel. Max 15 km/u.",
   risicos:["Omkantelen van de machine","Klemmen tussen machineonderdelen","Aanrijding van personen of constructies"],
   stappen:["Enkel gekwalificeerd personeel (opleiding + veiligheidsfunctie)","Pre-use check: bedieningsfuncties + keuringsticker viersprong","In-/uitstappen: altijd achterwaarts — 3 contactpunten","Max 15 km/u — oogcontact met personen — langzaam vertrekken","Niet rijden als er personen achter de bobcat zijn"],
   vb:["Bobcat bedienen zonder opleiding","Bedieningspositie verlaten met draaiende motor"],
   pb:["Veiligheidshelm","Veiligheidsschoenen S3","Fluovest","Werkhandschoenen"]},
];

// ─── CSS ─────────────────────────────────────────────────────────────────────
const css=`
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#F5F0EA;font-family:'Work Sans',sans-serif}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-5px) rotate(3deg)}}
.fu{animation:fadeUp .2s ease forwards}
.fl{animation:float 3s ease-in-out infinite}
input,select,textarea{outline:none;font-family:inherit}
input:focus,select:focus,textarea:focus{border-color:#C1440E!important;box-shadow:0 0 0 3px rgba(193,68,14,.12)!important}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#F5F0EA}::-webkit-scrollbar-thumb{background:#C8B8A8;border-radius:3px}
.rh:hover{background:#FAE8E0!important;cursor:pointer}
.bh{transition:all .15s}.bh:hover{filter:brightness(.91);transform:translateY(-1px)}
`;

// ─── SVG LOGO ─────────────────────────────────────────────────────────────────
const Logo=({sz=40})=>(
  <svg width={sz} height={sz} viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="32" r="22" fill="url(#cg)"/>
    <circle cx="22" cy="26" r="3" fill="rgba(0,0,0,.12)"/>
    <circle cx="32" cy="22" r="2.5" fill="rgba(0,0,0,.10)"/>
    <circle cx="40" cy="28" r="3.5" fill="rgba(0,0,0,.12)"/>
    <circle cx="24" cy="36" r="2" fill="rgba(0,0,0,.08)"/>
    <circle cx="36" cy="38" r="2.5" fill="rgba(0,0,0,.10)"/>
    <ellipse cx="23" cy="24" rx="6" ry="4" fill="rgba(255,255,255,.2)" transform="rotate(-20 23 24)"/>
    <text x="30" y="38" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" fontFamily="Work Sans,sans-serif">A</text>
    <defs><radialGradient id="cg" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#E8693A"/><stop offset="100%" stopColor="#962E06"/></radialGradient></defs>
  </svg>
);

// ─── UI HELPERS ───────────────────────────────────────────────────────────────
const Av=({i,s=36,c=C.clay})=>(
  <div style={{width:s,height:s,borderRadius:"50%",background:c+"22",border:`2px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.3,fontWeight:700,color:c,flexShrink:0}}>{i}</div>
);
const Tag=({label,color=C.clay})=>(
  <span style={{display:"inline-block",background:color+"18",color:color,border:`1px solid ${color}33`,borderRadius:5,padding:"2px 8px",fontSize:11,fontWeight:700}}>{label}</span>
);
const Card=({children,style,className,onClick})=>(
  <div className={className} onClick={onClick} style={{background:C.white,borderRadius:10,padding:16,border:`1px solid ${C.g100}`,boxShadow:"0 1px 4px rgba(193,68,14,.06)",...style}}>{children}</div>
);
const Btn=({children,onClick,disabled,variant})=>(
  <button onClick={onClick} disabled={disabled} className="bh" style={{width:"100%",padding:"12px 16px",background:disabled?"#ccc":variant==="ghost"?"transparent":C.clay,color:disabled||variant==="ghost"?C.g500:C.white,border:variant==="ghost"?`1.5px solid ${C.g300}`:"none",borderRadius:8,fontFamily:"inherit",fontWeight:800,fontSize:14,cursor:disabled?"not-allowed":"pointer"}}>{children}</button>
);
const SH=({children,sub})=>(
  <div style={{marginBottom:20}}>
    <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:20,fontWeight:900,color:C.g900}}>{children}</div>
    {sub&&<div style={{fontSize:12,color:C.g500,marginTop:3}}>{sub}</div>}
  </div>
);
const Inp=({label,value,onChange,placeholder,type="text"})=>(
  <div style={{marginBottom:14}}>
    {label&&<div style={{fontSize:12,fontWeight:700,color:C.g700,marginBottom:5}}>{label}</div>}
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",border:`1.5px solid ${C.g300}`,borderRadius:7,padding:"10px 13px",color:C.g900,fontSize:13}}/>
  </div>
);

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const USERS={
  "admin@argex.be":     {pw:"admin2026",  nm:"Bert Verbraecken", role:"admin",         av:"BV", fn:"Preventieadviseur IDPBW", ob:true},
  "chef@argex.be":      {pw:"chef2026",   nm:"Abdel-hak Charai", role:"leidinggevende",av:"AC", fn:"Ploegbaas Productie",     ob:true},
  "werk@argex.be":      {pw:"werk2026",   nm:"Rachid Akdim",     role:"medewerker",    av:"RA", fn:"Zifter",                  ob:true},
  "beheer@argex.be":    {pw:"beheer2026", nm:"Beheerder",        role:"admin",         av:"BE", fn:"Beheerder",               ob:true},
};

function Login({onLogin}){
  const [email,setEmail]=useState(""); const [pw,setPw]=useState(""); const [err,setErr]=useState("");
  const go=()=>{
    const u=USERS[email.toLowerCase().trim()];
    if(u&&u.pw===pw){onLogin({...u,email})}else{setErr("E-mail of wachtwoord incorrect.")}
  };
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.clayDp},${C.clay})`,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:380}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div className="fl" style={{display:"inline-block",marginBottom:12}}><Logo sz={64}/></div>
          <div style={{fontSize:26,fontWeight:900,color:C.white,fontFamily:"'Work Sans',sans-serif"}}>Argex Safety</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginTop:4}}>Burcht / Zwijndrecht</div>
        </div>
        <Card>
          <Inp label="E-mailadres" value={email} onChange={setEmail} placeholder="naam@argex.be"/>
          <Inp label="Wachtwoord" value={pw} onChange={setPw} placeholder="••••••••" type="password"/>
          {err&&<div style={{fontSize:13,color:C.red,marginBottom:12,padding:"9px 13px",background:C.redL,borderRadius:7}}>⚠ {err}</div>}
          <Btn onClick={go}>Aanmelden →</Btn>
          <div style={{marginTop:18,borderTop:`1px solid ${C.g100}`,paddingTop:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.g500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>Demo logins</div>
            {[["admin@argex.be","admin2026","Admin"],["chef@argex.be","chef2026","Leidinggevende"],["werk@argex.be","werk2026","Medewerker"]].map(([e,p,r])=>(
              <div key={e} onClick={()=>{setEmail(e);setPw(p);}} style={{display:"flex",justifyContent:"space-between",padding:"8px 10px",borderRadius:7,marginBottom:4,cursor:"pointer",border:`1px solid ${C.clay}22`,background:email===e?C.clayL:"#fafafa",fontSize:12,color:C.g700}}>
                <span>{e}</span><Tag label={r} color={C.clay}/>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({user,setTab}){
  const isLead=user.role==="leidinggevende"||user.role==="admin";
  const eigenData=TA.find(m=>m.nm===user.nm)||{at:[]};
  const verlopen=eigenData.at.filter(a=>a.s==="verlopen").length;
  const binnenkort=eigenData.at.filter(a=>a.s==="binnenkort").length;
  const totTeamVerlopen=isLead?TA.reduce((n,m)=>n+m.at.filter(a=>a.s==="verlopen").length,0):0;
  return(
    <div className="fu">
      <div style={{background:`linear-gradient(135deg,${C.clayDp},${C.clay})`,borderRadius:14,padding:"20px",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-10,top:-10,opacity:.1}}><Logo sz={120}/></div>
        <div style={{position:"relative"}}>
          <div style={{fontSize:18,fontWeight:900,color:C.white}}>Welkom, {user.nm.split(" ")[0]}!</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.7)",marginTop:2}}>🏭 Argex · Burcht / Zwijndrecht · {user.fn}</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
        {[
          {v:verlopen,    l:"Eigen verlopen",    c:verlopen>0?C.red:C.green,     ico:"📜"},
          {v:binnenkort,  l:"Binnenkort",        c:binnenkort>0?C.amber:C.green, ico:"⏰"},
          ...(isLead?[
            {v:totTeamVerlopen, l:"Team verlopen", c:totTeamVerlopen>0?C.red:C.green, ico:"👥"},
            {v:CPBW.length,     l:"CPBW verslagen",c:C.clay,                           ico:"📋"},
          ]:[])
        ].map(s=>(
          <Card key={s.l} style={{borderLeft:`4px solid ${s.c}`}}>
            <div style={{fontSize:11,color:C.g500,marginBottom:4}}>{s.ico} {s.l}</div>
            <div style={{fontSize:28,fontWeight:900,color:s.c,fontFamily:"'Work Sans',sans-serif"}}>{s.v}</div>
          </Card>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
        {[
          {ico:"🩺",lbl:"EHBO & Contacten",tab:"contacten"},
          {ico:"🚨",lbl:"Noodplan",tab:"noodplan"},
          {ico:"📚",lbl:"Procedures",tab:"bibliotheek"},
          {ico:"⚠️",lbl:"Incident melden",tab:"incidenten"},
        ].map(({ico,lbl,tab})=>(
          <Card key={lbl} className="rh" onClick={()=>setTab(tab)} style={{display:"flex",alignItems:"center",gap:10,padding:"13px 14px",cursor:"pointer"}}>
            <div style={{width:32,height:32,borderRadius:8,background:C.clayL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{ico}</div>
            <span style={{fontSize:13,fontWeight:700,color:C.g800}}>{lbl}</span>
            <span style={{marginLeft:"auto",color:C.g300}}>→</span>
          </Card>
        ))}
      </div>
      {isLead&&totTeamVerlopen>0&&(
        <>
          <div style={{fontSize:11,fontWeight:700,color:C.g500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>Team — verlopen attesten</div>
          <Card>
            {TA.filter(m=>m.at.some(a=>a.s==="verlopen")).slice(0,5).map(m=>(
              <div key={m.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${C.g100}`}}>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <Av i={m.av} s={28} c={C.red}/>
                  <div><div style={{fontSize:13,fontWeight:700,color:C.g900}}>{m.nm}</div><div style={{fontSize:11,color:C.g500}}>{m.fn}</div></div>
                </div>
                <Tag label={`${m.at.filter(a=>a.s==="verlopen").length} verlopen`} color={C.red}/>
              </div>
            ))}
          </Card>
        </>
      )}
    </div>
  );
}

// ─── OPLEIDINGEN ──────────────────────────────────────────────────────────────
function Opleidingen({user}){
  const isLead=user.role==="leidinggevende"||user.role==="admin";
  const [sel,setSel]=useState(null);
  const [zoek,setZoek]=useState("");
  const [fs,setFs]=useState("alles");
  const klr=s=>({ok:C.green,binnenkort:C.amber,verlopen:C.red}[s]||C.g400);
  const lb=s=>({ok:"Geldig",binnenkort:"Binnenkort",verlopen:"Verlopen"}[s]||s);

  const eigen=TA.find(m=>m.nm===user.nm)||{nm:user.nm,fn:user.fn,at:[]};

  if(!isLead){
    const st={ok:eigen.at.filter(a=>a.s==="ok").length,binnenkort:eigen.at.filter(a=>a.s==="binnenkort").length,verlopen:eigen.at.filter(a=>a.s==="verlopen").length};
    return(
      <div className="fu">
        <SH sub={eigen.fn||user.fn}>Mijn Opleidingen & Attesten</SH>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {[["ok","Geldig"],["binnenkort","Binnenkort"],["verlopen","Verlopen"]].map(([s,l])=>(
            <Card key={s} style={{flex:1,textAlign:"center",borderTop:`3px solid ${klr(s)}`}}>
              <div style={{fontSize:24,fontWeight:900,color:klr(s),fontFamily:"'Work Sans',sans-serif"}}>{st[s]}</div>
              <div style={{fontSize:11,color:C.g500}}>{l}</div>
            </Card>
          ))}
        </div>
        {eigen.at.length===0
          ? <Card><div style={{textAlign:"center",color:C.g400,padding:20}}>Geen attesten gevonden voor {user.nm}.</div></Card>
          : <Card>{eigen.at.map((a,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${C.g100}`}}>
                <div><div style={{fontSize:13,fontWeight:600,color:C.g800}}>{a.n}</div><div style={{fontSize:11,color:C.g500}}>Geldig tot: <strong style={{color:klr(a.s)}}>{a.v}</strong></div></div>
                <Tag label={lb(a.s)} color={klr(a.s)}/>
              </div>
            ))}</Card>}
        {st.verlopen>0&&<Card style={{background:C.redL,border:`1px solid ${C.red}33`,marginTop:12}}><div style={{fontSize:13,color:C.red,fontWeight:700}}>⚠ {st.verlopen} verlopen — meld aan je leidinggevende.</div></Card>}
      </div>
    );
  }

  if(sel){
    const m=TA.find(x=>x.id===sel)||{nm:"?",at:[]};
    const st={ok:m.at.filter(a=>a.s==="ok").length,binnenkort:m.at.filter(a=>a.s==="binnenkort").length,verlopen:m.at.filter(a=>a.s==="verlopen").length};
    return(
      <div className="fu">
        <button onClick={()=>setSel(null)} style={{background:"transparent",border:`1px solid ${C.g300}`,color:C.g700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,marginBottom:20}}>← Terug overzicht</button>
        <Card>
          <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:16,paddingBottom:14,borderBottom:`1px solid ${C.g100}`}}>
            <Av i={m.av} s={46} c={st.verlopen>0?C.red:st.binnenkort>0?C.amber:C.green}/>
            <div><div style={{fontSize:16,fontWeight:800,color:C.g900}}>{m.nm}</div><div style={{fontSize:12,color:C.clay,fontWeight:600}}>{m.fn}</div></div>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            {[["ok","Geldig"],["binnenkort","Binnenkort"],["verlopen","Verlopen"]].map(([s,l])=>(
              <div key={s} style={{flex:1,textAlign:"center",padding:"8px",borderRadius:8,background:klr(s)+"15",border:`1px solid ${klr(s)}33`}}>
                <div style={{fontSize:22,fontWeight:900,color:klr(s)}}>{st[s]}</div>
                <div style={{fontSize:10,color:C.g500}}>{l}</div>
              </div>
            ))}
          </div>
          {m.at.length===0
            ? <div style={{textAlign:"center",color:C.g400,padding:16}}>Geen attesten geregistreerd.</div>
            : m.at.map((a,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${C.g100}`}}>
                  <div><div style={{fontSize:13,fontWeight:600,color:C.g800}}>{a.n}</div><div style={{fontSize:11,color:C.g500}}>Geldig tot: <strong style={{color:klr(a.s)}}>{a.v}</strong></div></div>
                  <Tag label={lb(a.s)} color={klr(a.s)}/>
                </div>
              ))
          }
        </Card>
      </div>
    );
  }

  const gef=TA
    .filter(m=>zoek==='' || m.nm.toLowerCase().includes(zoek.toLowerCase()) || m.fn.toLowerCase().includes(zoek.toLowerCase()))
    .filter(m=>fs==='alles'||m.at.some(a=>a.s===fs));
  const totV=TA.reduce((n,m)=>n+m.at.filter(a=>a.s==="verlopen").length,0);
  const totB=TA.reduce((n,m)=>n+m.at.filter(a=>a.s==="binnenkort").length,0);

  return(
    <div className="fu">
      <SH sub={`${TA.length} medewerkers · ${totV} verlopen · ${totB} binnenkort`}>Opleidingen & Attesten</SH>
      {totV>0&&<div style={{background:C.redL,border:`1px solid ${C.red}33`,borderRadius:9,padding:"10px 14px",marginBottom:14,fontSize:13,color:C.red,fontWeight:700}}>
        ⚠ {totV} verlopen attest(en) bij {TA.filter(m=>m.at.some(a=>a.s==="verlopen")).length} medewerkers
      </div>}
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <input value={zoek} onChange={e=>setZoek(e.target.value)} placeholder="Zoek naam of functie..." style={{flex:1,border:`1.5px solid ${C.g300}`,borderRadius:7,padding:"9px 12px",fontSize:13,color:C.g900}}/>
        <select value={fs} onChange={e=>setFs(e.target.value)} style={{border:`1.5px solid ${C.g300}`,borderRadius:7,padding:"9px 10px",fontSize:12,color:C.g700,background:C.white}}>
          <option value="alles">Alle statussen</option>
          <option value="verlopen">⚠ Verlopen</option>
          <option value="binnenkort">🕐 Binnenkort</option>
          <option value="ok">✅ Geldig</option>
        </select>
      </div>
      <div style={{fontSize:11,color:C.g400,marginBottom:10}}>{gef.length} van {TA.length}</div>
      {gef.map(m=>{
        const nV=m.at.filter(a=>a.s==="verlopen").length;
        const nB=m.at.filter(a=>a.s==="binnenkort").length;
        const kA=nV>0?C.red:nB>0?C.amber:C.green;
        return(
          <Card key={m.id} className="rh" onClick={()=>setSel(m.id)} style={{marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",cursor:"pointer"}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <Av i={m.av} s={34} c={kA}/>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:C.g900}}>{m.nm}</div>
                <div style={{fontSize:11,color:C.g500}}>{m.fn} · {m.at.length} attest(en)</div>
              </div>
            </div>
            <div style={{display:"flex",gap:5}}>
              {nV>0&&<Tag label={`${nV} ✗`} color={C.red}/>}
              {nB>0&&<Tag label={`${nB} ⏰`} color={C.amber}/>}
              {nV===0&&nB===0&&m.at.length>0&&<Tag label="✓" color={C.green}/>}
              <span style={{color:C.g300,fontSize:13}}>→</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ─── CONTACTEN ────────────────────────────────────────────────────────────────
function Contacten(){
  const zoneKleur={Productie:C.clay,Zeefgebouw:C.earth,Hoofdbureau:C.clayD,"Atelier/Onderhoud":C.green,Labo:C.blue,"Opzak/Magazijn":C.g500};
  const zones=[...new Set(EHBO.map(e=>e.zone))];
  return(
    <div className="fu">
      <SH sub="Argex Burcht/Zwijndrecht — H2O Group">EHBO & Contacten</SH>

      {/* Noodnummers */}
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        {[["112","Hulpdiensten",C.red],["03/250.15.15","Receptie/Meldpunt",C.clay],["0497/51.50.95","Meldkamer",C.clayD],["0473/77.99.86","Ploegbaas (nacht)",C.earth]].map(([nr,lb,col])=>(
          <div key={nr} style={{flex:1,background:col+"15",border:`2px solid ${col}33`,borderRadius:9,padding:"8px 6px",textAlign:"center"}}>
            <div style={{fontSize:9,fontWeight:700,color:col,textTransform:"uppercase",marginBottom:1}}>{lb}</div>
            <div style={{fontSize:13,fontWeight:900,color:col,fontFamily:"'Work Sans',sans-serif"}}>{nr}</div>
          </div>
        ))}
      </div>

      {/* Liantis */}
      <div style={{fontSize:11,fontWeight:700,color:C.g500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>🏥 Externe Preventiedienst — Liantis EDPBW</div>
      <Card style={{marginBottom:20,borderLeft:`4px solid ${C.green}`}}>
        <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:10,paddingBottom:10,borderBottom:`1px solid ${C.g100}`}}>
          <div style={{width:42,height:42,borderRadius:10,background:C.green+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🏥</div>
          <div>
            <div style={{fontSize:14,fontWeight:800,color:C.g900}}>Liantis EDPBW</div>
            <div style={{fontSize:12,color:C.green,fontWeight:600}}>Rijksweg 9, Puurs · Externe dienst PBW</div>
          </div>
        </div>
        {[{rol:"Contactpersoon",nm:"Charlotte Van Assche",tel:"+32 3 886 05 78",email:"charlotte.vanassche@liantis.be",av:"CV"},
          {rol:"Arbeidsarts",   nm:"Dr. Brigitte Merkus", tel:"+32 3 886 05 78",email:"charlotte.vanassche@liantis.be",av:"BM"}].map(p=>(
          <div key={p.nm} style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:C.green+"20",border:`2px solid ${C.green}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:C.green,flexShrink:0}}>{p.av}</div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:C.g900}}>{p.nm}</div>
              <div style={{fontSize:11,color:C.green,fontWeight:600}}>{p.rol}</div>
              <div style={{fontSize:11,color:C.g500}}>📞 {p.tel} · ✉ {p.email}</div>
            </div>
          </div>
        ))}
      </Card>

      {/* EHBO */}
      <div style={{fontSize:11,fontWeight:700,color:C.g500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>🩺 EHBO-Hulpverleners — 18 personen (F-NP-011)</div>
      <div style={{background:C.amberL,border:`1px solid ${C.amber}44`,borderRadius:8,padding:"8px 14px",marginBottom:12,fontSize:12,color:C.amber,fontWeight:600}}>
        ⚠ GSM-nummers aanvullen via HR · EHBO-lokaal in de onderhoudsloods · AED: sociaal gebouw
      </div>
      {zones.map(zone=>{
        const lijst=EHBO.filter(e=>e.zone===zone);
        const kl=zoneKleur[zone]||C.g500;
        return(
          <div key={zone} style={{marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:700,color:kl,letterSpacing:".07em",textTransform:"uppercase",marginBottom:5}}>● {zone}</div>
            {lijst.map(p=>(
              <div key={p.nm} style={{display:"flex",gap:10,alignItems:"center",background:C.white,borderRadius:7,padding:"8px 11px",marginBottom:4,border:`1px solid ${C.g100}`}}>
                <div style={{width:30,height:30,borderRadius:"50%",background:kl+"20",border:`2px solid ${kl}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:kl,flexShrink:0}}>{p.av}</div>
                <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.g900}}>{p.nm}</div></div>
                <div style={{fontSize:11,color:p.tel?C.clay:C.g300,fontWeight:600}}>{p.tel||"📞 in te vullen"}</div>
              </div>
            ))}
          </div>
        );
      })}

      {/* Vertrouwenspersonen */}
      <div style={{fontSize:11,fontWeight:700,color:C.g500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10,marginTop:8}}>🤝 Vertrouwenspersonen H2O Group — 5 intern + Liantis</div>
      {VP.map(p=>(
        <Card key={p.nm} style={{marginBottom:8,display:"flex",gap:12,alignItems:"center"}}>
          <Av i={p.av} s={42} c={C.earth}/>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:700,color:C.g900}}>{p.nm}</div>
            <div style={{fontSize:11,color:C.earth,fontWeight:600}}>{p.org} · Vertrouwenspersoon</div>
            <div style={{fontSize:12,color:C.g500,marginTop:3}}>📞 {p.tel} · ✉ {p.email}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── NOODPLAN ─────────────────────────────────────────────────────────────────
function Noodplan(){
  const [actief,setActief]=useState(null);
  const sc=actief?NS.find(s=>s.id===actief):null;
  if(sc) return(
    <div className="fu">
      <button onClick={()=>setActief(null)} style={{background:"transparent",border:`1px solid ${C.g300}`,color:C.g700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,marginBottom:20}}>← Terug</button>
      <div style={{background:sc.bg,border:`1px solid ${sc.kleur}33`,borderRadius:12,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
        <div style={{fontSize:36}}>{sc.ico}</div>
        <div><div style={{fontSize:20,fontWeight:800,color:C.g900}}>{sc.lbl}</div><div style={{fontSize:12,color:C.g500}}>Volg de stappen in volgorde · H2O-site Zwijndrecht · Krijgsbaan 372</div></div>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
        {[["112","Hulpdiensten",C.red],["03/250.15.15","Receptie",C.clay],["0497/51.50.95","Meldkamer",C.clayD],["0473/77.99.86","Ploegbaas nacht",C.earth]].map(([n,l,col])=>(
          <div key={n} style={{flex:1,minWidth:70,background:col+"12",border:`2px solid ${col}33`,borderRadius:8,padding:"7px 8px",textAlign:"center"}}>
            <div style={{fontSize:9,fontWeight:700,color:col,textTransform:"uppercase"}}>{l}</div>
            <div style={{fontSize:13,fontWeight:900,color:col}}>{n}</div>
          </div>
        ))}
      </div>
      {sc.stappen.map((s,i)=>(
        <div key={s.nr} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8}}>
          <div style={{width:30,height:30,borderRadius:"50%",background:sc.kleur,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff",flexShrink:0,marginTop:1}}>{s.nr}</div>
          <Card style={{flex:1,padding:"10px 14px",background:C.g50}}>
            <div style={{fontSize:12,fontWeight:700,color:C.g900,marginBottom:3}}>{s.ico} {s.tit}</div>
            <div style={{fontSize:12,color:C.g700,lineHeight:1.6}}>{s.txt}</div>
          </Card>
        </div>
      ))}
      <Card style={{background:C.clayL,border:`1px solid ${C.clay}33`,marginTop:8}}>
        <div style={{fontSize:12,color:C.clayD}}>📍 Verzamelplaats: Parking bedienden (overzijde straat) · CMC: Vergaderzaal Riverside (gelijkvloers)</div>
      </Card>
    </div>
  );
  return(
    <div className="fu">
      <SH sub="H2O-site Zwijndrecht · Krijgsbaan 372">Noodplan Argex</SH>
      <Card style={{marginBottom:16,borderLeft:`4px solid ${C.red}`}}>
        <div style={{fontSize:12,fontWeight:700,color:C.g700,marginBottom:8}}>Noodnummers</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {[["112","Hulpdiensten",C.red],["03/250.15.15","Receptie/Meldpunt",C.clay],["0497/51.50.95","Meldkamer (24/7)",C.clayD],["0473/77.99.86","Ploegbaas nacht",C.earth],["02/674.51.20","AV Controlatom",C.blue],["02/289.21.11","FANC (nucleair)",C.blue]].map(([n,l,col])=>(
            <div key={n} style={{background:col+"12",borderRadius:7,padding:"8px 10px"}}>
              <div style={{fontSize:10,fontWeight:700,color:col,textTransform:"uppercase"}}>{l}</div>
              <div style={{fontSize:14,fontWeight:900,color:col}}>{n}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{marginBottom:16,background:C.clayL,border:`1px solid ${C.clay}33`}}>
        <div style={{fontSize:12,fontWeight:700,color:C.clayD,marginBottom:4}}>📋 Crisis Management Team (CMT)</div>
        <div style={{fontSize:12,color:C.g700,lineHeight:1.7}}>
          Voorzitter: <strong>Johny Bultheel</strong> (Plant Manager) · Noodplanleider: Operations Manager<br/>
          IDPBW: <strong>Bert Verbraecken</strong> · HR: <strong>Nicole Snoeck</strong><br/>
          CMC-lokaal: <strong>Vergaderzaal Riverside</strong> (gelijkvloers kantoorgebouw)<br/>
          Verzamelplaats: <strong>Parking bedienden</strong> (overzijde straat)
        </div>
      </Card>
      <div style={{fontSize:11,fontWeight:700,color:C.g500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>📌 Selecteer een noodscenario</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {NS.map(s=>(
          <div key={s.id} onClick={()=>setActief(s.id)} style={{padding:"12px",borderRadius:10,background:s.bg,border:`1px solid ${s.kleur}33`,cursor:"pointer",transition:"all .15s"}} className="rh">
            <div style={{fontSize:24,marginBottom:4}}>{s.ico}</div>
            <div style={{fontSize:12,fontWeight:700,color:s.kleur,lineHeight:1.3}}>{s.lbl}</div>
            <div style={{fontSize:10,color:C.g500,marginTop:2}}>{s.stappen.length} stappen</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── COMITE ───────────────────────────────────────────────────────────────────
function Comite(){
  const [sel,setSel]=useState(null);
  const c=sel?CPBW.find(x=>x.id===sel):null;
  if(c) return(
    <div className="fu">
      <button onClick={()=>setSel(null)} style={{background:"transparent",border:`1px solid ${C.g300}`,color:C.g700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,marginBottom:20}}>← Terug</button>
      <Card>
        <div style={{marginBottom:14,paddingBottom:12,borderBottom:`1px solid ${C.g100}`}}>
          <div style={{fontSize:16,fontWeight:800,color:C.g900}}>{c.titel}</div>
          <div style={{fontSize:12,color:C.clay,marginTop:2}}>📅 {c.datum}</div>
          <div style={{fontSize:11,color:C.g500,marginTop:4}}>Aanwezig: {c.aanwezig}</div>
        </div>
        {c.punten.map((p,i)=>(
          <div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:`1px solid ${C.g100}`,fontSize:13,color:C.g700}}>
            <span style={{color:C.clay,fontWeight:700,flexShrink:0,minWidth:18}}>{i+1}.</span>{p}
          </div>
        ))}
      </Card>
    </div>
  );
  return(
    <div className="fu">
      <SH sub={`${CPBW.length} verslagen`}>CPBW Verslagen</SH>
      <Card style={{marginBottom:14,background:C.clayL,border:`1px solid ${C.clay}33`}}>
        <div style={{fontSize:12,color:C.clayD}}>
          <strong>Voorzitter:</strong> Dhr. Johny Bultheel · <strong>IDPBW:</strong> Bert Verbraecken<br/>
          Volgende vergadering: <strong>12 maart 2026</strong>
        </div>
      </Card>
      {CPBW.map(v=>(
        <Card key={v.id} className="rh" onClick={()=>setSel(v.id)} style={{marginBottom:8,cursor:"pointer"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:C.g900}}>{v.titel}</div>
              <div style={{fontSize:12,color:C.g500}}>📅 {v.datum} · {v.punten.length} agendapunten</div>
            </div>
            <span style={{color:C.g300,fontSize:16}}>→</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── BIBLIOTHEEK ──────────────────────────────────────────────────────────────
function Bibliotheek(){
  const [cat,setCat]=useState("Alles");
  const [zoek,setZoek]=useState("");
  const [sel,setSel]=useState(null);
  const cats=["Alles","Procedure","VIK"];
  const icons={Procedure:"📋",VIK:"🛡","Alles":"📚"};

  const gef=PR.filter(d=>{
    if(cat!=="Alles"&&d.ca!==cat) return false;
    if(zoek&&!d.ti.toLowerCase().includes(zoek.toLowerCase())&&!d.tg.some(t=>t.toLowerCase().includes(zoek.toLowerCase()))) return false;
    return true;
  });

  if(sel){
    const d=PR.find(x=>x.id===sel);
    return(
      <div className="fu">
        <button onClick={()=>setSel(null)} style={{background:"transparent",border:`1px solid ${C.g300}`,color:C.g700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,marginBottom:20}}>← Terug</button>
        <Card>
          <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:16,paddingBottom:14,borderBottom:`1px solid ${C.g100}`}}>
            <div style={{width:50,height:50,borderRadius:12,background:C.clayL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{icons[d.ca]||"📋"}</div>
            <div style={{flex:1}}>
              <Tag label={d.ca}/>
              <div style={{fontSize:17,fontWeight:800,color:C.g900,marginTop:6,marginBottom:4}}>{d.ti}</div>
            </div>
          </div>
          <div style={{fontSize:14,color:C.g700,lineHeight:1.7,marginBottom:14}}>{d.desc}</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>{d.tg.map(t=><Tag key={t} label={t} color={C.earth}/>)}</div>
          {d.risicos&&<div style={{background:C.amberL,borderRadius:9,padding:12,marginBottom:12,border:`1px solid ${C.amber}44`}}>
            <div style={{fontSize:11,fontWeight:700,color:C.amber,textTransform:"uppercase",marginBottom:8}}>⚠️ Risico's</div>
            {d.risicos.map((r,i)=><div key={i} style={{fontSize:13,color:C.g700,padding:"4px 0",borderBottom:i<d.risicos.length-1?`1px solid ${C.g100}`:"none",display:"flex",gap:8}}><span style={{color:C.amber}}>▲</span>{r}</div>)}
          </div>}
          {d.stappen&&<div style={{marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:700,color:C.g500,textTransform:"uppercase",marginBottom:8}}>📋 Stappen</div>
            {d.stappen.map((s,i)=>(
              <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:7}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:C.clay,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:"#fff",flexShrink:0,marginTop:2}}>{i+1}</div>
                <div style={{fontSize:13,color:C.g700,lineHeight:1.6,flex:1,paddingBottom:7,borderBottom:i<d.stappen.length-1?`1px solid ${C.g100}`:"none"}}>{s}</div>
              </div>
            ))}
          </div>}
          {d.kp&&<div style={{marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:700,color:C.g500,textTransform:"uppercase",marginBottom:8}}>✅ Kernpunten</div>
            {d.kp.map((k,i)=><div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:`1px solid ${C.g100}`,fontSize:13,color:C.g700}}><span style={{color:C.clay,fontWeight:700}}>✓</span>{k}</div>)}
          </div>}
          {d.vb&&<div style={{background:C.redL,borderRadius:9,padding:12,marginBottom:12,border:`1px solid ${C.red}33`}}>
            <div style={{fontSize:11,fontWeight:700,color:C.red,textTransform:"uppercase",marginBottom:8}}>🚫 Verboden</div>
            {d.vb.map((v,i)=><div key={i} style={{fontSize:13,color:C.red,padding:"4px 0"}}>✗ {v}</div>)}
          </div>}
          {d.pb&&<div style={{background:C.clayL,borderRadius:9,padding:12,border:`1px solid ${C.clay}33`}}>
            <div style={{fontSize:11,fontWeight:700,color:C.clayD,textTransform:"uppercase",marginBottom:8}}>🦺 Verplichte PBM's</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{d.pb.map(p=><Tag key={p} label={p} color={C.clayD}/>)}</div>
          </div>}
        </Card>
      </div>
    );
  }
  return(
    <div className="fu">
      <SH sub={`${PR.length} documenten`}>Documentenbibliotheek</SH>
      <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${cat===c?C.clay:C.g300}`,background:cat===c?C.clay:"transparent",color:cat===c?C.white:C.g500,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{c}</button>
        ))}
      </div>
      <input value={zoek} onChange={e=>setZoek(e.target.value)} placeholder="Zoeken..." style={{width:"100%",border:`1.5px solid ${C.g300}`,borderRadius:7,padding:"9px 12px",fontSize:13,marginBottom:12}}/>
      {gef.map(d=>(
        <Card key={d.id} className="rh" onClick={()=>setSel(d.id)} style={{marginBottom:7,cursor:"pointer"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:4}}><Tag label={d.ca}/></div>
              <div style={{fontSize:14,fontWeight:700,color:C.g900}}>{d.ti}</div>
              <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:5}}>{d.tg.slice(0,3).map(t=><Tag key={t} label={t} color={C.earth}/>)}</div>
            </div>
            <span style={{color:C.g300,fontSize:16,flexShrink:0,marginLeft:10}}>→</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── TOOLBOXEN ────────────────────────────────────────────────────────────────
function Toolboxen(){
  const [toolboxen,setToolboxen]=useState(TB.map(t=>({...t,gevolgd:false,datum:null})));
  const [actief,setActief]=useState(null);
  const [signing,setSigning]=useState(false);
  const [signNm,setSignNm]=useState("");
  const teken=id=>{
    setToolboxen(p=>p.map(t=>t.id===id?{...t,gevolgd:true,datum:new Date().toLocaleDateString("nl-BE")}:t));
    setSigning(false);setActief(null);setSignNm("");
  };
  if(actief){
    const t=toolboxen.find(x=>x.id===actief);
    return(
      <div className="fu">
        <button onClick={()=>setActief(null)} style={{background:"transparent",border:`1px solid ${C.g300}`,color:C.g700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,marginBottom:20}}>← Terug</button>
        <SH>{t.ti}</SH>
        <Card>
          <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}><Tag label={t.ca}/><Tag label={t.du} color={C.g500}/>{t.vp&&<Tag label="Verplicht" color={C.red}/>}</div>
          <div style={{background:C.g50,borderRadius:9,padding:14,marginBottom:14,border:`1px solid ${C.g100}`}}>
            <div style={{fontWeight:800,color:C.g900,marginBottom:10}}>🎬 {t.ti}</div>
            {t.inhoud.map((p,i)=>(
              <div key={i} style={{display:"flex",gap:10,fontSize:13,color:C.g700,paddingBottom:7,paddingTop:i>0?7:0,borderBottom:i<t.inhoud.length-1?`1px solid ${C.g100}`:"none"}}>
                <span style={{color:C.clay,fontWeight:700,flexShrink:0}}>{i+1}.</span>{p}
              </div>
            ))}
          </div>
          {!t.gevolgd&&!signing&&<Btn onClick={()=>setSigning(true)}>✍ Toolbox ondertekenen</Btn>}
          {t.gevolgd&&<div style={{color:C.green,fontWeight:700,fontSize:14,textAlign:"center",padding:12}}>✅ Gevolgd op {t.datum}</div>}
          {signing&&<div style={{marginTop:14,borderTop:`1px solid ${C.g100}`,paddingTop:14}}>
            <Inp label="Digitale handtekening — typ je volledige naam" value={signNm} onChange={setSignNm} placeholder="Volledige naam"/>
            <div style={{display:"flex",gap:8}}>
              <Btn onClick={()=>teken(t.id)} disabled={signNm.trim().length<3}>✅ Bevestigen</Btn>
              <Btn variant="ghost" onClick={()=>setSigning(false)}>Annuleren</Btn>
            </div>
          </div>}
        </Card>
      </div>
    );
  }
  return(
    <div className="fu">
      <SH sub={`${toolboxen.filter(t=>t.gevolgd).length}/${toolboxen.length} gevolgd`}>Toolboxen</SH>
      {toolboxen.filter(t=>t.vp&&!t.gevolgd).length>0&&<div style={{background:C.redL,border:`1px solid ${C.red}33`,borderRadius:9,padding:"10px 14px",marginBottom:14,fontSize:13,color:C.red,fontWeight:700}}>
        ⚠ Nog {toolboxen.filter(t=>t.vp&&!t.gevolgd).length} verplichte toolbox(en) te volgen!
      </div>}
      {[["⚠ Verplicht",toolboxen.filter(t=>t.vp&&!t.gevolgd),C.red],["✅ Gevolgd",toolboxen.filter(t=>t.gevolgd),C.green],["📚 Optioneel",toolboxen.filter(t=>!t.vp&&!t.gevolgd),C.g500]].map(([tit,lijst,klr])=>lijst.length>0&&(
        <div key={tit} style={{marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:700,color:C.g500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>{tit}</div>
          {lijst.map(t=>(
            <Card key={t.id} className="rh" onClick={()=>setActief(t.id)} style={{marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 14px",cursor:"pointer"}}>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:C.g900,marginBottom:4}}>{t.ti}</div>
                <div style={{display:"flex",gap:6}}><Tag label={t.ca}/><Tag label={t.du} color={C.g500}/>{t.datum&&<span style={{fontSize:11,color:C.green,fontWeight:700}}>✓ {t.datum}</span>}</div>
              </div>
              <span style={{color:klr,fontSize:18}}>{t.gevolgd?"✅":t.vp?"⚠":"→"}</span>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── INCIDENTEN ───────────────────────────────────────────────────────────────
function Incidenten({user}){
  const isLead=user.role==="leidinggevende"||user.role==="admin";
  const [meldingen,setMeldingen]=useState([
    {id:1,type:"gevaarlijk",ico:"⚠️",kl:C.amber,bg:C.amberL,titel:"Weggeroeste schuif plafond Kelder Dano",datum:"03/02/2026",melder:"G. Eggermont",locatie:"Kelder Dano",status:"in behandeling",oorzaak:"Slijtage/corrosie",actie:"Herstel voorzien met beton",verantw:"B. Verbraecken",deadline:"15/03/2026"},
    {id:2,type:"materieel",ico:"🔧",kl:C.blue,bg:"#EEF4FF",titel:"Kraan voorover geheld sociaal gebouw",datum:"29/01/2026",melder:"G. Eggermont",locatie:"Sociaal gebouw",status:"afgehandeld",oorzaak:"Stempels niet gebruikt",actie:"Procedure stempels verplicht bij verplaatsen lasten",verantw:"B. Verbraecken",deadline:"12/02/2026"},
    {id:3,type:"ongeval",ico:"🚨",kl:C.red,bg:C.redL,titel:"Arbeidsongeval werkverlet Kelder Dano",datum:"07/02/2026",melder:"G. Eggermont",locatie:"Kelder Dano B81",status:"in behandeling",oorzaak:"Onveilige doorgang onder transportband",actie:"Onderzoeken hoe doorgang vermeden kan worden",verantw:"B. Verbraecken",deadline:"12/03/2026"},
  ]);
  const [nieuw,setNieuw]=useState(false);
  const [form,setForm]=useState({type:"gevaarlijk",titel:"",locatie:"",beschrijving:"",oorzaak:""});
  const [sel,setSel]=useState(null);

  const klMap={gevaarlijk:{ico:"⚠️",kl:C.amber,bg:C.amberL,lbl:"Gevaarlijke situatie"},
               ongeval:   {ico:"🚨",kl:C.red,  bg:C.redL,  lbl:"Ongeval met letsel"},
               materieel: {ico:"🔧",kl:C.blue, bg:"#EEF4FF",lbl:"Materiële schade"}};

  if(nieuw) return(
    <div className="fu">
      <button onClick={()=>setNieuw(false)} style={{background:"transparent",border:`1px solid ${C.g300}`,color:C.g700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,marginBottom:20}}>← Terug</button>
      <SH>Incident melden</SH>
      <Card>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:700,color:C.g700,marginBottom:8}}>Type incident</div>
          {Object.entries(klMap).map(([k,v])=>(
            <div key={k} onClick={()=>setForm(p=>({...p,type:k}))} style={{padding:"10px 14px",borderRadius:8,marginBottom:6,cursor:"pointer",background:form.type===k?v.bg:"#fafafa",border:`1.5px solid ${form.type===k?v.kl:C.g300}`}}>
              <span>{v.ico} {v.lbl}</span>
            </div>
          ))}
        </div>
        <Inp label="Titel / korte omschrijving" value={form.titel} onChange={v=>setForm(p=>({...p,titel:v}))} placeholder="Bijv. Losse plaat bij oven..."/>
        <Inp label="Locatie" value={form.locatie} onChange={v=>setForm(p=>({...p,locatie:v}))} placeholder="Bijv. Oven hal, Kelder Dano..."/>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:700,color:C.g700,marginBottom:5}}>Beschrijving</div>
          <textarea value={form.beschrijving} onChange={e=>setForm(p=>({...p,beschrijving:e.target.value}))} placeholder="Wat is er precies gebeurd?" rows={4} style={{width:"100%",border:`1.5px solid ${C.g300}`,borderRadius:7,padding:"10px 13px",fontSize:13,fontFamily:"inherit",color:C.g900,resize:"vertical"}}/>
        </div>
        <Inp label="Vermoedelijke oorzaak" value={form.oorzaak} onChange={v=>setForm(p=>({...p,oorzaak:v}))} placeholder="Bijv. Defect materieel, procedure niet gevolgd..."/>
        <Btn onClick={()=>{
          const m=klMap[form.type];
          setMeldingen(p=>[{id:Date.now(),...m,...form,datum:new Date().toLocaleDateString("nl-BE"),melder:user.nm,status:"nieuw",actie:"",verantw:"",deadline:""},...p]);
          setNieuw(false);setForm({type:"gevaarlijk",titel:"",locatie:"",beschrijving:"",oorzaak:""});
        }} disabled={form.titel.trim().length<3}>📤 Incident melden</Btn>
      </Card>
    </div>
  );

  if(sel){
    const m=meldingen.find(x=>x.id===sel);
    return(
      <div className="fu">
        <button onClick={()=>setSel(null)} style={{background:"transparent",border:`1px solid ${C.g300}`,color:C.g700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,marginBottom:20}}>← Terug</button>
        <Card>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14,paddingBottom:12,borderBottom:`1px solid ${C.g100}`}}>
            <div style={{width:44,height:44,borderRadius:10,background:m.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{m.ico}</div>
            <div>
              <div style={{fontSize:15,fontWeight:800,color:C.g900}}>{m.titel}</div>
              <div style={{fontSize:11,color:C.g500}}>{m.datum} · {m.locatie} · {m.melder}</div>
            </div>
          </div>
          {[["Status",m.status],["Oorzaak",m.oorzaak],["Actie",m.actie],["Verantwoordelijke",m.verantw],["Deadline",m.deadline]].filter(([,v])=>v).map(([k,v])=>(
            <div key={k} style={{padding:"8px 0",borderBottom:`1px solid ${C.g100}`,display:"flex",gap:10}}>
              <span style={{fontSize:12,fontWeight:700,color:C.g500,minWidth:120}}>{k}</span>
              <span style={{fontSize:13,color:C.g800}}>{v}</span>
            </div>
          ))}
          {m.beschrijving&&<div style={{marginTop:12,background:C.g50,borderRadius:8,padding:12,fontSize:13,color:C.g700}}>{m.beschrijving}</div>}
        </Card>
      </div>
    );
  }

  return(
    <div className="fu">
      <SH sub={`${meldingen.filter(m=>m.status!=="afgehandeld").length} open`}>Incidenten</SH>
      <div style={{marginBottom:16}}><Btn onClick={()=>setNieuw(true)}>+ Incident melden</Btn></div>
      {[["Open",meldingen.filter(m=>m.status!=="afgehandeld")],["Afgehandeld",meldingen.filter(m=>m.status==="afgehandeld")]].map(([tit,lijst])=>lijst.length>0&&(
        <div key={tit} style={{marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:700,color:C.g500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>{tit}</div>
          {lijst.map(m=>(
            <Card key={m.id} className="rh" onClick={()=>setSel(m.id)} style={{marginBottom:7,cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:38,height:38,borderRadius:9,background:m.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{m.ico}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:C.g900}}>{m.titel}</div>
                <div style={{fontSize:11,color:C.g500}}>{m.datum} · {m.locatie}</div>
              </div>
              <Tag label={m.status} color={m.status==="afgehandeld"?C.green:C.amber}/>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── BEHEER (ADMIN) ───────────────────────────────────────────────────────────
function Beheer(){
  const [tab,setTab]=useState("attesten");
  const [zoek,setZoek]=useState("");
  const [sel,setSel]=useState(null);
  const [editData,setEditData]=useState(null);
  const [saved,setSaved]=useState({});

  // Lokale state voor attesten aanpassingen
  const [attestWijzigingen,setAttestWijzigingen]=useState({});

  const gef=TA.filter(m=>zoek===''||m.nm.toLowerCase().includes(zoek.toLowerCase())||m.fn.toLowerCase().includes(zoek.toLowerCase()));

  const slaOp=(medId,attIdx,veld,waarde)=>{
    setAttestWijzigingen(p=>({...p,[`${medId}_${attIdx}_${veld}`]:waarde}));
    setSaved(p=>({...p,[`${medId}_${attIdx}`]:false}));
    setTimeout(()=>setSaved(p=>({...p,[`${medId}_${attIdx}`]:true})),800);
  };

  const getVal=(medId,attIdx,veld,standaard)=>
    attestWijzigingen[`${medId}_${attIdx}_${veld}`]!==undefined?attestWijzigingen[`${medId}_${attIdx}_${veld}`]:standaard;

  return(
    <div className="fu">
      <SH sub="Enkel zichtbaar voor admin">🔧 Beheerspaneel</SH>

      {/* Tabs */}
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        {[["attesten","📊 Attesten"],["ehbo","🩺 EHBO-nummers"],["info","ℹ️ Info"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{padding:"8px 16px",borderRadius:20,border:`1.5px solid ${tab===k?C.clay:C.g300}`,background:tab===k?C.clay:"transparent",color:tab===k?C.white:C.g500,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{l}</button>
        ))}
      </div>

      {tab==="attesten"&&(
        <>
          <div style={{background:C.amberL,border:`1px solid ${C.amber}44`,borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:12,color:C.amber,fontWeight:600}}>
            💡 Klik op een medewerker om attesten te bekijken en vervaldatums aan te passen.
          </div>
          <input value={zoek} onChange={e=>setZoek(e.target.value)} placeholder="Zoek medewerker..." style={{width:"100%",border:`1.5px solid ${C.g300}`,borderRadius:7,padding:"9px 12px",fontSize:13,marginBottom:12}}/>
          {sel?(() => {
            const m=TA.find(x=>x.id===sel);
            return(
              <div>
                <button onClick={()=>setSel(null)} style={{background:"transparent",border:`1px solid ${C.g300}`,color:C.g700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,marginBottom:16}}>← Terug lijst</button>
                <Card>
                  <div style={{fontSize:15,fontWeight:800,color:C.g900,marginBottom:4}}>{m.nm}</div>
                  <div style={{fontSize:12,color:C.clay,marginBottom:14}}>{m.fn}</div>
                  {m.at.map((a,i)=>(
                    <div key={i} style={{marginBottom:12,padding:"10px 12px",background:C.g50,borderRadius:8,border:`1px solid ${C.g100}`}}>
                      <div style={{fontSize:13,fontWeight:700,color:C.g900,marginBottom:8}}>{a.n}</div>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <div style={{flex:1}}>
                          <div style={{fontSize:11,color:C.g500,marginBottom:4}}>Vervaldatum</div>
                          <input type="text" defaultValue={getVal(m.id,i,"v",a.v)} onChange={e=>slaOp(m.id,i,"v",e.target.value)} placeholder="dd/mm/jjjj" style={{width:"100%",border:`1.5px solid ${C.g300}`,borderRadius:6,padding:"7px 10px",fontSize:13}}/>
                        </div>
                        <div style={{paddingTop:16}}>
                          {saved[`${m.id}_${i}`]===true&&<span style={{fontSize:11,color:C.green,fontWeight:700}}>✅ Opgeslagen</span>}
                          {saved[`${m.id}_${i}`]===false&&<span style={{fontSize:11,color:C.amber}}>💾 Bezig...</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{background:C.amberL,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.amber,fontWeight:600,marginTop:8}}>
                    ⚠ Wijzigingen zijn tijdelijk (sessie). Voor permanente opslag koppel een database of exporteer naar Excel.
                  </div>
                </Card>
              </div>
            );
          })()
          : gef.map(m=>{
            const nV=m.at.filter(a=>a.s==="verlopen").length;
            const nB=m.at.filter(a=>a.s==="binnenkort").length;
            const kA=nV>0?C.red:nB>0?C.amber:C.green;
            return(
              <Card key={m.id} className="rh" onClick={()=>setSel(m.id)} style={{marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",cursor:"pointer"}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <Av i={m.av} s={32} c={kA}/>
                  <div><div style={{fontSize:13,fontWeight:700,color:C.g900}}>{m.nm}</div><div style={{fontSize:11,color:C.g500}}>{m.fn}</div></div>
                </div>
                <div style={{display:"flex",gap:5}}>
                  {nV>0&&<Tag label={`${nV} ✗`} color={C.red}/>}
                  {nB>0&&<Tag label={`${nB} ⏰`} color={C.amber}/>}
                  <span style={{color:C.g300}}>→</span>
                </div>
              </Card>
            );
          })}
        </>
      )}

      {tab==="ehbo"&&(
        <>
          <div style={{background:C.amberL,border:`1px solid ${C.amber}44`,borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:12,color:C.amber,fontWeight:600}}>
            💡 GSM-nummers EHBO'ers aanvullen. Nummers worden hier weergegeven en in de contactenpagina.
          </div>
          {EHBO.map((e,i)=>(
            <Card key={i} style={{marginBottom:8}}>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:C.clay+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:C.clay,flexShrink:0}}>{e.av}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.g900}}>{e.nm}</div>
                  <div style={{fontSize:11,color:C.g500,marginBottom:6}}>{e.zone}</div>
                  <input type="tel" defaultValue={e.tel} placeholder="GSM-nummer" style={{width:"100%",border:`1.5px solid ${C.g300}`,borderRadius:6,padding:"6px 10px",fontSize:12}}/>
                </div>
              </div>
            </Card>
          ))}
          <div style={{background:C.amberL,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.amber,marginTop:8}}>
            ⚠ Wijzigingen zijn tijdelijk. Exporteer naar Excel voor permanente opslag.
          </div>
        </>
      )}

      {tab==="info"&&(
        <Card>
          <div style={{fontSize:14,fontWeight:700,color:C.g900,marginBottom:14}}>Over Argex Safety</div>
          {[
            ["App versie","v2.0 — Maart 2026"],
            ["Medewerkers in systeem",`${TA.length}`],
            ["EHBO-hulpverleners","18 (F-NP-011 v1)"],
            ["Vertrouwenspersonen","5 intern + Liantis extern"],
            ["Noodscenario's",`${NS.length}`],
            ["Procedures/VIK's",`${PR.length}`],
            ["Toolboxen",`${TB.length}`],
            ["CPBW verslagen",`${CPBW.length}`],
            ["Preventieadviseur","Bert Verbraecken — bert.verbraecken@argex.be"],
            ["Liantis contact","Charlotte Van Assche — +32 3 886 05 78"],
            ["Site","Argex NV · Krijgsbaan 372 · 2070 Burcht/Zwijndrecht"],
          ].map(([k,v])=>(
            <div key={k} style={{padding:"8px 0",borderBottom:`1px solid ${C.g100}`,display:"flex",gap:10,flexWrap:"wrap"}}>
              <span style={{fontSize:12,fontWeight:700,color:C.g500,minWidth:170}}>{k}</span>
              <span style={{fontSize:13,color:C.g800}}>{v}</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ─── NAVIGATIE ────────────────────────────────────────────────────────────────
const NAV=[
  {id:"dashboard",  ico:"⊞", lbl:"Home",     roles:["admin","leidinggevende","medewerker"]},
  {id:"toolboxen",  ico:"🎬", lbl:"Toolbox",  roles:["admin","leidinggevende","medewerker"]},
  {id:"opleidingen",ico:"🎓", lbl:"Opleiding",roles:["admin","leidinggevende","medewerker"]},
  {id:"bibliotheek",ico:"📚", lbl:"Procedure",roles:["admin","leidinggevende","medewerker"]},
  {id:"contacten",  ico:"🩺", lbl:"EHBO",     roles:["admin","leidinggevende","medewerker"]},
  {id:"noodplan",   ico:"🚨", lbl:"Noodplan", roles:["admin","leidinggevende","medewerker"]},
  {id:"incidenten", ico:"⚠️", lbl:"Incident", roles:["admin","leidinggevende","medewerker"]},
  {id:"comite",     ico:"📋", lbl:"CPBW",     roles:["admin","leidinggevende"]},
  {id:"beheer",     ico:"🔧", lbl:"Beheer",   roles:["admin"]},
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function MainApp({user,onLogout}){
  const [tab,setTab]=useState("dashboard");
  const nav=NAV.filter(n=>n.roles.includes(user.role));
  const render=()=>{
    switch(tab){
      case "dashboard":   return <Dashboard user={user} setTab={setTab}/>;
      case "toolboxen":   return <Toolboxen/>;
      case "opleidingen": return <Opleidingen user={user}/>;
      case "bibliotheek": return <Bibliotheek/>;
      case "contacten":   return <Contacten/>;
      case "noodplan":    return <Noodplan/>;
      case "incidenten":  return <Incidenten user={user}/>;
      case "comite":      return <Comite/>;
      case "beheer":      return <Beheer/>;
      default:            return <Dashboard user={user} setTab={setTab}/>;
    }
  };
  return(
    <div style={{display:"flex",height:"100vh",background:C.bg,fontFamily:"'Work Sans',sans-serif",color:C.g900}}>
      <div style={{width:66,background:`linear-gradient(180deg,${C.clayDp} 0%,${C.clayD} 100%)`,display:"flex",flexDirection:"column",alignItems:"center",paddingTop:12,flexShrink:0}}>
        <div style={{marginBottom:12}}><Logo sz={34}/></div>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:1,width:"100%",padding:"0 5px",overflowY:"auto"}}>
          {nav.map(n=>(
            <button key={n.id} onClick={()=>setTab(n.id)} style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"7px 3px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",background:tab===n.id?"rgba(255,255,255,.2)":"transparent",marginBottom:1}}>
              <span style={{fontSize:16}}>{n.ico}</span>
              <span style={{fontSize:7,fontWeight:700,letterSpacing:".03em",textTransform:"uppercase",color:tab===n.id?"rgba(255,255,255,1)":"rgba(255,255,255,.4)"}}>{n.lbl.substring(0,7)}</span>
            </button>
          ))}
        </div>
        <div style={{padding:"10px 5px",borderTop:"1px solid rgba(255,255,255,.15)",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:C.white}}>{user.av}</div>
          <button onClick={onLogout} style={{fontSize:7,color:"rgba(255,255,255,.35)",background:"transparent",border:"none",cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase"}}>Uit</button>
        </div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{height:50,background:C.white,borderBottom:`1px solid #E8D8CC`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",flexShrink:0,boxShadow:"0 2px 6px rgba(193,68,14,.06)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{fontSize:15,fontWeight:800,color:C.g900}}>Argex Safety</div>
            <div style={{fontSize:11,color:C.g500}}>· Burcht / Zwijndrecht</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Tag label={user.role} color={C.clay}/>
            <span style={{fontSize:12,color:C.g700,fontWeight:700}}>{user.nm}</span>
            <div style={{width:7,height:7,borderRadius:"50%",background:C.green}}/>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:20}}>{render()}</div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App(){
  const [user,setUser]=useState(null);
  return(
    <>
      <style>{css}</style>
      {!user
        ? <Login onLogin={u=>setUser(u)}/>
        : <MainApp user={user} onLogout={()=>setUser(null)}/>
      }
    </>
  );
}
