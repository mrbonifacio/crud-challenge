-- Insert sample users
INSERT INTO users (id, email, name) VALUES 
  ('user_1', 'john@example.com', 'John Doe'),
  ('user_2', 'jane@example.com', 'Jane Smith'),
  ('user_3', 'bob@example.com', 'Bob Johnson')
ON CONFLICT (email) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (id, title, description, is_public, user_id) VALUES 
  ('proj_1', 'E-commerce Platform', 'A full-stack e-commerce solution with React and Node.js', true, 'user_1'),
  ('proj_2', 'Task Management App', 'Personal productivity app with drag-and-drop functionality', false, 'user_1'),
  ('proj_3', 'Weather Dashboard', 'Real-time weather monitoring with beautiful charts', true, 'user_2'),
  ('proj_4', 'Blog Engine', 'Markdown-based blog with SEO optimization', true, 'user_2'),
  ('proj_5', 'Private Notes', 'Encrypted note-taking application', false, 'user_2'),
  ('proj_6', 'Portfolio Website', 'Responsive portfolio with dark mode support', true, 'user_3')
ON CONFLICT (id) DO NOTHING;
