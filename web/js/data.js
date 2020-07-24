const globalEndDate = new Date(2025, 0, 1);

const archList = [
  "6502",
  "x86",
  "mips",
  "ppc",
  "arm"
];

const archInfo = {
  "6502": {
    "color": "#888888",
    "name": "MOS Technology 6502 and clones/derivatives"
  },
  "x86": {
    "color": "#0000ff",
    "name": "Intel/AMD x86"
  },
  "mips": {
    "color": "#ff00ff",
    "name": "MIPS"
  },
  "ppc": {
    "color": "#00ff00",
    "name": "PowerPC"
  },
  "arm": {
    "color": "#ff0000",
    "name": "ARM"
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
    "coprocessors": null,
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
    "coprocessors": null,
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
    "coprocessors": null,
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
    "coprocessors": null,
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
    "coprocessors": null,
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
    "coprocessors": null,
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
    "coprocessors": null,
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
    "coprocessors": null,
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
    "coprocessors": null,
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
    "coprocessors": null,
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
    "coprocessors": null,
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
    "coprocessors": null,
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
    "coprocessors": null,
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
    "coprocessors": null,
    "description": "An 8-core AMD CPU using the same Zen 2 architecture as high-end Ryzen and EPYC CPUs."
  },
];
