/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
var TinyTest = {
    // Test is the object we passed (all the code written in W&C)
    run: function(tests) {
        var failures = 0;
        for (var testName in tests) { // iterate all methods in test
            var testAction = tests[testName]; // its the function tests we wrote originally
            try {
                testAction.apply(this); // apply runs immediately with bind
                console.log('Test:', testName, 'OK');
            } catch (e) {
                failures++;
                console.error('Test:', testName, 'FAILED', e); // Error: fail() undefined
                console.error(e.stack); // e.stack is a stacktrace of the error

                // at Object.fail (tinytest.js:63) (LAST PLACE THE ERROR WAS THROWN!)
                // at Object.IF initialValue, callback should run array.length times (reduce.html:83)
                // at Object.run (tinytest.js:47)
                // at reduce.html:81  (FIRST AREA IT LOOKED IN)
            }
        }
        // if you disable setTimeout,background is just white, not red
        // If you removed setTimeOut function, and just used innerparts, it will be white
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999'); // green, red respectively
            }
        }, 0); // similar to $document.ready from jQuery

        // 1. JavaScript.
        // 2. Update the DOM.
        // 3. Extra tasks (e.g. callbacks passed into setTimeOut)
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest);
