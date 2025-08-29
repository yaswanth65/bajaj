const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to check if a character is a number
const isNumber = (char) => !isNaN(char) && !isNaN(parseFloat(char));

// Helper function to check if a character is alphabetic
const isAlphabet = (char) => /^[A-Za-z]$/.test(char);

// Helper function to check if a character is a special character
const isSpecialChar = (char) => !isNumber(char) && !isAlphabet(char);

// Helper function to create concatenated string in reverse order with alternating caps
const createConcatString = (inputData) => {
  // Extract all alphabetic characters from the input data in order
  let allChars = [];
  
  inputData.forEach(item => {
    if (typeof item === 'string') {
      for (let char of item) {
        if (isAlphabet(char)) {
          allChars.push(char.toLowerCase());
        }
      }
    }
  });
  
  // Reverse the array
  allChars.reverse();
  
  // Apply alternating caps (starting with UPPERCASE for first character)
  let result = '';
  for (let i = 0; i < allChars.length; i++) {
    if (i % 2 === 0) {
      result += allChars[i].toUpperCase();
    } else {
      result += allChars[i].toLowerCase();
    }
  }
  
  return result;
};

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    // Validate input
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: 'data' must be an array"
      });
    }
    
    // Initialize arrays
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    
    // Process each item in the data array
    data.forEach(item => {
      const strItem = String(item);
      
      // Check if it's a number
      if (isNumber(strItem)) {
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
        alphabets.push(strItem.toUpperCase());
      }
      // Check if it's a string with only alphabetic characters
      else if (/^[A-Za-z]+$/.test(strItem)) {
        alphabets.push(strItem.toUpperCase());
      }
      // Otherwise, treat as special character
      else if (strItem.length === 1 && isSpecialChar(strItem)) {
        specialCharacters.push(strItem);
      }
      // Handle mixed strings or other special cases
      else {
        // For mixed strings, extract individual characters
        for (let char of strItem) {
          if (isNumber(char)) {
            const num = parseInt(char);
            if (num % 2 === 0) {
              evenNumbers.push(char);
            } else {
              oddNumbers.push(char);
            }
            sum += num;
          } else if (isAlphabet(char)) {
            alphabets.push(char.toUpperCase());
          } else if (isSpecialChar(char)) {
            specialCharacters.push(char);
          }
        }
      }
    });
    
    // Create concatenated string
    const concatString = createConcatString(data);
    
    // Response object
    const response = {
      is_success: true,
      user_id: "yaswanth_kancharla_14112004", // Replace with your actual details in format: firstname_lastname_ddmmyyyy
      email: "yaswanth.22bce9763@vitapstudent.ac.in", // Replace with your email
      roll_number: "22BCE9763", // Replace with your roll number
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString
    };
    
    res.status(200).json(response);
    
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      message: "Internal server error"
    });
  }
});

// GET /bfhl endpoint for testing
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: "BFHL API is running",
    endpoints: {
      "POST /bfhl": "Main API endpoint",
      "GET /bfhl": "Test endpoint"
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    is_success: false,
    message: "Something went wrong!"
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    is_success: false,
    message: "Endpoint not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`POST endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;
