# Guitar Fretboard Explorer

## Description
An interactive web application for visualizing and exploring triads and seventh voicings on the guitar fretboard. The application allows users to view different chord formations, scales, and their intervals in any key.

## Technologies Used
- HTML5
- JavaScript (ES6+)
- D3.js for visualization
- ES6 Modules
- CSS3

## Features
- Interactive guitar fretboard visualization
- Support for multiple triad types
- Seventh voicings in different positions
- Scale visualization
- Option to display note names or intervals
- Support for major and minor keys
- Color-coding system for different chord groups
- Interactive legend

## Installation
1. Clone the repository
2. Due to ES6 modules usage, you'll need to serve the files through a web server. You can use:
   - Live Server in VS Code
   - Python: `python -m http.server`
   - Node.js: `npx serve`

## Usage
1. Select a key in the "key-select" dropdown
2. Choose the grade type (Major/Minor)
3. Select the display type (note names/intervals)
4. Explore different options:
   - Triads on different string groups
   - Seventh voicings
   - Various scales

## Project Structure
├── guitar-fretboard (2).html // Main HTML file
├── fretboard.js // Main fretboard logic
├── utils.js // Utility functions and constants
├── dataTriads.js // Triad data
└── dataVoicing7.js // Seventh voicings data

## Features in Detail
- **Triads**: Visualize triads across different string groups (1-2-3, 2-3-4, 3-4-5, 4-5-6)
- **Seventh Chords**: Explore seventh chord voicings in different positions
- **Scales**: View various scales including Major, Natural Minor, Major Pentatonic, Minor Pentatonic, and Blues
- **Interactive Display**: Toggle between note names and intervals
- **Color Coding**: Each chord group is assigned a unique color for easy identification
- **Dynamic Legend**: Updates based on currently displayed formations

## Contributing
Feel free to submit issues and enhancement requests.

## Learning Outcomes and Conclusions

I have recreated my guitar fretboard project from this GitHub repository using Cursor and Claude 3.5 Sonnet. 
The results have been spectacular, taking only two afternoons to complete the project.

While my previous experience programming the same project helped me understand Claude's code generation (interestingly, Claude's generated code is very similar to my original implementation :P), I am thoroughly impressed with the development journey. The way Cursor and Claude can assist in project creation is incredible.

All the ideas and improvements I had planned for the project but couldn't implement due to time constraints can now be implemented in just a few hours. I'm very excited to see the final results of this project and be able to finish it 4 years after starting it xD.

