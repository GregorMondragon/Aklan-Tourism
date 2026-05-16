import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/details.css";
import DestinationMap from "./DestinationMap";
import { destinations } from "../../data/destinations";
import {
    LuMapPin, LuBus, LuTrendingUp, LuWaves, LuTreePalm, LuSunrise,
    LuShell, LuWind, LuFish, LuDroplets, LuAnchor, LuSparkles,
    LuBird, LuMountain, LuCompass, LuTent, LuCloudRain, LuThermometer,
    LuFlame, LuTheater, LuMusic, LuPartyPopper, LuChurch, LuHeart,
    LuHistory, LuShield, LuBird as LuDove, LuGem, LuTrees, LuLeaf, LuSailboat, LuArrowLeft, LuArrowRight, LuX
} from "react-icons/lu";

const easeOut = [0.16, 1, 0.3, 1];

// ── Extended destination data with detail info ──
const destinationDetails = {
    1: {
        name: "Boracay White Beach",
        location: "Malay, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay1.jpg",
            "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay2.jpeg",
            "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay3.jpg",
            "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay4.jpg",
            "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay5.webp",
        ],
        access: "Via ferry from Caticlan or Roxas Port",
        popularity: "World-Class / Beach",
        locationDetail: "Malay, Aklan (20-min ferry ride from Caticlan)",
        mapQuery: "Boracay White Beach, Malay, Aklan",
        characteristics: ["4km White Sand Shoreline", "Sunset Paraw Sailing", "Vibrant Station Nightlife"],
        characteristicIcons: [<LuTreePalm />, <LuSailboat />, <LuSunrise />],
        insiderTips: [
            "Visit Station 1 for the finest, most powdery white sand.",
            "Sunrise at Station 3 is peaceful and far from the crowds.",
            "Try the Calamansi Muffin from local Talipapa bakeries.",
            "Book island hopping tours early morning for the best rates.",
        ],
        nearbyWonders: [
            { name: "Puka Shell Beach", time: "15 mins away", image: "/Images/aklantourismpictures/Puka%20Shell%20Beach/puka2.webp" },
            { name: "Ariel's Point", time: "45 mins by boat", image: "/Images/aklantourismpictures/ArielsPoint/Ariel1.webp" },
        ],
    },
    2: {
        name: "Puka Shell Beach",
        location: "Yapak, Boracay, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Puka%20Shell%20Beach/puka1.jpg",
            "/Images/aklantourismpictures/Puka%20Shell%20Beach/puka2.webp",
            "/Images/aklantourismpictures/Puka%20Shell%20Beach/puka3.webp",
            "/Images/aklantourismpictures/Puka%20Shell%20Beach/puka4.webp",
            "/Images/aklantourismpictures/Puka%20Shell%20Beach/puka2.webp",
        ],
        access: "Via tricycle or e-bike from White Beach Stations",
        popularity: "High / Peaceful & Natural",
        locationDetail: "Yapak, northern tip of Boracay Island",
        mapQuery: "Puka Shell Beach, Boracay, Aklan",
        characteristics: ["Natural Puka Shell Sand", "Deep Crystal Blue Water", "Unspoiled & Uncrowded"],
        characteristicIcons: [<LuShell />, <LuWaves />, <LuTreePalm />],
        insiderTips: [
            "Best for sunset watching away from White Beach crowds.",
            "Bring your own food; fewer commercial dining options here.",
            "Visit early morning for the flattest, calmest waters.",
            "Leave shells where you find them to protect the ecosystem.",
        ],
        nearbyWonders: [
            { name: "Boracay White Beach", time: "20 mins by tricycle", image: "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay1.jpg" },
            { name: "Ariel's Point", time: "45 mins by boat", image: "/Images/aklantourismpictures/ArielsPoint/Ariel1.webp" },
        ],
    },
    3: {
        name: "Hinugtan Beach",
        location: "Buruanga, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Hinugtan%20Beach/hinugtan1.jpg",
            "/Images/aklantourismpictures/Hinugtan%20Beach/hinugtan2.jpg",
            "/Images/aklantourismpictures/Hinugtan%20Beach/hinugtan3.jpg",
            "/Images/aklantourismpictures/Hinugtan%20Beach/hinugtan4.jpg",
            "/Images/aklantourismpictures/Hinugtan%20Beach/hinugtan5.jpg",
        ],
        access: "Via boat from Buruanga town proper (30-min ride)",
        popularity: "Hidden Gem / Secluded",
        locationDetail: "Buruanga, Aklan (western coast)",
        mapQuery: "Hinugtan Beach, Buruanga, Aklan",
        characteristics: ["White Sand & Rock Formations", "Vibrant Marine Life", "Completely Secluded"],
        characteristicIcons: [<LuGem />, <LuFish />, <LuShield />],
        insiderTips: [
            "Only accessible by boat — arrange with locals in Buruanga.",
            "Snorkeling near the shore reveals colorful coral gardens.",
            "Stay until dusk for a private, spectacular Aklan sunset.",
            "Bring your own gear, food, and freshwater.",
        ],
        nearbyWonders: [
            { name: "Ariel's Point", time: "20 mins by boat", image: "/Images/aklantourismpictures/ArielsPoint/Ariel1.webp" },
            { name: "Boracay White Beach", time: "45 mins by boat", image: "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay1.jpg" },
        ],
    },
    4: {
        name: "Jawili Beach",
        location: "Jawili, Tangalan, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Jawili%20Beach/jawili1.webp",
            "/Images/aklantourismpictures/Jawili%20Beach/jawili2.jpg",
            "/Images/aklantourismpictures/Jawili%20Beach/jawili3.jpg",
            "/Images/aklantourismpictures/Jawili%20Beach/jawili4.webp",
            "/Images/aklantourismpictures/Jawili%20Beach/jawili5.jpg",
        ],
        access: "Via van or jeepney from Kalibo (45-min drive)",
        popularity: "Moderate / Local Favorite",
        locationDetail: "Tangalan, Aklan (northern coast)",
        mapQuery: "Jawili Beach, Tangalan, Aklan",
        characteristics: ["Adjacent to Jawili Falls", "Calm & Shallow Shore", "Fresh Seafood Restaurants"],
        characteristicIcons: [<LuWaves />, <LuAnchor />, <LuFish />],
        insiderTips: [
            "Combine with a Jawili Falls visit — they are a 5-minute walk apart.",
            "Known for very affordable fresh seafood along the beachfront.",
            "Ideal for families with small children due to calm, shallow water.",
            "Weekdays are much quieter and more peaceful than weekends.",
        ],
        nearbyWonders: [
            { name: "Jawili Falls", time: "5 mins walk", image: "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls1.png" },
            { name: "Bakhawan Eco-Park", time: "45 mins away", image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan1.jpg" },
        ],
    },
    5: {
        name: "Bongbongon Beach",
        location: "Bongbongon Beach, Naasug, Malay, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Bongbongon%20Beach/bongbongon1.jpg",
            "/Images/aklantourismpictures/Bongbongon%20Beach/bongbongon2.jpg",
            "/Images/aklantourismpictures/Bongbongon%20Beach/bongbongon3.jpg",
            "/Images/aklantourismpictures/Bongbongon%20Beach/bongbongon4.jpg",
            "/Images/aklantourismpictures/Bongbongon%20Beach/bongbongon5.jpg",
        ],
        access: "Via boat from Caticlan Port or mainland Malay",
        popularity: "Hidden Gem / Snorkel Haven",
        locationDetail: "Malay mainland coast, Aklan",
        mapQuery: "Malay, Aklan",
        characteristics: ["Sea Turtle Nesting Grounds", "Intact Coral Reefs", "Pristine White Sand"],
        characteristicIcons: [<LuWaves />, <LuWaves />, <LuSparkles />],
        insiderTips: [
            "Best non-Boracay snorkeling spot in the Aklan area.",
            "High chance of spotting sea turtles in their natural habitat.",
            "A true 'secret beach' — ask locals for the exact boat route.",
            "Go early morning when the sea is calmest and clearest.",
        ],
        nearbyWonders: [
            { name: "Boracay White Beach", time: "25 mins by boat", image: "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay1.jpg" },
            { name: "Hinugtan Beach", time: "30 mins by boat", image: "/Images/aklantourismpictures/Hinugtan%20Beach/hinugtan1.jpg" },
        ],
    },
    8: {
        name: "Bakhawan Eco-Park",
        location: "Kalibo, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan1.jpg",
            "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan2.jpg",
            "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan3.jpg",
            "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan4.jpg",
            "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan5.jpg",
        ],
        access: "Via tricycle or van from Kalibo town center (20 mins)",
        popularity: "High / Eco-Tourism",
        locationDetail: "Brgy. Caano, Kalibo, Aklan (near the airport)",
        mapQuery: "Bakhawan Eco-Park, Kalibo, Aklan",
        characteristics: ["1.3km Bamboo Boardwalk", "Award-Winning Mangrove Park", "Rich Birdwatching"],
        characteristicIcons: [<LuTrees />, <LuLeaf />, <LuBird />],
        insiderTips: [
            "Walk the full boardwalk to find the hidden 'Sea Meeting Point' pavilion at the end.",
            "6:00 AM is the golden hour for birdwatching and quiet reflection.",
            "Try the Tamilok (woodworm) challenge at the souvenir stalls.",
            "Wear comfortable shoes and bring mosquito repellent.",
        ],
        nearbyWonders: [
            { name: "Jawili Falls", time: "30 mins away", image: "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls1.png" },
            { name: "St. John the Baptist Cathedral", time: "10 mins away", image: "/Images/aklantourismpictures/Cathedral/Cathedral1.jpg" },
        ],
    },
    9: {
        name: "Jawili Falls",
        location: "Tangalan, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls1.png",
            "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls2.png",
            "/Images/aklantourismpictures/Jawili%20Falls/jawilifalls3.png",
            "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls4.jpg",
            "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls5.jpg",
        ],
        access: "Via van or jeepney from Kalibo to Tangalan (45 mins)",
        popularity: "High / Natural Wonder",
        locationDetail: "Tangalan, Aklan (northern Aklan coast)",
        mapQuery: "Jawili Falls, Tangalan, Aklan",
        characteristics: ["Seven Natural Basins", "Natural Limestone Pools", "Adjacent to Jawili Beach"],
        characteristicIcons: [<LuDroplets />, <LuWaves />, <LuLeaf />],
        insiderTips: [
            "Each of the seven basins has a different depth — explore them all.",
            "The water is coolest and clearest in the early morning.",
            "Combine with a swim at Jawili Beach, just a 5-minute walk away.",
            "Entrance fee is minimal; support local guides for a better experience.",
        ],
        nearbyWonders: [
            { name: "Jawili Beach", time: "5 mins walk", image: "/Images/aklantourismpictures/Jawili%20Beach/jawili1.webp" },
            { name: "Bakhawan Eco-Park", time: "45 mins away", image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan1.jpg" },
        ],
    },
    10: {
        name: "Ariel's Point",
        location: "Buruanga, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/ArielsPoint/Ariel1.webp",
            "/Images/aklantourismpictures/ArielsPoint/Ariel2.webp",
            "/Images/aklantourismpictures/ArielsPoint/Ariel3.jpg",
            "/Images/aklantourismpictures/ArielsPoint/Ariel4.jpg",
            "/Images/aklantourismpictures/ArielsPoint/Ariel5.jpg",
        ],
        access: "Via organized tour boat from Boracay (45-min ride)",
        popularity: "High / Adventure",
        locationDetail: "Buruanga, Aklan (across from Boracay Island)",
        mapQuery: "Ariel's Point, Buruanga, Aklan",
        characteristics: ["Five Cliff Diving Platforms", "Kayaking & Snorkeling", "Inclusive Day-Trip Package"],
        characteristicIcons: [<LuTent />, <LuWaves />, <LuCompass />],
        insiderTips: [
            "Platforms range from 3m to 15m — start low and work your way up.",
            "The all-inclusive tour package includes meals and unlimited drinks.",
            "Book your boat early from Boracay; tours fill up fast in peak season.",
            "Wear water shoes — the rocks on the shoreline can be sharp.",
        ],
        nearbyWonders: [
            { name: "Hinugtan Beach", time: "20 mins by boat", image: "/Images/aklantourismpictures/Hinugtan%20Beach/hinugtan1.jpg" },
            { name: "Boracay White Beach", time: "45 mins by boat", image: "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay1.jpg" },
        ],
    },
    11: {
        name: "Nagata Falls",
        location: "Nabaoy, Malay, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/NagataFalls/Nagata1.jpg",
            "/Images/aklantourismpictures/NagataFalls/Nagata2.webp",
            "/Images/aklantourismpictures/NagataFalls/Nagata3.webp",
            "/Images/aklantourismpictures/NagataFalls/Nagata4.jpg",
            "/Images/aklantourismpictures/NagataFalls/Nagata1.jpg",
        ],
        access: "Via private vehicle or habal-habal (motorcycle taxi) from Libacao town",
        popularity: "Moderate / Off-the-beaten-path",
        locationDetail: "Nabaoy, Malay, Aklan (inland, highland municipality)",
        mapQuery: "nagata falls, Malay, Aklan",
        characteristics: ["One of Aklan's Tallest Falls", "Misty Highland Setting", "Refreshing Natural Pool"],
        characteristicIcons: [<LuCloudRain />, <LuMountain />, <LuThermometer />],
        insiderTips: [
            "Hire a local habal-habal (motorcycle taxi) from Libacao town proper.",
            "The trail requires a moderate 30-minute hike — wear sturdy footwear.",
            "Best visited after rainfall when the falls are at their most powerful.",
            "Bring a waterproof bag to protect your belongings from the mist.",
        ],
        nearbyWonders: [
            { name: "Pangihan Cave", time: "40 mins away", image: "/Images/aklantourismpictures/PangihanCave/pangihan1.jpg" },
            { name: "Boracay White Beach", time: "1 hr away", image: "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay1.jpg" },
        ],
    },
    12: {
        name: "Pangihan Cave",
        location: "Malay, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/PangihanCave/pangihan1.jpg",
            "/Images/aklantourismpictures/PangihanCave/pangihan2.jpg",
            "/Images/aklantourismpictures/PangihanCave/pangihan3.avif",
            "/Images/aklantourismpictures/PangihanCave/pangihan4.jpg",
            "/Images/aklantourismpictures/PangihanCave/pangihan5.jpg",
        ],
        access: "Via boat or trekking from Malay town proper",
        popularity: "Moderate / Hidden Gem",
        locationDetail: "Malay, Aklan (mainland area)",
        mapQuery: "Pangihan Cave, Malay, Aklan",
        characteristics: ["Eight Dramatic Chambers", "Stalactite & Stalagmite Formations", "Ancient Cave History"],
        characteristicIcons: [<LuFlame />, <LuGem />, <LuBird />],
        insiderTips: [
            "Always go with a local guide — the cave system can be disorienting.",
            "Bring a headlamp or torch as some chambers are completely dark.",
            "Wear clothes you don't mind getting muddy — some passages are tight.",
            "Respect the cave ecosystem; never touch the rock formations.",
        ],
        nearbyWonders: [
            { name: "Boracay White Beach", time: "30 mins away", image: "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay1.jpg" },
            { name: "Bongbongon Beach", time: "20 mins away", image: "/Images/aklantourismpictures/Bongbongon%20Beach/bongbongon3.jpg" },
        ],
    },
    21: {
        name: "Tagas Hills",
        location: "Kalibo, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/TagasHills/tagas1.jpg",
            "/Images/aklantourismpictures/TagasHills/tagas2.jpg",
            "/Images/aklantourismpictures/TagasHills/tagas3.jpg",
            "/Images/aklantourismpictures/TagasHills/tagas4.jpg",
            "/Images/aklantourismpictures/TagasHills/tagas5.jpg",
        ],
        access: "Via private vehicle or habal-habal from Kalibo town (30 mins)",
        popularity: "Moderate / Local Escape",
        locationDetail: "Tagas, Tangalan, Aklan (rolling highland area)",
        mapQuery: "Tagas Hills, Tagas, Tangalan, Aklan",
        characteristics: ["Panoramic Countryside Views", "Rolling Green Landscape", "Peaceful Highland Retreat"],
        characteristicIcons: [<LuSunrise />, <LuLeaf />, <LuTent />],
        insiderTips: [
            "Best visited at sunrise or sunset for the most dramatic views.",
            "Bring a picnic — the hilltop is a perfect, breezy resting spot.",
            "The winding trail to the top is a moderately easy 20-min hike.",
            "A great alternative to coastal spots for a change of scenery.",
        ],
        nearbyWonders: [
            { name: "Jawili Falls", time: "15 mins away", image: "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls1.png" },
            { name: "Jawili Beach", time: "15 mins away", image: "/Images/aklantourismpictures/Jawili%20Beach/jawili1.webp" },
        ],
    },
    16: {
        name: "Ati-Atihan Festival",
        location: "Kalibo, Aklan",
        category: "Cultural Heritage",
        images: [
            "/Images/aklantourismpictures/Atiatihan/atiatihan1.jpg",
            "/Images/aklantourismpictures/Atiatihan/atiatihan2.jpg",
            "/Images/aklantourismpictures/Atiatihan/atiatihan3.jpg",
            "/Images/aklantourismpictures/Atiatihan/atiatihan4.jpg",
            "/Images/aklantourismpictures/Atiatihan/atiatihan1.jpg",
        ],
        access: "Held annually in Kalibo town center every 3rd week of January",
        popularity: "World-Renowned / Cultural",
        locationDetail: "Kalibo, Aklan (town center and cathedral grounds)",
        mapQuery: "Kalibo Pastrana Park, Kalibo, Aklan",
        characteristics: ["Mother of All PH Festivals", "Tribal Dancing & Drumming", "Vibrant Body Painting"],
        characteristicIcons: [<LuMusic />, <LuTheater />, <LuPartyPopper />],
        insiderTips: [
            "Book accommodations 3–6 months in advance for January dates.",
            "The main street parade on the final Sunday is the grandest spectacle.",
            "Wear old, dark clothes — you will be painted by the revelers!",
            "Join a tribe group for the most authentic festival immersion.",
        ],
        nearbyWonders: [
            { name: "St. John the Baptist Cathedral", time: "5 mins walk", image: "/Images/aklantourismpictures/Cathedral/Cathedral1.jpg" },
            { name: "Bakhawan Eco-Park", time: "20 mins away", image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan1.jpg" },
        ],
    },
    18: {
        name: "St. John the Baptist Cathedral",
        location: "Kalibo, Aklan",
        category: "Cultural Heritage",
        images: [
            "/Images/aklantourismpictures/Cathedral/Cathedral1.jpg",
            "/Images/aklantourismpictures/Cathedral/Cathedral2.jpg",
            "/Images/aklantourismpictures/Cathedral/Cathedral1.jpg",
            "/Images/aklantourismpictures/Cathedral/Cathedral2.jpg",
            "/Images/aklantourismpictures/Cathedral/Cathedral1.jpg",
        ],
        access: "Located at the heart of Kalibo town center, walking distance from market",
        popularity: "High / Heritage & Faith",
        locationDetail: "Kalibo town center, Aklan",
        mapQuery: "Kalibo Cathedral, Kalibo, Aklan",
        characteristics: ["19th Century Architecture", "Center of Ati-Atihan Festival", "Active Parish Church"],
        characteristicIcons: [<LuChurch />, <LuFlame />, <LuHeart />],
        insiderTips: [
            "The cathedral is the epicenter of all Ati-Atihan Festival activities.",
            "Visit at dusk when the facade is beautifully illuminated.",
            "The interior features historic religious artwork worth seeing.",
            "Sunday masses are especially atmospheric and well-attended.",
        ],
        nearbyWonders: [
            { name: "Aklan Freedom Shrine", time: "10 mins walk", image: "/Images/aklantourismpictures/AklanFreedomShrine/shrine1.jpg" },
            { name: "Bakhawan Eco-Park", time: "20 mins away", image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan1.jpg" },
        ],
    },
    19: {
        name: "Aklan Freedom Shrine",
        location: "Kalibo, Aklan",
        category: "Cultural Heritage",
        images: [
            "/Images/aklantourismpictures/AklanFreedomShrine/shrine1.jpg",
            "/Images/aklantourismpictures/AklanFreedomShrine/shrine1.jpg",
            "/Images/aklantourismpictures/AklanFreedomShrine/shrine1.jpg",
            "/Images/aklantourismpictures/AklanFreedomShrine/shrine1.jpg",
            "/Images/aklantourismpictures/AklanFreedomShrine/shrine1.jpg",
        ],
        access: "Located in Kalibo town, easily accessible on foot or by tricycle",
        popularity: "Moderate / Historical",
        locationDetail: "Kalibo, Aklan (town center area)",
        mapQuery: "Aklan Freedom Shrine, Kalibo, Aklan",
        characteristics: ["Monument to 18 Martyrs", "Aklan Revolution History", "Peaceful Grounds"],
        characteristicIcons: [<LuHistory />, <LuShield />, <LuDove />],
        insiderTips: [
            "A solemn and significant site honoring the martyrs of the Aklan Revolution.",
            "Read the inscribed names and stories — each one is a piece of local history.",
            "Combine your visit with the nearby Kalibo Cathedral and local market.",
            "Early morning is the most peaceful time to reflect and explore.",
        ],
        nearbyWonders: [
            { name: "St. John the Baptist Cathedral", time: "10 mins walk", image: "/Images/aklantourismpictures/Cathedral/Cathedral1.jpg" },
            { name: "Bakhawan Eco-Park", time: "20 mins away", image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan1.jpg" },
        ],
    },
    22: {
        name: "Tambak Beach",
        location: "New Washington, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Tambak/109783566_3346696715362023_2547113182007389757_n.jpg",
            "/Images/aklantourismpictures/Tambak/110113405_3346697228695305_2982099613546732710_n.jpg",
            "/Images/aklantourismpictures/Tambak/110128852_3346696382028723_7856842516414236656_n.jpg",
            "/Images/aklantourismpictures/Tambak/480933490_640873748458558_5930885772803024346_n.jpg",
            "/Images/aklantourismpictures/Tambak/484329508_652231447322788_7757629871209845981_n.jpg"
        ],
        access: "Via tricycle or jeepney from Kalibo",
        popularity: "Local Favorite / Sunset Spot",
        locationDetail: "New Washington, Aklan",
        mapQuery: "Tambak Seawall, New Washington, Aklan",
        characteristics: ["Spectacular Sunsets", "Oyster (Talaba) Farms", "Long Stretch of Gray Sand"],
        characteristicIcons: [<LuSunrise />, <LuShell />, <LuWaves />],
        insiderTips: [
            "Best place in Aklan to eat fresh, incredibly cheap oysters.",
            "Visit late afternoon to catch one of the best sunsets.",
            "Walk along the seawall for a refreshing ocean breeze.",
            "Support local fishermen by buying their fresh catch."
        ],
        nearbyWonders: [
            { name: "Pink Sisters Convent", time: "10 mins away", image: "/Images/aklantourismpictures/Cathedral/Cathedral1.jpg" },
            { name: "Bakhawan Eco-Park", time: "20 mins away", image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan1.jpg" }
        ]
    },
    23: {
        name: "Bel-is Beach",
        location: "Buruanga, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Bel-is%20Cove/475771662_1163988721953631_5611669043800247066_n.jpg",
            "/Images/aklantourismpictures/Bel-is%20Cove/475772190_1163988688620301_1412781695680664861_n.jpg",
            "/Images/aklantourismpictures/Bel-is%20Cove/475816736_1163989638620206_7819688783110321438_n.jpg",
            "/Images/aklantourismpictures/Bel-is%20Cove/623557234_884399714519261_918600293049204701_n.jpg",
            "/Images/aklantourismpictures/Bel-is%20Cove/672071842_949282998030932_5117036296872628928_n.jpg"
        ],
        access: "Via boat or habal-habal from Buruanga town",
        popularity: "Hidden Gem / Rugged Coast",
        locationDetail: "Buruanga, Aklan",
        mapQuery: "Bel-is Beach, Buruanga, Aklan",
        characteristics: ["Dramatic Limestone Rocks", "Crystal-Clear Waters", "Secluded Vibe"],
        characteristicIcons: [<LuMountain />, <LuDroplets />, <LuTent />],
        insiderTips: [
            "Bring your own snorkeling gear to explore the rocky shoreline.",
            "The beach has no major commercial establishments, so pack food.",
            "A great spot for cliff jumping if you find a safe ledge.",
            "Hire a local guide for the easiest access route."
        ],
        nearbyWonders: [
            { name: "Hinugtan Beach", time: "15 mins by boat", image: "/Images/aklantourismpictures/Hinugtan%20Beach/hinugtan1.jpg" },
            { name: "Tuburan Beach", time: "10 mins away", image: "/Images/aklantourismpictures/Bongbongon%20Beach/bongbongon1.jpg" }
        ]
    },
    24: {
        name: "Diniwid Beach",
        location: "Boracay, Malay, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Diniwid%20Beach/Diniwid-Beach-Boracay.webp",
            "/Images/aklantourismpictures/Diniwid%20Beach/Diniwid-Beach-Boracay-ph-1024x768.jpg",
            "/Images/aklantourismpictures/Diniwid%20Beach/img-20180109-wa0003-largejpg.jpg",
            "/Images/aklantourismpictures/Diniwid%20Beach/img-20180109-wa0006-largejpg.jpg",
            "/Images/aklantourismpictures/Diniwid%20Beach/img-20180109-wa0007-largejpg.jpg"
        ],
        access: "Short walk from Station 1 via coastal cliff path",
        popularity: "High / Private Atmosphere",
        locationDetail: "North of Station 1, Boracay",
        mapQuery: "Diniwid Beach, Boracay, Malay, Aklan",
        characteristics: ["Serene Alternative", "Scenic Cliff Path", "Great Sunset Views"],
        characteristicIcons: [<LuTreePalm />, <LuSunrise />, <LuHeart />],
        insiderTips: [
            "Take the concrete pathway along the cliff from Station 1 for a scenic walk.",
            "A fantastic spot to watch the sunset away from the main crowd.",
            "The water gets deep quickly, making it excellent for swimming.",
            "There are a few boutique cliff-side restaurants worth trying."
        ],
        nearbyWonders: [
            { name: "Boracay White Beach", time: "5 mins walk", image: "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay1.jpg" },
            { name: "Balinghai Beach", time: "15 mins away", image: "/Images/aklantourismpictures/Puka%20Shell%20Beach/puka3.webp" }
        ]
    },
    25: {
        name: "Tuburan Beach",
        location: "Buruanga, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Tuburan%20Beach/tuburan-cove-beach-resort.jpg",
            "/Images/aklantourismpictures/Tuburan%20Beach/Tuburan-Cove-Beach-View.jpg",
            "/Images/aklantourismpictures/Tuburan%20Beach/Day-Tour-4.jpg",
            "/Images/aklantourismpictures/Tuburan%20Beach/513466820.jpg",
            "/Images/aklantourismpictures/Tuburan%20Beach/532973737.jpg"
        ],
        access: "Via local transport or boat from Buruanga proper",
        popularity: "Hidden Gem / Snorkeling Spot",
        locationDetail: "Buruanga, Aklan",
        mapQuery: "Tuburan, Buruanga, Aklan",
        characteristics: ["Multi-level Terrain", "Vibrant Coral Reefs", "Untouched Beauty"],
        characteristicIcons: [<LuFish />, <LuWaves />, <LuTreePalm />],
        insiderTips: [
            "One of the best off-the-beaten-path snorkeling spots.",
            "The reef drops off close to the shore, so be careful if not a strong swimmer.",
            "Combine your trip with a visit to Hacienda Maria.",
            "Talk to locals to arrange a small boat for deeper reef exploration."
        ],
        nearbyWonders: [
            { name: "Bel-is Beach", time: "10 mins away", image: "/Images/aklantourismpictures/Hinugtan%20Beach/hinugtan2.jpg" },
            { name: "Hacienda Maria", time: "20 mins away", image: "/Images/aklantourismpictures/TagasHills/tagas3.jpg" }
        ]
    },
    26: {
        name: "Nasog Beach",
        location: "Buruanga, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Nasog%20Beach/679881179_968332945956074_4791101603147003373_n.jpg",
            "/Images/aklantourismpictures/Nasog%20Beach/682338604_968332789289423_649898826271030777_n.jpg",
            "/Images/aklantourismpictures/Nasog%20Beach/682356281_968332749289427_4453081127291081596_n.jpg",
            "/Images/aklantourismpictures/Nasog%20Beach/682605702_968332972622738_4102136183246916567_n.jpg",
            "/Images/aklantourismpictures/Nasog%20Beach/683349214_968332839289418_5626684017391055263_n.jpg"
        ],
        access: "Via boat or trek",
        popularity: "Hidden Gem / Secluded",
        locationDetail: "Buruanga, Aklan",
        mapQuery: "Nasog, Buruanga, Aklan",
        characteristics: ["Towering Cliffs", "Castaway Feel", "Pristine White Sand"],
        characteristicIcons: [<LuMountain />, <LuGem />, <LuTreePalm />],
        insiderTips: [
            "Provides a true castaway experience; you might be the only one there.",
            "Bring all provisions as there are zero facilities.",
            "The cliffs offer great natural shade in the afternoon.",
            "Accessible via a trek or a short boat ride from nearby coves."
        ],
        nearbyWonders: [
            { name: "Ariel's Point", time: "15 mins by boat", image: "/Images/aklantourismpictures/ArielsPoint/Ariel1.webp" },
            { name: "Hinugtan Beach", time: "20 mins away", image: "/Images/aklantourismpictures/Hinugtan%20Beach/hinugtan1.jpg" }
        ]
    },
    27: {
        name: "Bugtongbato Beach",
        location: "Ibajay, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Jawili%20Beach/jawili2.jpg",
            "/Images/aklantourismpictures/Jawili%20Beach/jawili1.webp",
            "/Images/aklantourismpictures/Jawili%20Beach/jawili3.jpg",
            "/Images/aklantourismpictures/Jawili%20Beach/jawili4.webp",
            "/Images/aklantourismpictures/Jawili%20Beach/jawili5.jpg"
        ],
        access: "Via tricycle from Ibajay town proper",
        popularity: "Moderate / Local Escape",
        locationDetail: "Bugtongbato, Ibajay, Aklan",
        mapQuery: "Bugtongbato, Ibajay, Aklan",
        characteristics: ["Peaceful Coastline", "Near Mangrove Forests", "Local Fishing Community"],
        characteristicIcons: [<LuWaves />, <LuLeaf />, <LuAnchor />],
        insiderTips: [
            "Perfect place to unwind after walking through Katunggan It Ibajay.",
            "Buy fresh fish directly from the local fishermen in the morning.",
            "The beach has a rustic, very authentic local feel.",
            "Great for a quiet afternoon picnic."
        ],
        nearbyWonders: [
            { name: "Katunggan It Ibajay", time: "5 mins away", image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan3.jpg" },
            { name: "Nawidwid Falls", time: "40 mins away", image: "/Images/aklantourismpictures/NagataFalls/Nagata4.jpg" }
        ]
    },
    28: {
        name: "Balinghai Beach",
        location: "Boracay, Malay, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Balinghai%20Beach/baling-hai-beach-resort.jpg",
            "/Images/aklantourismpictures/Balinghai%20Beach/2edf.webp",
            "/Images/aklantourismpictures/Balinghai%20Beach/4f8c8567-9ee5-4b79-b876-1d5d3a2c707b.jpg",
            "/Images/aklantourismpictures/Balinghai%20Beach/95243af1-917c-4ccb-bdc7-16af1e486980.jpg",
            "/Images/aklantourismpictures/Balinghai%20Beach/ea0674e7-e1e0-4415-a593-af5321e05ba3.webp"
        ],
        access: "Via private boat or tricycle then a short walk",
        popularity: "Hidden Gem / Quiet Hideaway",
        locationDetail: "North of Boracay Island",
        mapQuery: "Balinghai Beach, Boracay, Aklan",
        characteristics: ["High Cliffs", "Tiny Secluded Cove", "Excellent Snorkeling"],
        characteristicIcons: [<LuMountain />, <LuFish />, <LuHeart />],
        insiderTips: [
            "Check the tide; the beach disappears completely during high tide.",
            "There is a small entrance fee which often includes a drink.",
            "Snorkeling right off the shore is surprisingly good.",
            "A romantic and very quiet alternative to the main beaches."
        ],
        nearbyWonders: [
            { name: "Diniwid Beach", time: "15 mins walk", image: "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay2.jpg" },
            { name: "Puka Shell Beach", time: "15 mins away", image: "/Images/aklantourismpictures/Puka%20Shell%20Beach/puka2.webp" }
        ]
    },
    29: {
        name: "Katunggan It Ibajay",
        location: "Ibajay, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Katunggan%20It%20Ibajay/481219040_940124064955102_6937643804511546447_n.jpg",
            "/Images/aklantourismpictures/Katunggan%20It%20Ibajay/481826329_940123951621780_428355974117381459_n.jpg",
            "/Images/aklantourismpictures/Katunggan%20It%20Ibajay/481897504_940123901621785_7791713799795285598_n.jpg",
            "/Images/aklantourismpictures/Katunggan%20It%20Ibajay/482028041_940123854955123_8530854302242406350_n.jpg",
            "/Images/aklantourismpictures/Katunggan%20It%20Ibajay/634587837_1520629306736757_2052436756061825296_n.jpg"
        ],
        access: "Via private vehicle or tricycle from Ibajay town",
        popularity: "High / Eco-Tourism",
        locationDetail: "Bugtongbato-Naisud, Ibajay, Aklan",
        mapQuery: "Katunggan It Ibajay, Ibajay, Aklan",
        characteristics: ["Massive Eco-Park", "Ancient Mangroves", "Bamboo Boardwalk"],
        characteristicIcons: [<LuTrees />, <LuLeaf />, <LuBird />],
        insiderTips: [
            "Walk the 800-meter bamboo bridge through different species of mangroves.",
            "Look out for centuries-old Api-api mangroves.",
            "Bring insect repellent as it is a natural wetland.",
            "A very educational experience; consider hiring a local guide."
        ],
        nearbyWonders: [
            { name: "Bugtongbato Beach", time: "5 mins away", image: "/Images/aklantourismpictures/Jawili%20Beach/jawili2.jpg" },
            { name: "Nawidwid Falls", time: "45 mins away", image: "/Images/aklantourismpictures/NagataFalls/Nagata4.jpg" }
        ]
    },
    30: {
        name: "Hurom-Hurom Cold Springs",
        location: "Nabas, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/HuromHurom/480959931_940390788261763_2908836783542573643_n.jpg",
            "/Images/aklantourismpictures/HuromHurom/481256425_940390848261757_4332467705713792148_n.jpg",
            "/Images/aklantourismpictures/HuromHurom/481681403_940391038261738_6567048676758924583_n.jpg",
            "/Images/aklantourismpictures/HuromHurom/482032187_940391108261731_2806685250211758663_n.jpg",
            "/Images/aklantourismpictures/HuromHurom/480959931_940390788261763_2908836783542573643_n.jpg"
        ],
        access: "Via tricycle from Nabas town proper",
        popularity: "High / Local Favorite",
        locationDetail: "Laserna, Nabas, Aklan",
        mapQuery: "Hurom-Hurom Cold Springs, Nabas, Aklan",
        characteristics: ["Icy Mountain Water", "Natural Pools", "Shaded by Forest Canopy"],
        characteristicIcons: [<LuThermometer />, <LuDroplets />, <LuLeaf />],
        insiderTips: [
            "The water is freezing cold and incredibly refreshing on a hot day.",
            "Rent a cottage to have a picnic with your group.",
            "Weekends can get crowded with locals, so visit on a weekday.",
            "The spring water flows directly from the mountain and is very clean."
        ],
        nearbyWonders: [
            { name: "Boracay White Beach", time: "45 mins away", image: "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay1.jpg" },
            { name: "Pangihan Cave", time: "30 mins away", image: "/Images/aklantourismpictures/PangihanCave/pangihan1.jpg" }
        ]
    },
    31: {
        name: "Likitinon White Rocks",
        location: "Madalag, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Likitnon%20White%20Rocks/629030507_909714898241107_7462087926139520794_n.jpg",
            "/Images/aklantourismpictures/Likitnon%20White%20Rocks/631317948_909714758241121_5721954838798052125_n.jpg",
            "/Images/aklantourismpictures/Likitnon%20White%20Rocks/631317960_909714648241132_4973584232004898790_n.jpg",
            "/Images/aklantourismpictures/Likitnon%20White%20Rocks/632045880_909714764907787_5937049807231468370_n.jpg",
            "/Images/aklantourismpictures/Likitnon%20White%20Rocks/632802622_909714701574460_6568736446911138659_n.jpg"
        ],
        access: "Via habal-habal from Madalag town center",
        popularity: "Hidden Gem / Pristine River",
        locationDetail: "Timbaban River, Madalag, Aklan",
        mapQuery: "Madalag, Aklan",
        characteristics: ["Bone-White Boulders", "Natural Stone Bath Tubs", "Pristine River Waters"],
        characteristicIcons: [<LuMountain />, <LuWaves />, <LuSparkles />],
        insiderTips: [
            "The natural stone tubs created by the river are perfect for lounging.",
            "The contrast of white rocks and emerald water is a photographer's dream.",
            "Be mindful of river currents during the rainy season.",
            "Accessible via a short hike; wear suitable footwear."
        ],
        nearbyWonders: [
            { name: "Agtughangin Falls", time: "30 mins away", image: "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls5.jpg" },
            { name: "The Wild River", time: "1 hr away", image: "/Images/aklantourismpictures/NagataFalls/Nagata1.jpg" }
        ]
    },
    32: {
        name: "The Wild River",
        location: "Libacao, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/NagataFalls/Nagata1.jpg",
            "/Images/aklantourismpictures/NagataFalls/Nagata2.webp",
            "/Images/aklantourismpictures/NagataFalls/Nagata3.webp",
            "/Images/aklantourismpictures/TagasHills/tagas4.jpg",
            "/Images/aklantourismpictures/NagataFalls/Nagata4.jpg"
        ],
        access: "Via organized tour or habal-habal from Libacao town",
        popularity: "Moderate / Adventure",
        locationDetail: "Upper Aklan River, Libacao",
        mapQuery: "Libacao, Aklan",
        characteristics: ["Bamboo Rafting", "Kayaking", "Clear Rushing Waters"],
        characteristicIcons: [<LuWaves />, <LuTent />, <LuMountain />],
        insiderTips: [
            "Bamboo rafting is the signature activity here — highly recommended.",
            "The water is cleanest and clearest during the dry months.",
            "Coordinate with the local tourism office in Libacao for guides.",
            "A great adventure for groups looking for an adrenaline rush."
        ],
        nearbyWonders: [
            { name: "Taroytoy", time: "45 mins away", image: "/Images/aklantourismpictures/TagasHills/tagas2.jpg" },
            { name: "Nagata Falls", time: "30 mins away", image: "/Images/aklantourismpictures/NagataFalls/Nagata1.jpg" }
        ]
    },
    33: {
        name: "Hacienda Maria",
        location: "Buruanga, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Hacienda%20Maria/hacienda-maria.jpg",
            "/Images/aklantourismpictures/Hacienda%20Maria/621763593_1553217269500657_2065525198395980864_n.jpg",
            "/Images/aklantourismpictures/Hacienda%20Maria/71097285_2640602139304821_5974080632907628544_n.jpg",
            "/Images/aklantourismpictures/Hacienda%20Maria/71543906_2640602059304829_4516062376922972160_n.jpg",
            "/Images/aklantourismpictures/Hacienda%20Maria/71733310_2640602002638168_7599147218053890048_n.jpg"
        ],
        access: "Via private vehicle or tricycle from Buruanga town",
        popularity: "Moderate / Eco-Tourism",
        locationDetail: "Sitio Sapsapon, Buruanga, Aklan",
        mapQuery: "Hacienda Maria, Buruanga, Aklan",
        characteristics: ["Hot Pot Kawa Baths", "Cave Exploration", "Lush Eco-Park"],
        characteristicIcons: [<LuFlame />, <LuGem />, <LuTrees />],
        insiderTips: [
            "The kawa hot bath (giant cauldron) is a must-try relaxing experience.",
            "The property includes waterfalls and caves you can explore.",
            "They offer local coffee and traditional Aklanon meals.",
            "A great day-trip alternative to Boracay's beaches."
        ],
        nearbyWonders: [
            { name: "Ignito Cave", time: "15 mins away", image: "/Images/aklantourismpictures/PangihanCave/pangihan1.jpg" },
            { name: "Ariel's Point", time: "30 mins away", image: "/Images/aklantourismpictures/ArielsPoint/Ariel1.webp" }
        ]
    },
    34: {
        name: "Nawidwid Falls",
        location: "Ibajay, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Nawidwid%20Falls/104746955_3253161584715537_6259371522469927383_n.jpg",
            "/Images/aklantourismpictures/Nawidwid%20Falls/515438970_1032474065720101_1945848524233251953_n.jpg",
            "/Images/aklantourismpictures/Nawidwid%20Falls/515442132_1032474035720104_868201723996992669_n.jpg",
            "/Images/aklantourismpictures/Nawidwid%20Falls/515942444_1032474099053431_573819171553116554_n.jpg",
            "/Images/aklantourismpictures/Nawidwid%20Falls/516392046_1032474085720099_1415313535077880089_n.jpg"
        ],
        access: "Via habal-habal and a trek from Ibajay town",
        popularity: "Hidden Gem / Adventure",
        locationDetail: "Ibajay, Aklan",
        mapQuery: "Ibajay, Aklan",
        characteristics: ["50-Meter Waterfall", "Fine White Veil Look", "Scenic Forest Trek"],
        characteristicIcons: [<LuCloudRain />, <LuMountain />, <LuTrees />],
        insiderTips: [
            "The trek takes about an hour through lush forest — hire a local guide.",
            "The falls look like a delicate white veil cascading down the rocks.",
            "Wear sturdy hiking shoes as the trail can be slippery.",
            "Bring your own food and water."
        ],
        nearbyWonders: [
            { name: "Katunggan It Ibajay", time: "45 mins away", image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan3.jpg" },
            { name: "Bugtongbato Beach", time: "40 mins away", image: "/Images/aklantourismpictures/Jawili%20Beach/jawili2.jpg" }
        ]
    },
    35: {
        name: "Agtughangin Falls",
        location: "Madalag, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Agtughangin%20Falls/473441179_1602224663768747_78892200000384043_n.jpg",
            "/Images/aklantourismpictures/Agtughangin%20Falls/473241276_1602224630435417_9195318197119738140_n.jpg",
            "/Images/aklantourismpictures/Agtughangin%20Falls/473251281_1602224740435406_5943649047134012408_n.jpg",
            "/Images/aklantourismpictures/Agtughangin%20Falls/472863152_1602224923768721_7686583794479468936_n.jpg",
            "/Images/aklantourismpictures/Agtughangin%20Falls/473441179_1602224663768747_78892200000384043_n.jpg"
        ],
        access: "Via habal-habal and trekking from Madalag town",
        popularity: "Hidden Gem / Remote Spa",
        locationDetail: "Madalag, Aklan",
        mapQuery: "Madalag, Aklan",
        characteristics: ["Multi-tiered Waterfall", "Nature Spa Experience", "Heart of the Jungle"],
        characteristicIcons: [<LuDroplets />, <LuLeaf />, <LuHeart />],
        insiderTips: [
            "A remote location that rewards you with pristine, untouched nature.",
            "The multiple tiers create natural massage pools.",
            "A local guide is absolutely necessary for the trek.",
            "Perfect for true nature lovers and adventurers."
        ],
        nearbyWonders: [
            { name: "Likitinon White Rocks", time: "30 mins away", image: "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls1.png" },
            { name: "The Wild River", time: "1.5 hrs away", image: "/Images/aklantourismpictures/NagataFalls/Nagata1.jpg" }
        ]
    },
    36: {
        name: "Taroytoy",
        location: "Libacao, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Manika%20View%20Point/471872730_981765187304945_6682641866142722207_n.jpg",
            "/Images/aklantourismpictures/Manika%20View%20Point/474111050_1211954197376854_5863120395157968407_n.jpg",
            "/Images/aklantourismpictures/Manika%20View%20Point/481424155_662258989702474_1832334887219089487_n.jpg",
            "/Images/aklantourismpictures/Manika%20View%20Point/487472497_10162045924237479_2886484921550018943_n.jpg",
            "/Images/aklantourismpictures/Manika%20View%20Point/487740649_10162045924347479_7374235091738210083_n.jpg"
        ],
        access: "Via robust vehicle or habal-habal from Libacao town",
        popularity: "Moderate / Highland Retreat",
        locationDetail: "Oyang, Libacao, Aklan",
        mapQuery: "Libacao, Aklan",
        characteristics: ["Summer Capital of Aklan", "Cool Climate", "Pine-Covered Ridges"],
        characteristicIcons: [<LuThermometer />, <LuMountain />, <LuTrees />],
        insiderTips: [
            "Expect temperatures to be significantly cooler than the lowlands.",
            "The pine trees give it a Baguio-like atmosphere.",
            "Great for camping and stargazing on clear nights.",
            "The road up can be rough; a 4x4 or skilled habal-habal driver is best."
        ],
        nearbyWonders: [
            { name: "The Wild River", time: "45 mins away", image: "/Images/aklantourismpictures/NagataFalls/Nagata1.jpg" },
            { name: "Nagata Falls", time: "1 hr away", image: "/Images/aklantourismpictures/NagataFalls/Nagata1.jpg" }
        ]
    },
    37: {
        name: "Ignito Cave",
        location: "Buruanga, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Ignito%20Cave/da.jpg",
            "/Images/aklantourismpictures/PangihanCave/pangihan1.jpg",
            "/Images/aklantourismpictures/PangihanCave/pangihan3.avif",
            "/Images/aklantourismpictures/PangihanCave/pangihan4.jpg",
            "/Images/aklantourismpictures/Ignito%20Cave/da.jpg"
        ],
        access: "Via tricycle from Buruanga town",
        popularity: "Moderate / Spelunking",
        locationDetail: "Buruanga, Aklan",
        mapQuery: "Buruanga, Aklan",
        characteristics: ["Cathedral Cave", "Massive Chambers", "Stalactites"],
        characteristicIcons: [<LuGem />, <LuFlame />, <LuTent />],
        insiderTips: [
            "Known as the Cathedral Cave due to its incredibly high ceilings.",
            "Local guides will point out sparkling stalactite formations.",
            "Relatively easy to explore compared to other extreme caves.",
            "Bring a good flashlight for better photography."
        ],
        nearbyWonders: [
            { name: "Hacienda Maria", time: "15 mins away", image: "/Images/aklantourismpictures/TagasHills/tagas3.jpg" },
            { name: "Bel-is Beach", time: "20 mins away", image: "/Images/aklantourismpictures/Hinugtan%20Beach/hinugtan2.jpg" }
        ]
    },
    38: {
        name: "Tigayon Hill and Cave",
        location: "Kalibo, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Tigayon%20Hill/656990529_1623311716226189_2629647892052794458_n.jpg",
            "/Images/aklantourismpictures/Tigayon%20Hill/658207923_1623311092892918_110590551120680400_n.jpg",
            "/Images/aklantourismpictures/Tigayon%20Hill/658697707_1623311209559573_3171892070154282525_n.jpg",
            "/Images/aklantourismpictures/Tigayon%20Hill/663297228_1623312419559452_2449415081494028929_n.jpg",
            "/Images/aklantourismpictures/Tigayon%20Hill/656990529_1623311716226189_2629647892052794458_n.jpg"
        ],
        access: "Via tricycle from Kalibo town proper",
        popularity: "High / Historic Site",
        locationDetail: "Tigayon, Kalibo, Aklan",
        mapQuery: "Tigayon Hill, Kalibo, Aklan",
        characteristics: ["Highest Point in Kalibo", "Lush Green Escape", "Historical Cave"],
        characteristicIcons: [<LuMountain />, <LuHistory />, <LuTrees />],
        insiderTips: [
            "Climb the stairs to the top for a panoramic view of the Aklan River.",
            "The cave at the base was a former secret sanctuary.",
            "A very accessible nature trip just minutes from the Kalibo center.",
            "Great for a morning jog or leisurely walk."
        ],
        nearbyWonders: [
            { name: "Bakhawan Eco-Park", time: "15 mins away", image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan1.jpg" },
            { name: "Museo it Akean", time: "10 mins away", image: "/Images/aklantourismpictures/Cathedral/Cathedral2.jpg" }
        ]
    },
    39: {
        name: "Museo it Akean",
        location: "Kalibo, Aklan",
        category: "Cultural Heritage",
        images: [
            "/Images/aklantourismpictures/Museo%20it%20Akean/480812595_937098781924297_1707131676346158553_n.jpg",
            "/Images/aklantourismpictures/Museo%20it%20Akean/481164931_937098728590969_1048713327717664702_n.jpg",
            "/Images/aklantourismpictures/Museo%20it%20Akean/481166773_937098751924300_4327903514844535398_n.jpg",
            "/Images/aklantourismpictures/Museo%20it%20Akean/481264729_937098871924288_7245491824765619497_n.jpg",
            "/Images/aklantourismpictures/Museo%20it%20Akean/481470225_937098731924302_8541805062015916979_n.jpg"
        ],
        access: "Located at the town center, walking distance from the plaza",
        popularity: "High / Historical",
        locationDetail: "Martelino St., Kalibo, Aklan",
        mapQuery: "Museo it Akean, Kalibo, Aklan",
        characteristics: ["19th-Century Building", "Aklan History", "Piña Weaving Exhibits"],
        characteristicIcons: [<LuHistory />, <LuShield />, <LuGem />],
        insiderTips: [
            "The museum building itself is a beautifully preserved piece of history.",
            "Don't miss the exhibit on Piña weaving, Aklan's signature textile.",
            "A great starting point to understand Aklanon culture before exploring.",
            "Check their schedule as they are closed on certain days."
        ],
        nearbyWonders: [
            { name: "St. John the Baptist Cathedral", time: "5 mins walk", image: "/Images/aklantourismpictures/Cathedral/Cathedral1.jpg" },
            { name: "Aklan Freedom Shrine", time: "5 mins walk", image: "/Images/aklantourismpictures/AklanFreedomShrine/shrine1.jpg" }
        ]
    },
    40: {
        name: "Pink Sisters Convent",
        location: "New Washington, Aklan",
        category: "Cultural Heritage",
        images: [
            "/Images/aklantourismpictures/Cathedral/Cathedral1.jpg",
            "/Images/aklantourismpictures/Cathedral/Cathedral2.jpg",
            "/Images/aklantourismpictures/AklanFreedomShrine/shrine1.jpg",
            "/Images/aklantourismpictures/Cathedral/Cathedral1.jpg",
            "/Images/aklantourismpictures/Cathedral/Cathedral2.jpg"
        ],
        access: "Via tricycle or jeepney from Kalibo to New Washington",
        popularity: "Moderate / Religious",
        locationDetail: "Polo, New Washington, Aklan",
        mapQuery: "Pink Sisters Convent, New Washington, Aklan",
        characteristics: ["Serene Atmosphere", "Distinct Architecture", "Spiritual Retreat"],
        characteristicIcons: [<LuChurch />, <LuHeart />, <LuDove />],
        insiderTips: [
            "A very peaceful place for prayer and reflection.",
            "You can write your prayer intentions and drop them in the box.",
            "The nuns (in pink habits) sing beautifully during mass.",
            "Maintain silence as it is a contemplative monastery."
        ],
        nearbyWonders: [
            { name: "Pink Sisters Convent", time: "10 mins away", image: "/Images/aklantourismpictures/Cathedral/Cathedral1.jpg" },
            { name: "Bakhawan Eco-Park", time: "20 mins away", image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan1.jpg" }
        ]
    },
    41: {
        name: "Afga Wave Cut Rock Formation",
        location: "Tangalan, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Afga%20Wave%20Rock%20Formation/Slide1.jpg",
            "/Images/aklantourismpictures/Afga%20Wave%20Rock%20Formation/483065008_650789720800294_7874577318383569856_n.jpg",
            "/Images/aklantourismpictures/Afga%20Wave%20Rock%20Formation/555514902_1280022994146953_9210963145170825181_n.jpg",
            "/Images/aklantourismpictures/Afga%20Wave%20Rock%20Formation/557542549_1280022957480290_1110207171296093643_n.jpg",
            "/Images/aklantourismpictures/Afga%20Wave%20Rock%20Formation/6723896571_4eecb6ed30_b.jpg"
        ],
        access: "Via tricycle or private vehicle from Tangalan town center",
        popularity: "Moderate / Geological Wonder",
        locationDetail: "Afga, Tangalan, Aklan",
        mapQuery: "Afga Wave Cut Rock Formation, Tangalan, Aklan",
        characteristics: ["Ancient Rock Terraces", "Coastal Erosion Beauty", "Unique Geology"],
        characteristicIcons: [<LuMountain />, <LuWaves />, <LuGem />],
        insiderTips: [
            "Best visited during low tide to see the full extent of the rock terraces.",
            "The area is perfect for landscape photography, especially at golden hour.",
            "Wear shoes with good grip as the rocks can be sharp and slippery.",
            "It's a quiet spot, ideal for those who want to avoid the crowds."
        ],
        nearbyWonders: [
            { name: "Jawili Falls", time: "15 mins away", image: "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls1.png" },
            { name: "Jawili Beach", time: "15 mins away", image: "/Images/aklantourismpictures/Jawili%20Beach/jawili1.webp" }
        ]
    },
    42: {
        name: "Punta Bunga Beach",
        location: "Boracay, Malay, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Punta%20Bunga%20Beach/caption.jpg",
            "/Images/aklantourismpictures/Punta%20Bunga%20Beach/shangri-la-s-boracay.jpg",
            "/Images/aklantourismpictures/Punta%20Bunga%20Beach/1mi3a224x8vt0pt2pE5C3_W_640_0_R5_Q80.jpg",
            "/Images/aklantourismpictures/Punta%20Bunga%20Beach/1mi5e224x8vt0j9rh9A7A_W_640_0_R5_Q80.jpg",
            "/Images/aklantourismpictures/Punta%20Bunga%20Beach/caption.jpg"
        ],
        access: "Via tricycle or shuttle from the main road",
        popularity: "High / Exclusive",
        locationDetail: "Yapak, Boracay Island",
        mapQuery: "Punta Bunga Beach, Boracay, Aklan",
        characteristics: ["Luxury Resort Area", "Turquoise Waters", "Exclusive Vibe"],
        characteristicIcons: [<LuTreePalm />, <LuWaves />, <LuHeart />],
        insiderTips: [
            "Home to several high-end resorts, offering a more private beach experience.",
            "The water here is exceptionally clear and great for a peaceful swim.",
            "Access might be limited through some resorts, but the beach is public.",
            "Perfect for a romantic walk away from the Station 2 bustle."
        ],
        nearbyWonders: [
            { name: "Puka Shell Beach", time: "10 mins away", image: "/Images/aklantourismpictures/Puka%20Shell%20Beach/puka2.webp" },
            { name: "Diniwid Beach", time: "15 mins away", image: "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay2.jpg" }
        ]
    },
    43: {
        name: "Bulabog Beach",
        location: "Boracay, Malay, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Bulabog%20Beach/Bulabog-Beach-13.jpg",
            "/Images/aklantourismpictures/Bulabog%20Beach/bulabog-beach-7stones-boracay.jpg",
            "/Images/aklantourismpictures/Bulabog%20Beach/shutterstock_1644278317-1.webp",
            "/Images/aklantourismpictures/Bulabog%20Beach/e7582b0a-2b50-4284-bd1c-0cedde9abcd2.jpg",
            "/Images/aklantourismpictures/Bulabog%20Beach/Bulabog-Beach-13.jpg"
        ],
        access: "Short walk or tricycle ride from the main road (opposite of White Beach)",
        popularity: "High / Water Sports",
        locationDetail: "Eastern side of Boracay Island",
        mapQuery: "Bulabog Beach, Boracay, Aklan",
        characteristics: ["Kitesurfing Capital", "Strong Sea Breezes", "Active Sports Scene"],
        characteristicIcons: [<LuWind />, <LuWaves />, <LuTrendingUp />],
        insiderTips: [
            "The best time for kitesurfing and windsurfing is from November to April.",
            "Watch the sunrise here; it's much quieter and more beautiful than the west side.",
            "The water is shallow but can have sea urchins, so wear water shoes.",
            "Great place to find slightly cheaper accommodations than White Beach."
        ],
        nearbyWonders: [
            { name: "Boracay White Beach", time: "10 mins walk", image: "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay1.jpg" },
            { name: "Mount Luho", time: "15 mins away", image: "/Images/aklantourismpictures/TagasHills/tagas1.jpg" }
        ]
    },
    44: {
        name: "Ilig-Iligan Beach",
        location: "Boracay, Malay, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Ilig-Iligan%20Beach/ilig-iligan-beach.jpg",
            "/Images/aklantourismpictures/Ilig-Iligan%20Beach/Ilig-Iligan-Beach-Boracay.webp",
            "/Images/aklantourismpictures/Ilig-Iligan%20Beach/PH201136.jpg",
            "/Images/aklantourismpictures/Ilig-Iligan%20Beach/1aaafd20-12e9-4182-84af-ddd901c46a22.jpg",
            "/Images/aklantourismpictures/Ilig-Iligan%20Beach/wzk0svxxj4ma1.jpg"
        ],
        access: "Via tricycle, bike, or boat from other stations",
        popularity: "Moderate / Peaceful",
        locationDetail: "Northeast coast of Boracay Island",
        mapQuery: "Ilig-Iligan Beach, Boracay, Aklan",
        characteristics: ["Peaceful Secluded Cove", "Snorkeling Spots", "Natural Caves"],
        characteristicIcons: [<LuFish />, <LuTent />, <LuGem />],
        insiderTips: [
            "Great for snorkeling right off the shore when the water is calm.",
            "You can walk to nearby Bat Caves from here with a local guide.",
            "There are fewer restaurants here, so bring some water and snacks.",
            "It's a rugged, natural alternative to the main White Beach."
        ],
        nearbyWonders: [
            { name: "Puka Shell Beach", time: "15 mins away", image: "/Images/aklantourismpictures/Puka%20Shell%20Beach/puka2.webp" },
            { name: "Punta Bunga Beach", time: "15 mins away", image: "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay4.jpg" }
        ]
    },
    45: {
        name: "Nabaoy River",
        location: "Malay, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Nabaoy%20River/Peace-in-Nabaoy.jpg",
            "/Images/aklantourismpictures/Nabaoy%20River/8e.jpg",
            "/Images/aklantourismpictures/Nabaoy%20River/551549_627059783975640_1301828238_n.jpg",
            "/Images/aklantourismpictures/Nabaoy%20River/123925229_3664742493557442_5516499200227243072_n.jpg",
            "/Images/aklantourismpictures/Nabaoy%20River/534317_627058740642411_1927282158_n1.webp"
        ],
        access: "Via tricycle or private vehicle from Malay mainland",
        popularity: "Moderate / Local Favorite",
        locationDetail: "Nabaoy, Malay, Aklan",
        mapQuery: "Nabaoy River, Malay, Aklan",
        characteristics: ["Pristine Cold Water", "Bamboo Rafting", "Lush Riverbanks"],
        characteristicIcons: [<LuDroplets />, <LuSailboat />, <LuTrees />],
        insiderTips: [
            "A popular spot for 'river picnics' among locals and mainland tourists.",
            "The water is fresh and cool, coming directly from the mountain forests.",
            "Bamboo rafting is a relaxing way to see the scenic riverbanks.",
            "Combine your visit with a trip to the nearby Nagata Falls."
        ],
        nearbyWonders: [
            { name: "Nagata Falls", time: "30 mins away", image: "/Images/aklantourismpictures/NagataFalls/Nagata1.jpg" },
            { name: "Pangihan Cave", time: "25 mins away", image: "/Images/aklantourismpictures/PangihanCave/pangihan1.jpg" }
        ]
    },
    46: {
        name: "Pagatpat Mangrove Park",
        location: "Buruanga, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Pagatpat%20Mangrove%20Park/unnamed.jpg",
            "/Images/aklantourismpictures/Pagatpat%20Mangrove%20Park/2-6.png",
            "/Images/aklantourismpictures/Pagatpat%20Mangrove%20Park/3-4.png",
            "/Images/aklantourismpictures/Pagatpat%20Mangrove%20Park/7-3.png",
            "/Images/aklantourismpictures/Pagatpat%20Mangrove%20Park/QwRY54Li1HMwD7oNfpMCrIOVxLZPmZh9bkjtJLeT3Q.webp"
        ],
        access: "Via tricycle from Buruanga town proper",
        popularity: "Moderate / Eco-Park",
        locationDetail: "Buruanga, Aklan",
        mapQuery: "Pagatpat Mangrove Park, Buruanga, Aklan",
        characteristics: ["Bamboo Walkways", "Floating Cottages", "Mangrove Sanctuary"],
        characteristicIcons: [<LuTrees />, <LuLeaf />, <LuTent />],
        insiderTips: [
            "Enjoy a meal in the floating cottages surrounded by thick mangroves.",
            "The bamboo walkways are great for a leisurely, shaded walk.",
            "It's a very peaceful spot, perfect for nature photography.",
            "The park is a great example of local mangrove conservation efforts."
        ],
        nearbyWonders: [
            { name: "Ariel's Point", time: "15 mins away", image: "/Images/aklantourismpictures/ArielsPoint/Ariel1.webp" },
            { name: "Hinugtan Beach", time: "20 mins away", image: "/Images/aklantourismpictures/Hinugtan%20Beach/hinugtan1.jpg" }
        ]
    },
    47: {
        name: "Campo Verde",
        location: "Tangalan, Aklan",
        category: "Nature",
        images: ["", "", "", "", ""],
        access: "Via private vehicle or habal-habal from Tangalan or Ibajay",
        popularity: "Moderate / Highland",
        locationDetail: "Tangalan-Ibajay Border, Aklan",
        mapQuery: "Campo Verde, Tangalan, Aklan",
        characteristics: ["Highland Pine Trees", "Cool Mountain Air", "Reforestation Success"],
        characteristicIcons: [<LuThermometer />, <LuMountain />, <LuTrees />],
        insiderTips: [
            "Known as the 'Little Baguio' of Tangalan due to its pine trees and cool air.",
            "Ideal for camping, hiking, and mountain biking enthusiasts.",
            "The views of the surrounding mountains and valleys are spectacular.",
            "Bring a light jacket as it can get quite cool, especially in the early morning."
        ],
        nearbyWonders: [
            { name: "Jawili Falls", time: "20 mins away", image: "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls1.png" },
            { name: "Katunggan It Ibajay", time: "30 mins away", image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan3.jpg" }
        ]
    },
    48: {
        name: "Manduyog Hill",
        location: "Banga, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Manduyog%20Hill/1346903735tedXrZsd.jpg",
            "/Images/aklantourismpictures/Manduyog%20Hill/20f0bc04-3f91-411f-b5c7-6866487d3348.webp",
            "/Images/aklantourismpictures/Manduyog%20Hill/528535584_760192646526667_7117312587968019675_n.jpg",
            "/Images/aklantourismpictures/Manduyog%20Hill/529032225_760192796526652_130546550302206114_n.jpg",
            "/Images/aklantourismpictures/Manduyog%20Hill/656703540_1341633167987553_7190111863530042884_n.jpg"
        ],
        access: "Short walk or tricycle ride from Banga town center",
        popularity: "High / Religious Site",
        locationDetail: "Banga, Aklan (near Aklan State University)",
        mapQuery: "Manduyog Hill, Banga, Aklan",
        characteristics: ["Stations of the Cross", "Panoramic Town Views", "Religious Pilgrimage"],
        characteristicIcons: [<LuChurch />, <LuSunrise />, <LuHistory />],
        insiderTips: [
            "The hill features life-sized Stations of the Cross leading to the summit.",
            "At the top, there is a chapel and a cross with views of Banga and nearby towns.",
            "It is a popular pilgrimage site during Holy Week (Lent).",
            "The climb is manageable with paved stairs, but bring water."
        ],
        nearbyWonders: [
            { name: "Aklan Freedom Shrine", time: "15 mins away", image: "/Images/aklantourismpictures/AklanFreedomShrine/shrine1.jpg" },
            { name: "Museo it Akean", time: "15 mins away", image: "/Images/aklantourismpictures/Cathedral/Cathedral2.jpg" }
        ]
    },
    49: {
        name: "Ring Falls",
        location: "Madalag, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Ring%20Falls/167816656_132689562202028_9165197369235960668_n.jpg",
            "/Images/aklantourismpictures/Ring%20Falls/168259212_132689605535357_4447034388629575089_n.jpg",
            "/Images/aklantourismpictures/Ring%20Falls/168261128_132689552202029_6552515668449891597_n.jpg",
            "/Images/aklantourismpictures/Ring%20Falls/169364418_132689482202036_2431618509880638198_n.jpg",
            "/Images/aklantourismpictures/Ring%20Falls/99003976_3174900222541674_8069871716685316096_n.jpg"
        ],
        access: "Via habal-habal and a trek from Madalag town",
        popularity: "Hidden Gem / Adventure",
        locationDetail: "Madalag, Aklan",
        mapQuery: "Madalag, Aklan",
        characteristics: ["Circular Rock Pool", "Multi-tiered Falls", "Hidden Jungle Gem"],
        characteristicIcons: [<LuDroplets />, <LuWaves />, <LuTrees />],
        insiderTips: [
            "Named for the unique, almost perfectly circular rock pool at its base.",
            "The trek is through dense jungle, so a local guide is highly recommended.",
            "The water is deep and perfect for a refreshing plunge after the hike.",
            "One of the most pristine and untouched waterfalls in the province."
        ],
        nearbyWonders: [
            { name: "Likitinon White Rocks", time: "30 mins away", image: "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls1.png" },
            { name: "Agtughangin Falls", time: "45 mins away", image: "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls5.jpg" }
        ]
    },
    50: {
        name: "Bungan-bungan Cold Spring",
        location: "Nabas, Aklan",
        category: "Nature",
        images: [
            "/Images/aklantourismpictures/Bungan-bungan%20Cold%20Spring/594137319_1296448082516990_1327623598829926790_n.jpg",
            "/Images/aklantourismpictures/Bungan-bungan%20Cold%20Spring/594399325_1296448295850302_8565758133407161918_n.jpg",
            "/Images/aklantourismpictures/Bungan-bungan%20Cold%20Spring/594958445_1296448312516967_3314923065180650726_n.jpg",
            "/Images/aklantourismpictures/Bungan-bungan%20Cold%20Spring/595117178_1296449065850225_8984989125506215234_n.jpg",
            "/Images/aklantourismpictures/Bungan-bungan%20Cold%20Spring/595223876_1296448372516961_8151061880003263211_n.jpg"
        ],
        access: "Via tricycle from Nabas town proper",
        popularity: "Moderate / Local Favorite",
        locationDetail: "Nabas, Aklan",
        mapQuery: "Nabas, Aklan",
        characteristics: ["Crystal Clear Spring", "Refreshing Mountain Water", "Local Favorite"],
        characteristicIcons: [<LuDroplets />, <LuThermometer />, <LuSparkles />],
        insiderTips: [
            "A less crowded alternative to Hurom-Hurom with equally cold water.",
            "The water is so clear you can see the very bottom of the spring pools.",
            "Perfect for a quick, refreshing dip on your way to or from Caticlan.",
            "There are simple cottages available for rent for a day trip."
        ],
        nearbyWonders: [
            { name: "Hurom-Hurom Cold Springs", time: "10 mins away", image: "/Images/aklantourismpictures/NagataFalls/Nagata2.webp" },
            { name: "Nabaoy River", time: "25 mins away", image: "/Images/aklantourismpictures/NagataFalls/Nagata1.jpg" }
        ]
    },
    51: {
        name: "Bariw Festival",
        location: "Nabas, Aklan",
        category: "Cultural Heritage",
        images: [
            "/Images/aklantourismpictures/Bariw%20Festival/Nabas-1.png",
            "/Images/aklantourismpictures/Bariw%20Festival/467127045_122143273976329224_3505790512608276208_n.jpg",
            "/Images/aklantourismpictures/Bariw%20Festival/680374629_122225852078291956_3587275695595713446_n.jpg",
            "/Images/aklantourismpictures/Bariw%20Festival/686867742_122226876620291956_6936259850499687669_n.jpg",
            "/Images/aklantourismpictures/Bariw%20Festival/Nabas-1.png"
        ],
        access: "Held annually in Nabas town center in May",
        popularity: "High / Cultural",
        locationDetail: "Nabas town center, Aklan",
        mapQuery: "Nabas, Aklan",
        characteristics: ["Traditional Weaving", "Vibrant Street Dance", "Local Handicrafts"],
        characteristicIcons: [<LuTheater />, <LuPartyPopper />, <LuGem />],
        insiderTips: [
            "The festival celebrates the town's weaving industry using Bariw leaves.",
            "Expect colorful street dancing and beautifully woven costumes and props.",
            "A great time to buy high-quality woven hats, mats, and bags.",
            "Check the local government's schedule for the exact dates in May."
        ],
        nearbyWonders: [
            { name: "Hurom-Hurom Cold Springs", time: "15 mins away", image: "/Images/aklantourismpictures/NagataFalls/Nagata2.webp" },
            { name: "Bungan-bungan Cold Spring", time: "15 mins away", image: "/Images/aklantourismpictures/NagataFalls/Nagata3.webp" }
        ]
    },
    52: {
        name: "Simbahan ng Malinao",
        location: "Malinao, Aklan",
        category: "Cultural Heritage",
        images: [
            "/Images/aklantourismpictures/Simbahan%20ng%20Malinao/Simbahan-ng-Malinao-1.jpg",
            "/Images/aklantourismpictures/Simbahan%20ng%20Malinao/Simbahan-ng-Malinao-4.jpg",
            "/Images/aklantourismpictures/Simbahan%20ng%20Malinao/Simbahan%20ng%20Malinao%20(2).jpg",
            "/Images/aklantourismpictures/Simbahan%20ng%20Malinao/Simbahan-ng-Malinao-1.jpg",
            "/Images/aklantourismpictures/Simbahan%20ng%20Malinao/Simbahan-ng-Malinao-4.jpg"
        ],
        access: "Via tricycle or jeepney from Kalibo",
        popularity: "Moderate / Historic",
        locationDetail: "Malinao, Aklan",
        mapQuery: "Malinao, Aklan",
        characteristics: ["Spanish-Era Stone Church", "Historic Architecture", "Religious Heritage"],
        characteristicIcons: [<LuChurch />, <LuHistory />, <LuShield />],
        insiderTips: [
            "One of the oldest stone churches in Aklan with a rich history.",
            "The architecture reflects the Spanish influence on local culture.",
            "The church plaza is a peaceful place for a walk and quiet reflection.",
            "Visit during a local feast day for a more vibrant experience."
        ],
        nearbyWonders: [
            { name: "St. John the Baptist Cathedral", time: "20 mins away", image: "/Images/aklantourismpictures/Cathedral/Cathedral1.jpg" },
            { name: "Aklan Freedom Shrine", time: "20 mins away", image: "/Images/aklantourismpictures/AklanFreedomShrine/shrine1.jpg" }
        ]
    },
    53: {
        name: "St. John Nepomucene Parish Church",
        location: "Tangalan, Aklan",
        category: "Cultural Heritage",
        images: [
            "/Images/aklantourismpictures/St.%20John%20Nepomucene%20Parish%20Church/vorderseite.jpg",
            "/Images/aklantourismpictures/St.%20John%20Nepomucene%20Parish%20Church/altar.jpg",
            "/Images/aklantourismpictures/St.%20John%20Nepomucene%20Parish%20Church/garten.jpg",
            "/Images/aklantourismpictures/St.%20John%20Nepomucene%20Parish%20Church/innenraum-mit-neuer-decke.jpg",
            "/Images/aklantourismpictures/St.%20John%20Nepomucene%20Parish%20Church/uber-dem-eingang.jpg"
        ],
        access: "Located at the Tangalan town center",
        popularity: "High / Historic",
        locationDetail: "Tangalan, Aklan",
        mapQuery: "Tangalan Church, Tangalan, Aklan",
        characteristics: ["Coral Stone Walls", "Limestone Architecture", "Serene Atmosphere"],
        characteristicIcons: [<LuChurch />, <LuHistory />, <LuGem />],
        insiderTips: [
            "Famous for its walls made of coral stones and limestone.",
            "It took decades to complete, involving many local craftsmen.",
            "A very serene and spiritual place, often visited along with Jawili Falls.",
            "The church interior is beautifully maintained and preserves its old feel."
        ],
        nearbyWonders: [
            { name: "Jawili Falls", time: "5 mins away", image: "/Images/aklantourismpictures/Jawili%20Falls/Jawilifalls1.png" },
            { name: "Jawili Beach", time: "5 mins away", image: "/Images/aklantourismpictures/Jawili%20Beach/jawili1.webp" }
        ]
    }
};

// Fallback detail builder for destinations without custom data
function buildFallbackDetail(dest) {
    return {
        name: dest.name,
        location: `${dest.location}, Aklan`,
        category: dest.category,
        images: [
            dest.image,
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
            "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600",
            "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
        ],
        access: "Accessible via local transport",
        popularity: "High",
        locationDetail: `${dest.location}, Aklan`,
        mapQuery: `${dest.name}, Aklan`,
        characteristics: ["Natural Beauty", "Local Culture", "Scenic Views"],
        characteristicIcons: [<LuLeaf />, <LuTheater />, <LuMountain />],
        insiderTips: [
            "Best visited during dry season (November – May).",
            "Hire a local guide for the best experience.",
            "Bring cash — ATMs may be scarce.",
            "Respect local customs and environment.",
        ],
        nearbyWonders: [
            { name: "Bakhawan Eco-Park", time: "Nearby", image: "/Images/Bakhawan.jpg" },
            { name: "Boracay White Beach", time: "Nearby", image: "/Images/Boracay.jpg" },
        ],
    };
}

export default function DestinationDetails({ destination, onBack, onSelectDestination }) {
    const detail = destinationDetails[destination.id] || buildFallbackDetail(destination);
    const [selectedImage, setSelectedImage] = useState(null);

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setSelectedImage(null);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // ── Body Scroll Lock ── 
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
        document.body.classList.add("details-open");
        return () => {
            document.body.style.overflow = originalStyle;
            document.body.classList.remove("details-open");
        };
    }, []);

    const handleNearbyClick = (wName) => {
        if (!onSelectDestination) return;
        const found = destinations.find(d =>
            d.name.toLowerCase().includes(wName.toLowerCase()) ||
            wName.toLowerCase().includes(d.name.toLowerCase())
        );
        if (found) {
            onSelectDestination(found);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // ── Premium Animation Variants ──
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
                ease: easeOut
            }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: easeOut }
        }
    };

    const revealOnScroll = {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.9, ease: easeOut }
        }
    };

    const sideSlide = (dir = 1) => ({
        hidden: { opacity: 0, x: 40 * dir, filter: "blur(4px)" },
        visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: easeOut }
        }
    });

    return (
        <motion.div
            className="dtl-overlay"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            data-lenis-prevent
        >
            <div className="dtl-page">
                {/* ── Header: Back Button & Title ── */}
                <motion.div className="dtl-header" variants={fadeInUp}>
                    <motion.button
                        className="dtl-back-btn"
                        onClick={onBack}
                        whileHover={{ x: -6, backgroundColor: "#fff" }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <span className="dtl-back-arrow"><LuArrowLeft /></span>
                        BACK
                    </motion.button>

                    <motion.h1 className="dtl-title">
                        {detail.name.toUpperCase()}
                    </motion.h1>

                    <div className="dtl-header-spacer"></div>
                </motion.div>

                {/* ── Main Layout ── */}
                <div className="dtl-layout">
                    {/* ── Left Column: Collage & Map ── */}
                    <motion.div className="dtl-left-col" variants={sideSlide(-1)}>
                        {/* ── 5-Photo Collage ── */}
                        <div className="dtl-collage">
                            {/* Top row: 2 equal photos */}
                            <div className="dtl-collage-top">
                                {detail.images.slice(0, 2).map((src, i) => (
                                    <motion.div
                                        key={i}
                                        className="dtl-collage-cell"
                                        whileHover={{ y: -5 }}
                                        onClick={() => setSelectedImage(src)}
                                    >
                                        <img src={src} alt={`${detail.name} — photo ${i + 1}`} loading="lazy" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Middle row: 2 equal photos */}
                            <div className="dtl-collage-middle">
                                {detail.images.slice(2, 4).map((src, i) => (
                                    <motion.div
                                        key={i}
                                        className="dtl-collage-cell"
                                        whileHover={{ y: -5 }}
                                        onClick={() => setSelectedImage(src)}
                                    >
                                        <img src={src} alt={`${detail.name} — photo ${i + 3}`} loading="lazy" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom: 1 wide panoramic photo */}
                            <motion.div
                                className="dtl-collage-bottom"
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedImage(detail.images[4])}
                            >
                                <img src={detail.images[4]} alt={`${detail.name} — panoramic view`} loading="lazy" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* ── Right: Info Panels ── */}
                    <div className="dtl-info">
                        {/* Location Details Table */}
                        <motion.div
                            className="dtl-panel"
                            variants={revealOnScroll}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <h2 className="dtl-panel-title">LOCATION DETAILS</h2>
                            <table className="dtl-table">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>Details</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Location</td>
                                        <td>{detail.locationDetail}</td>
                                        <td><span className="dtl-status-icon"><LuMapPin /></span></td>
                                    </tr>
                                    <tr>
                                        <td>Access</td>
                                        <td>{detail.access}</td>
                                        <td><span className="dtl-status-icon"><LuBus /></span></td>
                                    </tr>
                                    <tr>
                                        <td>Popularity</td>
                                        <td>{detail.popularity}</td>
                                        <td><span className="dtl-status-icon"><LuTrendingUp /></span></td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* ── Destination Map ── */}
                            <div className="dtl-map-inline-wrapper">
                                <DestinationMap name={detail.name} mapQuery={detail.mapQuery} />
                            </div>
                        </motion.div>

                        {/* Key Characteristics */}
                        <motion.div
                            className="dtl-panel"
                            variants={revealOnScroll}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <h2 className="dtl-panel-title">KEY CHARACTERISTICS</h2>
                            <div className="dtl-chars">
                                {detail.characteristics.map((char, i) => (
                                    <motion.div
                                        key={i}
                                        className="dtl-char-card"
                                        whileHover={{ y: -5, backgroundColor: "#fff", boxShadow: "0 8px 24px rgba(11,31,69,0.06)" }}
                                    >
                                        <span className="dtl-char-icon">{detail.characteristicIcons[i]}</span>
                                        <span className="dtl-char-label">{char}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Insider Guide */}
                        <motion.div
                            className="dtl-panel"
                            variants={revealOnScroll}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <h2 className="dtl-panel-title">INSIDER GUIDE</h2>
                            <ul className="dtl-tips">
                                {detail.insiderTips.map((tip, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        {tip}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Nearby Wonders */}
                        <motion.div
                            className="dtl-panel"
                            variants={revealOnScroll}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <h2 className="dtl-panel-title">NEARBY WONDERS</h2>
                            <div className="dtl-nearby">
                                {detail.nearbyWonders.map((w, i) => (
                                    <motion.div
                                        key={i}
                                        className="dtl-nearby-card"
                                        whileHover={{ y: -8, boxShadow: "0 20px 48px rgba(11,31,69,0.15)" }}
                                        onClick={() => handleNearbyClick(w.name)}
                                    >
                                        <div className="dtl-nearby-img-wrap">
                                            <img src={w.image} alt={w.name} loading="lazy" />
                                            <span className="dtl-nearby-badge">{w.time}</span>
                                        </div>
                                        <div className="dtl-nearby-body">
                                            <strong>{w.name}</strong>
                                            <button
                                                className="dtl-nearby-link"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleNearbyClick(w.name);
                                                }}
                                            >
                                                View Details <LuArrowRight className="dtl-nearby-arrow" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── Image Lightbox Overlay ── */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="dtl-lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: easeOut }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="dtl-lightbox-content"
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{ duration: 0.45, ease: easeOut }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="dtl-lightbox-close"
                                onClick={() => setSelectedImage(null)}
                                role="button"
                                aria-label="Close image"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(null)}
                            >
                                <LuX />
                            </div>
                            <img src={selectedImage} alt="Expanded destination view" className="dtl-lightbox-img" loading="eager" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
