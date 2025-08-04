-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('General Knowledge', 'Questions about various topics'),
('Science', 'Physics, Chemistry, Biology questions'),
('History', 'Historical events and figures'),
('Sports', 'Sports and athletics questions'),
('Technology', 'Computer science and technology questions')
ON CONFLICT (name) DO NOTHING;

-- Insert sample questions for General Knowledge
INSERT INTO questions (category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty)
SELECT 
  c.id,
  'What is the capital of France?',
  'London',
  'Berlin',
  'Paris',
  'Madrid',
  'C',
  'easy'
FROM categories c WHERE c.name = 'General Knowledge'
ON CONFLICT DO NOTHING;

INSERT INTO questions (category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty)
SELECT 
  c.id,
  'Which planet is known as the Red Planet?',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
  'B',
  'easy'
FROM categories c WHERE c.name = 'Science'
ON CONFLICT DO NOTHING;

INSERT INTO questions (category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty)
SELECT 
  c.id,
  'In which year did World War II end?',
  '1944',
  '1945',
  '1946',
  '1947',
  'B',
  'medium'
FROM categories c WHERE c.name = 'History'
ON CONFLICT DO NOTHING;

INSERT INTO questions (category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty)
SELECT 
  c.id,
  'How many players are there in a basketball team on the court?',
  '4',
  '5',
  '6',
  '7',
  'B',
  'easy'
FROM categories c WHERE c.name = 'Sports'
ON CONFLICT DO NOTHING;

INSERT INTO questions (category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty)
SELECT 
  c.id,
  'What does HTML stand for?',
  'Hyper Text Markup Language',
  'High Tech Modern Language',
  'Home Tool Markup Language',
  'Hyperlink and Text Markup Language',
  'A',
  'medium'
FROM categories c WHERE c.name = 'Technology'
ON CONFLICT DO NOTHING;
