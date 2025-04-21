// Returns a random integer between 1 and 2 (inclusive)
export function getRandomInt1To2(): number {
    return Math.floor(Math.random() * 2) + 1
}

// Returns a random integer between 1 and 3 (inclusive)
export function getRandomInt1To3(): number {
    return Math.floor(Math.random() * 3) + 1
}

// Returns a random integer between 1 and 4 (inclusive)
export function getRandomInt1To4(): number {
    return Math.floor(Math.random() * 4) + 1
}

// Returns two random integers between 1 and 4 (inclusive) as a tuple
export function getTwoRandomInts1To4(): [number, number] {
    const first = Math.floor(Math.random() * 4) + 1
    const second = Math.floor(Math.random() * 4) + 1
    return [first, second]
}
