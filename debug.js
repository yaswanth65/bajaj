const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Test just Example C
app.post('/test', (req, res) => {
  const data = ["A","ABcD","DOE"];
  
  // Initialize arrays
  const evenNumbers = [];
  const oddNumbers = [];
  const alphabets = [];
  const specialCharacters = [];
  let sum = 0;
  
  // Helper functions
  const isNumber = (char) => !isNaN(char) && !isNaN(parseFloat(char));
  const isAlphabet = (char) => /^[A-Za-z]$/.test(char);
  const isSpecialChar = (char) => !isNumber(char) && !isAlphabet(char);
  
  console.log('Processing data:', data);
  
  data.forEach(item => {
    const strItem = String(item);
    console.log(`Processing: "${strItem}"`);
    
    // Check if it's a number
    if (isNumber(strItem)) {
      console.log('  -> Number');
      const num = parseInt(strItem);
      if (num % 2 === 0) {
        evenNumbers.push(strItem);
      } else {
        oddNumbers.push(strItem);
      }
      sum += num;
    }
    // Check if it's alphabetic (single character or string)
    else if (strItem.length === 1 && isAlphabet(strItem)) {
      console.log('  -> Single alphabet');
      alphabets.push(strItem.toUpperCase());
    }
    // Check if it's a string with only alphabetic characters
    else if (/^[A-Za-z]+$/.test(strItem)) {
      console.log('  -> Alphabetic string');
      alphabets.push(strItem.toUpperCase());
    }
    // Otherwise, treat as special character
    else if (strItem.length === 1 && isSpecialChar(strItem)) {
      console.log('  -> Special char');
      specialCharacters.push(strItem);
    }
    else {
      console.log('  -> Other/mixed');
    }
  });
  
  console.log('Results:');
  console.log('  alphabets:', alphabets);
  console.log('  even_numbers:', evenNumbers);
  console.log('  odd_numbers:', oddNumbers);
  console.log('  special_characters:', specialCharacters);
  console.log('  sum:', sum);
  
  const response = {
    alphabets: alphabets,
    even_numbers: evenNumbers,
    odd_numbers: oddNumbers,
    special_characters: specialCharacters,
    sum: sum.toString()
  };
  
  res.json(response);
});

app.listen(3001, () => {
  console.log('Test server running on port 3001');
});
