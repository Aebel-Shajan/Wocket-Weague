const c = {
    KeyW: 0,
    KeyA: 0,
    KeyS: 0,
    KeyD: 0,
    Space: 0,
    ShiftLeft: 0
};
// https://www.toptal.com/developers/keycode
function handleKeyDown(event) {
    c[event.code] = 1;
}

function handleKeyUp(event) {
    c[event.code] = 0;
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

export { c };
