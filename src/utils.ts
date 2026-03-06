// Check if block has a non-repeating SCHEDULED in content
export function hasScheduledInContent(content: string): boolean {
  if (!/^SCHEDULED:\s*<[^>]+>/mi.test(content)) return false
  // Skip repeating tasks (e.g. .+1w, ++1d, +1m)
  if (/^SCHEDULED:\s*<[^>]*(?:\.\+|\+\+|\+)\d+[hdwmy][^>]*>/mi.test(content)) return false
  return true
}

// Check if a block is a completed todo
export function isCompletedTodo(content: string): boolean {
  if (!content) return false

  const trimmed = content.trim()
  // Simplified patterns - just the most common ones
  return /^(DONE|COMPLETED|CANCELED|CANCELLED|\[x\])\s+/i.test(trimmed)
}
