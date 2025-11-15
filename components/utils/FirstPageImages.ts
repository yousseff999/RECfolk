export type MediaItem = {
  img: string;
  video: string;
  title: string;
  subtitle: string;
   isVimeo?: boolean;
};

export const FirstPageImages: MediaItem[] = [
  {
    img: "/assets/exat.png",
    video: "https://player.vimeo.com/video/1089240383?h=7a283e1d4e",
    title: "Show reel",
    subtitle: "Modernism in motion",
    isVimeo: true,
  },
  {
    img : "/assets/divote.jpg",
    video : "https://player.vimeo.com/video/1134035064?h=ed76b4db5c",
    title : "Tennis",
    subtitle : "Alasmakh Tennis court",
    isVimeo: true,
  },
  {
    img: "https://studio-size.com/wp-content/uploads/2023/06/VK_Ikons_Cover_2-567x709.jpg",
    video:"https://player.vimeo.com/video/1134050906?h=5b8b86b016",
      title:"Minestry",
      subtitle: "Where Vision Meets Execution",
      isVimeo: true,
  },
  {
    img: "/assets/HotType.jpg",
    video:"https://player.vimeo.com/video/1134042035?h=a3bf9c4689",
    title: "Shirt Club",
    subtitle: "Fresh drops, Every season",
    isVimeo: true,
  },
  {
    img: "/assets/alterscope.png",
    video:"https://player.vimeo.com/video/1134042858?h=d0b42eb2ce",
    title: "Stadium Flow",
    subtitle: "Shirts in motion, Style in action",
    isVimeo: true,
  },
  {
    img: "https://studio-size.com/wp-content/uploads/2024/04/Determ_Featured-567x709.jpg",
    video:"https://player.vimeo.com/video/1134043144?h=2dbd83cc11",
      title:"Warm-Up Flow",
      subtitle:"Every move counts",
      isVimeo: true,
  },
  
]; 