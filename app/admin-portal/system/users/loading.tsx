export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-16 bg-card border-b animate-pulse" />
      <div className="p-6">
        <div className="h-8 w-64 bg-muted rounded animate-pulse mb-4" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-card border rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="mt-8 h-96 bg-card border rounded-lg animate-pulse" />
      </div>
    </div>
  )
}
