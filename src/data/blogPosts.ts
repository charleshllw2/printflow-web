export type GuideCategory =
    | "Artwork & Sizing"
    | "Printing & Care"
    | "Ordering & Group Planning";

export interface BlogPostItem {
    id: string;
    title: string;
    seoTitle: string;
    metaDescription: string;
    excerpt: string;
    category: GuideCategory;
    readTime: string;
    date: string;
    image: string;
    imageAlt: string;
    author: string;
    ctaTitle: string;
    ctaText: string;
    ctaLink: string;
    ctaButtonLabel: string;
    secondaryCtaLink?: string;
    secondaryCtaLabel?: string;
}

export const GUIDE_CATEGORIES: ("All Guides" | GuideCategory)[] = [
    "All Guides",
    "Ordering & Group Planning",
    "Artwork & Sizing",
    "Printing & Care",
];

export const BLOG_POSTS: BlogPostItem[] = [
    {
        id: "how-custom-shirt-orders-work",
        title: "How the Custom Shirt & DTF Order Process Works at PrintFlow Studio",
        seoTitle: "How Custom Shirt & DTF Orders Work | PrintFlow Studio Chattanooga",
        metaDescription: "Step-by-step walkthrough of ordering custom shirts or DTF transfers from PrintFlow Studio: quote submission, artwork review, mockup approval, pricing, pickup, and shipping.",
        excerpt: "Ordering custom shirts for the first time? Walk through every step at PrintFlow Studio—from submitting your quote and reviewing your digital proof to Chattanooga pickup or nationwide shipping.",
        category: "Ordering & Group Planning",
        readTime: "6 min read",
        date: "October 28, 2026",
        image: "/showcase-1.jpg",
        imageAlt: "Finished Chattanooga custom printed t-shirt produced through the PrintFlow Studio custom order workflow",
        author: "Charles Holloway",
        ctaTitle: "Ready to Start Your Custom Order?",
        ctaText: "Tell us what garments or transfers you need, upload your artwork if you have it, and share your target date—we will review everything and send a clear quote.",
        ctaLink: "/request-quote",
        ctaButtonLabel: "Request a Custom Quote",
        secondaryCtaLink: "/services",
        secondaryCtaLabel: "Compare Printing Services"
    },
    {
        id: "choosing-the-right-shirt-print-size",
        title: "Choosing a Print Size: Pocket, Youth, Standard & Oversized Graphics",
        seoTitle: "Shirt Print Size Guide: Pocket, Youth, Adult & Oversized | PrintFlow Studio",
        metaDescription: "Learn how to choose the right graphic print width for custom t-shirts, hoodies, and DTF transfers—from 4-inch left-chest logos to 10–14 inch full-front designs.",
        excerpt: "Not sure whether your graphic should be 4 inches, 10.5 inches, or 13 inches wide? Use this practical sizing guide for left-chest logos, youth tees, adult shirts, and hoodies.",
        category: "Artwork & Sizing",
        readTime: "6 min read",
        date: "October 25, 2026",
        image: "/truth_hoodie.png",
        imageAlt: "Pullover hoodie illustrating balanced center-chest graphic sizing above the kangaroo pocket",
        author: "Charles Holloway",
        ctaTitle: "Need Help Sizing Your Design?",
        ctaText: "Order ready-to-press DTF transfers in 5 preset widths, or request finished custom shirts and let us recommend balanced dimensions on your digital proof.",
        ctaLink: "/dtf-transfers",
        ctaButtonLabel: "Browse Transfer Sizes",
        secondaryCtaLink: "/request-quote",
        secondaryCtaLabel: "Get a Custom Shirt Quote"
    },
    {
        id: "caring-for-dtf-printed-apparel",
        title: "Caring for DTF-Printed Apparel So Your Prints Last",
        seoTitle: "How to Wash & Care for DTF-Printed Shirts | PrintFlow Studio",
        metaDescription: "Keep custom DTF-printed t-shirts and hoodies vibrant wash after wash. Learn washing temperatures, detergent tips, drying advice, and how to store unpressed transfers.",
        excerpt: "Proper laundry care keeps Direct-to-Film prints flexible and vibrant for the life of the garment. Here is how to wash, dry, and care for custom printed tees and hoodies.",
        category: "Printing & Care",
        readTime: "5 min read",
        date: "October 22, 2026",
        image: "/moon_rose_shirt_framed.png",
        imageAlt: "Flat-lay custom black t-shirt with detailed DTF graphic showing crisp ink coverage",
        author: "Charles Holloway",
        ctaTitle: "Have Questions About Custom Shirts or Pressing Transfers?",
        ctaText: "Browse our ready-made original shirt shop or reach out for custom printed shirts and ready-to-press DTF transfers.",
        ctaLink: "/shop",
        ctaButtonLabel: "Browse Ready-Made Shirts",
        secondaryCtaLink: "/request-quote",
        secondaryCtaLabel: "Start a Custom Quote"
    },
    {
        id: "how-to-prepare-artwork-for-dtf-printing",
        title: "How to Prepare Artwork for DTF Printing",
        seoTitle: "How to Prepare Artwork for DTF Printing | PrintFlow Studio",
        metaDescription: "Learn how to prepare artwork for DTF printing: file formats, transparent backgrounds, 300 DPI resolution, print sizing, color expectations, and pre-press checks.",
        excerpt: "Sharp, vibrant custom shirts start with clean artwork. Here is a practical guide to file types, transparent backgrounds, 300 DPI resolution, sizing, and what to check before submitting your design.",
        category: "Artwork & Sizing",
        readTime: "7 min read",
        date: "October 20, 2026",
        image: "/printer/assembled.png",
        imageAlt: "PrintFlow Studio Direct-to-Film roll printer used for full-color custom transfers",
        author: "Charles Holloway",
        ctaTitle: "Ready to Submit Your Artwork?",
        ctaText: "Review our technical file requirements or upload your design directly through our custom quote form. If your file needs cleanup, let us know and we can help get it print-ready.",
        ctaLink: "/file-guidelines",
        ctaButtonLabel: "View Artwork & File Guidelines",
        secondaryCtaLink: "/request-quote",
        secondaryCtaLabel: "Request a Custom Quote"
    },
    {
        id: "dtf-transfers-vs-screen-printing",
        title: "DTF Transfers vs. Screen Printing: Choosing the Right Method",
        seoTitle: "DTF Transfers vs. Screen Printing Guide | PrintFlow Studio",
        metaDescription: "Compare Direct-to-Film (DTF) transfers and traditional screen printing. Understand the practical differences in color detail, order size, fabric compatibility, and cost.",
        excerpt: "Comparing Direct-to-Film (DTF) transfers and traditional screen printing? Learn the practical differences in setup, color complexity, order quantities, and fabric compatibility.",
        category: "Printing & Care",
        readTime: "6 min read",
        date: "October 14, 2026",
        image: "/shop/chattanooga-bridge.jpg",
        imageAlt: "Full-color DTF printed Chattanooga graphic artwork compared with traditional printing methods",
        author: "Charles Holloway",
        ctaTitle: "Need Full-Color Shirts or Ready-to-Press Transfers?",
        ctaText: "Whether you want us to print your finished custom shirts or supply ready-to-press DTF transfers for your own heat press, we make ordering straightforward.",
        ctaLink: "/dtf-transfers-chattanooga",
        ctaButtonLabel: "Explore DTF Transfer Services",
        secondaryCtaLink: "/request-quote",
        secondaryCtaLabel: "Get a Custom Shirt Quote"
    },
    {
        id: "how-to-plan-custom-shirts-for-church-team-or-event",
        title: "How to Plan Custom Shirts for a Church, Reunion, Team, or Event",
        seoTitle: "How to Plan Custom Shirts for Churches, Reunions, Teams & Events | PrintFlow Studio",
        metaDescription: "A step-by-step guide to planning custom group shirts for churches, family reunions, sports teams, and events—covering sizes, garments, artwork, proofs, and budgets.",
        excerpt: "Organizing matching shirts for a church group, family reunion, sports team, or local event? Use this step-by-step planning checklist to gather sizes, choose garments, and stay on budget.",
        category: "Ordering & Group Planning",
        readTime: "7 min read",
        date: "October 8, 2026",
        image: "/hero-apparel-group.jpg",
        imageAlt: "Group wearing matching custom printed event and team shirts in Chattanooga",
        author: "Charles Holloway",
        ctaTitle: "Planning a Group Apparel Order?",
        ctaText: "Tell us about your church, reunion, team, or event project. Share your estimated quantity, print locations, and target date, and we will put together a clear quote.",
        ctaLink: "/request-quote",
        ctaButtonLabel: "Start Your Group Quote",
        secondaryCtaLink: "/services",
        secondaryCtaLabel: "Browse All Apparel Services"
    },
    {
        id: "dtf-vs-screen-printing",
        title: "DTF vs Screen Printing: Which is Right for Your Brand?",
        seoTitle: "DTF vs Screen Printing for Custom Apparel Brands | PrintFlow Studio",
        metaDescription: "Choosing the right printing method for your brand or business crew matters. Explore how DTF transfers compare to screen printing for logos and custom merch.",
        excerpt: "Choosing the right printing method can be tough. We break down how Direct-to-Film transfers and screen printing fit different apparel goals, logo styles, and order sizes.",
        category: "Printing & Care",
        readTime: "4 min read",
        date: "February 20, 2026",
        image: "/shop/management-dogs.jpg",
        imageAlt: "Custom printed graphic shirt example from PrintFlow Studio",
        author: "Charles Holloway",
        ctaTitle: "Building Apparel for Your Business or Brand?",
        ctaText: "Check out our custom business shirt packages or read our full comparison of DTF transfers and screen printing.",
        ctaLink: "/business-shirts-chattanooga",
        ctaButtonLabel: "View Business Apparel Options",
        secondaryCtaLink: "/request-quote",
        secondaryCtaLabel: "Request a Quote"
    },
    {
        id: "optimizing-files-for-dtf",
        title: "5 Tips to Optimize Your Designs for DTF Transfers",
        seoTitle: "5 Tips to Optimize Designs for DTF Transfers | PrintFlow Studio",
        metaDescription: "Five practical tips for optimizing your graphic designs before ordering custom DTF transfers or printed shirts, from clean edges to proper contrast.",
        excerpt: "Getting the best results from DTF starts with your artwork. Learn five practical design habits that improve edge sharpness, fabric readability, and durability.",
        category: "Artwork & Sizing",
        readTime: "4 min read",
        date: "February 15, 2026",
        image: "/shop/social-battery.jpg",
        imageAlt: "Vibrant custom DTF printed graphic showing crisp edges and contrast",
        author: "Charles Holloway",
        ctaTitle: "Want to Check Your File Specs?",
        ctaText: "Review our complete artwork and file guidelines before uploading your design for custom transfers or shirts.",
        ctaLink: "/file-guidelines",
        ctaButtonLabel: "Read File Guidelines",
        secondaryCtaLink: "/dtf-transfers",
        secondaryCtaLabel: "Browse Ready-to-Press Transfers"
    },
    {
        id: "starting-apparel-business",
        title: "How to Start an Apparel Business with Minimal Investment",
        seoTitle: "Starting a Custom Apparel Line with DTF Transfers | PrintFlow Studio",
        metaDescription: "Learn how creators and small brands use ready-to-press DTF transfers and small-batch custom printing to test shirt designs without holding large inventory.",
        excerpt: "Want to launch your own clothing line or creator merch? Ready-to-press DTF transfers and flexible order quantities make it easier to test designs without overbuying inventory.",
        category: "Ordering & Group Planning",
        readTime: "4 min read",
        date: "February 10, 2026",
        image: "/shop/scenic-city-sweater-weather.jpg",
        imageAlt: "Custom printed seasonal graphic design for a local apparel collection",
        author: "Charles Holloway",
        ctaTitle: "Ready to Press Your Own Designs or Order Custom Merch?",
        ctaText: "Order ready-to-press transfers for your heat press or let PrintFlow Studio print your custom apparel line in Chattanooga.",
        ctaLink: "/custom-apparel-chattanooga",
        ctaButtonLabel: "Explore Custom Apparel",
        secondaryCtaLink: "/request-quote",
        secondaryCtaLabel: "Start a Custom Order"
    }
];
