/* =========================================
   STREET FIGHTER TRAINING HUB
   GUIDES PAGE
========================================= */


/* =========================================
   LOAD GUIDES
========================================= */

async function loadGuides() {

    const guides =
        await fetchGuides();


    displayGuides(guides);

}


/* =========================================
   DISPLAY GUIDES
========================================= */

function displayGuides(guides) {

    const container =
        document.getElementById(
            "guide-container"
        );


    container.innerHTML = "";


    if (guides.length === 0) {

        container.innerHTML = `

            <p>
                No guides were found.
            </p>

        `;

        return;

    }


    guides.forEach(function(guide) {


        const card =
            document.createElement("article");


        card.classList.add(
            "guide-card"
        );


        card.innerHTML = `

            <div class="guide-header">

                <span class="guide-category">

                    ${guide.category}

                </span>


                <span class="guide-difficulty">

                    ${guide.difficulty}

                </span>

            </div>


            <h2>

                ${guide.title}

            </h2>


            <p>

                ${guide.description}

            </p>


            <h3>
                Topics
            </h3>


            <ul>

                ${guide.topics.map(function(topic) {

                    return `<li>${topic}</li>`;

                }).join("")}

            </ul>


            <button
                class="btn guide-button"
                onclick="openGuide(${guide.id})"
            >

                READ GUIDE

            </button>

        `;


        container.appendChild(card);

    });

}


/* =========================================
   OPEN GUIDE
========================================= */

async function openGuide(id) {

    const guides =
        await fetchGuides();


    const guide =
        guides.find(function(guide) {

            return guide.id === id;

        });


    if (!guide) {

        console.error(
            "Guide not found."
        );

        return;

    }


    displayGuideModal(guide);

}


/* =========================================
   GUIDE MODAL
========================================= */

function displayGuideModal(guide) {

    const modal =
        document.getElementById(
            "guide-modal"
        );


    const content =
        document.getElementById(
            "guide-modal-content"
        );


    content.innerHTML = `

        <button
            class="modal-close"
            onclick="closeGuide()"
        >

            ×

        </button>


        <span class="guide-category">

            ${guide.category}

        </span>


        <h2>

            ${guide.title}

        </h2>


        <p>

            ${guide.description}

        </p>


        <hr>


        <h3>
            What You Will Learn
        </h3>


        <ul>

            ${guide.topics.map(function(topic) {

                return `<li>${topic}</li>`;

            }).join("")}

        </ul>


        <h3>
            Training Tip
        </h3>


        <p>

            Practice this concept in Training Mode
            and focus on understanding why the
            technique works rather than simply
            memorizing it.

        </p>

    `;


    modal.classList.add("show");

}


/* =========================================
   CLOSE GUIDE
========================================= */

function closeGuide() {

    const modal =
        document.getElementById(
            "guide-modal"
        );


    modal.classList.remove("show");

}


/* =========================================
   SEARCH GUIDES
========================================= */

document
    .getElementById("guide-search")
    .addEventListener(
        "input",
        async function(event) {

            const searchTerm =
                event.target.value
                    .toLowerCase();


            const guides =
                await fetchGuides();


            const filteredGuides =
                guides.filter(function(guide) {

                    return guide.title
                        .toLowerCase()
                        .includes(searchTerm);

                });


            displayGuides(
                filteredGuides
            );

        }
    );


/* =========================================
   CATEGORY FILTER
========================================= */

document
    .getElementById("guide-category")
    .addEventListener(
        "change",
        async function(event) {

            const category =
                event.target.value;


            const guides =
                await fetchGuides();


            if (category === "all") {

                displayGuides(
                    guides
                );

                return;

            }


            const filteredGuides =
                guides.filter(
                    function(guide) {

                        return guide.category ===
                            category;

                    }
                );


            displayGuides(
                filteredGuides
            );

        }
    );


/* =========================================
   START PAGE
========================================= */

loadGuides();