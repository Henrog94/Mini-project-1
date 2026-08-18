/* =========================================
   STREET FIGHTER TRAINING HUB
   CHARACTER PAGE
========================================= */


/* =========================================
   CHARACTER TUTORIAL VIDEOS
========================================= */

/*
    =====================================================
    ADD YOUR YOUTUBE LINKS HERE
    =====================================================

    Search for "PASTE_" to quickly find the locations.

    Example:

    "Ryu":
        "https://www.youtube.com/watch?v=XXXXXXXXXXX",

    You can use either:

    https://www.youtube.com/watch?v=VIDEO_ID

    OR:

    https://youtu.be/VIDEO_ID

    =====================================================
*/

const tutorialVideos = {

    /* ===== RYU ===== */

    "Ryu":
        "https://youtu.be/iAs1p3LVdAs?list=PLs4LjNCY15zMvPPLb8PPoiV6yvR7M9ZPe",


    /* ===== KEN ===== */

    "Ken":
        "https://youtu.be/1SX2m7sqbtA?list=PLs4LjNCY15zMvPPLb8PPoiV6yvR7M9ZPe",


    /* ===== CHUN-LI ===== */

    "Chun-Li":
        "https://youtu.be/seX6oUfwjII?list=PLs4LjNCY15zMvPPLb8PPoiV6yvR7M9ZPe",


    /* ===== GUILE ===== */

    "Guile":
        "https://youtu.be/xjJaXn45S0E?list=PLs4LjNCY15zMvPPLb8PPoiV6yvR7M9ZPe",


    /* ===== ZANGIEF ===== */

    "Zangief":
        "https://youtu.be/zj213DBy0TY?list=PLs4LjNCY15zMvPPLb8PPoiV6yvR7M9ZPe",


    /* ===== JURI ===== */

    "Juri":
        "https://youtu.be/E3i6ZOWJ2Ng?list=PLs4LjNCY15zMvPPLb8PPoiV6yvR7M9ZPe"

};


/* =========================================
   GET CHARACTER TUTORIAL VIDEO
========================================= */

function getTutorialVideo(characterName) {

    return tutorialVideos[characterName] || "";

}


/* =========================================
   CREATE TUTORIAL VIDEO
========================================= */

function createTutorialVideo(characterName) {

    const videoURL =
        getTutorialVideo(characterName);


    /*
        If a video has not been added yet,
        display a placeholder instead.
    */

    if (
        !videoURL ||
        videoURL.startsWith("PASTE_")
    ) {

        return `

            <div class="tutorial-video-empty">

                <h4>
                    Character Tutorial
                </h4>


                <p>
                    Tutorial video coming soon.
                </p>

            </div>

        `;

    }


    /*
        Extract the YouTube video ID.
    */

    let videoID = "";


    /*
        Standard YouTube URL:

        https://www.youtube.com/watch?v=VIDEO_ID
    */

    if (
        videoURL.includes("watch?v=")
    ) {

        videoID =
            videoURL
                .split("watch?v=")[1]
                .split("&")[0];

    }


    /*
        Short YouTube URL:

        https://youtu.be/VIDEO_ID
    */

    else if (
        videoURL.includes("youtu.be/")
    ) {

        videoID =
            videoURL
                .split("youtu.be/")[1]
                .split("?")[0];

    }


    /*
        If you paste only the video ID,
        this will also work.
    */

    else {

        videoID = videoURL;

    }


    /*
        Create the video player.
    */

    return `

        <div class="tutorial-video">

            <h4>
                Character Tutorial
            </h4>


            <div class="video-wrapper">

                <iframe

                    src="https://www.youtube.com/embed/${videoID}"

                    title="${characterName} Street Fighter 6 Tutorial"

                    loading="lazy"

                    allow="accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture"

                    allowfullscreen>

                </iframe>

            </div>

        </div>

    `;

}


/* =========================================
   LOAD CHARACTERS
========================================= */

async function loadCharacters() {

    const characters =
        await fetchCharacters();


    displayCharacters(characters);

}


/* =========================================
   DISPLAY CHARACTER CARDS
========================================= */

function displayCharacters(characters) {

    const container =
        document.getElementById(
            "character-container"
        );


    /*
        Clear anything currently inside
        the character container.
    */

    container.innerHTML = "";


    /*
        Check whether we received data.
    */

    if (characters.length === 0) {

        container.innerHTML = `

            <p>
                No character data was found.
            </p>

        `;

        return;

    }


    /*
        Loop through every character.
    */

    characters.forEach(function(character) {


        /*
            Create a new article element.
        */

        const card =
            document.createElement("article");


        /*
            Give the article a CSS class.
        */

        card.classList.add(
            "character-card"
        );


        /*
            Put the character information
            inside the card.
        */
card.innerHTML = `

    <!-- ================================
     CHARACTER IMAGE
================================= -->

<div class="character-image-container">

    <img
        class="character-image"
        src="${character.image}"
        alt="${character.name} from Street Fighter 6"
    >

</div>


    <!-- ================================
         CHARACTER HEADER
    ================================= -->

    <div class="character-card-header">

        <span class="character-id">

            #${character.id}

        </span>


        <span class="difficulty">

            ${character.difficulty}

        </span>

    </div>


    <!-- ================================
         CHARACTER NAME
    ================================= -->

    <h2>

        ${character.name}

    </h2>


    <!-- ================================
         CHARACTER ROLE
    ================================= -->

    <p class="character-role">

        ${character.role}

    </p>


    <!-- ================================
         CHARACTER DESCRIPTION
    ================================= -->

    <p>

        ${character.description}

    </p>


    <!-- ================================
         CHARACTER DETAILS
    ================================= -->

    <div class="character-details">

        <p>

            <strong>
                Fighting Style:
            </strong>

            ${character.style}

        </p>


        <p>

            <strong>
                Main Strength:
            </strong>

            ${character.strengths[0]}

        </p>

    </div>


    <!-- ================================
         CHARACTER TUTORIAL
    ================================= -->

    ${createTutorialVideo(character.name)}


    <!-- ================================
         VIEW FIGHTER BUTTON
    ================================= -->

    <button
        class="btn character-button"
        onclick="showCharacter(${character.id})"
    >

        VIEW FIGHTER

    </button>

`;


        /*
            Add the card to the webpage.
        */

        container.appendChild(card);

    });

}


/* =========================================
   SHOW CHARACTER DETAILS
========================================= */

async function showCharacter(id) {

    /*
        Get the characters again.
    */

    const characters =
        await fetchCharacters();


    /*
        Find the character with
        the matching ID.
    */

    const character =
        characters.find(function(character) {

            return character.id === id;

        });


    /*
        Make sure the character exists.
    */

    if (!character) {

        console.error(
            "Character not found."
        );

        return;

    }


    /*
        Display the character details.
    */

    showCharacterModal(character);

}


/* =========================================
   CHARACTER MODAL
========================================= */

function showCharacterModal(character) {

    const modal =
        document.getElementById(
            "character-modal"
        );


    const modalContent =
        document.getElementById(
            "character-modal-content"
        );


    /*
        Create the modal contents.
    */

    modalContent.innerHTML = `

        <button
            class="modal-close"
            onclick="closeCharacterModal()"
        >

            ×

        </button>


        <h2>

            ${character.name}

        </h2>


        <p>

            <strong>
                Fighting Style:
            </strong>

            ${character.style}

        </p>


        <p>

            <strong>
                Role:
            </strong>

            ${character.role}

        </p>


        <p>

            <strong>
                Difficulty:
            </strong>

            ${character.difficulty}

        </p>


        <hr>


        <h3>
            Overview
        </h3>


        <p>

            ${character.description}

        </p>


        <h3>
            Strengths
        </h3>


        <ul>

            ${character.strengths.map(function(strength) {

                return `<li>${strength}</li>`;

            }).join("")}

        </ul>


        <h3>
            Weaknesses
        </h3>


        <ul>

            ${character.weaknesses.map(function(weakness) {

                return `<li>${weakness}</li>`;

            }).join("")}

        </ul>


        <h3>
            Special Moves
        </h3>


        <ul>

            ${character.specialMoves.map(function(move) {

                return `<li>${move}</li>`;

            }).join("")}

        </ul>


        <!-- ================================
             CHARACTER TUTORIAL
        ================================= -->

        ${createTutorialVideo(character.name)}

    `;


    /*
        Show the modal.
    */

    modal.classList.add("show");

}


/* =========================================
   CLOSE CHARACTER MODAL
========================================= */

function closeCharacterModal() {

    const modal =
        document.getElementById(
            "character-modal"
        );


    modal.classList.remove("show");

}


/* =========================================
   START CHARACTER PAGE
========================================= */

loadCharacters();


/* =========================================
   CHARACTER SEARCH
========================================= */

const characterSearch =
    document.getElementById(
        "character-search"
    );


if (characterSearch) {

    characterSearch.addEventListener(
        "input",
        async function(event) {

            const searchTerm =
                event.target.value
                    .toLowerCase();


            const characters =
                await fetchCharacters();


            const filteredCharacters =
                characters.filter(
                    function(character) {

                        return character.name
                            .toLowerCase()
                            .includes(searchTerm);

                    }
                );


            displayCharacters(
                filteredCharacters
            );

        }
    );

}


/* =========================================
   DIFFICULTY FILTER
========================================= */

const difficultyFilter =
    document.getElementById(
        "difficulty-filter"
    );


if (difficultyFilter) {

    difficultyFilter.addEventListener(
        "change",
        async function(event) {

            const difficulty =
                event.target.value;


            const characters =
                await fetchCharacters();


            if (difficulty === "all") {

                displayCharacters(
                    characters
                );

                return;

            }


            const filteredCharacters =
                characters.filter(
                    function(character) {

                        return character.difficulty ===
                            difficulty;

                    }
                );


            displayCharacters(
                filteredCharacters
            );

        }
    );

}