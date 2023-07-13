import express from 'express';
import request from 'request';
const app = express();

// Define your Sphere Engine access token and endpoint
var accessToken = '62c39931c4c23a7be73304e6d554c821';
var endpoint = '1bd0371b.problems.sphere-engine.com';

// Create an API endpoint to add a question
// app.post('/questions', (req, res) => {
//   const { questionText, solutionCode } = req.body;
//   const problemData = {
//     access_token: accessToken,
//     name: 'Question',
//     statement: questionText,
//     solution: solutionCode,
//     // You can include additional parameters based on your requirements
//   };

//   request.post({
//     url: `https://${endpoint}/api/v4/problems`,
//     form: problemData
//   }, (error, response, body) => {
//     if (error) {
//       console.error('Error adding question:', error);
//       return res.status(500).json({ error: 'An error occurred while adding the question' });
//     }

//     if (response.statusCode === 201) {
//       const problem = JSON.parse(body);
//       return res.status(201).json({ questionId: problem.id });
//     } else {
//       console.error('Error adding question:', response.statusCode, body);
//       return res.status(500).json({ error: 'An error occurred while adding the question' });
//     }
//   });
// });

// Create an API endpoint to edit a question
app.put('/questions/:questionId', (req, res) => {
  const { questionId } = req.params;
  const { questionText, solutionCode } = req.body;
  const problemData = {
    access_token: accessToken,
    name: 'Question',
    statement: questionText,
    solution: solutionCode,
    // You can include additional parameters based on your requirements
  };

  request.put({
    url: `https://${endpoint}/api/v4/problems/${questionId}`,
    form: problemData
  }, (error, response, body) => {
    if (error) {
      console.error('Error editing question:', error);
      return res.status(500).json({ error: 'An error occurred while editing the question' });
    }

    if (response.statusCode === 200) {
      const problem = JSON.parse(body);
      return res.status(200).json({ questionId: problem.id });
    } else {
      console.error('Error editing question:', response.statusCode, body);
      return res.status(500).json({ error: 'An error occurred while editing the question' });
    }
  });
});

// Create an API endpoint to delete a question
app.delete('/questions/:questionId', (req, res) => {
  const { questionId } = req.params;
  const requestData = {
    access_token: accessToken,
  };

  request.delete({
    url: `https://${endpoint}/api/v4/problems/${questionId}`,
    qs: requestData
  }, (error, response, body) => {
    if (error) {
      console.error('Error deleting question:', error);
      return res.status(500).json({ error: 'An error occurred while deleting the question' });
    }

    if (response.statusCode === 204) {
      return res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      console.error('Error deleting question:', response.statusCode, body);
      return res.status(500).json({ error: 'An error occurred while deleting the question' });
    }
  });
});

// Create an API endpoint to add a test case to a question
app.post('/questions/:questionId/testcases', (req, res) => {
  const { questionId } = req.params;
  const { input, expectedOutput } = req.body;
  const testCaseData = {
    access_token: accessToken,
    input,
    output: expectedOutput,
  };

  request.post({
    url: `https://${endpoint}/api/v4/problems/${questionId}/testcases`,
    form: testCaseData
  }, (error, response, body) => {
    if (error) {
      console.error('Error adding test case:', error);
      return res.status(500).json({ error: 'An error occurred while adding the test case' });
    }

    if (response.statusCode === 201) {
      const testCase = JSON.parse(body);
      return res.status(201).json({ testCaseId: testCase.id });
    } else {
      console.error('Error adding test case:', response.statusCode, body);
      return res.status(500).json({ error: 'An error occurred while adding the test case' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});