const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// Named URL constants — update in one place
// ==========================================
const DISCUSSION_ROOM_GUIDE_URL =
  'https://www.facebook.com/davaodoctorscollegelibrary/posts/pfbid034FYiTWw3MdVeNmEKX9Q3QDzGV7bMcJxP6Pc6t6CyfkZxbRum1xyXxT1aCBwRZW4Pl';
const ROOM_CALENDAR_URL =
  'https://sites.google.com/davaodoctors.edu.ph/discussionroomschedule/home';
const RESEARCH_CLINIC_URL =
  'https://www.facebook.com/watch/?v=4019208001653425';

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// Routes
// ==========================================
app.get('/', (req, res) => {
  // Force Philippine time (UTC+8) regardless of server's local timezone
  const phTimeString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });
  const hour = new Date(phTimeString).getHours();

  let greeting;
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  else greeting = 'Good evening';

  res.render('index', {
    greeting,
    urls: {
      guide: DISCUSSION_ROOM_GUIDE_URL,
      calendar: ROOM_CALENDAR_URL,
      clinic: RESEARCH_CLINIC_URL,
    },
  });
});

// ==========================================
// Start server
// ==========================================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
