export const characters = ["Car", "Truck", "Monster Truck", "Helicopter", "Fighter Jet", "Motorcycle", "Airplane", "Bicycle", "Wheelchair", "Baby Carriage", "Horse", "Shopping Cart"]

export function getCharacterClassName(idx) {
    return characters[idx].toLowerCase().replace(" ", "-");
}
