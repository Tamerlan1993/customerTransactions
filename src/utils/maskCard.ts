export function maskCard(cardNumber: string) {
    return cardNumber ? `${'*'.repeat(cardNumber?.length - 4)}${cardNumber?.substring(cardNumber?.length - 4)}` : '';
}