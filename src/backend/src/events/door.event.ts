// Zuständigkeit: M

export class DoorEvent {
    public ignoreLock: boolean;
    timestamp: Date;

    constructor(ignoreLock = false) {
        this.ignoreLock = ignoreLock;
        this.timestamp = new Date();
    }
}