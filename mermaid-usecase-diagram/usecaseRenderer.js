import { templates } from './template.js';

export function renderShowcase() {
  let svgContent = '';
  
  // 1. The data
  const useCases = ["Base UseCase", "Login", "Register", "Logout"];
  
  // 2. Define layout constants
  const startX = 150;
  const spacingX = 200; 
  const startY = 150;

  // 3. Draw background container first
  svgContent += templates.systemBoundary(10, 10, 800, 300, "Dynamic Showcase");

  // 4. Draw Use Cases dynamically
  useCases.forEach((label, index) => {
    const x = startX + (index * spacingX);
    
    // Draw the use case ellipse
    svgContent += templates.useCase(x, startY, label);
    
    // Add the constraint sign to every use case as an example
    // Positioned at top-right of the ellipse
    svgContent += templates.constraintSign(x + 40, startY - 30);
    
    // 5. Draw connectors between them automatically
    if (index < useCases.length - 1) {
      const nextX = startX + ((index + 1) * spacingX);
      
      // Connects right side of current to left side of next
      svgContent += templates.connector(x + 60, startY, nextX - 60, startY, "include");
    }
  });

  return `<svg width="850" height="400">${svgContent}</svg>`;
}