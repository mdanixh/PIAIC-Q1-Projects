declare module 'chalk-animation' {
    export interface ChalkAnimation {
      stop: () => void;
      start: () => void;
    }
  
    const chalkAnimation: {
      rainbow: (text: string) => ChalkAnimation;
      // Add other animations as needed
    };
  
    export default chalkAnimation;
  }
  