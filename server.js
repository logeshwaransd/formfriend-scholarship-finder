require("dotenv").config();

const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = 3000;

const ai = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    })
    : null;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


/* =====================================================
   SCHOLARSHIP DATABASE
===================================================== */

const schemes = [

    /* ================= CENTRAL ================= */

    {
        id: "csss",

        government: "Central Government",

        name:
            "PM-USP Central Sector Scheme of Scholarship for College and University Students",

        description:
            "Scholarship support for eligible college and university students.",

        states: ["All India"],

        categories: [
            "General",
            "OBC",
            "SC",
            "ST",
            "EWS"
        ],

        courses: [
            "B.E / B.Tech",
            "B.Sc",
            "B.Com",
            "B.A",
            "BCA",
            "BBA",
            "Other"
        ],

        years: [
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year"
        ],

        maxIncome: 450000,

        website:
            "https://scholarships.gov.in/"
    },


    {
        id: "obc_top",

        government: "Central Government",

        name:
            "PM YASASVI Top Class Education for OBC, EBC and DNT Students",

        description:
            "Educational assistance for eligible OBC, EBC and DNT students pursuing higher education.",

        states: ["All India"],

        categories: [
            "OBC",
            "MBC",
            "DNC"
        ],

        courses: [
            "B.E / B.Tech",
            "B.Sc",
            "B.Com",
            "B.A",
            "BCA",
            "BBA",
            "Other"
        ],

        years: [
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year"
        ],

        maxIncome: 250000,

        website:
            "https://scholarships.gov.in/"
    },


    {
        id: "sc_top",

        government: "Central Government",

        name:
            "Top Class Education Scheme for SC Students",

        description:
            "Financial assistance for eligible SC students pursuing higher education.",

        states: ["All India"],

        categories: [
            "SC"
        ],

        courses: [
            "B.E / B.Tech",
            "B.Sc",
            "B.Com",
            "B.A",
            "BCA",
            "BBA",
            "Other"
        ],

        years: [
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year"
        ],

        maxIncome: 800000,

        website:
            "https://scholarships.gov.in/"
    },


    {
        id: "minority",

        government: "Central Government",

        name:
            "Post-Matric Scholarship Scheme for Minorities",

        description:
            "Financial assistance for eligible minority students pursuing higher education.",

        states: ["All India"],

        categories: [
            "General",
            "OBC",
            "SC",
            "ST",
            "EWS"
        ],

        courses: [
            "B.E / B.Tech",
            "B.Sc",
            "B.Com",
            "B.A",
            "BCA",
            "BBA",
            "Other"
        ],

        years: [
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year"
        ],

        maxIncome: 200000,

        website:
            "https://scholarships.gov.in/"
    },


    {
        id: "pmss",

        government: "Central Government",

        name:
            "Prime Minister's Scholarship Scheme",

        description:
            "Scholarship assistance for eligible dependents of personnel covered under the scheme.",

        states: ["All India"],

        categories: [
            "General",
            "OBC",
            "SC",
            "ST",
            "EWS"
        ],

        courses: [
            "B.E / B.Tech",
            "B.Sc",
            "B.Com",
            "B.A",
            "BCA",
            "BBA",
            "Other"
        ],

        years: [
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year"
        ],

        maxIncome: 600000,

        website:
            "https://scholarships.gov.in/"
    },


    /* ================= TAMIL NADU ================= */

    {
        id: "tn_bc",

        government: "Tamil Nadu Government",

        name:
            "BC / MBC / DNC Post-Matric Scholarship",

        description:
            "Educational assistance for eligible BC, MBC and DNC students studying after school in Tamil Nadu.",

        states: [
            "Tamil Nadu"
        ],

        categories: [
            "OBC",
            "MBC",
            "DNC"
        ],

        courses: [
            "B.E / B.Tech",
            "B.Sc",
            "B.Com",
            "B.A",
            "BCA",
            "BBA",
            "Diploma",
            "Other"
        ],

        years: [
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year"
        ],

        maxIncome: 250000,

        website:
            "https://bcmbcmw.tn.gov.in/"
    },


    {
        id: "tn_sc",

        government: "Tamil Nadu Government",

        name:
            "Adi Dravidar and Tribal Welfare Post-Matric Scholarship",

        description:
            "Educational assistance for eligible SC and ST students pursuing higher education.",

        states: [
            "Tamil Nadu"
        ],

        categories: [
            "SC",
            "ST"
        ],

        courses: [
            "B.E / B.Tech",
            "B.Sc",
            "B.Com",
            "B.A",
            "BCA",
            "BBA",
            "Diploma",
            "Other"
        ],

        years: [
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year"
        ],

        maxIncome: 250000,

        website:
            "https://www.tnadwelfare.tn.gov.in/"
    },


    {
        id: "tn_first_graduate",

        government: "Tamil Nadu Government",

        name:
            "Tamil Nadu First Graduate Scholarship / Tuition Assistance",

        description:
            "Educational assistance associated with eligible first-generation graduate students in Tamil Nadu.",

        states: [
            "Tamil Nadu"
        ],

        categories: [
            "General",
            "OBC",
            "SC",
            "ST",
            "EWS",
            "MBC",
            "DNC"
        ],

        courses: [
            "B.E / B.Tech",
            "B.Sc",
            "B.Com",
            "B.A",
            "BCA",
            "BBA",
            "Other"
        ],

        years: [
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year"
        ],

        maxIncome: 1000000,

        website:
            "https://www.tn.gov.in/"
    },


    {
        id: "tn_general",

        government: "Tamil Nadu Government",

        name:
            "Tamil Nadu Higher Education Student Assistance",

        description:
            "Student assistance available through Tamil Nadu government education and welfare programs.",

        states: [
            "Tamil Nadu"
        ],

        categories: [
            "General",
            "OBC",
            "SC",
            "ST",
            "EWS",
            "MBC",
            "DNC"
        ],

        courses: [
            "B.E / B.Tech",
            "B.Sc",
            "B.Com",
            "B.A",
            "BCA",
            "BBA",
            "Other"
        ],

        years: [
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year"
        ],

        maxIncome: 500000,

        website:
            "https://www.tn.gov.in/"
    }

];


/* =====================================================
   HELPERS
===================================================== */

function clean(value) {

    return String(value || "")
        .trim();

}


function normalize(value) {

    return clean(value)
        .toLowerCase();

}


function extractIncome(value) {

    const text =
        normalize(value)
            .replace(/,/g, "");

    const match =
        text.match(
            /(\d+(?:\.\d+)?)\s*(lakh|lakhs|l|k)?/
        );

    if (!match) {

        return null;

    }

    let number =
        parseFloat(match[1]);

    const unit =
        match[2];

    if (
        unit === "lakh" ||
        unit === "lakhs" ||
        unit === "l"
    ) {

        number *= 100000;

    }

    else if (unit === "k") {

        number *= 1000;

    }

    return number;

}


function stateMatches(scheme, state) {

    if (!state) {

        return false;

    }

    const s =
        normalize(state);

    return scheme.states.some(item => {

        const value =
            normalize(item);

        return (
            value === "all india" ||
            value === s ||
            s.includes(value) ||
            value.includes(s)
        );

    });

}


function categoryMatches(scheme, category) {

    if (!category) {

        return false;

    }

    const c =
        normalize(category);

    return scheme.categories.some(item => {

        const value =
            normalize(item);

        return (
            value === c ||
            c.includes(value) ||
            value.includes(c)
        );

    });

}


function courseMatches(scheme, course) {

    if (!course) {

        return false;

    }

    const c =
        normalize(course);

    return scheme.courses.some(item => {

        const value =
            normalize(item);

        return (
            value === c ||
            c.includes(value) ||
            value.includes(c)
        );

    });

}


function yearMatches(scheme, year) {

    if (!year) {

        return false;

    }

    return scheme.years.includes(year);

}


/* =====================================================
   SEARCH
===================================================== */

app.post("/api/search", (req, res) => {

    const query =
        clean(req.body.query);

    console.log("");
    console.log("================================");
    console.log("FORMFRIEND SEARCH");
    console.log("================================");
    console.log("User:", query);


    if (!query) {

        return res.status(400).json({

            error:
                "Please enter what scholarship you are looking for."

        });

    }


    const text =
        normalize(query);


    let understanding =
        "You are looking for scholarship support.";


    let category =
        "Education";


    let questions = [

        "Which state do you live in?",

        "What course are you studying?",

        "Which year are you in?",

        "What is your annual family income?",

        "Which category do you belong to?"

    ];


    if (
        text.includes("engineering") ||
        text.includes("b.tech") ||
        text.includes("b.e")
    ) {

        understanding =
            "You are looking for scholarship options for engineering education.";

    }

    else if (
        text.includes("college") ||
        text.includes("university")
    ) {

        understanding =
            "You are looking for scholarship options for your college education.";

    }


    console.log(
        "Instant search complete."
    );


    res.json({

        understanding,

        category,

        searchTerms: [

            "college scholarship",

            "government scholarship",

            "student scholarship",

            "higher education scholarship"

        ],

        questions

    });

});


/* =====================================================
   SMART MATCHING
===================================================== */

app.post("/api/match", async (req, res) => {

    console.log("");
    console.log("================================");
    console.log("FORMFRIEND MATCH");
    console.log("================================");


    const answers =
        Array.isArray(req.body.answers)
            ? req.body.answers
            : [];


    if (!answers.length) {

        return res.status(400).json({

            error:
                "Please answer the questions first."

        });

    }


    let state = "";
    let course = "";
    let year = "";
    let category = "";
    let income = "";


    answers.forEach(item => {

        const question =
            normalize(item.question);

        const answer =
            clean(item.answer);


        if (
            question.includes("state") ||
            question.includes("live")
        ) {

            state = answer;

        }

        else if (
            question.includes("course") ||
            question.includes("study")
        ) {

            course = answer;

        }

        else if (
            question.includes("year")
        ) {

            year = answer;

        }

        else if (
            question.includes("income")
        ) {

            income = answer;

        }

        else if (
            question.includes("category") ||
            question.includes("community")
        ) {

            category = answer;

        }

    });


    console.log("State:", state);
    console.log("Course:", course);
    console.log("Year:", year);
    console.log("Category:", category);
    console.log("Income:", income);


    const incomeNumber =
        extractIncome(income);


    /* =================================================
       SCORE EVERY SCHOLARSHIP
    ================================================= */

    const scored = schemes.map(scheme => {

        let score = 0;

        const reasons = [];


        /* STATE */

        if (
            scheme.government ===
            "Central Government"
        ) {

            score += 10;

            reasons.push(
                "Available at the central-government level."
            );

        }

        else if (
            stateMatches(
                scheme,
                state
            )
        ) {

            score += 30;

            reasons.push(
                `Your state (${state}) matches this scheme.`
            );

        }


        /* CATEGORY */

        if (
            categoryMatches(
                scheme,
                category
            )
        ) {

            score += 30;

            reasons.push(
                `Your ${category} category is listed.`
            );

        }


        /* COURSE */

        if (
            courseMatches(
                scheme,
                course
            )
        ) {

            score += 20;

            reasons.push(
                `Your course (${course}) is supported.`
            );

        }


        /* YEAR */

        if (
            yearMatches(
                scheme,
                year
            )
        ) {

            score += 10;

            reasons.push(
                `Your current year (${year}) fits the listed study years.`
            );

        }


        /* INCOME */

        if (
            incomeNumber !== null &&
            scheme.maxIncome
        ) {

            if (
                incomeNumber <=
                scheme.maxIncome
            ) {

                score += 10;

                reasons.push(
                    "Your stated income is within the stored income threshold."
                );

            }

        }


        return {

            scheme,

            score,

            reasons

        };

    });


    /* =================================================
       FILTER OUT VERY WEAK RESULTS
    ================================================= */

    let validMatches =
        scored.filter(item =>
            item.score >= 30
        );


    /*
       If the student gave limited information,
       don't return an empty page.
    */

    if (
        validMatches.length === 0
    ) {

        validMatches =
            scored.filter(item =>
                item.score >= 20
            );

    }


    /* =================================================
       SORT BY MATCH SCORE
    ================================================= */

    validMatches.sort(
        (a, b) =>
            b.score - a.score
    );


    /* =================================================
       MAXIMUM 10
    ================================================= */

    validMatches =
        validMatches.slice(
            0,
            10
        );


    console.log(
        "Scholarships found:",
        validMatches.length
    );


    /* =================================================
       BUILD RESULTS
    ================================================= */

    const results =
        validMatches.map(
            (item, index) => {

                const scheme =
                    item.scheme;


                let matchLabel =
                    "Possible match";


                if (
                    item.score >= 80
                ) {

                    matchLabel =
                        "Strong profile match";

                }

                else if (
                    item.score >= 60
                ) {

                    matchLabel =
                        "Good profile match";

                }

                else if (
                    item.score >= 40
                ) {

                    matchLabel =
                        "Potential match";

                }


                return {

                    number:
                        String(index + 1)
                            .padStart(2, "0"),

                    name:
                        scheme.name,

                    government:
                        scheme.government,

                    description:
                        scheme.description,

                    matchScore:
                        item.score,

                    matchLabel,

                    whyMatch:
                        item.reasons.length
                            ? item.reasons.join(" ")
                            : "This scholarship may be worth exploring based on the information provided.",

                    documents: [

                        "Identity document",

                        "Income certificate where required",

                        "Community certificate where applicable",

                        "College admission or bonafide proof",

                        "Bank account details"

                    ],

                    officialWebsite:
                        scheme.website

                };

            }
        );


    /* =================================================
       OPTIONAL GEMINI SUMMARY
    ================================================= */

    let aiNote = "";


    if (
        ai &&
        results.length > 0
    ) {

        try {

            const prompt = `
You are FormFriend, a scholarship discovery assistant.

Student:
State: ${state}
Course: ${course}
Year: ${year}
Category: ${category}
Income: ${income}

There are ${results.length} possible scholarship matches.

Write ONE short sentence explaining that these are
potential matches and that the student should verify
the latest eligibility requirements on the official
government website.

Do not claim the student is definitely eligible.
Maximum 25 words.
`;


            const response =
                await Promise.race([

                    ai.models.generateContent({

                        model:
                            "gemini-3.5-flash-lite",

                        contents:
                            prompt,

                        config: {

                            temperature:
                                0.1

                        }

                    }),


                    new Promise(
                        (_, reject) => {

                            setTimeout(
                                () =>
                                    reject(
                                        new Error(
                                            "Gemini timeout"
                                        )
                                    ),
                                5000
                            );

                        }
                    )

                ]);


            aiNote =
                clean(
                    response.text
                );


            console.log(
                "Gemini summary received."
            );

        }

        catch (error) {

            console.log(
                "Gemini summary skipped:",
                error.message
            );

        }

    }


    /* =================================================
       RESPONSE
    ================================================= */

    res.json({

        intro:
            aiNote ||
            `We found ${results.length} scholarship option${results.length === 1 ? "" : "s"} to explore based on your answers. Please verify the current eligibility rules on the official website.`,

        student: {

            state,

            course,

            year,

            category,

            income

        },

        total:
            results.length,

        schemes:
            results

    });

});


/* =====================================================
   HOME
===================================================== */

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );

});


/* =====================================================
   START SERVER
===================================================== */

app.listen(
    PORT,
    () => {

        console.log("");
        console.log("================================");
        console.log("🚀 FORMFRIEND SCHOLARSHIP FINDER");
        console.log("================================");
        console.log(
            `🌐 http://localhost:${PORT}`
        );
        console.log("================================");
        console.log("");

    }
);