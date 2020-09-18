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

const arches = {
  "6502": {
    "name": "MOS Technology 6502 and clones/derivatives",
    "link": "https://en.wikipedia.org/wiki/MOS_Technology_6502"
  },
  "z80": {
    "name": "Zilog Z80",
    "link": "https://en.wikipedia.org/wiki/Zilog_Z80"
  },
  "m68k": {
    "name": "Motorola 680x0 series",
    "link": "https://en.wikipedia.org/wiki/Motorola_68000_series"
  },
  "x86": {
    "name": "Intel/AMD x86",
    "link": "https://en.wikipedia.org/wiki/X86"
  },
  "mips": {
    "name": "MIPS",
    "link": "https://en.wikipedia.org/wiki/MIPS_architecture"
  },
  "ppc": {
    "name": "PowerPC",
    "link": "https://en.wikipedia.org/wiki/PowerPC"
  },
  "arm": {
    "name": "ARM",
    "link": "https://en.wikipedia.org/wiki/ARM_architecture"
  },
  "sh": {
    "name": "Hitachi SuperH",
    "link": "https://en.wikipedia.org/wiki/SuperH",
    "color": "#BEBE00"
  },
  "other": {
    "name": "Other",
    "color": "#A0A0A0"
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
    "description": "A Japanese clone of the MOS Technology 6502 processor.",
    "link": "https://en.wikipedia.org/wiki/Nintendo_Entertainment_System"
  },
  {
    "name": "SNES/Super Famicom",
    "manufacturer": "Nintendo",
    "release_date": "1990-11-21",
    "arch": "6502",
    "cpu": "Ricoh 5A22",
    "cores": "1",
    "clock": "3.58 MHz",
    "description": "A Japanese clone of the WDC 65C816 processor, a 16-bit extension of the 6502.",
    "link": "https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System"
  },
  {
    "name": "Nintendo 64",
    "manufacturer": "Nintendo",
    "release_date": "1996-06-23",
    "arch": "mips",
    "cpu": "NEC VR4300",
    "cores": "1",
    "clock": "93.75 MHz",
    "description": "A licensed version of the MIPS R4300i, a reduced-cost embedded 64-bit MIPS processor.",
    "link": "https://en.wikipedia.org/wiki/Nintendo_64"
  },
  {
    "name": "GameCube",
    "manufacturer": "Nintendo",
    "release_date": "2001-09-14",
    "arch": "ppc",
    "cpu": "IBM Gekko",
    "cores": "1",
    "clock": "486 MHz",
    "description": "A custom derivative of the 32-bit IBM PowerPC 750.",
    "link": "https://en.wikipedia.org/wiki/GameCube"
  },
  {
    "name": "Wii",
    "manufacturer": "Nintendo",
    "release_date": "2006-11-19",
    "arch": "ppc",
    "cpu": "IBM Broadway",
    "cores": "1",
    "clock": "729 MHz",
    "description": "A faster version of the Gekko processor used in the GameCube.",
    "link": "https://en.wikipedia.org/wiki/Wii"
  },
  {
    "name": "Wii U",
    "manufacturer": "Nintendo",
    "release_date": "2012-11-18",
    "arch": "ppc",
    "cpu": "IBM Espresso",
    "cores": "3",
    "clock": "1.24 GHz",
    "description": "A continued evolution of the PowerPC cores used in the GameCube and the Wii, now in a triple-core design.",
    "link": "https://en.wikipedia.org/wiki/Wii_U"
  },
  {
    "name": "Switch",
    "manufacturer": "Nintendo",
    "release_date": "2017-03-03",
    "arch": "arm",
    "cpu": "ARM Cortex-A57",
    "cores": "4",
    "clock": "1.02 GHz",
    "description": "An NVidia Tegra X1 system-on-a-chip combining 4 high-performance ARM Cortex-A57 cores, 4 low-power ARM Cortex-A53 cores (disabled), and onboard NVidia GPU.",
    "link": "https://en.wikipedia.org/wiki/Nintendo_Switch"
  },
  {
    "name": "PlayStation",
    "manufacturer": "Sony",
    "release_date": "1994-12-02",
    "arch": "mips",
    "cpu": "MIPS R3000",
    "cores": "1",
    "clock": "33 MHz",
    "description": "An early and widely-used 32-bit MIPS design.",
    "link": "https://en.wikipedia.org/wiki/PlayStation_(console)"
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
    "description": "A custom chip combining a general-purpose 64-bit CPU core based on the MIPS R5900 with 2 custom vector-processing cores.",
    "link": "https://en.wikipedia.org/wiki/PlayStation_2"
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
    "description": "An ambitious design combining a single general-purpose 64-bit PowerPC CPU core with 8 \"Synergistic Processing Element\" coprocessors.",
    "link": "https://en.wikipedia.org/wiki/PlayStation_3"
  },
  {
    "name": "PlayStation 4",
    "manufacturer": "Sony",
    "release_date": "2013-11-15",
    "arch": "x86",
    "cpu": "AMD Jaguar",
    "cores": "8",
    "clock": "1.6 GHz (2.13 GHz in PS4 Pro)",
    "description": "An AMD-designed CPU and GPU on one package with 8 CPU cores based on the low-power \"Jaguar\" architecture.",
    "link": "https://en.wikipedia.org/wiki/PlayStation_4"
  },
  {
    "name": "PlayStation 5",
    "manufacturer": "Sony",
    "release_date": "2020-11-12",
    "arch": "x86",
    "cpu": "AMD Zen 2",
    "cores": "8",
    "clock": "3.5 GHz",
    "description": "An AMD-designed CPU and GPU on one package with 8 CPU cores using same Zen 2 architecture as high-end Ryzen and EPYC CPUs.",
    "link": "https://en.wikipedia.org/wiki/PlayStation_5"
  },
  {
    "name": "Xbox",
    "manufacturer": "Microsoft",
    "release_date": "2001-11-15",
    "arch": "x86",
    "cpu": "Intel Pentium 3",
    "cores": "1",
    "clock": "733 MHz",
    "description": "An Intel Pentium 3 \"Coppermine\" processor, much like those used in contemporary PCs.",
    "link": "https://en.wikipedia.org/wiki/Xbox_(console)"
  },
  {
    "name": "Xbox 360",
    "manufacturer": "Microsoft",
    "release_date": "2005-11-22",
    "arch": "ppc",
    "cpu": "IBM Xenon",
    "cores": "3",
    "clock": "3.2 GHz",
    "description": "A triple-core 64-bit PowerPC design from IBM, each core is very similar to the main CPU core in the PS3's Cell processor.",
    "link": "https://en.wikipedia.org/wiki/Xbox_360"
  },
  {
    "name": "Xbox One",
    "manufacturer": "Microsoft",
    "release_date": "2013-11-22",
    "arch": "x86",
    "cpu": "AMD Jaguar",
    "cores": "8",
    "clock": "1.75 GHz (2.3 GHz in Xbox One X)",
    "description": "An AMD-designed CPU and GPU on one package with 8 CPU cores based on the low-power \"Jaguar\" architecture.",
    "link": "https://en.wikipedia.org/wiki/Xbox_One"
  },
  {
    "name": "Xbox Series X",
    "manufacturer": "Microsoft",
    "release_date": "2020-11-10",
    "arch": "x86",
    "cpu": "AMD Zen 2",
    "cores": "8",
    "clock": "3.8 GHz (3.6 GHz with SMT enabled)",
    "description": "An AMD-designed CPU and GPU on one package with 8 CPU cores using same Zen 2 architecture as high-end Ryzen and EPYC CPUs.",
    "link": "https://en.wikipedia.org/wiki/Xbox_Series_X"
  },
  {
    "name": "Atari 2600",
    "manufacturer": "Atari",
    "release_date": "1977-09-11",
    "arch": "6502",
    "cpu": "MOS Technology 6507",
    "cores": "1",
    "clock": "1.19 MHz",
    "description": "A cheaper version of the 6502 in a 28-pin DIP package.",
    "link": "https://en.wikipedia.org/wiki/Atari_2600"
  },
  {
    "name": "Atari 5200",
    "manufacturer": "Atari",
    "release_date": "1982-01-01",
    "arch": "6502",
    "cpu": "MOS Technology 6502C",
    "cores": "1",
    "clock": "1.79 MHz",
    "description": "A variant of the 6502 supporting a higher clockspeed and video sync.",
    "link": "https://en.wikipedia.org/wiki/Atari_5200"
  },
  {
    "name": "Atari 7800",
    "manufacturer": "Atari",
    "release_date": "1986-05-01",
    "arch": "6502",
    "cpu": "MOS Technology 6502C",
    "cores": "1",
    "clock": "1.79 MHz",
    "description": "A variant of the 6502 supporting a higher clockspeed and video sync.",
    "link": "https://en.wikipedia.org/wiki/Atari_7800"
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
    "description": "The first of Motorola's 68k line, with a 32-bit instruction set but 16-bit ALUs. Paired with the specialized \"Tom\" and \"Jerry\" chips for video and audio processing, respectively.",
    "link": "https://en.wikipedia.org/wiki/Atari_Jaguar"
  },
  {
    "name": "SG-1000",
    "manufacturer": "Sega",
    "release_date": "1983-07-15",
    "arch": "z80",
    "cpu": "Zilog Z80",
    "cores": "1",
    "clock": "3.58 MHz",
    "description": "Zilog's original flagship CPU, software-compatible with the Intel 8080 and widely used in embedded systems.",
    "link": "https://en.wikipedia.org/wiki/SG-1000"
  },
  {
    "name": "Master System/Mark III",
    "manufacturer": "Sega",
    "release_date": "1985-10-20",
    "arch": "z80",
    "cpu": "Zilog Z80A",
    "cores": "1",
    "clock": "4 MHz",
    "description": "Zilog's original flagship CPU, software-compatible with the Intel 8080 and widely used in embedded systems.",
    "link": "https://en.wikipedia.org/wiki/Master_System"
  },
  {
    "name": "Genesis/Mega Drive",
    "manufacturer": "Sega",
    "release_date": "1988-10-29",
    "arch": "m68k",
    "cpu": "Motorola 68000",
    "cores": "1",
    "clock": "7.6 MHz",
    "coprocessors": "Zilog Z80 at 3.58 MHz",
    "description": "The first of Motorola's 68k line, with a 32-bit instruction set but 16-bit ALUs. Also used in early Macintosh, Amiga, and Atari ST computers. Also includes a Zilog Z80 to control sound and provide Master System backwards compatibility.",
    "link": "https://en.wikipedia.org/wiki/Sega_Genesis"
  },
  {
    "name": "Saturn",
    "manufacturer": "Sega",
    "release_date": "1994-11-22",
    "arch": "sh",
    "cpu": "Hitachi SH-2",
    "cores": "2",
    "clock": "28.6 MHz",
    "description": "Dual Hitachi SH-2 processors using the proprietary SuperH RISC instruction set.",
    "link": "https://en.wikipedia.org/wiki/Sega_Saturn"
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
    "description": "Hitachi SH-4 using the proprietary SuperH RISC instruction set. Designed for multimedia with an enhanced FPU.",
    "link": "https://en.wikipedia.org/wiki/Dreamcast"
  },
  {
    "name": "TurboGrafx-16/PC Engine",
    "manufacturer": "NEC",
    "release_date": "1987-10-30",
    "arch": "6502",
    "cpu": "Hudson Soft HuC6280",
    "cores": "1",
    "clock": "7.16 MHz",
    "description": "Hudson Soft's improved version of the WDC 65C02, itself an enhanced version of the original MOS Technology 6502. Adds additional features including an MMU and a sound generator.",
    "link": "https://en.wikipedia.org/wiki/TurboGrafx-16",
    "rare": true
  },
  {
    "name": "PC-FX",
    "manufacturer": "NEC",
    "release_date": "1994-12-23",
    "eol": "1998-02-28",
    "arch": "other",
    "cpu": "NEC V810",
    "cores": "1",
    "clock": "25 MHz",
    "description": "A proprietary NEC-designed 32-bit RISC CPU.",
    "link": "https://en.wikipedia.org/wiki/PC-FX",
    "rare": true
  },
  {
    "name": "Neo Geo",
    "manufacturer": "SNK",
    "release_date": "1990-04-26",
    "eol": "1997-12-31",
    "arch": "m68k",
    "cpu": "Motorola 68000",
    "cores": "1",
    "clock": "12 MHz",
    "coprocessors": "Zilog Z80A at 4 MHz",
    "description": "The first of Motorola's 68k line, with a 32-bit instruction set but 16-bit ALUs. Also used in early Macintosh, Amiga, and Atari ST computers. Includes a Z80A coprocessor to control sound.",
    "link": "https://en.wikipedia.org/wiki/Neo_Geo_(system)",
    "rare": true
  },
  {
    "name": "CD-i",
    "manufacturer": "Phillips",
    "release_date": "1991-12-03",
    "eol": "1998-12-31",
    "arch": "m68k",
    "cpu": "Phillips SCC68070",
    "cores": "1",
    "clock": "15.5 MHz",
    "description": "A licensed design compatible with the Motorola 68000 with some additional features.",
    "link": "https://en.wikipedia.org/wiki/CD-i",
    "rare": true
  },
  {
    "name": "3DO",
    "manufacturer": "3DO",
    "release_date": "1993-10-04",
    "eol": "1996-12-31",
    "arch": "arm",
    "cpu": "ARM60",
    "cores": "1",
    "clock": "12.5 MHz",
    "description": "The first ARM CPU to support a full 32-bit address space.",
    "link": "https://en.wikipedia.org/wiki/3DO_Interactive_Multiplayer",
    "rare": true
  }
];

const handhelds = [
  {
    "name": "Game Boy",
    "manufacturer": "Nintendo",
    "release_date": "1989-04-21",
    "arch": "z80",
    "cpu": "Sharp LR35902",
    "cores": "1",
    "clock": "4.19 MHz",
    "description": "A custom CPU mostly based on the Z80, but with a reduced register set like the Intel 8080 and memory-mapped I/O.",
    "link": "https://en.wikipedia.org/wiki/Game_Boy"
  },
  {
    "name": "Game Boy Color",
    "manufacturer": "Nintendo",
    "release_date": "1998-10-21",
    "arch": "z80",
    "cpu": "Sharp LR35902",
    "cores": "1",
    "clock": "8.38 MHz",
    "description": "The same custom CPU (based on the Z80) as the original Game Boy, clocked twice as fast.",
    "link": "https://en.wikipedia.org/wiki/Game_Boy_Color"
  },
  {
    "name": "Game Boy Advance",
    "manufacturer": "Nintendo",
    "release_date": "2001-03-21",
    "arch": "arm",
    "cpu": "ARM7TDMI",
    "cores": "1",
    "clock": "16.78 MHz",
    "coprocessors": "Sharp LR35902 at 8.38 MHz",
    "description": "A widely-used 32-bit embedded ARM core. Includes a Z80-based Sharp LR35902 processor for backwards compatibility with Game Boy & Game Boy Color.",
    "link": "https://en.wikipedia.org/wiki/Game_Boy_Advance"
  },
  {
    "name": "Nintendo DS",
    "manufacturer": "Nintendo",
    "release_date": "2004-11-21",
    "arch": "arm",
    "cpu": "ARM946E-S",
    "cores": "1",
    "clock": "67 MHz (133 MHz in DSi)",
    "coprocessors": "ARM7TDMI at 33 MHz",
    "description": "A widely-used 32-bit embedded ARM core. The slower ARM7TDMI is used to for sound & WiFi support, and to run GBA games for backwards compatibility.",
    "link": "https://en.wikipedia.org/wiki/Nintendo_DS",
  },
  {
    "name": "Nintendo 3DS",
    "manufacturer": "Nintendo",
    "release_date": "2011-02-26",
    "arch": "arm",
    "cpu": "ARM11 MPCore",
    "cores": "2",
    "clock": "268 MHz",
    "coprocessors": "ARM9",
    "description": "A dual-core 32-bit ARM processor with SIMD instructions for multimedia. A slower ARM9 is used for backwards compatibilty with DS games.",
    "link": "https://en.wikipedia.org/wiki/Nintendo_3DS",
  },
  {
    "name": "New Nintendo 3DS",
    "manufacturer": "Nintendo",
    "release_date": "2014-10-01",
    "eol": "2019-12-31",
    "arch": "arm",
    "cpu": "ARM11 MPCore",
    "cores": "4",
    "clock": "804 MHz",
    "coprocessors": "ARM9",
    "description": "A quad-core 32-bit ARM processor with SIMD instructions for multimedia. The architecture is the same as the 3DS, but with twice as many cores and a higher clock speed. A slower ARM9 is still included for backwards compatibilty with DS games.",
    "link": "https://en.wikipedia.org/wiki/New_Nintendo_3DS",
  },
  {
    "name": "PlayStation Portable",
    "manufacturer": "Sony",
    "release_date": "2004-12-12",
    "arch": "mips",
    "cpu": "MIPS R4000",
    "cores": "1",
    "clock": "333 MHz",
    "coprocessors": "\"Media Engine\" MIPS R4000-based core with multimedia codecs & programmable DSP.",
    "description": "Custom \"Allegrex\" system-on-a-chip combining a main CPU based on the MIPS R4000 core (+vector FPU) with a \"Media Engine\" coprocessor also based on the R4000.",
    "link": "https://en.wikipedia.org/wiki/PlayStation_Portable"
  },
  {
    "name": "PlayStation Vita",
    "manufacturer": "Sony",
    "release_date": "2011-12-17",
    "eol": "2019-03-01",
    "arch": "arm",
    "cpu": "ARM Cortex-A9 MPCore",
    "cores": "4",
    "clock": "333 MHz (444 MHz w/ WiFi disabled)",
    "description": "High-performance 32-bit quad-core application processor from ARM. The CPU reportedly supports a clock speed over 1 GHz, but it is underclocked to save power.",
    "link": "https://en.wikipedia.org/wiki/PlayStation_Vita"
  },
  {
    "name": "Lynx",
    "manufacturer": "Atari",
    "release_date": "1989-09-01",
    "eol": "1995-12-31",
    "arch": "6502",
    "cpu": "WDC 65SC02",
    "cores": "1",
    "clock": "4 MHz",
    "description": "An enhanced CMOS version of the 6502 made by the Western Design Center.",
    "link": "https://en.wikipedia.org/wiki/Atari_Lynx"
  },
  {
    "name": "Game Gear",
    "manufacturer": "Sega",
    "release_date": "1990-11-06",
    "arch": "z80",
    "cpu": "Zilog Z80",
    "cores": "1",
    "clock": "3.5 MHz",
    "description": "Zilog's original flagship CPU, software-compatible with the Intel 8080 and widely used in embedded systems. Hardware specs are very similar to the Master System.",
    "link": "https://en.wikipedia.org/wiki/Game_Gear"
  },
  {
    "name": "Genesis Nomad",
    "manufacturer": "Sega",
    "release_date": "1995-10-01",
    "eol": "1999-12-31",
    "arch": "m68k",
    "cpu": "Motorola 68000",
    "cores": "1",
    "clock": "7.6 MHz",
    "description": "The first of Motorola's 68k line, with a 32-bit instruction set but 16-bit ALUs. Also used in early Macintosh, Amiga, and Atari ST computers. The same model as used in the original home version of the Genesis.",
    "link": "https://en.wikipedia.org/wiki/Genesis_Nomad"
  },
  {
    "name": "TurboExpress",
    "manufacturer": "NEC",
    "release_date": "1990-12-01",
    "eol": "1994-12-31",
    "arch": "6502",
    "cpu": "Hudson Soft HuC6280",
    "cores": "1",
    "clock": "7.16 MHz",
    "description": "Hudson Soft's improved version of the WDC 65C02, itself an enhanced version of the original MOS Technology 6502. Adds additional features including an MMU and a sound generator. The same model as used in the original home version of the TurboGrafx-16.",
    "link": "https://en.wikipedia.org/wiki/TurboExpress",
    "rare": true
  },
  {
    "name": "Neo Geo Pocket",
    "manufacturer": "SNK",
    "release_date": "1998-10-28",
    "eol": "2000-06-13",
    "arch": "other",
    "cpu": "Toshiba TLCS900H",
    "cores": "1",
    "clock": "6.144 MHz",
    "coprocessors": "Zilog Z80 at 3.072 MHz",
    "description": "A proprietary 32-bit microcontroller from Toshiba, partially based on the Z80 instruction set. Also includes a Z80 coprocessor to control sound.",
    "link": "https://en.wikipedia.org/wiki/Neo_Geo_Pocket",
    "rare": true
  },
  {
    "name": "WonderSwan",
    "manufacturer": "Bandai",
    "release_date": "1999-03-04",
    "eol": "2003-12-31",
    "arch": "x86",
    "cpu": "NEC V30 MZ",
    "cores": "1",
    "clock": "3.072 MHz",
    "description": "A reverse-engineered x86 CPU pin-compatible with the Intel 8086, supporting the additional instructions of the 80186.",
    "link": "https://en.wikipedia.org/wiki/WonderSwan",
    "rare": true
  },
  {
    "name": "N-Gage",
    "manufacturer": "Nokia",
    "release_date": "2003-10-07",
    "eol": "2005-11-26",
    "arch": "arm",
    "cpu": "ARM920T",
    "cores": "1",
    "clock": "104 MHz",
    "description": "A widely-used 32-bit ARM application processor.",
    "link": "https://en.wikipedia.org/wiki/N-Gage_(device)",
    "rare": true
  }
];
