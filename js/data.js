const globalEndDate = new Date(2025, 0, 1);

// Colorblind-friendly 12-color palette from
// http://mkweb.bcgsc.ca/colorblind/palettes.mhtml
const colors = [
  "#9F0162",
  "#009F81",
  "#FF5AAF",
  "#00FCCF",
  "#8400CD",
  "#008DF9",
//  "#00C2F9",  Contrast between PowerPC and ARM better with this omitted.
  "#FFB2FD",
  "#A40122",
  "#E20134",
  "#FF6E3A",
  "#FFC33B"
];

// Non-const because colors will be patched in at runtime.
let arches = {
  "6502": {
    "name": "MOS Technology 6502 and clones/derivatives"
  },
  "z80": {
    "name": "Zilog Z80"
  },
  "m68k": {
    "name": "Motorola 680x0 series"
  },
  "x86": {
    "name": "Intel/AMD x86"
  },
  "mips": {
    "name": "MIPS"
  },
  "ppc": {
    "name": "PowerPC"
  },
  "arm": {
    "name": "ARM"
  },
  "sh": {
    "name": "Hitachi SuperH"
  }
};

const consoles = [
  {
    "name": "NES/Famicom",
    "manufacturer": "Nintendo",
    "release_date": "1983-07-15",
    "arch": "6502",
    "cpu": "Ricoh 2A03",
    "cores": "1",
    "clock": "1.79 MHz (NTSC), 1.66 MHz (PAL)",
    "description": "A Japanese clone of the MOS Technology 6502 processor."
  },
  {
    "name": "SNES/Super Famicom",
    "manufacturer": "Nintendo",
    "release_date": "1990-11-21",
    "arch": "6502",
    "cpu": "Ricoh 5A22",
    "cores": "1",
    "clock": "3.58 MHz",
    "description": "A Japanese clone of the WDC 65C816 processor, a 16-bit extension of the 6502."
  },
  {
    "name": "Nintendo 64",
    "manufacturer": "Nintendo",
    "release_date": "1996-06-23",
    "arch": "mips",
    "cpu": "NEC VR4300",
    "cores": "1",
    "clock": "93.75 MHz",
    "description": "A licensed version of the MIPS R4300i, a reduced-cost embedded 64-bit MIPS processor."
  },
  {
    "name": "GameCube",
    "manufacturer": "Nintendo",
    "release_date": "2001-09-14",
    "arch": "ppc",
    "cpu": "IBM Gekko",
    "cores": "1",
    "clock": "486 MHz",
    "description": "A custom derivative of the 32-bit IBM PowerPC 750."
  },
  {
    "name": "Wii",
    "manufacturer": "Nintendo",
    "release_date": "2006-11-19",
    "arch": "ppc",
    "cpu": "IBM Broadway",
    "cores": "1",
    "clock": "729 MHz",
    "description": "A faster version of the Gekko processor used in the GameCube."
  },
  {
    "name": "Wii U",
    "manufacturer": "Nintendo",
    "release_date": "2012-11-18",
    "arch": "ppc",
    "cpu": "IBM Espresso",
    "cores": "3",
    "clock": "1.24 GHz",
    "description": "A continued evolution of the PowerPC cores used in the GameCube and the Wii, now in a triple-core design."
  },
  {
    "name": "Switch",
    "manufacturer": "Nintendo",
    "release_date": "2017-03-03",
    "arch": "arm",
    "cpu": "NVidia Tegra X1",
    "cores": "4 (technically 8, but only 4 enabled)",
    "clock": "1.02 GHz",
    "description": "A system-on-a-chip combining 4 high-performance ARM Cortex-A57 cores, 4 low-power ARM Cortex-A53 cores (disabled), and onboard NVidia graphics."
  },
  {
    "name": "PlayStation",
    "manufacturer": "Sony",
    "release_date": "1994-12-02",
    "arch": "mips",
    "cpu": "MIPS R3000",
    "cores": "1",
    "clock": "33 MHz",
    "description": "An early and widely-used 32-bit MIPS design."
  },
  {
    "name": "PlayStation 2",
    "manufacturer": "Sony",
    "release_date": "2000-03-04",
    "arch": "mips",
    "cpu": "Sony/Toshiba Emotion Engine",
    "cores": "1",
    "clock": "295 MHz",
    "coprocessors": "2 Vector Processing Units",
    "description": "A custom chip combining a general-purpose 64-bit CPU core based on the MIPS R5900 with 2 custom vector-processing cores."
  },
  {
    "name": "PlayStation 3",
    "manufacturer": "Sony",
    "release_date": "2006-11-11",
    "arch": "ppc",
    "cpu": "Sony/Toshiba/IBM Cell",
    "cores": "1",
    "clock": "3.2 GHz",
    "coprocessors": "8 SPE cores (1 disabled)",
    "description": "An ambitious design combining a single general-purpose 64-bit PowerPC CPU core with 8 \"Synergistic Processing Element\" coprocessors."
  },
  {
    "name": "PlayStation 4",
    "manufacturer": "Sony",
    "release_date": "2013-11-15",
    "arch": "x86",
    "cpu": "AMD Jaguar",
    "cores": "8",
    "clock": "1.6 GHz (2.13 GHz in PS4 Pro)",
    "description": "An AMD-designed CPU and GPU on one package with 8 CPU cores based on the low-power \"Jaguar\" architecture."
  },
  {
    "name": "PlayStation 5",
    "manufacturer": "Sony",
    "release_date": "2020-11-01",
    "arch": "x86",
    "cpu": "AMD Zen 2",
    "cores": "8",
    "clock": "3.5 GHz",
    "description": "An 8-core AMD CPU using the same Zen 2 architecture as high-end Ryzen and EPYC CPUs."
  },
  {
    "name": "Xbox",
    "manufacturer": "Microsoft",
    "release_date": "2001-11-15",
    "arch": "x86",
    "cpu": "Intel Pentium 3",
    "cores": "1",
    "clock": "733 MHz",
    "description": "An Intel Pentium 3 \"Coppermine\" processor, much like those used in contemporary PCs."
  },
  {
    "name": "Xbox 360",
    "manufacturer": "Microsoft",
    "release_date": "2005-11-22",
    "arch": "ppc",
    "cpu": "IBM Xenon",
    "cores": "3",
    "clock": "3.2 GHz",
    "description": "A triple-core 64-bit PowerPC design from IBM, each core is very similar to the main CPU core in the PS3's Cell processor."
  },
  {
    "name": "Xbox One",
    "manufacturer": "Microsoft",
    "release_date": "2013-11-22",
    "arch": "x86",
    "cpu": "AMD Jaguar",
    "cores": "8",
    "clock": "1.75 GHz (2.3 GHz in Xbox One X)",
    "description": "An AMD-designed CPU and GPU on one package with 8 CPU cores based on the low-power \"Jaguar\" architecture."
  },
  {
    "name": "Xbox Series X",
    "manufacturer": "Microsoft",
    "release_date": "2020-11-01",
    "arch": "x86",
    "cpu": "AMD Zen 2",
    "cores": "8",
    "clock": "3.8 GHz (3.6 GHz with SMT enabled)",
    "description": "An 8-core AMD CPU using the same Zen 2 architecture as high-end Ryzen and EPYC CPUs."
  },
  {
    "name": "2600",
    "manufacturer": "Atari",
    "release_date": "1977-09-11",
    "arch": "6502",
    "cpu": "MOS Technology 6507",
    "cores": "1",
    "clock": "1.19 MHz",
    "description": "A cheaper version of the 6502 in a 28-pin DIP package."
  },
  {
    "name": "5200",
    "manufacturer": "Atari",
    "release_date": "1982-01-01",
    "arch": "6502",
    "cpu": "MOS Technology 6502C",
    "cores": "1",
    "clock": "1.79 MHz",
    "description": "A variant of the 6502 supporting a higher clockspeed and video sync."
  },
  {
    "name": "7800",
    "manufacturer": "Atari",
    "release_date": "1986-05-01",
    "arch": "6502",
    "cpu": "MOS Technology 6502C",
    "cores": "1",
    "clock": "1.79 MHz",
    "description": "A variant of the 6502 supporting a higher clockspeed and video sync."
  },
  {
    "name": "Jaguar",
    "manufacturer": "Atari",
    "release_date": "1993-11-23",
    "eol": "1996-12-31",
    "arch": "m68k",
    "cpu": "Motorola 68000",
    "cores": "1",
    "clock": "13.295 MHz",
    "coprocessors": "\"Tom\" GPU & \"Jerry\" DSP",
    "description": "The first of Motorola's 68k line, with a 32-bit instruction set but 16-bit ALUs. Paired with the specialized \"Tom\" and \"Jerry\" chips for video and audio processing, respectively."
  },
  {
    "name": "SG-1000",
    "manufacturer": "Sega",
    "release_date": "1983-07-15",
    "arch": "z80",
    "cpu": "Zilog Z80",
    "cores": "1",
    "clock": "3.58 MHz",
    "description": "Zilog's original flagship CPU, software-compatible with the Intel 8080 and widely used in embedded systems."
  },
  {
    "name": "Master System/Mark III",
    "manufacturer": "Sega",
    "release_date": "1985-10-20",
    "arch": "z80",
    "cpu": "Zilog Z80A",
    "cores": "1",
    "clock": "4 MHz",
    "description": "Zilog's original flagship CPU, software-compatible with the Intel 8080 and widely used in embedded systems."
  },
  {
    "name": "Genesis/Mega Drive",
    "manufacturer": "Sega",
    "release_date": "1988-10-29",
    "arch": "m68k",
    "cpu": "Motorola 68000",
    "cores": "1",
    "clock": "7.6 MHz",
    "description": "The first of Motorola's 68k line, with a 32-bit instruction set but 16-bit ALUs. Also used in early Macintosh, Amiga, and Atari ST computers."
  },
  {
    "name": "Saturn",
    "manufacturer": "Sega",
    "release_date": "1994-11-22",
    "arch": "sh",
    "cpu": "Hitachi SH-2",
    "cores": "2",
    "clock": "28.6 MHz",
    "description": "Dual Hitachi SH-2 processors using the proprietary SuperH RISC instruction set."
  },
  {
    "name": "Dreamcast",
    "manufacturer": "Sega",
    "release_date": "1998-11-27",
    "eol": "2001-03-31",
    "arch": "sh",
    "cpu": "Hitachi SH-4",
    "cores": "1",
    "clock": "200 MHz",
    "description": "Hitachi SH-4 using the proprietary SuperH RISC instruction set. Designed for multimedia with an enhanced FPU."
  }
];
