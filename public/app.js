const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const loading = document.getElementById("loading");
const errorBox = document.getElementById("errorBox");

const resultSection = document.getElementById("resultSection");
const understanding = document.getElementById("understanding");
const category = document.getElementById("category");
const searchTerms = document.getElementById("searchTerms");

const questionsCard = document.getElementById("questionsCard");
const questions = document.getElementById("questions");

const matchButton = document.getElementById("matchButton");
const matchStatus = document.getElementById("matchStatus");


let currentQuery = "";


/* =========================================
   INTRO ANIMATION
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const intro = document.getElementById("intro");

        if (intro) {
            intro.classList.add("intro-hide");
        }

    }, 1800);

});


/* =========================================
   QUICK SEARCH BUTTONS
========================================= */

document.querySelectorAll(".suggestions button")
    .forEach(button => {

        button.addEventListener("click", () => {

            searchInput.value =
                button.dataset.query;

            searchSchemes();

        });

    });


/* =========================================
   SEARCH BUTTON
========================================= */

searchButton.addEventListener(
    "click",
    searchSchemes
);


searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            searchSchemes();
        }

    }
);


/* =========================================
   SEARCH
========================================= */

async function searchSchemes() {

    const query =
        searchInput.value.trim();


    if (!query) {

        showError(
            "Tell us what you need first."
        );

        return;

    }


    currentQuery = query;


    hideError();


    resultSection.classList.add(
        "hidden"
    );


    questionsCard.classList.add(
        "hidden"
    );


    loading.classList.remove(
        "hidden"
    );


    searchButton.disabled = true;


    try {

        const response =
            await fetchWithTimeout(

                "/api/search",

                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        query: query
                    })

                },

                30000
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Search failed."
            );

        }


        showSearchResult(data);


    } catch (error) {

        console.error(error);


        showError(
            "Something went wrong: " +
            error.message
        );


    } finally {

        loading.classList.add(
            "hidden"
        );

        searchButton.disabled = false;

    }

}


/* =========================================
   SHOW SEARCH RESULT
========================================= */

function showSearchResult(data) {

    resultSection.classList.remove(
        "hidden"
    );


    understanding.textContent =
        data.understanding || "";


    category.textContent =
        data.category || "Other";


    searchTerms.innerHTML = "";


    if (
        Array.isArray(
            data.searchTerms
        )
    ) {

        data.searchTerms.forEach(
            term => {

                const tag =
                    document.createElement(
                        "span"
                    );


                tag.className =
                    "term";


                tag.textContent =
                    term;


                searchTerms.appendChild(
                    tag
                );

            }
        );

    }


    questions.innerHTML = "";


    const aiQuestions =
        Array.isArray(data.questions)
            ? data.questions
            : [];


    aiQuestions.forEach(
        (question, index) => {

            createQuestion(
                question,
                index
            );

        }
    );


    questionsCard.classList.remove(
        "hidden"
    );


    resultSection.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   CREATE QUESTIONS
========================================= */

function createQuestion(
    question,
    index
) {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "question";


    const number =
        document.createElement("div");


    number.className =
        "question-number";


    number.textContent =
        String(index + 1)
            .padStart(2, "0");


    const content =
        document.createElement("div");


    content.className =
        "question-content";


    const label =
        document.createElement("label");


    label.textContent =
        question;


    content.appendChild(label);


    const lower =
        question.toLowerCase();


    /* =====================================
       STATE
    ===================================== */

    if (
        lower.includes("state") ||
        lower.includes("live")
    ) {

        const select =
            document.createElement(
                "select"
            );


        select.className =
            "answer-input";


        select.dataset.question =
            question;


        addOption(
            select,
            "",
            "Choose your state"
        );


        const states = [

            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal",
            "Delhi",
            "Jammu and Kashmir",
            "Ladakh",
            "Puducherry",
            "Chandigarh"

        ];


        states.forEach(state => {

            addOption(
                select,
                state,
                state
            );

        });


        content.appendChild(
            select
        );

    }


    /* =====================================
       COURSE
    ===================================== */

    else if (
        lower.includes("course") ||
        lower.includes("study") ||
        lower.includes("degree")
    ) {

        const select =
            document.createElement(
                "select"
            );


        select.className =
            "answer-input";


        select.dataset.question =
            question;


        addOption(
            select,
            "",
            "Choose your course"
        );


        const courses = [

            "B.E / B.Tech",
            "B.Sc",
            "B.Com",
            "B.A",
            "BCA",
            "BBA",
            "MBBS",
            "B.Pharm",
            "Diploma",
            "ITI",
            "M.E / M.Tech",
            "M.Sc",
            "M.Com",
            "M.A",
            "MBA",
            "MCA",
            "Other"

        ];


        courses.forEach(course => {

            addOption(
                select,
                course,
                course
            );

        });


        content.appendChild(
            select
        );

    }


    /* =====================================
       YEAR
    ===================================== */

    else if (
        lower.includes("year") ||
        lower.includes("class")
    ) {

        const select =
            document.createElement(
                "select"
            );


        select.className =
            "answer-input";


        select.dataset.question =
            question;


        addOption(
            select,
            "",
            "Choose your year"
        );


        const years = [

            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year",
            "5th Year",
            "Not applicable"

        ];


        years.forEach(year => {

            addOption(
                select,
                year,
                year
            );

        });


        content.appendChild(
            select
        );

    }


    /* =====================================
       CATEGORY
    ===================================== */

    else if (
        lower.includes("category") ||
        lower.includes("community")
    ) {

        const select =
            document.createElement(
                "select"
            );


        select.className =
            "answer-input";


        select.dataset.question =
            question;


        addOption(
            select,
            "",
            "Choose your category"
        );


        const categories = [

            "General",
            "OBC",
            "SC",
            "ST",
            "EWS",
            "MBC",
            "DNC",
            "Minority",
            "Prefer not to say"

        ];


        categories.forEach(item => {

            addOption(
                select,
                item,
                item
            );

        });


        content.appendChild(
            select
        );

    }


    /* =====================================
       INCOME
    ===================================== */

    else if (
        lower.includes("income") ||
        lower.includes("earn")
    ) {

        const select =
            document.createElement(
                "select"
            );


        select.className =
            "answer-input";


        select.dataset.question =
            question;


        addOption(
            select,
            "",
            "Choose annual family income"
        );


        const incomes = [

            "Below ₹1 lakh",
            "₹1 lakh – ₹2.5 lakh",
            "₹2.5 lakh – ₹5 lakh",
            "₹5 lakh – ₹8 lakh",
            "Above ₹8 lakh",
            "I don't know"

        ];


        incomes.forEach(income => {

            addOption(
                select,
                income,
                income
            );

        });


        content.appendChild(
            select
        );

    }


    /* =====================================
       NORMAL QUESTION
    ===================================== */

    else {

        const input =
            document.createElement(
                "input"
            );


        input.type =
            "text";


        input.className =
            "answer-input";


        input.dataset.question =
            question;


        input.placeholder =
            "Type your answer";


        content.appendChild(
            input
        );

    }


    wrapper.appendChild(number);

    wrapper.appendChild(content);

    questions.appendChild(wrapper);

}


/* =========================================
   ADD OPTION
========================================= */

function addOption(
    select,
    value,
    text
) {

    const option =
        document.createElement(
            "option"
        );


    option.value =
        value;


    option.textContent =
        text;


    select.appendChild(option);

}


/* =========================================
   MATCH BUTTON
========================================= */

matchButton.addEventListener(
    "click",
    findMatches
);


/* =========================================
   FIND MATCHES
========================================= */

async function findMatches() {

    const inputs =
        document.querySelectorAll(
            ".answer-input"
        );


    const answers = [];

    let missing = false;


    inputs.forEach(input => {

        if (!input.value.trim()) {

            input.classList.add(
                "input-error"
            );

            missing = true;

        } else {

            input.classList.remove(
                "input-error"
            );


            answers.push({

                question:
                    input.dataset.question,

                answer:
                    input.value.trim()

            });

        }

    });


    if (missing) {

        showError(
            "Please answer all the questions."
        );

        return;

    }


    hideError();


    matchButton.disabled = true;


    matchButton.innerHTML =
        "Finding matches...";


    matchStatus.classList.remove(
        "hidden"
    );


    try {

        const response =
            await fetchWithTimeout(

                "/api/match",

                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        query:
                            currentQuery,

                        answers:
                            answers

                    })

                },

                45000
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.details ||
                data.error ||
                "Matching failed."
            );

        }


        showMatches(data);


    } catch (error) {

        console.error(error);


        showError(
            "Matching failed: " +
            error.message
        );


    } finally {

        matchStatus.classList.add(
            "hidden"
        );


        matchButton.disabled =
            false;


        matchButton.innerHTML =
            "Find my matches →";

    }

}


/* =========================================
   SHOW MATCHES
========================================= */

function showMatches(data) {

    const old =
        document.getElementById(
            "schemeResults"
        );


    if (old) {
        old.remove();
    }


    const section =
        document.createElement(
            "div"
        );


    section.id =
        "schemeResults";


    section.className =
        "scheme-results";


    const heading =
        document.createElement(
            "div"
        );


    heading.className =
        "scheme-heading";


    heading.innerHTML = `
        <span class="result-label">
            YOUR MATCHES
        </span>

        <h2>
            Schemes you can explore.
        </h2>
    `;


    section.appendChild(
        heading
    );


    if (data.intro) {

        const intro =
            document.createElement(
                "p"
            );


        intro.className =
            "scheme-intro";


        intro.textContent =
            data.intro;


        section.appendChild(
            intro
        );

    }


    const schemes =
        Array.isArray(data.schemes)
            ? data.schemes
            : [];


    if (schemes.length === 0) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "empty-results";


        empty.textContent =
            "We couldn't find a close match. Try changing your answers or checking the official government portals.";


        section.appendChild(
            empty
        );

    }


    schemes.forEach(
        (scheme, index) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "scheme-card";


            const top =
                document.createElement(
                    "div"
                );


            top.className =
                "scheme-top";


            const number =
                document.createElement(
                    "span"
                );


            number.textContent =
                String(index + 1)
                    .padStart(2, "0");


            const badge =
                document.createElement(
                    "span"
                );


            badge.className =
                "scheme-badge";


            badge.textContent =
                scheme.government ||
                "GOVERNMENT SCHEME";


            top.appendChild(
                number
            );


            top.appendChild(
                badge
            );


            const name =
                document.createElement(
                    "h3"
                );


            name.textContent =
                scheme.name ||
                "Government scheme";


            const description =
                document.createElement(
                    "p"
                );


            description.textContent =
                scheme.description ||
                "";


            card.appendChild(
                top
            );


            card.appendChild(
                name
            );


            card.appendChild(
                description
            );


            if (scheme.whyMatch) {

                const why =
                    document.createElement(
                        "div"
                    );


                why.className =
                    "why-match";


                const strong =
                    document.createElement(
                        "strong"
                    );


                strong.textContent =
                    "Why it may match";


                const text =
                    document.createElement(
                        "span"
                    );


                text.textContent =
                    scheme.whyMatch;


                why.appendChild(
                    strong
                );


                why.appendChild(
                    document.createElement(
                        "br"
                    )
                );


                why.appendChild(
                    text
                );


                card.appendChild(
                    why
                );

            }


            createSection(
                card,
                "Eligibility",
                scheme.eligibility
            );


            createSection(
                card,
                "Documents",
                scheme.documents
            );


            if (
                scheme.officialWebsite
            ) {

                const link =
                    document.createElement(
                        "a"
                    );


                link.className =
                    "official-link";


                link.href =
                    scheme.officialWebsite;


                link.target =
                    "_blank";


                link.rel =
                    "noopener noreferrer";


                link.textContent =
                    "Open official website →";


                card.appendChild(
                    link
                );

            }


            section.appendChild(
                card
            );

        }
    );


    resultSection.appendChild(
        section
    );


    section.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   CREATE RESULT LIST
========================================= */

function createSection(
    card,
    title,
    items
) {

    if (
        !Array.isArray(items) ||
        items.length === 0
    ) {
        return;
    }


    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "scheme-list";


    const heading =
        document.createElement(
            "strong"
        );


    heading.textContent =
        title;


    wrapper.appendChild(
        heading
    );


    const list =
        document.createElement(
            "ul"
        );


    items.forEach(item => {

        const li =
            document.createElement(
                "li"
            );


        li.textContent =
            item;


        list.appendChild(
            li
        );

    });


    wrapper.appendChild(
        list
    );


    card.appendChild(
        wrapper
    );

}


/* =========================================
   TIMEOUT
========================================= */

function fetchWithTimeout(
    url,
    options,
    timeout
) {

    return Promise.race([

        fetch(url, options),

        new Promise(
            (_, reject) => {

                setTimeout(
                    () => {

                        reject(
                            new Error(
                                "Request timed out. Please try again."
                            )
                        );

                    },
                    timeout
                );

            }
        )

    ]);

}


/* =========================================
   ERROR
========================================= */

function showError(message) {

    errorBox.textContent =
        message;


    errorBox.classList.remove(
        "hidden"
    );

}


function hideError() {

    errorBox.classList.add(
        "hidden"
    );

}