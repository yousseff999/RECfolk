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
    title: "Exat",
    subtitle: "Modernism in motion.",
    isVimeo: true,
  },
  {
    img : "/assets/divote.jpg",
    video : "https://player.vimeo.com/video/1134035064?h=ed76b4db5c",
    title : "Divo",
    subtitle : "Clean korean cosmetics",
    isVimeo: true,
  },
  {
    img: "https://studio-size.com/wp-content/uploads/2023/06/VK_Ikons_Cover_2-567x709.jpg",
    video:"https://player.vimeo.com/video/1134050906?h=5b8b86b016",
      title:"VK Ikons",
      subtitle: "Iconic vine blend",
      isVimeo: true,
  },
  {
    img: "/assets/HotType.jpg",
    video:"https://player.vimeo.com/video/1134042035?h=a3bf9c4689",
    title: "Hot Type",
    subtitle: "Red hot type animations",
    isVimeo: true,
  },
  {
    img: "/assets/alterscope.png",
    video:"https://player.vimeo.com/video/1134042858?h=d0b42eb2ce",
    title: "Alterscope",
    subtitle: "Web3 risk in real time",
    isVimeo: true,
  },
  {
    img: "https://studio-size.com/wp-content/uploads/2024/04/Determ_Featured-567x709.jpg",
    video:"https://player.vimeo.com/video/1134043144?h=2dbd83cc11",
      title:"Determ",
      subtitle:"Sensible media monitoring",
      isVimeo: true,
  },
  
]; 