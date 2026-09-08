import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface RatesTableProps {
  rates: Dictionary["pricingPage"]["rates"]
}

export function RatesTable({ rates }: RatesTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            {rates.columns.map((column) => (
              <TableHead key={column} className="px-4 py-3 text-sm">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rates.rows.map((row) => (
            <TableRow key={row[0]}>
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cell}
                  className={
                    cellIndex === 0
                      ? "px-4 py-3 text-sm font-medium"
                      : "px-4 py-3 text-sm text-muted-foreground"
                  }
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
