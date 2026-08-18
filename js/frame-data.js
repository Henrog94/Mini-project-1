/* =========================================
   STREET FIGHTER TRAINING HUB
   FRAME DATA
========================================= */


/* =========================================
   STORE FRAME DATA
========================================= */

let allFrameData = [];


/* =========================================
   LOAD FRAME DATA
========================================= */

async function loadFrameData() {

    allFrameData =
        await fetchFrameData();


    populateCharacterSelect();

}


/* =========================================
   POPULATE CHARACTER SELECT
========================================= */

function populateCharacterSelect() {

    const select =
        document.getElementById(
            "frame-character"
        );


    /*
        Create a list containing
        only unique character names.
    */

    const characters = [];


    allFrameData.forEach(function(move) {

        if (!characters.includes(move.character)) {

            characters.push(move.character);

        }

    });


    characters.forEach(function(character) {

        const option =
            document.createElement("option");


        option.value =
            character;


        option.textContent =
            character;


        select.appendChild(option);

    });

}


/* =========================================
   CHARACTER CHANGE
========================================= */

document
    .getElementById("frame-character")
    .addEventListener(
        "change",
        function(event) {

            const character =
                event.target.value;


            populateMoveSelect(character);

        }
    );


/* =========================================
   POPULATE MOVE SELECT
========================================= */

function populateMoveSelect(character) {

    const moveSelect =
        document.getElementById(
            "frame-move"
        );


    moveSelect.innerHTML = `

        <option value="">
            Select Move
        </option>

    `;


    if (!character) {

        return;

    }


    const characterMoves =
        allFrameData.filter(
            function(move) {

                return move.character ===
                    character;

            }
        );


    characterMoves.forEach(function(move) {

        const option =
            document.createElement("option");


        option.value =
            move.id;


        option.textContent =
            move.move;


        moveSelect.appendChild(option);

    });

}


/* =========================================
   MOVE CHANGE
========================================= */

document
    .getElementById("frame-move")
    .addEventListener(
        "change",
        function(event) {

            const moveId =
                Number(event.target.value);


            if (!moveId) {

                hideFrameResult();

                return;

            }


            const move =
                allFrameData.find(
                    function(item) {

                        return item.id ===
                            moveId;

                    }
                );


            if (move) {

                displayFrameData(move);

            }

        }
    );


/* =========================================
   DISPLAY FRAME DATA
========================================= */

function displayFrameData(move) {

    const result =
        document.getElementById(
            "frame-result"
        );


    result.classList.remove(
        "hidden"
    );


    /*
        Text values
    */

    document.getElementById(
        "frame-move-name"
    ).textContent =
        move.move;


    document.getElementById(
        "frame-move-type"
    ).textContent =
        `${move.character} • ${move.type}`;


    document.getElementById(
        "startup-value"
    ).textContent =
        move.startup;


    document.getElementById(
        "active-value"
    ).textContent =
        move.active;


    document.getElementById(
        "recovery-value"
    ).textContent =
        move.recovery;


    document.getElementById(
        "hit-value"
    ).textContent =
        formatFrameValue(
            move.onHit
        );


    document.getElementById(
        "block-value"
    ).textContent =
        formatFrameValue(
            move.onBlock
        );


    /*
        Update visual bars
    */

    updateFrameBar(
        "startup-bar",
        "startup-chart-value",
        move.startup
    );


    updateFrameBar(
        "active-bar",
        "active-chart-value",
        move.active
    );


    updateFrameBar(
        "recovery-bar",
        "recovery-chart-value",
        move.recovery
    );
        updateTimeline(move);

}
/* =========================================
   UPDATE FRAME TIMELINE
========================================= */

function updateTimeline(move) {

    const startup =
        document.getElementById(
            "timeline-startup"
        );


    const active =
        document.getElementById(
            "timeline-active"
        );


    const recovery =
        document.getElementById(
            "timeline-recovery"
        );


    if (
        !startup ||
        !active ||
        !recovery
    ) {

        return;

    }


    /*
        Maximum timeline length.

        20 frames = 100%
    */

    const maxFrames = 20;


    /*
        Convert frame values
        into percentages.
    */

    const startupWidth =
        (move.startup / maxFrames) * 100;


    const activeWidth =
        (move.active / maxFrames) * 100;


    const recoveryWidth =
        (move.recovery / maxFrames) * 100;


    /*
        Startup begins at frame 0.
    */

    startup.style.left =
        "0%";


    startup.style.width =
        startupWidth + "%";


    /*
        Active begins after startup.
    */

    active.style.left =
        startupWidth + "%";


    active.style.width =
        activeWidth + "%";


    /*
        Recovery begins after
        startup + active.
    */

    recovery.style.left =
        (
            startupWidth +
            activeWidth
        ) + "%";


    recovery.style.width =
        recoveryWidth + "%";

}


/* =========================================
   FORMAT FRAME VALUE
========================================= */

function formatFrameValue(value) {

    if (value > 0) {

        return "+" + value;

    }


    return value;

}


/* =========================================
   UPDATE FRAME BAR
========================================= */

function updateFrameBar(
    barId,
    valueId,
    value
) {

    const bar =
        document.getElementById(
            barId
        );


    const valueDisplay =
        document.getElementById(
            valueId
        );


    if (!bar) {

        console.error(
            "Bar not found:",
            barId
        );

        return;

    }


    if (!valueDisplay) {

        console.error(
            "Value display not found:",
            valueId
        );

        return;

    }


    /*
        Convert the frame value
        into a percentage.

        20 frames = 100%
        10 frames = 50%
        5 frames  = 25%
    */

    const percentage =
        Math.min(
            (value / 20) * 100,
            100
        );


    /*
        Update the visual bar.
    */

    bar.style.width =
        percentage + "%";


    /*
        Update the number.
    */

    valueDisplay.textContent =
        value;


    /*
        Debugging information.

        You can remove this console.log
        later when the project is finished.
    */

    console.log(
        barId,
        "Frame:",
        value,
        "Width:",
        percentage + "%"
    );

}


/* =========================================
   HIDE FRAME RESULT
========================================= */

function hideFrameResult() {

    const result =
        document.getElementById(
            "frame-result"
        );


    result.classList.add(
        "hidden"
    );

}


/* =========================================
   START PAGE
========================================= */

loadFrameData();