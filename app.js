import express from 'express';
import path from 'path';
const __dirname = path.resolve();
const router = express.Router();
const app = express();
const dotenv = require("dotenv")
dotenv.config()

var accessToken = process.env.accessToken;
var endpoint = process.env.endpoint;
const secret = process.env.JWT;
 
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/views/home.html'));
  //__dirname : It will resolve to your project folder.
});
 
router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname + '/views/login.html'));
});

router.get('/register',function(req,res){
  res.sendFile(path.join(__dirname + '/views/register.html'));
});

router.get('/questions',function(req,res){
  res.sendFile(path.join(__dirname + '/views/questions.html'));
});


// Create an API endpoint to add a question
app.post('/questions', (req, res) => {
  const { questionText, solutionCode } = req.body;
  const problemData = {
    access_token: accessToken,
    name: 'Question',
    statement: questionText,
    solution: solutionCode,
    // You can include additional parameters based on your requirements
  };

  request.post({
    url: `https://${endpoint}/api/v4/problems`,
    form: problemData
  }, (error, response, body) => {
    if (error) {
      console.error('Error adding question:', error);
      return res.status(500).json({ error: 'An error occurred while adding the question' });
    }

    if (response.statusCode === 201) {
      const problem = JSON.parse(body);
      return res.status(201).json({ questionId: problem.id });
    } else {
      console.error('Error adding question:', response.statusCode, body);
      return res.status(500).json({ error: 'An error occurred while adding the question' });
    }
  });
});

// Handle login form submission
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   // Find the user in the database
//   const user = await User.findOne({ username });

//   // If user not found, show error
//   if (!user) {
//     return res.status(404).send('User not found');
//   }

//   // Compare the entered password with the stored password
//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   // If passwords don't match, show error
//   if (!isPasswordValid) {
//     return res.status(401).send('Invalid password');
//   }

//   // Successful login
//   res.send('Logged in successfully!');
// });

// Store in MongoDB
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists and the password is correct
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1d' });

  // Return the token to the client
  res.json({ token });
});

//redirects to questions page on successful verification of JWF token

router.get('/protected', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'questions.html'));
});

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId;
    next();
  });
}
 
// router.post('/register', async(req,res) => {

// })
 
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
 
console.log('Running at Port 3000');