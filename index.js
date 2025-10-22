function calculateSquare(){
    const value = document.getElementById('number').value;
    const result = document.getElementById('result');

    const num = Number(value);

    if (value === '' || isNaN(num)) {
        result.innerHTML = 'Invalid, please enter a number';
        return;
    }

    result.innerHTML = String(num * num);
}

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('calculate');
    if (btn) btn.addEventListener('click', calculateSquare);
});
