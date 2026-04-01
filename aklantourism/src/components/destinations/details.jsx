import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/details.css";
import DestinationMap from "./DestinationMap";
import { destinations } from "../../data/destinations";

const easeOut = [0.16, 1, 0.3, 1];

// ── Extended destination data with detail info ──
const destinationDetails = {
    1: {
        name: "Boracay White Beach",
        location: "Malay, Aklan",
        category: "Beach",
        images: [
            "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay1.jpg",
            "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay2.jpg",
            "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay3.jpg",
            "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay4.jpg",
            "/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay5.jpg",
        ],
        access: "Via ferry from Caticlan or Roxas Port",
        popularity: "World-Class / Beach",
        locationDetail: "Malay, Aklan (20-min ferry ride from Caticlan)",
        mapQuery: "Boracay White Beach, Malay, Aklan",
        characteristics: ["4km White Sand Shoreline", "Sunset Paraw Sailing", "Vibrant Station Nightlife"],
        characteristicIcons: ["🏖️", "⛵", "🌅"],
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
        characteristicIcons: ["🐚", "🌊", "🏝️"],
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
        characteristicIcons: ["🪨", "🐠", "🤫"],
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
        characteristicIcons: ["⛲", "🛶", "🍤"],
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
        characteristicIcons: ["🐢", "🪸", "✨"],
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
        characteristicIcons: ["🎋", "🌿", "🦅"],
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
        characteristicIcons: ["💧", "🏊", "🌿"],
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
        characteristicIcons: ["🏕️", "🚣", "🤿"],
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
        characteristicIcons: ["💦", "🏔️", "🌡️"],
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
        characteristicIcons: ["🕯️", "🪨", "🦇"],
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
        characteristicIcons: ["🌄", "🌿", "🏕️"],
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
        characteristicIcons: ["🥁", "🎭", "🎉"],
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
        characteristicIcons: ["⛪", "🕯️", "🙏"],
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
        characteristicIcons: ["🏛️", "🪖", "🕊️"],
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
        characteristicIcons: ["🌿", "🎭", "🏞️"],
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
                        <span className="dtl-back-arrow">←</span>
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
                                        <td><span className="dtl-status-icon">📍</span></td>
                                    </tr>
                                    <tr>
                                        <td>Access</td>
                                        <td>{detail.access}</td>
                                        <td><span className="dtl-status-icon">🚐</span></td>
                                    </tr>
                                    <tr>
                                        <td>Popularity</td>
                                        <td>{detail.popularity}</td>
                                        <td><span className="dtl-status-icon">📈</span></td>
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
                                                View Details →
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
                            <button className="dtl-lightbox-close" onClick={() => setSelectedImage(null)} aria-label="Close image">✕</button>
                            <img src={selectedImage} alt="Expanded destination view" className="dtl-lightbox-img" loading="eager" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
