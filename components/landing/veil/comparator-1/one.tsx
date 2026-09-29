import type { getLandingPages } from "@/lib/landing-pages"

type ComparisonCopy = ReturnType<typeof getLandingPages>["compare"]

export default function Comparator({ copy }: { copy: ComparisonCopy }) {
  return (
    <div className="mt-10 overflow-x-auto border-y border-border" tabIndex={0} aria-label={copy.title}>
      <table className="w-full min-w-[52rem] table-fixed border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-[15%] px-4 py-4 text-xs font-medium text-muted-foreground">{copy.factor}</th>
            {copy.approaches.map((approach) => <th scope="col" key={approach} className="w-[28.3%] border-l border-border px-4 py-4 align-top font-medium">{approach}</th>)}
          </tr>
        </thead>
        <tbody>
          {copy.rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <th scope="row" className="px-4 py-5 align-top text-xs font-medium text-muted-foreground">{row.label}</th>
              {row.values.map((value, index) => <td key={index} className="border-l border-border px-4 py-5 align-top leading-6 text-muted-foreground">{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
