/* =========================================
   STREET FIGHTER TRAINING HUB
   EXTERNAL / BACKEND DATA
========================================= */


/*
    TEMPORARY DATA SOURCE

    We are using a local JSON file for now.

    Later this URL can be changed to:

        /api/characters

    when we build our own backend.
*/


const dataURL =
    "data/characters.json";


/* =========================================
   LOAD DATA
========================================= */

async function loadExternalData() {

    const status =
        document.getElementById(
            "api-status"
        );


    const container =
        document.getElementById(
            "external-data-container"
        );


    try {

        status.textContent =
            "Loading character data...";


        const response =
            await fetch(dataURL);


        if (!response.ok) {

            throw new Error(
                "Request failed: " +
                response.status
            );

        }


        const data =
            await response.json();


        console.log(
            "Character data:",
            data
        );


        displayExternalData(
            data.characters,
            container
        );


        status.textContent =
            "Character data loaded successfully.";

    }


    catch (error) {

        console.error(
            "Data loading error:",
            error
        );


        status.textContent =
            "Unable to load character data.";

    }

}


/* =========================================
   DISPLAY DATA
========================================= */

function displayExternalData(
    characters,
    container
) {

    container.innerHTML = "";


    characters.forEach(
        function(character) {


            const card =
                document.createElement(
                    "article"
                );


            card.classList.add(
                "resource-card"
            );


            card.innerHTML = `

                <h3>
                    ${character.name}
                </h3>


                <p>
                    Style:
                    ${character.style}
                </p>


                <p>
                    Difficulty:
                    ${character.difficulty}
                </p>


                <p>
                    Role:
                    ${character.role}
                </p>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================
   START
========================================= */

loadExternalData();