#!/usr/bin/env python3

with open("index_template.html", "r") as template_file:
  template = template_file.read()

with open("data/arches.json", "r") as arches_file:
  arches = arches_file.read()

with open("data/arch_info.json", "r") as arch_info_file:
  arch_info = arch_info_file.read()

with open("data/consoles.json", "r") as consoles_file:
  consoles = consoles_file.read()

with open("js/main.js", "r") as script_main_file:
  script_main = script_main_file.read()

rendered = template.format(arches=arches, arch_info=arch_info,
                           consoles=consoles, main=script_main)

with open("index.html", "w") as index:
  index.write(rendered)
