
function runTests() {
    console.log('Тестирование функций');
    let allTestsPassed = true;

    try {

        console.log('Основные функции:');
        
        console.assert(sum(1, 2, 3) === 6, 'sum(1,2,3) должен вернуть 6');
        console.assert(sum() === 0, 'sum() без аргументов должен вернуть 0');
        console.assert(sum(10) === 10, 'sum(10) должен вернуть 10');
        console.log('sum: пройдено');
        
        const user1 = createUser({ name: 'Иван', age: 25 });
        const user2 = createUser({ name: 'Мария', age: 30, email: 'maria@mail.ru' });
        console.assert(user1.includes('email: не указан'), 'createUser должен использовать email по умолчанию');
        console.assert(user2.includes('maria@mail.ru'), 'createUser должен использовать переданный email');
        console.log('createUser: пройдено');
        
        const secret = secretMessage('123', 'Секретное сообщение');
        console.assert(secret('123') === 'Секретное сообщение', 'secretMessage должен возвращать сообщение при верном пароле');
        console.assert(secret('wrong') === 'Доступ запрещен', 'secretMessage должен блокировать доступ при неверном пароле');
        console.log('secretMessage: пройдено');

        console.log('Функции высшего порядка:');
        
        const add5 = x => x + 5;
        const multiply2 = x => x * 2;
        const subtract3 = x => x - 3;
        const composed = compose(subtract3, multiply2, add5);
        console.assert(composed(10) === 27, 'compose должен правильно применять функции справа налево');
        console.log('compose: пройдено');
        
        const mapTest = [1, 2, 3];
        const mapped = myMap(mapTest, x => x * 2);
        console.assert(JSON.stringify(mapped) === JSON.stringify([2, 4, 6]), 'myMap должен преобразовывать массив');
        console.log('myMap: пройдено');
        
        const filterTest = [1, 2, 3, 4, 5];
        const filtered = myFilter(filterTest, x => x % 2 === 0);
        console.assert(JSON.stringify(filtered) === JSON.stringify([2, 4]), 'myFilter должен фильтровать массив');
        console.log('myFilter: пройдено');
        
        const reduceTest = [1, 2, 3, 4];
        const reduced = myReduce(reduceTest, (acc, val) => acc + val, 0);
        console.assert(reduced === 10, 'myReduce должен правильно аккумулировать значения');
        console.log('myReduce: пройдено');

        console.log('Сложные функции:');
        
        const multiply = (a, b, c) => a * b * c;
        const curriedMultiply = curry(multiply);
        console.assert(curriedMultiply(2)(3)(4) === 24, 'curry должен работать с последовательным вызовом');
        console.assert(curriedMultiply(2, 3)(4) === 24, 'curry должен работать с частичным применением');
        console.log('curry: пройдено');
        
        let callCount = 0;
        const memoizedAdd = memoize((a, b) => {
            callCount++;
            return a + b;
        });
        memoizedAdd(1, 2);
        memoizedAdd(1, 2);
        console.assert(callCount === 1, 'memoize должен кэшировать результаты');
        console.log('memoize: пройдено');
        
        const passwordValidator = createValidator({
            minLength: 6,
            requireNumbers: true,
            requireUppercase: true
        });
        const weakResult = passwordValidator('weak');
        const strongResult = passwordValidator('Strong123');
        console.assert(!weakResult.isValid, 'Валидатор должен отвергать слабые пароли');
        console.assert(strongResult.isValid, 'Валидатор должен принимать сильные пароли');
        console.log('createValidator: пройдено');

        console.log('DEBOUNCE И THROTTLE:');
        console.log('Функции реализованы - проверьте их работу через UI');

        console.log('Краевые:');
        
        console.assert(myMap([], x => x).length === 0, 'myMap должен работать с пустым массивом');
        console.assert(myFilter([], x => x).length === 0, 'myFilter должен работать с пустым массивом');
        console.assert(myReduce([], (acc, val) => acc + val, 0) === 0, 'myReduce должен работать с пустым массивом');
        
        console.assert(myReduce([1, 2, 3], (acc, val) => acc + val) === 6, 'myReduce должен работать без initialValue');
        
        console.log('Краевые случаи: пройдено');

        console.log('Все ответы успешно пройдены');
        
    } catch (error) {
        console.error('Тест не пройден:', error);
        allTestsPassed = false;
    }

    demonstrateFunctions();

    initUIDemo();

    return allTestsPassed;
}

function demonstrateFunctions() {
    console.log('Демонстрация');
    
    console.log('sum(1, 2, 3, 4, 5):', sum(1, 2, 3, 4, 5));
    console.log('createUser({ name: "Анна", age: 28 }):', createUser({ name: "Анна", age: 28 }));
    
    const secret = secretMessage('qwerty', 'Тайное послание');
    console.log('secretMessage с верным паролем:', secret('qwerty'));
    console.log('secretMessage с неверным паролем:', secret('wrong'));
    
    const numbers = [1, 2, 3, 4, 5];
    console.log('myMap([1,2,3,4,5], x => x * x):', myMap(numbers, x => x * x));
    console.log('myFilter([1,2,3,4,5], x => x > 2):', myFilter(numbers, x => x > 2));
    console.log('myReduce([1,2,3,4,5], (acc, x) => acc + x, 0):', myReduce(numbers, (acc, x) => acc + x, 0));
    

    const add = curry((a, b, c) => a + b + c);
    console.log('curry add(1)(2)(3):', add(1)(2)(3));
    console.log('curry add(1, 2)(3):', add(1, 2)(3));
    

    const validator = createValidator({ minLength: 3, requireNumbers: true });
    console.log('Валидатор для "ab":', validator('ab'));
    console.log('Валидатор для "abc1":', validator('abc1'));
}

function initUIDemo() {

    const debounceBtn = document.getElementById('debounceBtn');
    const debouncedClick = debounce(() => {
        console.log('Debounce: Кнопка нажата!');
    }, 1000);
    
    debounceBtn.addEventListener('click', debouncedClick);
    
    const throttleBtn = document.getElementById('throttleBtn');
    const throttledClick = throttle(() => {
        console.log('Throttle: Кнопка нажата!');
    }, 1000);
    
    throttleBtn.addEventListener('click', throttledClick);
    
    const validatorInput = document.getElementById('validatorInput');
    const validatorResult = document.getElementById('validatorResult');
    
    const passwordValidator = createValidator({
        minLength: 6,
        requireNumbers: true,
        requireUppercase: true
    });
    
    validatorInput.addEventListener('input', (e) => {
        const result = passwordValidator(e.target.value);
        validatorResult.textContent = result.isValid ? '✓ Valid' : '✗ Invalid';
        validatorResult.className = result.isValid ? 'valid' : 'invalid';
    });
}

if (typeof window !== 'undefined') {
    window.onload = runTests;
} else {

    runTests();
}