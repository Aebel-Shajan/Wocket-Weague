/**
 * Represents a keyboard handler that tracks pressed keys and shift state.
 */
class KeyboardHandler {
	pressedKeys: { [key: string]: boolean } = {};
	shiftIsDown = false;

	constructor() {
		this.pressedKeys = {};
		if (typeof window !== "undefined") {
			window.addEventListener("keydown", (event) => {
				this.pressedKeys[event.key.toLowerCase()] = true;
				this.shiftIsDown = event.shiftKey;
			});
			window.addEventListener("keyup", (event) => {
				this.pressedKeys[event.key.toLowerCase()] = false;
				this.shiftIsDown = event.shiftKey;
			});
		}
	}

	/**
	 * Checks if a specific key is currently being pressed.
	 * @param key - The key to check.
	 * @see[Key reference](https://www.toptal.com/developers/key)
	 * @returns `true` if the key is currently being pressed, `false` otherwise.
	 */
	isKeyDown(key: string): boolean {
		return this.pressedKeys[key] || false;
	}

	/**
	 * Checks if the shift key is currently being pressed.
	 * @returns `true` if the shift key is currently being pressed, `false` otherwise.
	 */
	isShiftDown(): boolean {
		return this.shiftIsDown;
	}
}

export default KeyboardHandler;
