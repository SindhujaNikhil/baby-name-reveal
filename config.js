/**
 * Baby Name Reveal Configuration
 * -----------------------------------
 * Parents can easily edit all settings below!
 */

window.BabyRevealConfig = {
    // Reveal Date & Time (Format: YYYY-MM-DDTHH:MM:SS)
    revealDate: "2026-08-09T12:30:00",

    // Parents Info
    parentNames: "My Loving Parents:<br><span class=\"parent-names-highlight\">Sai Sindhuja & Nikhil Kumar</span>",
    parentNamesTelugu: "నా తల్లిదండ్రులు:<br><span class=\"parent-names-highlight\">సాయి సింధూజ & నిఖిల్ కుమార్</span>",
    babyTitle: "Hi, I'm Your Little Princess!",
    babyTitleTelugu: "నమస్తే! నేను మీ చిట్టితల్లిని",
    subtitle: "My name will be revealed on",
    subtitleTelugu: "నా పేరు చెప్పే సమయం ఆసన్నమైంది...",

    // Event Location
    eventLocationUrl: "https://www.google.com/maps/dir//AVOPA+Seva+Sadan,+Roja+Darga+Street+near+railway+track,+tungabadra,+Postal+Colony,+Kurnool,+Andhra+Pradesh+518004,+India/@15.8212582,78.0437213,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bb5e7414e2ef4a9:0x7c2fc2874d6c1fb1!2m2!1d78.0371629!2d15.8431095!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D", // Added the exact Google Maps link
    eventAddress: "AVOPA Seva Sadan, Postal Colony, Kurnool.",

    // Baby Name Details
    babyName: "Venkata Madhuraadhya",
    babyNameTelugu: "వెంకట మధురాధ్య",
    babyGender: "Girl",
    nameMeaning: "Our Sweetest Mah Durga.",
    nameMeaningTelugu: "మా ముద్దుల దుర్గా దేవి",
    birthMonthExpected: "September 2026",

    // South Indian Cultural Details
    nakshatra: "Rohini",                        // Birth star (Nakshatra)
    nakshatraTelugu: "రోహిణి",                 // Telugu script for Nakshatra
    nameLanguage: "Telugu",                   // Language of name origin
    nameEtymology: "From Sanskrit / Telugu — 'Madhura' signifies sweetness, melody, and grace.",
    nameEtymologyTelugu: "సంస్కృతం/తెలుగు పదం — 'మధుర' అంటే తియ్యనైన మరియు శ్రావ్యమైన.",
    ceremonyType: "Nāmakaraṇa",                // Naming ceremony type
    ceremonyTypeTelugu: "నామకరణం",

    // Hero Images (Two-state)
    heroImageMystery: "assets/baby_mystery.png",   // Shown during countdowon
    heroImageReveal: "assets/baby_reveal.png",      // Shown after reveal

    // Theme: "rose" (Baby Rose), "temple" (Temple Gold), "silk" (Kanchipuram Silk), "jasmine" (Jasmine Garden)
    defaultTheme: "rose",

    // Secret Preview Code (Default: "reveal123" or press Shift + P)
    secretCode: "reveal123",

    // Global Volumes (0.0 to 1.0)
    bgVolume: 0.05,   // Background music volume
    songVolume: 1.0,  // Favourite song volume

    // Baby's Likes & Dislikes
    babyLikes: [
        { emoji: "💧", text: "Playing with water" },
        { emoji: "🐐", text: "Bujji Meka song" },
        { emoji: "🌀", text: "Fans spinning" },
        { emoji: "💡", text: "Gazing at lights" },
    ],
    babyDislikes: [
        { emoji: "🙅", text: "Touching my face" },
        { emoji: "👕", text: "Wet clothes" },
        { emoji: "🌸", text: "Perfumes" },
    ],
    babyImageHappy: "assets/bujjiamma_happy.png",   // Shown next to likes
    babyImageSad: "assets/bujjiamma_sad.png",     // Shown next to dislikes

    // Social / Share Settings
    shareImage: "assets/baby_mystery.png",
    shareMessage: "Count down with me to my Nāmakaraṇa — revealing my name on August 16! 🪔✨",
};
