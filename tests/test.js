const { calculateTip, fahrenheitToCelcius, celciusToFahrenheit } = require('../src/math.js');

test('should calculate total with tip', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
});

test('should convert 32 F to C', () => {
    const result = fahrenheitToCelcius(32);
    expect(result).toBe(0);
});

test('should convert 0 C to 32 F', () => {
    const result = celciusToFahrenheit(0);
    expect(result).toBe(32);
});

test('async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(2);
        done();
    },2000);
})