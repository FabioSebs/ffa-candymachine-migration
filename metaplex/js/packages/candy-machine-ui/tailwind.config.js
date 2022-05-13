module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./*/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'faq-bg': 'rgba(0,0,0,0.5)',
      },
      screens:{
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      textShadow: {
        'default': '6px 7px 3px rgba(0, 0, 0, .3)',
        'md': '0 2px 2px #000',
        'h2': '0 0 3px #FF0000, 0 0 5px #0000FF',
        'h1': '1px 1px 1px rgba(0, 0, 0, .8)',
      }
      ,
      extend: {
        screens: {
          
          'x2l': '2370px',
          'x3l':'3300px',
          'xxxl':'4757px',
          'xxxxl':'5000px',
          'xxxxxl':'6000px',
          'xxxxxxl':'8000px'
        },
        fontFamily: {
          'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
          'body': ['poppins','montserrat','consolas'],
          "custom": ["Atmospheric", "cocogoose", "gotika"]
        },
        animation: {
          wiggle: 'wiggle 1s ease-in-out infinite',
          bounce: 'bounce 2s ease-in-out infinite',
        }
        ,
        keyframes: {
          wiggle: {
            '0%, 100%': { transform: 'rotate(-.5deg)' },
            '50%': { transform: 'rotate(.5deg)' },
          },
          lightUp: {
  
          },
          bounce: {
  
          }
        }
      },
  
    },
  },
  plugins: [],
}
