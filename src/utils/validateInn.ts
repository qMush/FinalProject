// Проверка ИНН по официальным алгоритмам ФНС для 10 и 12 знаков

const weights10 = [2, 4, 10, 3, 5, 9, 4, 6, 8]
const weights11 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
const weights12 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]

function checksum(digits: number[], weights: number[]) {
  const sum = digits.reduce((acc, digit, idx) => acc + digit * weights[idx], 0)
  return sum % 11 % 10
}

export function validateInn(inn: string): boolean {
  if (!/^\d{10}$/.test(inn) && !/^\d{12}$/.test(inn)) return false

  const digits = inn.split('').map((d) => Number(d))

  if (digits.length === 10) {
    const n10 = checksum(digits, weights10)
    return n10 === digits[9]
  }

  const n11 = checksum(digits, weights11)
  const n12 = checksum(digits, weights12)
  return n11 === digits[10] && n12 === digits[11]
}


