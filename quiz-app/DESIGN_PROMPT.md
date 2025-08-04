# QuizMaster Website Design Prompt

## Overall Design System

### Color Palette

- **Primary Gradient**: Purple (#8B5CF6) to Pink (#EC4899)
- **Secondary Gradient**: Blue (#3B82F6) to Cyan (#06B6D4)
- **Background**: Gradient from Purple-50 (#FAF5FF) via Pink-50 (#FDF2F8) to Blue-50 (#EFF6FF)
- **Card Background**: White with 80% opacity and backdrop blur
- **Text Colors**:
  - Primary: Gray-800 (#1F2937)
  - Secondary: Gray-600 (#4B5563)
  - Accent: White (#FFFFFF)

### Typography

- **Primary Font**: Inter (Google Fonts)
- **Font Weights**: Regular (400), Medium (500), Bold (700)
- **Font Sizes**:
  - Hero: 6xl (3.75rem)
  - Headings: 2xl-3xl (1.5rem-1.875rem)
  - Body: lg-xl (1.125rem-1.25rem)
  - Small: sm (0.875rem)

### Layout & Spacing

- **Container**: Max-width 6xl (72rem), centered
- **Padding**: 12 (3rem) vertical, 4 (1rem) horizontal
- **Gap**: 4-12 (1rem-3rem) between elements
- **Border Radius**: 2xl-3xl (1rem-1.5rem) for cards and buttons

## Component Specifications

### 1. Navigation Bar

- **Background**: White with subtle shadow
- **Height**: 16 (4rem)
- **Logo**: "Hat rean ✨" with purple-to-pink gradient text
- **Navigation Items**:
  - Home, Leaderboard, Admin (if admin)
  - User avatar with initials in purple-pink gradient circle
  - Logout button with ghost variant

### 2. Hero Section

- **Background**: Gradient background with floating animated elements
- **Floating Elements**:
  - Yellow, pink, and blue circles with 20% opacity
  - Floating animation (3s ease-in-out infinite)
- **Main Title**: "Ready to Quiz? 🚀" with purple-pink-blue gradient
- **Subtitle**: "Test your knowledge and have fun while learning! 🧠✨"
- **Feature Icons**: Three circular icons with pulse-glow animation
  - Lightning Fast (purple-pink gradient)
  - Super Accurate (blue-cyan gradient)
  - Mega Fun (green-emerald gradient)

### 3. Quiz Starter Card

- **Header**: Purple-to-pink gradient background
- **Title**: "Start Your Quiz Adventure! 🎯" with Play icon
- **Content**:
  - Category selector with rounded borders
  - Start button with gradient background and hover effects
- **Hover Effects**: Scale 105% on hover, 95% on active

### 4. Feature Cards

- **Leaderboard Card**:
  - Trophy icon with yellow-orange gradient
  - "View Rankings ✨" button with yellow hover effects
- **Quiz Features Card**:
  - Book icon with blue-purple gradient
  - Feature list with colored icons:
    - Clock (red-pink gradient)
    - Dice (green-blue gradient)
    - Chart (purple-indigo gradient)
    - Medal (yellow-orange gradient)

### 5. Category Preview Grid

- **Layout**: 5-column grid on desktop, responsive
- **Category Cards**:
  - Circular gradient backgrounds with emojis
  - Hover effects: scale 105%, enhanced shadow
- **Category Icons & Colors**:
  - General Knowledge: 🌍 (green-emerald)
  - Science: 🔬 (blue-cyan)
  - History: 🏛️ (amber-orange)
  - Sports: ⚽ (red-pink)
  - Technology: 💻 (purple-indigo)

### 6. Quiz Interface

- **Header**:
  - Category icon and name
  - Progress bar with gradient fill
  - Timer with red pulse animation when ≤10s
- **Question Card**:
  - Purple-pink gradient header
  - Question text in white
  - Four answer options with hover effects
- **Answer Buttons**:
  - White background with backdrop blur
  - Border radius 2xl
  - Hover: scale 105%, purple border
  - Selected: purple-pink gradient
  - Correct: green gradient
  - Incorrect: red gradient

### 7. Loading States

- **Spinner**: Purple-pink gradient circle with Brain icon
- **Loading Text**: "Loading your quiz adventure... ✨"

### 8. Results Screen

- **Header**: Dynamic gradient based on score
  - 90%+: Yellow-orange (🏆 Perfect!)
  - 70%+: Blue-purple (⭐ Great job!)
  - 50%+: Green-blue (👍 Good effort!)
  - <50%: Pink-red (💪 Don't give up!)
- **Content**: Score display, percentage, time taken

## Animation Specifications

### Keyframe Animations

1. **Float Animation**:

   ```css
   @keyframes float {
     0%,
     100% {
       transform: translateY(0px);
     }
     50% {
       transform: translateY(-10px);
     }
   }
   ```

2. **Pulse Glow**:

   ```css
   @keyframes pulse-glow {
     0%,
     100% {
       box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
     }
     50% {
       box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
     }
   }
   ```

3. **Bounce Animation**:
   ```css
   @keyframes bounce {
     0%,
     20%,
     53%,
     80%,
     100% {
       transform: translateY(0);
     }
     40%,
     43% {
       transform: translateY(-10px);
     }
     70% {
       transform: translateY(-5px);
     }
   }
   ```

### Hover Effects

- **Cards**: Scale 105%, enhanced shadow
- **Buttons**: Scale 105% on hover, 95% on active
- **Answer Options**: Scale 105%, border color change

## Interactive States

### Button States

- **Default**: Gradient background
- **Hover**: Darker gradient, scale 105%
- **Active**: Scale 95%
- **Disabled**: 50% opacity, not-allowed cursor

### Form Elements

- **Select**: Rounded borders, focus ring
- **Input**: Subtle borders, focus states

## Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-column grid for features
- **Desktop**: Full 5-column category grid

## Accessibility

- **Color Contrast**: High contrast text on gradients
- **Focus States**: Visible focus rings
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels

## Icon System

- **Lucide React Icons**: Consistent 24px size
- **Emoji Integration**: Category-specific emojis
- **Custom Icons**: Gradient backgrounds with white icons

## Shadow System

- **Cards**: `shadow-xl shadow-purple-100/50`
- **Buttons**: Enhanced shadow on hover
- **Floating Elements**: Subtle drop shadows

## Glass Morphism Effects

- **Cards**: `bg-white/80 backdrop-blur-sm`
- **Buttons**: `bg-white/90 backdrop-blur-sm`
- **Transparency**: 80-90% opacity with blur

This design system creates a modern, playful, and engaging quiz application with smooth animations, gradient aesthetics, and excellent user experience.
