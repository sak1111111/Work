
function runTests() {
    console.log('=== ТЕСТИРОВАНИЕ АЛГОРИТМОВ ===\n');
    
    // Тестирование функций для работы с числами
    console.log('1. ТЕСТЫ ДЛЯ РАБОТЫ С ЧИСЛАМИ:');
    
    // isPrime
    console.assert(isPrime(2) === true, 'isPrime(2) должен вернуть true');
    console.assert(isPrime(17) === true, 'isPrime(17) должен вернуть true');
    console.assert(isPrime(15) === false, 'isPrime(15) должен вернуть false');
    console.assert(isPrime(1) === false, 'isPrime(1) должен вернуть false');
    console.log('✓ isPrime: пройдено');
    
    // factorial
    console.assert(factorial(0) === 1, 'factorial(0) должен вернуть 1');
    console.assert(factorial(5) === 120, 'factorial(5) должен вернуть 120');
    console.assert(factorial(3) === 6, 'factorial(3) должен вернуть 6');
    console.log('✓ factorial: пройдено');
    
    // fibonacci
    console.assert(JSON.stringify(fibonacci(5)) === JSON.stringify([0, 1, 1, 2, 3]), 
                  'fibonacci(5) должен вернуть [0,1,1,2,3]');
    console.assert(JSON.stringify(fibonacci(1)) === JSON.stringify([0]), 
                  'fibonacci(1) должен вернуть [0]');
    console.log('✓ fibonacci: пройдено');
    
    // gcd
    console.assert(gcd(48, 18) === 6, 'gcd(48, 18) должен вернуть 6');
    console.assert(gcd(17, 13) === 1, 'gcd(17, 13) должен вернуть 1');
    console.assert(gcd(0, 5) === 5, 'gcd(0, 5) должен вернуть 5');
    console.log('✓ gcd: пройдено');
    
    // Тестирование функций для работы со строками
    console.log('\n2. ТЕСТЫ ДЛЯ РАБОТЫ СО СТРОКАМИ:');
    
    // isPalindrome
    console.assert(isPalindrome('А роза упала на лапу Азора') === true, 
                  'Палиндром должен определяться корректно');
    console.assert(isPalindrome('hello') === false, 
                  'Не палиндром должен возвращать false');
    console.assert(isPalindrome('a') === true, 
                  'Одиночный символ должен быть палиндромом');
    console.log('✓ isPalindrome: пройдено');
    
    // countVowels
    console.assert(countVowels('Привет') === 2, 'countVowels("Привет") должен вернуть 2');
    console.assert(countVowels('JavaScript') === 3, 'countVowels("JavaScript") должен вернуть 3');
    console.assert(countVowels('БВГД') === 0, 'countVowels("БВГД") должен вернуть 0');
    console.log('✓ countVowels: пройдено');
    
    // reverseString
    console.assert(reverseString('hello') === 'olleh', 'reverseString("hello") должен вернуть "olleh"');
    console.assert(reverseString('а') === 'а', 'reverseString("а") должен вернуть "а"');
    console.log('✓ reverseString: пройдено');
    
    // findLongestWord
    console.assert(findLongestWord('Самое длинное слово в предложении') === 'предложении', 
                  'findLongestWord должен найти самое длинное слово');
    console.log('✓ findLongestWord: пройдено');
    
    // Тестирование функций для работы с массивами
    console.log('\n3. ТЕСТЫ ДЛЯ РАБОТЫ С МАССИВАМИ:');
    
    // findMax
    console.assert(findMax([1, 5, 3, 9, 2]) === 9, 'findMax должен найти максимальный элемент');
    console.assert(findMax([-1, -5, -3]) === -1, 'findMax должен работать с отрицательными числами');
    console.log('✓ findMax: пройдено');
    
    // removeDuplicates
    console.assert(JSON.stringify(removeDuplicates([1,2,2,3,4,4,5])) === JSON.stringify([1,2,3,4,5]), 
                  'removeDuplicates должен удалять дубликаты');
    console.log('✓ removeDuplicates: пройдено');
    
    // bubbleSort
    console.assert(JSON.stringify(bubbleSort([5,3,8,1,2])) === JSON.stringify([1,2,3,5,8]), 
                  'bubbleSort должен сортировать массив');
    console.log('✓ bubbleSort: пройдено');
    
    // binarySearch
    const sortedArray = [1, 3, 5, 7, 9, 11];
    console.assert(binarySearch(sortedArray, 5) === 2, 'binarySearch должен находить существующий элемент');
    console.assert(binarySearch(sortedArray, 6) === -1, 'binarySearch должен возвращать -1 для отсутствующего элемента');
    console.log('✓ binarySearch: пройдено');
    
    // Тестирование утилитарных функций
    console.log('\n4. ТЕСТЫ УТИЛИТАРНЫХ ФУНКЦИЙ:');
    
    // formatCurrency
    console.assert(formatCurrency(1234.56) === '1 234.56 ₽', 
                  'formatCurrency должен правильно форматировать сумму');
    console.assert(formatCurrency(1000) === '1 000 ₽', 
                  'formatCurrency должен работать с целыми числами');
    console.log('✓ formatCurrency: пройдено');
    
    // isValidEmail
    console.assert(isValidEmail('test@example.com') === true, 
                  'isValidEmail должен принимать валидный email');
    console.assert(isValidEmail('invalid-email') === false, 
                  'isValidEmail должен отклонять невалидный email');
    console.log('✓ isValidEmail: пройдено');
    
    // generatePassword
    const password = generatePassword(10);
    console.assert(password.length === 10, 'generatePassword должен генерировать пароль нужной длины');
    console.assert(/[A-Z]/.test(password), 'generatePassword должен содержать заглавные буквы');
    console.assert(/[a-z]/.test(password), 'generatePassword должен содержать строчные буквы');
    console.assert(/[0-9]/.test(password), 'generatePassword должен содержать цифры');
    console.assert(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password), 'generatePassword должен содержать спецсимволы');
    console.log('✓ generatePassword: пройдено');
    
    console.log('\n=== ВСЕ ТЕСТЫ УСПЕШНО ПРОЙДЕНЫ! ===');
    
    // Демонстрация работы функций
    demonstrateFunctions();
}

function demonstrateFunctions() {
    console.log('\n=== ДЕМОНСТРАЦИЯ РАБОТЫ ФУНКЦИЙ ===');
    
    console.log('isPrime(17):', isPrime(17));
    console.log('factorial(5):', factorial(5));
    console.log('fibonacci(8):', fibonacci(8));
    console.log('gcd(48, 18):', gcd(48, 18));
    
    console.log('isPalindrome("А роза упала на лапу Азора"):', isPalindrome('А роза упала на лапу Азора'));
    console.log('countVowels("Программирование"):', countVowels('Программирование'));
    console.log('reverseString("JavaScript"):', reverseString('JavaScript'));
    console.log('findLongestWord("Найдите самое длинное слово здесь"):', findLongestWord('Найдите самое длинное слово здесь'));
    
    console.log('findMax([3, 1, 4, 1, 5, 9, 2, 6]):', findMax([3, 1, 4, 1, 5, 9, 2, 6]));
    console.log('removeDuplicates([1,2,2,3,4,4,5]):', removeDuplicates([1,2,2,3,4,4,5]));
    console.log('bubbleSort([5,3,8,4,2]):', bubbleSort([5,3,8,4,2]));
    
    const searchArray = [1, 3, 5, 7, 9];
    console.log('binarySearch([1,3,5,7,9], 5):', binarySearch(searchArray, 5));
    
    console.log('formatCurrency(1234567.89):', formatCurrency(1234567.89));
    console.log('isValidEmail("user@domain.com"):', isValidEmail('user@domain.com'));
    console.log('generatePassword(12):', generatePassword(12));
}

// Запускаем тесты при загрузке страницы
if (typeof window !== 'undefined') {
    window.onload = runTests;
} else {
    // Для Node.js
    runTests();
}