QUnit.config.autostart = false  // sync = false; start after loading html

const appURL = './index.html'
const openingTag = '<main class="container mt-5 flex-fill">'
const closingTag = '</main>'

window.addEventListener('load', function () {
  fetch(appURL, { method: 'GET' })
    .then(response => {
      return response.text();  // returns promise
    })
    .then(txt => {
      const start = txt.indexOf(openingTag);
      const end = txt.indexOf(closingTag) + closingTag.length;
      const html = txt.substring(start, end);
      const qunit_fixture_body = document.getElementById('qunit-fixture');
      qunit_fixture_body.innerHTML = html;
      console.log(qunit_fixture_body)
      QUnit.start();
    })
    .catch(error => {
      console.error('error:', error);
      QUnit.start();
    })
});

QUnit.test("main.js add tests", function (assert) {
  assert.equal(add(1, 1), 2, "Positive integers");
  assert.equal(add(-1, -1), -2, "Negative integers");
  assert.equal(add(-10, 10), 0, "Mixed");
});

QUnit.test("main.js number 1 validation", function (assert) {
  const input = document.querySelector('#firstNumber'); 
  const warning = document.querySelector('#firstWarning'); 
  input.value = -3;
  assert.equal(input.value, -3, "Bad value assigned");
  assert.strictEqual(input.checkValidity(), false, "Correctly fails validation");
  input.focus();
  input.blur();
  assert.strictEqual(warning.innerHTML, 'Invalid input', `Correctly adds warning ${warning}`);
});

