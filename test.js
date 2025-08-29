const request = require('supertest');
const app = require('./index');

// Test data from the examples
const testCases = [
  {
    name: "Example A",
    input: { data: ["a", "1", "334", "4", "R", "$"] },
    expected: {
      odd_numbers: ["1"],
      even_numbers: ["334", "4"],
      alphabets: ["A", "R"],
      special_characters: ["$"],
      sum: "339"
    }
  },
  {
    name: "Example B", 
    input: { data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"] },
    expected: {
      odd_numbers: ["5"],
      even_numbers: ["2", "4", "92"],
      alphabets: ["A", "Y", "B"],
      special_characters: ["&", "-", "*"],
      sum: "103"
    }
  },
  {
    name: "Example C",
    input: { data: ["A", "ABcD", "DOE"] },
    expected: {
      odd_numbers: [],
      even_numbers: [],
      alphabets: ["A", "ABCD", "DOE"],
      special_characters: [],
      sum: "0"
    }
  }
];

// Simple test function
async function runTests() {
  console.log('Running API tests...\n');
  
  for (const testCase of testCases) {
    console.log(`Testing ${testCase.name}:`);
    console.log('Input:', JSON.stringify(testCase.input, null, 2));
    
    try {
      const response = await request(app)
        .post('/bfhl')
        .send(testCase.input)
        .expect(200);
      
      console.log('Response:', JSON.stringify(response.body, null, 2));
      
      // Basic validation
      if (response.body.is_success === true) {
        console.log('✅ Test passed - API returned success');
      } else {
        console.log('❌ Test failed - API returned failure');
      }
      
    } catch (error) {
      console.log('❌ Test failed with error:', error.message);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
  }
}

if (require.main === module) {
  runTests().then(() => {
    console.log('All tests completed');
    process.exit(0);
  });
}

module.exports = { runTests };
