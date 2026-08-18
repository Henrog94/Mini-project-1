/* =========================================
   STREET FIGHTER TRAINING HUB
   DATA SERVICE
========================================= */


/*
    TEMPORARY DATA SOURCES

    Current:
    Local JSON files

    Future:
    Our own backend API.
*/


const CHARACTER_DATA_SOURCE =
    "data/characters.json";


const GUIDE_DATA_SOURCE =
    "data/guides.json";

    const FRAME_DATA_SOURCE =
    "data/frame-data.json";


/* =========================================
   GET ALL CHARACTERS
========================================= */

async function fetchCharacters() {

    try {

        const response =
            await fetch(
                CHARACTER_DATA_SOURCE
            );


        if (!response.ok) {

            throw new Error(
                "Could not load character data."
            );

        }


        const characters =
            await response.json();


        return characters;

    }

    catch (error) {

        console.error(
            "Character data error:",
            error
        );

        return [];

    }

}


/* =========================================
   GET ALL GUIDES
========================================= */

async function fetchGuides() {

    try {

        const response =
            await fetch(
                GUIDE_DATA_SOURCE
            );


        if (!response.ok) {

            throw new Error(
                "Could not load guide data."
            );

        }


        const guides =
            await response.json();


        return guides;

    }

    catch (error) {

        console.error(
            "Guide data error:",
            error
        );

        return [];

    }

}

/* =========================================
   GET FRAME DATA
========================================= */

async function fetchFrameData() {

    try {

        const response =
            await fetch(
                FRAME_DATA_SOURCE
            );


        if (!response.ok) {

            throw new Error(
                "Could not load frame data."
            );

        }


        const frameData =
            await response.json();


        return frameData;

    }

    catch (error) {

        console.error(
            "Frame data error:",
            error
        );

        return [];

    }

}