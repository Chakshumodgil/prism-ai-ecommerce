/**
 * UTILITY: AI Description Generator (Mock)
 * PATH: src/utils/aiGenerator.ts
 * 
 * DESCRIPTION:
 * A lightweight service that simulates AI-driven content creation. 
 * It assembles randomized strings into a cohesive product description, 
 * providing immediate feedback for the Admin Dashboard without external API costs.
 */

export const generateAIDescription = (productName: string): string => {
  
  // VALIDATION GUARD: 
  // Prevents the "AI" from generating nonsense if the input is too short or empty.
  if (!productName || productName.trim().length < 3) {
    return "Please enter a valid product name first!";
  }

  // DATA POOLS: 
  // Categorized sentence fragments to ensure the output always follows 
  // a logical Intro -> Feature -> Call to Action structure.
  const intros = [
    `Experience the next level of quality with our ${productName}.`,
    `Introducing the all-new ${productName}, designed for those who demand the best.`,
    `Elevate your daily routine with the premium ${productName}.`,
    `Discover why the ${productName} is becoming a favorite among professionals.`,
  ];

  const features = [
    "Crafted with high-quality materials and incredible attention to detail.",
    "Engineered for maximum performance and long-lasting durability.",
    "Combines sleek modern aesthetics with unmatched functionality for everyday use.",
    "Features a revolutionary design that prioritizes both style and comfort.",
  ];

  const closings = [
    "Order yours today and feel the difference in every detail.",
    "A perfect blend of style and substance for the modern user.",
    "Limited edition - get yours now while supplies last!",
    "Upgrade your lifestyle with this essential addition to your collection.",
  ];

  /**
   * RANDOMIZATION LOGIC:
   * We use Math.random() with Math.floor() to grab a random index from 
   * each array. This creates thousands of possible unique combinations.
   */
  const intro = intros[Math.floor(Math.random() * intros.length)];
  const feature = features[Math.floor(Math.random() * features.length)];
  const closing = closings[Math.floor(Math.random() * closings.length)];

  // Return the assembled string as a single cohesive paragraph.
  return `${intro} ${feature} ${closing}`;
};