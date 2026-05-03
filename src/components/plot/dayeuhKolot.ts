export type PlotData = { id: string; x: number; y: number; width: number; height: number };

const dayeuhKolotPlots: PlotData[] = [
  // Top row
  { id: "28", x: 30, y: 30, width: 30, height: 60 },
  { id: "26", x: 100, y: 30, width: 30, height: 60 },
  { id: "25", x: 140, y: 30, width: 30, height: 25 },
  { id: "24", x: 175, y: 30, width: 30, height: 25 },
  { id: "23", x: 220, y: 55, width: 30, height: 40 },
  { id: "22", x: 255, y: 55, width: 30, height: 40 },
  { id: "22a", x: 290, y: 55, width: 30, height: 40 },
  { id: "29", x: 330, y: 30, width: 30, height: 60 },
  { id: "21", x: 375, y: 30, width: 30, height: 60 },
  { id: "20", x: 410, y: 30, width: 30, height: 60 },
  { id: "19", x: 450, y: 30, width: 30, height: 60 },
  { id: "18", x: 490, y: 30, width: 30, height: 60 },
  { id: "17", x: 530, y: 30, width: 30, height: 60 },
  { id: "15", x: 580, y: 30, width: 30, height: 60 },
  { id: "14", x: 620, y: 30, width: 30, height: 60 },
  { id: "13a", x: 660, y: 30, width: 30, height: 60 },
  { id: "13", x: 710, y: 55, width: 30, height: 40 },
  { id: "12", x: 760, y: 30, width: 30, height: 60 },
  { id: "11", x: 805, y: 30, width: 30, height: 60 },
  { id: "10", x: 845, y: 30, width: 30, height: 60 },
  { id: "9", x: 885, y: 30, width: 30, height: 60 },
  { id: "8", x: 925, y: 30, width: 30, height: 60 },
  { id: "7", x: 980, y: 30, width: 30, height: 60 },
  { id: "6", x: 1025, y: 30, width: 30, height: 60 },
  { id: "5", x: 1065, y: 30, width: 30, height: 60 },
  { id: "5a", x: 1125, y: 55, width: 30, height: 40 },
  { id: "4a", x: 1170, y: 30, width: 30, height: 60 },

  // Second row
  { id: "30", x: 30, y: 100, width: 30, height: 40 },
  { id: "31", x: 65, y: 100, width: 30, height: 40 },
  { id: "32", x: 100, y: 100, width: 30, height: 40 },
  { id: "33", x: 140, y: 100, width: 30, height: 40 },
  { id: "34a", x: 190, y: 120, width: 30, height: 30 },
  { id: "34", x: 225, y: 120, width: 30, height: 30 },
  { id: "35", x: 260, y: 120, width: 30, height: 30 },
  { id: "36", x: 295, y: 100, width: 30, height: 40 },
  { id: "37", x: 330, y: 100, width: 30, height: 40 },

  // Large plots in center
  { id: "1", x: 420, y: 130, width: 90, height: 140 },
  { id: "2", x: 625, y: 130, width: 90, height: 140 },
  { id: "3", x: 730, y: 130, width: 90, height: 140 },
  { id: "3a", x: 835, y: 130, width: 70, height: 140 },

  // Right side
  { id: "135", x: 975, y: 100, width: 30, height: 40 },
  { id: "136", x: 1010, y: 100, width: 30, height: 40 },
  { id: "137", x: 1050, y: 100, width: 30, height: 40 },
  { id: "137a", x: 1105, y: 120, width: 30, height: 30 },
  { id: "138", x: 1145, y: 100, width: 30, height: 40 },

  { id: "44", x: 30, y: 165, width: 30, height: 40 },
  { id: "43", x: 65, y: 165, width: 30, height: 40 },
  { id: "42", x: 100, y: 165, width: 30, height: 40 },
  { id: "41", x: 140, y: 165, width: 30, height: 40 },
  { id: "40", x: 180, y: 165, width: 30, height: 50 },
  { id: "39", x: 225, y: 165, width: 30, height: 50 },
  { id: "38a", x: 265, y: 165, width: 30, height: 40 },
  { id: "38", x: 330, y: 165, width: 30, height: 40 },

  { id: "4", x: 915, y: 130, width: 50, height: 100 },
  { id: "134", x: 975, y: 165, width: 30, height: 60 },
  { id: "133", x: 1010, y: 165, width: 30, height: 50 },
  { id: "132", x: 1050, y: 165, width: 30, height: 50 },
  { id: "131", x: 1090, y: 165, width: 30, height: 50 },
  { id: "130", x: 1130, y: 165, width: 30, height: 50 },
  { id: "129", x: 1170, y: 165, width: 30, height: 50 },

  // Bottom sections
  { id: "45", x: 30, y: 240, width: 30, height: 40 },
  { id: "46", x: 65, y: 240, width: 30, height: 40 },
  { id: "47", x: 100, y: 240, width: 30, height: 40 },
  { id: "48", x: 140, y: 240, width: 30, height: 40 },
  { id: "49", x: 180, y: 240, width: 30, height: 40 },
  { id: "49a", x: 220, y: 255, width: 30, height: 30 },
  { id: "50", x: 260, y: 240, width: 30, height: 40 },
  { id: "51", x: 330, y: 240, width: 30, height: 40 },

  { id: "125", x: 975, y: 240, width: 30, height: 60 },
  { id: "126", x: 1010, y: 240, width: 30, height: 50 },
  { id: "127", x: 1050, y: 240, width: 30, height: 50 },
  { id: "127a", x: 1105, y: 265, width: 30, height: 30 },
  { id: "128", x: 1145, y: 240, width: 30, height: 60 },
];

export default dayeuhKolotPlots;
