export default function LoadingOperatorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading operators...</p>
        </div>
      </div>
    </div>
  )
}
