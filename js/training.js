/* =========================================
   STREET FIGHTER TRAINING HUB
   TRAINING PAGE
========================================= */


/* =========================================
   TRAINING SESSION OBJECT
========================================= */

let trainingSession = {

    character: "",

    category: "",

    difficulty: "",

    duration: 0,

    goals: [],

    completedGoals: []

};


/* =========================================
   LOAD CHARACTERS INTO FORM
========================================= */

async function loadTrainingCharacters() {

    const characters =
        await fetchCharacters();


    const select =
        document.getElementById(
            "training-character"
        );


    characters.forEach(function(character) {

        const option =
            document.createElement("option");


        option.value =
            character.name;


        option.textContent =
            character.name;


        select.appendChild(option);

    });

}


/* =========================================
   START TRAINING SESSION
========================================= */

function startTrainingSession(event) {

    event.preventDefault();


    /* Get form values */

    const character =
        document.getElementById(
            "training-character"
        ).value;


    const category =
        document.getElementById(
            "training-category"
        ).value;


    const difficulty =
        document.getElementById(
            "training-difficulty"
        ).value;


    const duration =
        document.getElementById(
            "training-duration"
        ).value;


    /* Get selected goals */

    const goalInputs =
        document.querySelectorAll(
            'input[name="goal"]:checked'
        );


    const goals = [];


    goalInputs.forEach(function(input) {

        goals.push(input.value);

    });


    /* Require at least one goal */

    if (goals.length === 0) {

        alert(
            "Please select at least one training goal."
        );

        return;

    }


    /* Create session object */

    trainingSession = {

        character: character,

        category: category,

        difficulty: difficulty,

        duration: Number(duration),

        goals: goals,

        completedGoals: []

    };


    /* Show session */

    displayTrainingSession();

}


/* =========================================
   DISPLAY TRAINING SESSION
========================================= */

function displayTrainingSession() {

    const setup =
        document.getElementById(
            "training-setup"
        );


    const session =
        document.getElementById(
            "training-session"
        );


    setup.classList.add("hidden");

    session.classList.remove("hidden");


    displaySessionSummary();

    displayGoals();

    updateProgress();

}


/* =========================================
   DISPLAY SESSION SUMMARY
========================================= */

function displaySessionSummary() {

    const summary =
        document.getElementById(
            "session-summary"
        );


    summary.innerHTML = `

        <div class="summary-item">

            <strong>
                Fighter
            </strong>

            <span>
                ${trainingSession.character}
            </span>

        </div>


        <div class="summary-item">

            <strong>
                Focus
            </strong>

            <span>
                ${trainingSession.category}
            </span>

        </div>


        <div class="summary-item">

            <strong>
                Difficulty
            </strong>

            <span>
                ${trainingSession.difficulty}
            </span>

        </div>


        <div class="summary-item">

            <strong>
                Duration
            </strong>

            <span>
                ${trainingSession.duration}
                minutes
            </span>

        </div>

    `;

}


/* =========================================
   DISPLAY GOALS
========================================= */

function displayGoals() {

    const container =
        document.getElementById(
            "active-goals"
        );


    container.innerHTML = "";


    trainingSession.goals.forEach(
        function(goal, index) {


            const goalElement =
                document.createElement("div");


            goalElement.classList.add(
                "training-goal"
            );


            goalElement.innerHTML = `

                <label>

                    <input
                        type="checkbox"
                        data-goal-index="${index}"
                    >

                    <span>
                        ${goal}
                    </span>

                </label>

            `;


            container.appendChild(
                goalElement
            );


            const checkbox =
                goalElement.querySelector(
                    "input"
                );


            checkbox.addEventListener(
                "change",
                function() {

                    toggleGoal(index);

                }
            );

        }
    );

}


/* =========================================
   TOGGLE GOAL
========================================= */

function toggleGoal(index) {

    const goal =
        trainingSession.goals[index];


    const goalAlreadyCompleted =
        trainingSession.completedGoals
            .includes(goal);


    if (goalAlreadyCompleted) {

        trainingSession.completedGoals =
            trainingSession.completedGoals
                .filter(function(item) {

                    return item !== goal;

                });

    }

    else {

        trainingSession.completedGoals.push(
            goal
        );

    }


    updateProgress();

}


/* =========================================
   UPDATE PROGRESS
========================================= */

function updateProgress() {

    const totalGoals =
        trainingSession.goals.length;


    const completedGoals =
        trainingSession.completedGoals.length;


    let percentage = 0;


    if (totalGoals > 0) {

        percentage =
            Math.round(
                (completedGoals / totalGoals) * 100
            );

    }


    const progressText =
        document.getElementById(
            "progress-text"
        );


    const progressFill =
        document.getElementById(
            "progress-fill"
        );


    progressText.textContent =
        percentage + "%";


    progressFill.style.width =
        percentage + "%";


    if (percentage === 100) {

        progressText.textContent =
            "100% — COMPLETE!";

    }

}


/* =========================================
   END TRAINING SESSION
========================================= */

function endTrainingSession() {

    const setup =
        document.getElementById(
            "training-setup"
        );


    const session =
        document.getElementById(
            "training-session"
        );


    session.classList.add("hidden");

    setup.classList.remove("hidden");


    trainingSession = {

        character: "",

        category: "",

        difficulty: "",

        duration: 0,

        goals: [],

        completedGoals: []

    };


    document
        .getElementById("training-form")
        .reset();

}


/* =========================================
   FORM EVENT
========================================= */

document
    .getElementById("training-form")
    .addEventListener(
        "submit",
        startTrainingSession
    );


/* =========================================
   END SESSION EVENT
========================================= */

document
    .getElementById("end-session")
    .addEventListener(
        "click",
        endTrainingSession
    );


/* =========================================
   START PAGE
========================================= */

loadTrainingCharacters();