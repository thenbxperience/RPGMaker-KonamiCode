/*:
 * @plugindesc Triggers a control switch (Switch 3) when the Konami Code is entered at any time.
 * @thenxexperience
 *
 * @help
 * This plugin triggers Switch 3 when the Konami Code is entered:
 * Up, Up, Down, Down, Left, Right, Left, Right, B, A
 */

(function() {
    const switchId = 3; // Switch ID to be activated

    const konamiCode = [
        38, 38, // Up, Up
        40, 40, // Down, Down
        37, 39, // Left, Right
        37, 39, // Left, Right
        88, 90  // B, A (X, Z in RPG Maker MV)
    ];

    let inputSequence = [];

    const checkKonamiCode = () => {
        if (inputSequence.length === konamiCode.length) {
            if (JSON.stringify(inputSequence) === JSON.stringify(konamiCode)) {
                $gameSwitches.setValue(switchId, true);
                console.log('Konami Code entered! Switch ' + switchId + ' is now ON.');
                inputSequence = []; // Reset the input sequence
            }
        }
    };

    const inputHandler = (event) => {
        inputSequence.push(event.keyCode);
        if (inputSequence.length > konamiCode.length) {
            inputSequence.shift(); // Keep only the last N inputs
        }
        checkKonamiCode();
    };

    // Add the event listener for keydown
    document.addEventListener('keydown', inputHandler);
})();
