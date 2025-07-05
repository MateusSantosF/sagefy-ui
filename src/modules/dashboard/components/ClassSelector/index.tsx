"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { PopoverContent, PopoverTrigger } from "@shared/components/ui/popover"
import { Popover } from "@radix-ui/react-popover"
import { Button } from "@shared/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@shared/components/ui/command"

interface ClassSelectorProps {
  classes: string[]
  selectedClass: string | null
  onClassChange: (classCode: string) => void
}

export function ClassSelector({ classes, selectedClass, onClassChange }: ClassSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="md:min-w-[300px] w-fit justify-between rounded-xl border-2 h-11"
        >
          {selectedClass ? `Turma ${selectedClass}` : "Selecionar turma..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Buscar turma..." />
          <CommandList>
            <CommandEmpty>Nenhuma turma encontrada.</CommandEmpty>
            <CommandGroup>
              {classes.map((classCode) => (
                <CommandItem
                  key={classCode}
                  value={classCode}
                  onSelect={() => {
                    onClassChange(classCode)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", selectedClass === classCode ? "opacity-100" : "opacity-0")} />
                  Turma {classCode}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

